import Button from '../Button/Button';
import { LocaleContext, StateDispatchContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';
import { useContext, useState } from 'react';
import { ItemType2 } from '../../reducers/reducer';

export default function EditItem({ item, closeEdit }: { item: ItemType2; closeEdit: () => void }) {
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
    <div>
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleTextChange(newText)}
        placeholder={translation.ITEM_NAME}
        className="pa3 b--none w-60 w-auto-l"
        maxLength={MAX_LENGTH_ITEM}
        autoFocus
      />
      <Button
        onClick={() => handleTextChange(newText)}
        color="green"
        title={translation.SAVE}
        disabled={isEmptyString(newText)}
        classes="w-20 w-auto-l"
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button onClick={() => closeEdit()} color="red" title={translation.CLOSE_EDIT} classes="w-20 w-auto-l">
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
  );
}
