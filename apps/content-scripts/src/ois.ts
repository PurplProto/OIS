import { Helpers } from './helpers';

const pageLocation = window.location;

// Function to add button to right of the page title,
// passing in the page type so the URL can be set correctly
function AddOISButton(steamURL: string, pageId: string) {
  const otherSiteInfoBar = document.getElementsByClassName(
    'apphub_OtherSiteInfo'
  );
  const workShopInfoBar = document.getElementsByClassName(
    'workshopItemControlCtn'
  );
  const profileInfoBar = document.getElementsByClassName(
    'profile_header_actions'
  );
  const oisLogo = Helpers.GetExtensionURL('../assets/icons/ois_logo.png');

  // Prevent attempting to add a button on a non-supported browser
  if (oisLogo == null) {
    return;
  }

  // Top menu bar
  if (otherSiteInfoBar.length > 0) {
    const elementClasses = {
      imageClass: 'img_ois_menu_top',
      linkClass: 'ois_othersite_info_button',
    };
    const parentDiv = { div: otherSiteInfoBar, index: 0 };

    Helpers.BuildButton(parentDiv, oisLogo, steamURL, pageId, elementClasses);
  }

  // Lower menu bar
  if (workShopInfoBar.length > 0) {
    const elementClasses = {
      imageClass: 'img_ois_menu_lower',
      linkClass: 'general_btn',
    };
    const parentDiv = { div: workShopInfoBar, index: 2 };

    Helpers.BuildButton(parentDiv, oisLogo, steamURL, pageId, elementClasses);
  }

  // Profile menu bar
  if (profileInfoBar.length > 0) {
    const elementClasses = {
      imageClass: 'ois_profile_button',
      linkClass: 'btn_profile_action btn_medium',
    };
    const parentDiv = { div: profileInfoBar, index: 0 };

    Helpers.BuildButton(parentDiv, oisLogo, steamURL, pageId, elementClasses);
  }
}

function main(): any {
  AddOISButton('steam://openurl/', pageLocation.href);
}

document.onload = main();
