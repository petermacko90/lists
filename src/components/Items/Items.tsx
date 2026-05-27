import { RefObject, useContext, useState } from 'react';
import { LocaleContext, StateContext } from '../../context';
import { selectCurrentList, selectItems } from '../../reducers/selectors';
import Item from '../Item/Item';
import EditItem from '../EditItem/EditItem';
import AddItem from '../AddItem/AddItem';

export default function Items({
  copyItemText,
  addItemRef,
}: {
  copyItemText: (text: string) => void;
  addItemRef: RefObject<HTMLInputElement | null>;
}) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);

  const [editItemId, setEditItemId] = useState('');

  const currentList = selectCurrentList(state);
  const items = selectItems(state, currentList.id);

  return (
    <>
      {items.length > 0 ? (
        <ul className="ma0 pa0 list shadow-3 items">
          {items.map((item) => {
            if (item.id === editItemId) {
              return (
                <EditItem
                  key={item.id}
                  item={item}
                  closeEdit={() => setEditItemId('')}
                />
              );
            } else {
              return (
                <Item
                  key={item.id}
                  item={item}
                  setItemToEdit={setEditItemId}
                  setTextToCopy={copyItemText}
                />
              );
            }
          })}
        </ul>
      ) : (
        <p>{translation.NO_ITEMS}</p>
      )}
      <AddItem addItemRef={addItemRef} />
    </>
  );
}
