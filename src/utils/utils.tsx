type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export function debounce<F extends (...args: any[]) => any>(func: F, delay: number): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
