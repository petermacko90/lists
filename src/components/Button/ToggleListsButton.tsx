import { Dispatch, SetStateAction, useContext } from 'react';
import { LocaleContext, StateContext } from '../../context';
import { selectListsCount } from '../../reducers/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import './ToggleListsButton.css';

export default function ToggleListsButton({
  showLists,
  setShowLists,
}: {
  showLists: boolean;
  setShowLists: Dispatch<SetStateAction<boolean>>;
}) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);
  const listsCount = selectListsCount(state);

  if (listsCount === 0 || state.currentListId === null) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => setShowLists(!showLists)}
      title={translation.TOGGLE_LISTS}
      className="w3 h3 bn fixed left-0 bottom-1 z-1 bg-blue hover-bg-dark-blue white pointer shadow-3 toggle-lists"
    >
      <FontAwesomeIcon icon={faList} />
    </button>
  );
}
