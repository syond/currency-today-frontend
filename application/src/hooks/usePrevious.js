import { useRef, useEffect } from "react";

/**
 * Get the previous value of a state, for example.
 * @param {} value
 * @returns
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
