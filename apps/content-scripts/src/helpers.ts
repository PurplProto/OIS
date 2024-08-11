import Browser from 'webextension-polyfill';

export type InfoBarDiv = {
  topBox: HTMLAnchorElement;
  topBoxContents: HTMLSpanElement;
  topBoxImg: HTMLImageElement;
  topDiv: Element;
};

export class Helpers {
  static GetExtensionURL(resource: string): string {
    return Browser.runtime.getURL(resource);
  }

  static InsertButtonOnPage(
    linkElement: HTMLAnchorElement,
    spanElement: HTMLSpanElement,
    imgElement: HTMLImageElement,
    parentElement: Element
  ): void {
    linkElement.classList.add('ois_link');

    spanElement.appendChild(imgElement);
    linkElement.appendChild(spanElement);
    parentElement.insertBefore(linkElement, parentElement.children[2]);
  }

  static CreateInfoBarObject(
    infoBarDiv: HTMLCollectionOf<Element>,
    positionInDiv: number
  ): InfoBarDiv {
    return {
      topBox: document.createElement('a'),
      topBoxContents: document.createElement('span'),
      topBoxImg: document.createElement('img'),
      topDiv: infoBarDiv[positionInDiv],
    };
  }

  static AddInfoBarProperties(
    buttonObject: InfoBarDiv,
    logo: string,
    imgClasses: string,
    linkClasses: string,
    linkHref: string
  ): InfoBarDiv {
    const infoBar = buttonObject;

    infoBar.topBoxImg.className = imgClasses;
    infoBar.topBoxImg.src = logo;
    infoBar.topBox.className = linkClasses;
    infoBar.topBox.href = linkHref;

    return infoBar;
  }

  static BuildButton(
    parentDiv: { div: HTMLCollectionOf<Element>; index: number },
    oisLogo: string,
    steamURL: string,
    pageId: string,
    elementClasses: { imageClass: string; linkClass: string }
  ) {
    let infoBar = Helpers.CreateInfoBarObject(parentDiv.div, parentDiv.index);

    infoBar = Helpers.AddInfoBarProperties(
      infoBar,
      oisLogo,
      elementClasses.imageClass,
      elementClasses.linkClass,
      steamURL + pageId
    );

    Helpers.InsertButtonOnPage(
      infoBar.topBox,
      infoBar.topBoxContents,
      infoBar.topBoxImg,
      infoBar.topDiv
    );
  }
}
