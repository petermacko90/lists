import { useContext, useEffect, useState } from 'react';
import { LocaleContext, StateContext } from '../../context';
import { selectCurrentList, selectItems } from '../../reducers/selectors';
import Item from '../Item/Item';
import EditItem from '../EditItem/EditItem';
import AddItem from '../AddItem/AddItem';

export default function Items({ copyItemText }: { copyItemText: (text: string) => void }) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);

  const [editItemId, setEditItemId] = useState('');

  useEffect(() => {
    setEditItemId('');
  }, [state.currentListId]);

  const currentList = selectCurrentList(state);
  const items = selectItems(state, currentList.id);

  return (
    <div>
      <ul className="ma0 pa0 list">
        {items.length > 0 ? (
          items.map((item) => {
            if (item.id === editItemId) {
              return <EditItem key={item.id} item={item} closeEdit={() => setEditItemId('')} />;
            } else {
              return (
                <Item key={item.id} item={item} setItemToEdit={setEditItemId} setTextToCopy={copyItemText} />
              );
            }
          })
        ) : (
          <p>{translation.NO_ITEMS}</p>
        )}
      </ul>
      <AddItem />
    </div>
  );
}
