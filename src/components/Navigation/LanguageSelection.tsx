import { Dispatch, SetStateAction } from 'react';
import { Language, languageDropdown, strings, Translations } from '../../constants/strings';
import './LanguageSelection.css';
import { saveLanguage } from '../../localStorage';
import { ESCAPE_KEY } from '../../constants/constants';

export default function LanguageSelction({
  hideLanguageSelection,
  setTranslations,
}: {
  hideLanguageSelection: () => void;
  setTranslations: Dispatch<SetStateAction<Translations>>;
}) {
  function handleSelection(language: Language) {
    setTranslations(strings[language]);
    document.documentElement.lang = language;
    saveLanguage(language);
    hideLanguageSelection();
  }

  return (
    <menu
      onKeyUp={(e) => e.key === ESCAPE_KEY && hideLanguageSelection()}
      className="list w4 f5 ma0 pa0 shadow-3 bg-white selection"
    >
      {languageDropdown.map((language) => {
        return (
          <li key={language.value}>
            <button
              type="button"
              onClick={() => handleSelection(language.value)}
              className="w-100 pa3 bg-transparent hover-bg-light-gray tl pointer"
            >
              {language.label}
            </button>
          </li>
        );
      })}
    </menu>
  );
}
