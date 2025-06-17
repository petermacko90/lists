import { useState, useContext, useRef, Dispatch, SetStateAction, KeyboardEvent } from 'react';
import ItemDropdown from './ItemDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Item.css';
import { LocaleContext, StateDispatchContext } from '../../context';
import { ItemId, ItemType } from '../../reducers/types';

export default function Item({
  item,
  setTextToCopy,
  setItemToEdit,
}: {
  item: ItemType;
  setTextToCopy: (text: string) => void;
  setItemToEdit: Dispatch<SetStateAction<string>>;
}) {
  const translation = useContext(LocaleContext);

  const dispatch = useContext(StateDispatchContext);

  const [showActions, setShowActions] = useState(false);

  const actionsRef = useRef<HTMLButtonElement | null>(null);

  const timeoutRef = useRef<number | undefined>(undefined);

  function onActionsBlur() {
    timeoutRef.current = window.setTimeout(() => setShowActions(false));
  }

  function onActionsFocus() {
    window.clearTimeout(timeoutRef.current);
  }

  function handleItemCheck(item: ItemType) {
    dispatch({
      type: 'item edited',
      payload: {
        id: item.id,
        text: item.text,
        checked: !item.checked,
      },
    });
    dispatch({ type: 'list modified date updated', payload: new Date() });
  }

  function handleItemDelete(itemId: ItemId) {
    if (window.confirm(translation.CONFIRM_DELETE_ITEM)) {
      dispatch({ type: 'item deleted', payload: itemId });
      dispatch({ type: 'list modified date updated', payload: new Date() });
    }
  }

  function handleItemKeyUp(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      handleItemCheck(item);
    } else if (e.key === 'Delete') {
      handleItemDelete(item.id);
    } else if (e.key === 'F2') {
      setItemToEdit(item.id);
    } else if (e.key === ' ') {
      setShowActions(!showActions);
      setTimeout(() => actionsRef.current?.focus());
    } else if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      setTextToCopy(item.text);
    }
  }

  return (
    <li className={`flex justify-between noselect${item.checked ? ' checked' : ''}`}>
      <div
        className="flex pv3 w-100 pointer"
        tabIndex={0}
        title={item.checked ? translation.UNCHECK : translation.CHECK}
        onClick={() => handleItemCheck(item)}
        onKeyUp={handleItemKeyUp}
      >
        <span className="check tc b">{item.checked && <FontAwesomeIcon icon={faCheck} />}</span>
        <span className="item-name">{item.text}</span>
      </div>
      <div className="actions-dropdown relative" onBlur={onActionsBlur} onFocus={onActionsFocus}>
        <button
          type="button"
          onClick={() => setShowActions(!showActions)}
          className="bn hover-bg-red bg-transparent f3 tc pointer"
          title={translation.ACTIONS}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {showActions && (
          <ItemDropdown
            item={item}
            setTextToCopy={setTextToCopy}
            setItemToEdit={setItemToEdit}
            onItemCheck={handleItemCheck}
            onItemDelete={handleItemDelete}
            setShowActions={setShowActions}
            actionsRef={actionsRef}
          />
        )}
      </div>
    </li>
  );
}
