export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const result = JSON.parse(localStorage.getItem(key)!);

    return result;
  }
};

export const setLocalStorage = (key: string, value: {}) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
