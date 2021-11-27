export { };

declare global {
  interface Window {
    chrome: undefined | {
      webstore: {};
    };
  }

  const InstallTrigger: undefined | {};

  const browser: undefined | {
    extension: {
      getURL: Function;
    };
  };

  const chrome: undefined | {
    runtime: {
      getURL: Function;
    };
  };
}
