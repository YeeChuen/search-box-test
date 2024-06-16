import { useCallback, useEffect, useRef, useState } from "react";
import { debounce, throttle } from "../utils/utils";
import { ThrottleOptions } from "../types/throttleOptions";

export function useDebounce<T>(valueState: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>();

  const setDebounce = useCallback(debounce(setDebounceValue, delay), []);

  useEffect(() => {
    setDebounce(valueState);
  }, [valueState]);

  return debounceValue;
}

export function useThrottle<T>(
  valueState: T,
  delay: number,
  options?: ThrottleOptions
) {
  const [throttleValue, setThrottleValue] = useState<T>();

  const setThrottle = useCallback(
    throttle(setThrottleValue, delay, options),
    []
  );
  useEffect(() => {
    setThrottle(valueState);
  }, [valueState]);

  return throttleValue;
}
