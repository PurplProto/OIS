# OIS

Open In Steam - I created OIS to handle opening Steam's web browser pages in the Steam client.

## Download

So far, this extension is supported on two browsers - [Chrome](https://chrome.google.com/webstore/detail/focbafnolmhmenikmjpddfdkjlodcinh/) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/open-in-steam/).

## How to build

1. Clone the repository using `git clone git@github.com:PairedPrototype/OIS.git`.
2. Get [Node + npm](https://nodejs.org/en/) at least Node version `8.12.0`.
3. Open your favorite shell/terminal emulator and run `npm install` to obtain all the require dependencies.
4. Run `npm run build` to build a debug version of the extension. Or `npm run publish` to build a release version.
5. Loading the extension in the browser:
    1. For Chrome (debug build needed):
        1. Simply navigate to the extensions page `chrome://extensions/`.
        2. Enable developer mode in the top right corner of the page.
        3. Click `Load Unpacked` and navigate to `ois/packaged/Chrome-vx.x.x.zip`.
        4. To test it, load up a Steam web page such as a user's profile i.e. [https://steamcommunity.com/id/pairedprototype/](https://steamcommunity.com/id/pairedprototype/).
        5. Click the OIS button.
        6. Profit.
    2. For Firefox:
        1. Simply navigate to the extensions page `about:debugging`.
        2. Check the `Enable add-on debugging` check box.
        3. Click `Load Temporary Add-on...` located at the top right of the page and navigate to `ois/packaged/FireFox-x.x.x.zip`.
        4. To test it, load up a Steam web page such as a user's profile i.e. [https://steamcommunity.com/id/pairedprototype/](https://steamcommunity.com/id/pairedprototype/).
        5. Click the OIS button.
        6. Profit.
