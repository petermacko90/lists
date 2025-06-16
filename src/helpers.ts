import { strings, Translations } from './constants/strings';
import { loadLanguage } from './localStorage';

export function isEmptyString(text: string): boolean {
  if (text.trim().length === 0) {
    return true;
  }
  return false;
}

export function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: number | undefined;
  return function () {
    let context = this;
    let args = arguments;
    let later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function getTranslations(): Translations {
  const language = loadLanguage();
  if (language !== undefined) return strings[language];

  switch (window.navigator.language) {
    case 'sk':
    case 'sk-SK':
      document.documentElement.lang = 'sk';
      return strings.sk;
    default:
      return strings.en;
  }
}
