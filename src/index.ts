import { GetExtensionURL, BuildButton } from './helpers/helpers';

// Function to add button to right of the page title,
// passing in the page type so the URL can be set correctly
function AddOISButton(steamURL: string, pageId: string) {
  // Prevent attempting to add a button on a non-supported browser
  const oisLogo: string = GetExtensionURL('../icons/ois_logo.png');
  if (!!oisLogo) {
    return;
  }

  const otherSiteInfoBar = document.getElementsByClassName('apphub_OtherSiteInfo');
  const workShopInfoBar = document.getElementsByClassName('workshopItemControlCtn');
  const profileInfoBar = document.getElementsByClassName('profile_header_actions');

  // Top menu bar
  if (otherSiteInfoBar.length > 0) {
    const elementClasses: ElClass = {
      imageClass: 'img_ois_menu_top',
      linkClass: 'ois_othersite_info_button',
    };
    const parentDiv = otherSiteInfoBar[ 0 ] as HTMLDivElement;

    BuildButton(parentDiv, oisLogo, steamURL, pageId, elementClasses);
  }

  // Lower menu bar
  if (workShopInfoBar.length > 0) {
    const elementClasses: ElClass = {
      imageClass: 'img_ois_menu_lower',
      linkClass: 'general_btn',
    };
    const parentDiv = workShopInfoBar[ 2 ] as HTMLDivElement;

    BuildButton(parentDiv, oisLogo, steamURL, pageId, elementClasses);
  }

  // Profile menu bar
  if (profileInfoBar.length > 0) {
    const elementClasses: ElClass = {
      imageClass: 'ois_profile_button',
      linkClass: 'btn_profile_action btn_medium',
    };
    const parentDiv = profileInfoBar[ 0 ] as HTMLDivElement;

    BuildButton(parentDiv, oisLogo, steamURL, pageId, elementClasses);
  }
}

document.addEventListener('onload', () => AddOISButton('steam://openurl/', window.location.href));
