import { strings } from './constants/strings';
import { Locale } from './context';
import { loadLanguage } from './localStorage';

export function isEmptyString(text: string): boolean {
  if (text.trim().length === 0) {
    return true;
  }
  return false;
}

export function getLocale(): Locale {
  const language = loadLanguage();

  if (language !== undefined) {
    return { translations: strings[language], language };
  }

  switch (window.navigator.language) {
    case 'sk':
    case 'sk-SK':
      document.documentElement.lang = 'sk';
      return { language: 'sk', translations: strings.sk };
    default:
      return { language: 'en', translations: strings.en };
  }
}
