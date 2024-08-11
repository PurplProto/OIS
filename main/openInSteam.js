(function() {
    var pageURL = window.location.href; // Get URL for later parsing
    
    // Function to add button to right of the page title, passing in the page type so the URI can be set correctly
    function addTitleButton(pageType) {
        var titleDiv         = document.getElementsByClassName("apphub_OtherSiteInfo")[0],
            titleBox         = document.createElement("a"),
            titleBoxContents = document.createElement("span"),
            titleBoxImg      = document.createElement("img"),
            idFromURL        = pageURL.match(/\d+/);
        
        titleBoxImg.className = "img_osi_title";
        titleBoxImg.src = chrome.runtime.getURL("icons/ois16x29.png");
        
        titleBoxContents.appendChild(titleBoxImg);
            
        titleBox.className = "btnv6_blue_hoverfade btn_medium btn_osi_title";
        titleBox.appendChild(titleBoxContents);
        switch(pageType) {
            case "StorePage":
                titleBox.href = "steam://store/" + idFromURL;
                break;
            
            case "CommunityItem":
                titleBox.href = "steam://url/CommunityFilePage/" + idFromURL;
                break;
            case "WorkShop":
                titleBox.href = "steam://url/SteamWorkshopPage/" + idFromURL;
                break;
            case "noSupport":
            default:
                return;
        }
        
        titleDiv.insertBefore(titleBox, titleDiv.children[0]);
    }
    
    if (pageURL.match(/store\.steampowered\.com\/app/)) { //Steam store page
        addTitleButton("StorePage");
    }
    else if (pageURL.match(/steamcommunity\.com\/app\/\d+\/workshop/)) { //Steam workshop page
        addTitleButton("WorkShop");
    }
    else if (pageURL.match(/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=\d+/)) { //Steam app item
        addTitleButton("CommunityItem");
    }
})();
