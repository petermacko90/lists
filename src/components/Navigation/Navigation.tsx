import './Navigation.css';
import { LocaleContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useContext, MouseEventHandler, useState, useRef, Dispatch, SetStateAction } from 'react';
import LanguageSelction from './LanguageSelection';
import { Translations } from '../../constants/strings';

export default function Navigation({
  showAddList,
  setTranslations,
}: {
  showAddList: MouseEventHandler<HTMLButtonElement>;
  setTranslations: Dispatch<SetStateAction<Translations | null>>;
}) {
  const translation = useContext(LocaleContext);

  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  function onLanguageSelectionBlur() {
    timeoutRef.current = window.setTimeout(() => setShowLanguageSelection(false));
  }

  function onLanguageSelectionFocus() {
    window.clearTimeout(timeoutRef.current);
  }

  return (
    <nav className="flex justify-between mb2 ph1 ph4-m ph7-l bg-yellow shadow-2">
      <div>
        <img src="/lists/list64.png" height={32} width={32} alt="logo" className="ma1 v-mid" />
        <h1 className="dib f3 mv2 v-mid">Lists</h1>
      </div>
      <div className="flex ml-auto ml4-m ml7-l">
        <button
          type="button"
          onClick={showAddList}
          className="b--none bg-transparent black dim f3 b pointer add-list"
          title={translation.ADD_LIST}
          aria-label={translation.ADD_LIST}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <div className="separator bl b--black"></div>

        <div onBlur={onLanguageSelectionBlur} onFocus={onLanguageSelectionFocus} className="flex relative">
          <button
            type="button"
            onClick={() => setShowLanguageSelection(!showLanguageSelection)}
            className="b--none bg-transparent black dim f3 b pointer"
            title={translation.LANGUAGE}
            aria-label={translation.LANGUAGE}
          >
            <FontAwesomeIcon icon={faLanguage} />
          </button>
          {showLanguageSelection && (
            <LanguageSelction
              hideLanguageSelection={() => setShowLanguageSelection(false)}
              setTranslations={setTranslations}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
