import { ThrottleOptions } from "../types/throttleOptions";

export function debounce(cbFn: Function, delay: number) {
  let timerId: any;

  return (...args: any[]) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      cbFn(...args);
    }, delay);
  };
}

/* 
Note: If leading and trailing options are true, 
func is invoked on the trailing edge of the timeout only if 
the throttled function is invoked more than once during the wait timeout.

If wait is 0 and leading is false, 
func invocation is deferred until to the next tick, 
similar to setTimeout with a timeout of 0.
*/
export function throttle(
  cbFN: Function,
  delay: number,
  options?: ThrottleOptions
) {
  const leading = options?.leading !== undefined ? options.leading : true;
  const trailing = options?.trailing !== undefined ? options.trailing : true;

  let lastTime = 0;
  let stash: any[] = [];

  return (...args: any[]) => {
    const nowTime = new Date().getTime();
    const passedTime = nowTime - lastTime;

    if (passedTime >= delay) {
      // leading call
      if (leading) {
        // <-- if leading is true, first always execute
        cbFN(...args);
      } else {
        // if leading is not true, first call saves the args
        stash = [...args];
      }
      lastTime = nowTime;

      if (trailing) {
        setTimeout(() => {
          if (stash.length > 0) cbFN(stash[0]);
          stash = [];
        }, delay);
      }
    } else {
      stash = [...args];
    }
  };
}
