type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export function debounce<F extends (...args: any[]) => any>(func: F, delay: number): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  return function (...args: Parameters<F>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = undefined
      func.apply(args);
    }, delay);
  };
}
