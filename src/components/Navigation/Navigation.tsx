import './Navigation.css';
import { LocaleContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLanguage, faList } from '@fortawesome/free-solid-svg-icons';
import {
  useContext,
  MouseEventHandler,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import LanguageSelection from './LanguageSelection';
import { Translations } from '../../constants/strings';

export default function Navigation({
  showAddList,
  setTranslations,
  showLists,
  setShowLists,
}: {
  showAddList: MouseEventHandler<HTMLButtonElement>;
  setTranslations: Dispatch<SetStateAction<Translations>>;
  showLists: boolean;
  setShowLists: Dispatch<SetStateAction<boolean>>;
}) {
  const translation = useContext(LocaleContext);

  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  function onLanguageSelectionBlur() {
    timeoutRef.current = window.setTimeout(() =>
      setShowLanguageSelection(false)
    );
  }

  function onLanguageSelectionFocus() {
    window.clearTimeout(timeoutRef.current);
  }

  return (
    <nav className="flex justify-between ph1 ph2-m ph3-l bg-yellow shadow-2">
      <div>
        <button
          type="button"
          onClick={() => setShowLists(!showLists)}
          className="b--none bg-transparent black f3 b pointer"
          title={translation.TOGGLE_LISTS}
          aria-label={translation.TOGGLE_LISTS}
        >
          <FontAwesomeIcon icon={faList} />
        </button>
        <h1 className="dib f3 mv2">Lists</h1>
      </div>
      <div className="flex ml-auto ml4-m ml7-l">
        <button
          type="button"
          onClick={showAddList}
          className="b--none bg-transparent black f3 b pointer"
          title={translation.ADD_LIST}
          aria-label={translation.ADD_LIST}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <div className="separator bl b--black"></div>

        <div
          onBlur={onLanguageSelectionBlur}
          onFocus={onLanguageSelectionFocus}
          className="flex relative"
        >
          <button
            type="button"
            onClick={() => setShowLanguageSelection(!showLanguageSelection)}
            className="b--none bg-transparent black f3 b pointer"
            title={translation.LANGUAGE}
            aria-label={translation.LANGUAGE}
          >
            <FontAwesomeIcon icon={faLanguage} />
          </button>
          {showLanguageSelection && (
            <LanguageSelection
              hideLanguageSelection={() => setShowLanguageSelection(false)}
              setTranslations={setTranslations}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
