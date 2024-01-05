declare const chrome: any;

export const settings = {
  getItem: <T>(key: string, defaultValue: T) => {
    return new Promise<T>((resolve) => {
      chrome.storage.sync.get(
        { [key]: defaultValue },
        (items: any) => resolve(items[key]),
      );
    });
  },
  getItems: <T>(defaults: T) => {
    return new Promise<T>((resolve) => {
      chrome.storage.sync.get(
        { ...defaults },
        (items: any) => resolve(items),
      );
    });
  },
  setItem: <T>(key: string, value: T) => {
    return new Promise<void>((resolve) => {
      chrome.storage.sync.set(
        { [key]: value },
        () => resolve(),
      )
    });
  },
  setItems: <T>(values: T) => {
    return new Promise<void>((resolve) => {
      chrome.storage.sync.set(
        { ...values },
        () => resolve(),
      )
    });
  }
};
