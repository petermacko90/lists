import Button from '../Button/Button';
import { isEmptyString } from '../../helpers';
import { ENTER_KEY, MAX_LENGTH_ITEM } from '../../constants/constants';
import { LocaleContext, useDispatchContext } from '../../context';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemId } from '../../reducers/types';

export default function AddItem() {
  const translation = useContext(LocaleContext);

  const dispatch = useDispatchContext();

  const [newItemText, setNewItemText] = useState('');

  function handleItemAdd(text: string) {
    if (isEmptyString(text)) {
      return;
    }
    dispatch({
      type: 'item added',
      payload: {
        id: uuidv4() as ItemId,
        checked: false,
        text: text,
      },
    });
    dispatch({ type: 'list modified date updated', payload: new Date() });
    setNewItemText('');
  }

  return (
    <div className="mt3">
      <input
        type="text"
        name="item"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        onKeyUp={(e) => e.key === ENTER_KEY && handleItemAdd(newItemText)}
        placeholder={translation.ITEM_NAME}
        maxLength={MAX_LENGTH_ITEM}
        className="pa3 br3 br--left b--none shadow-4 w-75 w-two-thirds-m w-auto-l lh-title"
      />
      <Button
        onClick={() => handleItemAdd(newItemText)}
        color="green"
        classes="w-25 w-third-m w-auto-l br--right"
        disabled={isEmptyString(newItemText)}
      >
        {translation.ADD}
      </Button>
    </div>
  );
}
