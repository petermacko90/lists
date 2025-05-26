import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LocaleConsumer } from '../../index';
import { ItemType } from '../../constants/types';

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
  return (
    <LocaleConsumer>
      {(str) => (
        <div className="actions-content w4 shadow-3">
          <button
            type="button"
            onClick={setItemToEdit(item.id, item.name)}
            className="w-100 pointer"
            title={str.EDIT_ITEM_NAME}
          >
            <FontAwesomeIcon icon={faEdit} /> {str.EDIT}
          </button>
          <button
            type="button"
            onClick={onClickItem(item.list_id, item.id, item.name, !item.checked)}
            className="w-100 pointer"
            title={item.checked ? str.UNCHECK : str.CHECK}
          >
            <FontAwesomeIcon icon={faCheck} /> {item.checked ? str.UNCHECK : str.CHECK}
          </button>
          <button
            type="button"
            onClick={onClickDelete(item.list_id, item.id)}
            className="w-100 pointer"
            title={str.DELETE_ITEM}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> {str.DELETE}
          </button>
          <button
            type="button"
            onClick={setTextToCopy(item.name)}
            className="w-100 pointer"
            title={str.COPY_TO_CLIPBOARD}
          >
            <FontAwesomeIcon icon={faCopy} /> {str.COPY_NAME}
          </button>
        </div>
      )}
    </LocaleConsumer>
  );
}
