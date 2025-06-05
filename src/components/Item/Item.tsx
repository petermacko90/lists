import { useState, useContext, useRef, Dispatch, SetStateAction } from 'react';
import ItemDropdown from './ItemDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Item.css';
import { LocaleContext, StateDispatchContext } from '../../context';
import { ItemType2 } from '../../reducers/reducer';

export default function Item({
  item,
  setTextToCopy,
  setItemToEdit,
}: {
  item: ItemType2;
  setTextToCopy: (text: string) => void;
  setItemToEdit: Dispatch<SetStateAction<string>>;
}) {
  const translation = useContext(LocaleContext);

  const dispatch = useContext(StateDispatchContext);

  const [showActions, setShowActions] = useState(false);

  const timeoutRef = useRef<number | undefined>(undefined);

  function onActionsBlur() {
    timeoutRef.current = window.setTimeout(() => setShowActions(false));
  }

  function onActionsFocus() {
    window.clearTimeout(timeoutRef.current);
  }

  function handleItemCheck() {
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

  return (
    <li className={`flex justify-between relative noselect${item.checked ? ' checked' : ''}`}>
      <div
        className="flex pv3 w-100 pointer"
        tabIndex={0}
        title={item.checked ? translation.UNCHECK : translation.CHECK}
        onClick={() => handleItemCheck()}
        onKeyUp={(e) => e.key === 'Enter' && handleItemCheck()}
      >
        <span className="check tc b">{item.checked && <FontAwesomeIcon icon={faCheck} />}</span>
        <span className="item-name">{item.text}</span>
      </div>
      <div
        className="actions-dropdown hover-bg-red tc pointer"
        tabIndex={0}
        title={translation.ACTIONS}
        onBlur={onActionsBlur}
        onFocus={onActionsFocus}
        onClick={() => setShowActions(!showActions)}
        onKeyUp={(e) => e.key === 'Enter' && setShowActions(!showActions)}
      >
        <span className="f3">
          <FontAwesomeIcon icon={faEllipsisV} />
        </span>
        {showActions && (
          <ItemDropdown item={item} setTextToCopy={setTextToCopy} setItemToEdit={setItemToEdit} />
        )}
      </div>
    </li>
  );
}
