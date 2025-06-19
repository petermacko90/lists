import { useState, useContext, useRef, Dispatch, SetStateAction, KeyboardEvent } from 'react';
import ItemDropdown from './ItemDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Item.css';
import { LocaleContext, StateDispatchContext } from '../../context';
import { ItemType } from '../../reducers/types';
import { Dialog } from '../Dialog/Dialog';

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
  const [showDialog, setShowDialog] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
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

  function showModal() {
    setShowDialog(true);
    setTimeout(() => dialogRef.current?.showModal());
  }

  function handleDialogOnClose(returnValue: string) {
    if (returnValue === 'confirm') {
      dispatch({ type: 'item deleted', payload: item.id });
      dispatch({ type: 'list modified date updated', payload: new Date() });
    }
    setShowDialog(false);
  }

  function handleItemKeyUp(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      handleItemCheck(item);
    } else if (e.key === 'Delete') {
      showModal();
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
            onItemDelete={showModal}
            setShowActions={setShowActions}
            actionsRef={actionsRef}
          />
        )}
      </div>
      {showDialog && (
        <Dialog ref={dialogRef} text={translation.CONFIRM_DELETE_ITEM} onClose={handleDialogOnClose} />
      )}
    </li>
  );
}
