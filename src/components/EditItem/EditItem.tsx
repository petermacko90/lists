import { KeyboardEvent, useContext, useState } from 'react';
import Button from '../Button/Button';
import { LocaleContext, useDispatchContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isEmptyString } from '../../helpers';
import {
  ENTER_KEY,
  ESCAPE_KEY,
  MAX_LENGTH_ITEM,
} from '../../constants/constants';
import { ItemType } from '../../reducers/types';
import './EditItem.css';

export default function EditItem({
  item,
  closeEdit,
}: {
  item: ItemType;
  closeEdit: () => void;
}) {
  const translation = useContext(LocaleContext);

  const dispatch = useDispatchContext();

  const [newText, setNewText] = useState(item.text);

  function handleTextChange(text: string) {
    if (isEmptyString(text)) return;
    dispatch({
      type: 'item edited',
      payload: {
        id: item.id,
        checked: item.checked,
        text: text,
      },
    });
    dispatch({
      type: 'list modified date updated',
      payload: new Date(),
    });
    closeEdit();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === ENTER_KEY) {
      handleTextChange(newText);
    } else if (e.key === ESCAPE_KEY) {
      closeEdit();
    }
  }

  return (
    <li className="flex no-background">
      <input
        type="text"
        name="item"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={translation.ITEM_NAME}
        className="w-100 pa3 b--none lh-title"
        maxLength={MAX_LENGTH_ITEM}
        autoFocus
      />
      <Button
        onClick={() => handleTextChange(newText)}
        color="green"
        title={translation.SAVE}
        disabled={isEmptyString(newText)}
        classes="br--left br--right edit-button"
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button
        onClick={() => closeEdit()}
        color="red"
        title={translation.CLOSE_EDIT}
        classes="br--left br--right edit-button"
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </li>
  );
}
