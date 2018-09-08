const isFirefox = typeof InstallTrigger !== "undefined";
const isChrome = typeof !!window.chrome !== "undefined"
    || typeof !!window.chrome.webstore !== "undefined";

function getExtensionURL(resource) {
    if (isFirefox) {
        return browser.extension.getURL(resource);
    }
    if (isChrome) {
        return chrome.runtime.getURL(resource);
    }

    return null;
}
