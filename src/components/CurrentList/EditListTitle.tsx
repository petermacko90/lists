import { Dispatch, RefObject, SetStateAction, useContext } from 'react';
import { LocaleContext } from '../../context';
import { MAX_LENGTH_LIST } from '../../constants/constants';
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

  return (
    <div className="flex">
      <input
        type="text"
        name="title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleEditTitle(newTitle)}
        placeholder={translation.LIST_TITLE}
        className="w-100 pa3 br3 br--left b--none shadow-4"
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
