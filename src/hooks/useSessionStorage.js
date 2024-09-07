import { useState, useEffect } from 'react';

function useSessionStorage(key, initialValue) {

  const [storageItem, setStorageItem] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setStorageValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStorageItem(valueToStore);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeStorageValue = () => {
    try {
      setStorageItem(undefined);
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = (event) => {
        if (event.key === key) {
          setStorageItem(JSON.parse(event.newValue));
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key]);

  return [storageItem, setStorageValue, removeStorageValue];
}

export default useSessionStorage;