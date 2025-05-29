import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LocaleContext } from '../../context';
import { ItemType } from '../../constants/types';
import { useContext } from 'react';

export default function ItemDropdown({
  item,
  onClickItem,
  onClickDelete,
  setTextToCopy,
  setItemToEdit,
}: {
  item: ItemType;
  onClickItem: Function;
  onClickDelete: Function;
  setTextToCopy: Function;
  setItemToEdit: Function;
}) {
  const translation = useContext(LocaleContext);

  return (
    <div className="actions-content w4 shadow-3">
      <button
        type="button"
        onClick={setItemToEdit(item.id, item.name)}
        className="w-100 pointer"
        title={translation.EDIT_ITEM_NAME}
      >
        <FontAwesomeIcon icon={faEdit} /> {translation.EDIT}
      </button>
      <button
        type="button"
        onClick={onClickItem(item.list_id, item.id, item.name, !item.checked)}
        className="w-100 pointer"
        title={item.checked ? translation.UNCHECK : translation.CHECK}
      >
        <FontAwesomeIcon icon={faCheck} /> {item.checked ? translation.UNCHECK : translation.CHECK}
      </button>
      <button
        type="button"
        onClick={onClickDelete(item.list_id, item.id)}
        className="w-100 pointer"
        title={translation.DELETE_ITEM}
      >
        <FontAwesomeIcon icon={faTrashAlt} /> {translation.DELETE}
      </button>
      <button
        type="button"
        onClick={setTextToCopy(item.name)}
        className="w-100 pointer"
        title={translation.COPY_TO_CLIPBOARD}
      >
        <FontAwesomeIcon icon={faCopy} /> {translation.COPY_NAME}
      </button>
    </div>
  );
}
