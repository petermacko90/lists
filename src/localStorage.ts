import { Language, languages } from './constants/strings';
import { State } from './reducers/types';

export function loadState(): State | undefined {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState, (key, value) => {
      if (key === 'modified') {
        return new Date(value);
      } else {
        return value;
      }
    });
  } catch (err) {
    console.error('localStorage loadState error: ' + err);
    return undefined;
  }
}

export function saveState(state: State) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('localStorage saveState error: ' + err);
  }
}

export function loadLanguage(): Language | undefined {
  try {
    const language = localStorage.getItem(languageKey);
    if (language === null) return undefined;
    if (isLanguage(language)) {
      return language;
    }
    console.error(
      'localStorage loadLanguage() error - unknown language: ' + language,
    );
    return undefined;
  } catch (error) {
    console.error('localStorage loadLanguage() error: ' + error);
    return undefined;
  }
}

export function saveLanguage(language: Language) {
  localStorage.setItem(languageKey, language);
}

const languageKey = 'listsLanguage';

function isLanguage(input: unknown): input is Language {
  return typeof input === 'string' && languages.includes(input as any);
}
