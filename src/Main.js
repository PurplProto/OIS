import "./css/OpenInSteam.css";

const pageLocation = window.location;
const isFirefox = typeof InstallTrigger !== "undefined";
const isChrome = typeof !!window.chrome !== "undefined"
    || typeof !!window.chrome.webstore !== "undefined";


function httpGetAsync(requestUrl, requestCallback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            requestCallback(xmlHttp);
        }
    };
    xmlHttp.open("GET", requestUrl, true);
    xmlHttp.send();
}

// Returns a fully-qualified URL to the resource
function getExtensionURL(resource) {
    if (isFirefox) {
        return browser.extension.getURL(resource);
    }
    if (isChrome) {
        return chrome.runtime.getURL(resource);
    }

    return null;
}

// Returns the unique ID for the page
function getPageId(urlString, regexString) {
    return urlString.match(regexString)[0];
}

// Function to add button to right of the page title,
// passing in the page type so the URL can be set correctly
function addOISButton(steamURL, pageId) {
    const otherSiteInfoBar = document.getElementsByClassName("apphub_OtherSiteInfo");
    const workShopInfoBar = document.getElementsByClassName("workshopItemControlCtn");
    const profileInfoBar = document.getElementsByClassName("profile_header_actions");
    const oisLogo = getExtensionURL("../icons/ois_logo.png");

    // Prevent attempting to add a button on a non-supported browser
    if (oisLogo == null) {
        return;
    }

    function insertButtonOnPage(
        linkElement,
        spanElement,
        imgElement,
        parentElement,
    ) {
        linkElement.classList.add("ois_link");

        spanElement.appendChild(imgElement);
        linkElement.appendChild(spanElement);
        parentElement.insertBefore(linkElement, parentElement.children[2]);
    }

    // Top menu bar
    if (otherSiteInfoBar.length > 0) {
        const topBox = document.createElement("a");
        const topBoxContents = document.createElement("span");
        const topBoxImg = document.createElement("img");
        const topDiv = otherSiteInfoBar[0];

        topBoxImg.className = "img_ois_menu_top";
        topBoxImg.src = oisLogo;

        topBox.className = "btnv6_blue_hoverfade btn_medium";
        topBox.href = steamURL + pageId;

        insertButtonOnPage(topBox, topBoxContents, topBoxImg, topDiv);
    }

    // Lower menu bar
    if (workShopInfoBar.length > 0) {
        const lowerBox = document.createElement("a");
        const lowerBoxContents = document.createElement("span");
        const lowerBoxImg = document.createElement("img");
        const lowerDiv = workShopInfoBar[2];

        lowerBoxImg.className = "img_ois_menu_lower";
        lowerBoxImg.src = oisLogo;

        lowerBox.className = "general_btn";
        lowerBox.href = steamURL + pageId;

        insertButtonOnPage(lowerBox, lowerBoxContents, lowerBoxImg, lowerDiv);
    }

    // Profile menu bar
    if (profileInfoBar.length > 0) {
        const profileBox = document.createElement("a");
        const profileBoxContents = document.createElement("span");
        const profileBoxImg = document.createElement("img");
        const profileDiv = profileInfoBar[0];

        profileBoxImg.className = "img_ois_workshop_bar";
        profileBoxImg.src = oisLogo;

        profileBox.className = "btn_profile_action btn_medium";
        profileBox.href = steamURL + pageId;

        insertButtonOnPage(profileBox, profileBoxContents, profileBoxImg, profileDiv);
    }
}

function main() {
    if (pageLocation.href.match(/store\.steampowered\.com\/app/)) { // Steam store page
        addOISButton(
            "steam://store/",
            getPageId(
                pageLocation.pathname,
                /\d+/,
            ),
        );
    } else if (pageLocation.href.match(/steamcommunity\.com\/workshop/)) { // Steam workshop page
        addOISButton(
            "steam://url/CommunityFilePage/",
            getPageId(
                pageLocation.search,
                /\d+/,
            ),
        );
    } else if (pageLocation.href.match(/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=\d+/)) { // Steam app item
        addOISButton(
            "steam://url/CommunityFilePage/",
            getPageId(
                pageLocation.search,
                /\d+/,
            ),
        );
    } else if (pageLocation.href.match(/steamcommunity\.com\/profiles\/\d+/)) { // Steam user profile
        addOISButton(
            "steam://url/SteamIDPage/",
            getPageId(
                pageLocation.pathname,
                /\d+/,
            ),
        );
    } else if (pageLocation.href.match(/steamcommunity\.com\/id/)) { // Steam user custom profile URL
        const resolveIdUrl = `https://sirs.pairedprototype.com/resolvesteamid/${getPageId(pageLocation.pathname, /[a-zA-Z1-9]*$/)}`;

        addOISButton(
            null,
            null,
        );

        httpGetAsync(
            resolveIdUrl,
            (steamUserIdResponse) => {
                const steamUserIdJson = JSON.parse(steamUserIdResponse.response);
                const oisButtonLink = document.getElementsByClassName("ois_link");

                if (steamUserIdResponse.status === 200
                        && steamUserIdJson.error.errorStatusCode === 0) {
                    oisButtonLink[0].href = `steam://url/SteamIDPage/${steamUserIdJson.response.steamIdData.steamIdValue}`;
                } else {
                    oisButtonLink[0].parentNode.removeChild(oisButtonLink);
                }
            },
        );
    }
}

document.onload = main();
