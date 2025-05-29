import { useState, useContext, useRef } from 'react';
import ItemDropdown from './ItemDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Item.css';
import { LocaleContext } from '../../context';

export default function Item({
  item,
  onClickItem,
  onKeyPressItem,
  onClickDelete,
  setTextToCopy,
  setItemToEdit,
}) {
  const [showActions, setShowActions] = useState(false);

  let timeoutRef = useRef(null);

  const translation = useContext(LocaleContext);

  function onActionsBlur() {
    timeoutRef = setTimeout(() => setShowActions(false));
  }

  function onActionsFocus() {
    clearTimeout(timeoutRef);
  }

  return (
    <li className={`flex justify-between relative noselect${item.checked ? ' checked' : ''}`}>
      <div
        className="flex pv3 w-100 pointer"
        tabIndex="0"
        title={item.checked ? translation.UNCHECK : translation.CHECK}
        onClick={onClickItem(item.list_id, item.id, item.name, !item.checked)}
        onKeyUp={onKeyPressItem(item.list_id, item.id, item.name, !item.checked)}
      >
        <span className="check tc b">{item.checked && <FontAwesomeIcon icon={faCheck} />}</span>
        <span className="item-name">{item.name}</span>
      </div>
      <div
        className="actions-dropdown hover-bg-red tc pointer"
        tabIndex="0"
        title={translation.ACTIONS}
        onBlur={() => onActionsBlur()}
        onFocus={() => onActionsFocus()}
        onClick={() => setShowActions(!showActions)}
        onKeyUp={(e) => e.key === 'Enter' && setShowActions(!showActions)}
      >
        <span className="f3">
          <FontAwesomeIcon icon={faEllipsisV} />
        </span>
        {showActions && (
          <ItemDropdown
            item={item}
            onClickItem={onClickItem}
            onClickDelete={onClickDelete}
            setTextToCopy={setTextToCopy}
            setItemToEdit={setItemToEdit}
          />
        )}
      </div>
    </li>
  );
}
