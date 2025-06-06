import { useContext, useState } from 'react';
import Button from '../Button/Button';
import { LocaleContext, StateDispatchContext } from '../../context';
import { MAX_LENGTH_LIST } from '../../constants/constants';
import { v4 as uuidv4 } from 'uuid';

export default function AddList({ scrollToCurrentList }: { scrollToCurrentList: () => void }) {
  const translation = useContext(LocaleContext);

  const [newListTitle, setNewListTitle] = useState('');

  const dispatch = useContext(StateDispatchContext);

  function handleAddList(title: string) {
    scrollToCurrentList();
    dispatch({
      type: 'list added',
      payload: {
        id: uuidv4(),
        itemsIds: [],
        modified: new Date(),
        title: title,
      },
    });
    setNewListTitle('');
  }

  return (
    <div className="w-75-l w-two-thirds-m w-100 pa3">
      <h2>{translation.ADD_LIST}</h2>
      <input
        type="text"
        name="title"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddList(newListTitle)}
        placeholder={translation.LIST_TITLE}
        className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
        maxLength={MAX_LENGTH_LIST}
        autoFocus
      />
      <Button onClick={() => handleAddList(newListTitle)} color="green" classes="w-25 w-third-m w-auto-l">
        {translation.ADD}
      </Button>
    </div>
  );
}
