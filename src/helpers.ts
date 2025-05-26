export function isEmptyString(text: string): boolean {
  if (text.trim().length === 0) {
    return true;
  }
  return false;
}

export function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: NodeJS.Timeout | undefined;
  return function () {
    let context = this;
    let args = arguments;
    let later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
