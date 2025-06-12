import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LocaleContext } from '../../context';
import { Dispatch, RefObject, SetStateAction, useContext } from 'react';
import { ItemType } from '../../reducers/types';
import './ItemDropdown.css';

export default function ItemDropdown({
  item,
  setTextToCopy,
  setItemToEdit,
  onItemCheck,
  onItemDelete,
  setShowActions,
  actionsRef,
}: {
  item: ItemType;
  setTextToCopy: (text: string) => void;
  setItemToEdit: Dispatch<SetStateAction<string>>;
  onItemCheck: (item: ItemType) => void;
  onItemDelete: (id: string) => void;
  setShowActions: Dispatch<SetStateAction<boolean>>;
  actionsRef: RefObject<HTMLButtonElement | null>;
}) {
  const translation = useContext(LocaleContext);

  return (
    <div
      className="actions-content w4 f5 shadow-3"
      onKeyUp={(e) => e.key === 'Escape' && setShowActions(false)}
    >
      <button
        type="button"
        onClick={() => setItemToEdit(item.id)}
        className="w-100 pointer"
        title={translation.EDIT_ITEM_NAME}
        ref={actionsRef}
      >
        <FontAwesomeIcon icon={faEdit} /> {translation.EDIT}
      </button>
      <button
        type="button"
        onClick={() => onItemCheck(item)}
        className="w-100 pointer"
        title={item.checked ? translation.UNCHECK : translation.CHECK}
      >
        <FontAwesomeIcon icon={faCheck} /> {item.checked ? translation.UNCHECK : translation.CHECK}
      </button>
      <button
        type="button"
        onClick={() => onItemDelete(item.id)}
        className="w-100 pointer"
        title={translation.DELETE_ITEM}
      >
        <FontAwesomeIcon icon={faTrashAlt} /> {translation.DELETE}
      </button>
      <button
        type="button"
        onClick={() => setTextToCopy(item.text)}
        className="w-100 pointer"
        title={translation.COPY_TO_CLIPBOARD}
      >
        <FontAwesomeIcon icon={faCopy} /> {translation.COPY_NAME}
      </button>
    </div>
  );
}
