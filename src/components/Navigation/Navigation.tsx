import './Navigation.css';
import { LocaleContext, StateContext } from '../../context';
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
import { selectListsCount } from '../../reducers/selectors';

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

  const state = useContext(StateContext);
  const listsCount = selectListsCount(state);

  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  function onLanguageSelectionBlur() {
    timeoutRef.current = window.setTimeout(() => {
      setShowLanguageSelection(false);
    });
  }

  function onLanguageSelectionFocus() {
    window.clearTimeout(timeoutRef.current);
  }

  function toggleLists() {
    if (listsCount === 0 || state.currentListId === null) {
      return;
    }

    setShowLists(!showLists);
  }

  return (
    <nav className="flex justify-between ph1 bg-yellow shadow-2">
      <div>
        <button
          type="button"
          onClick={toggleLists}
          className="b--none bg-transparent black f3 b pointer"
          title={translation.TOGGLE_LISTS}
          aria-label={translation.TOGGLE_LISTS}
        >
          <FontAwesomeIcon icon={faList} />
        </button>
        <h1 className="dib f3 mv2">Lists</h1>
      </div>
      <div className="flex ml-auto ml4-m ml6-l">
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
