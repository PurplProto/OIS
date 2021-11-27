export function GetExtensionURL(resource: string): string {
  const isFirefox = typeof InstallTrigger !== "undefined";
  const isChrome = typeof !!window.chrome !== "undefined"
    || typeof !!window.chrome?.webstore !== "undefined";

  if (isFirefox) {
    return browser?.extension.getURL(resource);
  }

  if (isChrome) {
    return chrome?.runtime.getURL(resource);
  }

  throw new Error('Unsupported browser!');
};

export function BuildButton(
  parentDiv: HTMLDivElement,
  oisLogo: string,
  steamURL: string,
  pageId: string,
  elementClasses: ElClass,
) {
  let infoBar = {
    topBox: document.createElement("a"),
    topBoxContents: document.createElement("span"),
    topBoxImg: document.createElement("img"),
    topDiv: parentDiv,
  };

  infoBar.topBoxImg.className = elementClasses.imageClass;
  infoBar.topBoxImg.src = oisLogo;
  infoBar.topBox.className = elementClasses.linkClass;
  infoBar.topBox.href = steamURL + pageId;

  infoBar.topBox.classList.add("ois_link");

  infoBar.topBoxContents.appendChild(infoBar.topBoxImg);
  infoBar.topBox.appendChild(infoBar.topBoxContents);
  infoBar.topDiv.insertBefore(infoBar.topBox, infoBar.topDiv.children[ 2 ]);
};
