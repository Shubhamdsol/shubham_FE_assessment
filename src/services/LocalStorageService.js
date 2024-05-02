export const LocalStorageService = {
    getItem(key) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  };
  