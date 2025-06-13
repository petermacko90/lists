import Button from '../Button/Button';
import { LocaleContext, StateDispatchContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';
import { useContext, useState } from 'react';
import { ItemType } from '../../reducers/types';
import './EditItem.css';

export default function EditItem({ item, closeEdit }: { item: ItemType; closeEdit: () => void }) {
  const translation = useContext(LocaleContext);

  const dispatch = useContext(StateDispatchContext);

  const [newText, setNewText] = useState(item.text);

  function handleTextChange(text: string) {
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

  return (
    <li className="flex no-background">
      <input
        type="text"
        name="item"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleTextChange(newText)}
        placeholder={translation.ITEM_NAME}
        className="w-100 pa3 b--none"
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
