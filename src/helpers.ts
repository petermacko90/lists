import { strings, Translations } from './constants/strings';
import { loadLanguage } from './localStorage';

export function isEmptyString(text: string): boolean {
  if (text.trim().length === 0) {
    return true;
  }
  return false;
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
