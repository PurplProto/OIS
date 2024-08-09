const GetExtensionURL = (resource) => {
    const isFirefox = typeof InstallTrigger !== "undefined";
    const isChrome = typeof !!window.chrome !== "undefined"
    || typeof !!window.chrome.webstore !== "undefined";

    if (isFirefox) {
        return browser.extension.getURL(resource);
    }
    if (isChrome) {
        return chrome.runtime.getURL(resource);
    }

    return null;
};

const InsertButtonOnPage = (
    linkElement,
    spanElement,
    imgElement,
    parentElement,
) => {
    linkElement.classList.add("ois_link");

    spanElement.appendChild(imgElement);
    linkElement.appendChild(spanElement);
    parentElement.insertBefore(linkElement, parentElement.children[2]);
};

const CreateInfoBarObject = (infoBarDiv, positionInDiv) => (
    {
        topBox: document.createElement("a"),
        topBoxContents: document.createElement("span"),
        topBoxImg: document.createElement("img"),
        topDiv: infoBarDiv[positionInDiv],
    }
);

const AddInfoBarProperties = (
    buttonObject,
    logo,
    imgClasses,
    linkClasses,
    linkHref,
) => {
    const infoBar = buttonObject;

    infoBar.topBoxImg.className = imgClasses;
    infoBar.topBoxImg.src = logo;
    infoBar.topBox.className = linkClasses;
    infoBar.topBox.href = linkHref;

    return infoBar;
};

const BuildButton = (parentDiv, oisLogo, steamURL, pageId, elementClasses) => {
    let infoBar = CreateInfoBarObject(parentDiv.div, parentDiv.index);

    infoBar = AddInfoBarProperties(
        infoBar,
        oisLogo,
        elementClasses.imageClass,
        elementClasses.linkClass,
        steamURL + pageId,
    );

    InsertButtonOnPage(
        infoBar.topBox,
        infoBar.topBoxContents,
        infoBar.topBoxImg,
        infoBar.topDiv,
    );
};

export default {
    GetExtensionURL,
    InsertButtonOnPage,
    CreateInfoBarObject,
    AddInfoBarProperties,
    BuildButton,
};
