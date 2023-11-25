import { useEffect, useState } from "react";

export function usePersistedState(key, storage = window.localStorage) {
  const [value, setValue] = useState("");

  if (!key) {
    storage.setItem(key, value);
  }

  useEffect(() => {
    storage.setItem(key, value);
  }, [value]);

  return [value, setValue, storage];
}
