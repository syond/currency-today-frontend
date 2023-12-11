import { useEffect } from "react";
import { renderHook } from "@testing-library/react";
import { usePersistedState } from "@/hooks/usePersistedState";

describe("Hooks @ usePersistedState", () => {
  test("Should persist data into localStorage", () => {
    const itemKey = "dark_mode";

    renderHook(() => {
      const [value, setValue] = usePersistedState(itemKey);

      useEffect(() => {
        setValue(false);
      }, []);
    });

    const storage = window.localStorage;
    const itemValue = storage.getItem(itemKey);

    expect(itemValue).toBe("false");
  });

  test("Should change data in localStorage", () => {
    const itemKey = "dark_mode";

    renderHook(() => {
      const [value, setValue] = usePersistedState(itemKey);

      useEffect(() => {
        setValue(false);
      }, []);
    });

    // Changing value
    renderHook(() => {
      const [value, setValue, storage] = usePersistedState(itemKey);

      useEffect(() => {
        setValue(true);
      }, []);
    });

    const storage = window.localStorage;
    const itemValue = storage.getItem(itemKey);

    expect(itemValue).toBe("true");
  });

  test("Should remove data from localStorage", () => {
    const itemKey = "dark_mode";

    const { result } = renderHook(() => {
      const [value, setValue, storage] = usePersistedState(itemKey);

      useEffect(() => {
        setValue(true);
      }, []);

      return storage.removeItem(itemKey);
    });

    expect(result.current).toBeUndefined();
  });

  test.todo("Should get default value from localStorage key");

  test.todo("Should persist data using different storage");
});
