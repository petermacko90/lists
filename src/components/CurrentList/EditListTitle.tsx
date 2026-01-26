import {
  Dispatch,
  KeyboardEvent,
  RefObject,
  SetStateAction,
  useContext,
} from 'react';
import { LocaleContext } from '../../context';
import {
  ENTER_KEY,
  ESCAPE_KEY,
  MAX_LENGTH_LIST,
} from '../../constants/constants';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export function EditListTitle({
  newTitle,
  setNewTitle,
  handleEditTitle,
  hideEditTitle,
  editTitleRef,
}: {
  newTitle: string;
  setNewTitle: Dispatch<SetStateAction<string>>;
  handleEditTitle: (title: string) => void;
  hideEditTitle: () => void;
  editTitleRef: RefObject<HTMLInputElement | null>;
}) {
  const translation = useContext(LocaleContext);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === ENTER_KEY) {
      handleEditTitle(newTitle);
    } else if (e.key === ESCAPE_KEY) {
      hideEditTitle();
    }
  }

  return (
    <div className="flex">
      <input
        type="text"
        name="title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={translation.LIST_TITLE}
        className="w-100 pa3 br3 br--left b--none shadow-4 lh-title"
        maxLength={MAX_LENGTH_LIST}
        ref={editTitleRef}
      />
      <Button
        onClick={() => handleEditTitle(newTitle)}
        color="green"
        title={translation.SAVE}
        classes="br--left br--right edit-button"
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button
        onClick={hideEditTitle}
        color="red"
        title={translation.CLOSE_EDIT}
        classes="br--right edit-button"
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
  );
}
