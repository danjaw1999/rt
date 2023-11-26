export const setLocalStorage = <T>(name: string, value: T) => {
  localStorage?.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = <T>(name: string): T | undefined => {
  if (typeof window !== "undefined") {
    let storedValue = null;
    const item = localStorage?.getItem(name);
    if (item) {
      storedValue = JSON.parse(item!);
    }

    return storedValue;
  }
};

export const deleteLocalStorageItem = (name: string) => {
  localStorage?.removeItem(name);
};
