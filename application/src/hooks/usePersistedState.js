import { useEffect, useState } from "react";

export function usePersistedState(key, storage) {
  const [value, setValue] = useState('');

  if (typeof window === "undefined") {
    /* we're on the server */
  } else storage = window.localStorage;

  useEffect(() => {
    const item = storage.getItem(key);
    if (item) setValue(parse(item));
  }, []);

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue, storage];
}

/**
 * @todo Should be moved to a utils file
 * @param {*} value 
 * @returns 
 */
const parse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
