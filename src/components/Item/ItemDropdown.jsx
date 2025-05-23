import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck, faCopy, faEdit, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { LocaleConsumer } from '../../index';

const ItemDropdown = ({
  id, listId, name, checked, checkAction,
  onClickItem, onClickDelete, setTextToCopy, setItemToEdit
}) => {
  return (
    <LocaleConsumer>
      {str =>
        <div className="actions-content w4 shadow-3">
          <button
            type="button"
            onClick={setItemToEdit(id, name)}
            className="w-100 pointer"
            title={str.EDIT_ITEM_NAME}
          >
            <FontAwesomeIcon icon={faEdit} /> {str.EDIT}
          </button>
          <button
            type="button"
            onClick={onClickItem(listId, id, name, !checked)}
            className="w-100 pointer"
            title={checkAction}
          >
            <FontAwesomeIcon icon={faCheck} /> {checkAction}
          </button>
          <button
            type="button"
            onClick={onClickDelete(listId, id)}
            className="w-100 pointer"
            title={str.DELETE_ITEM}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> {str.DELETE}
          </button>
          <button
            type="button"
            onClick={setTextToCopy(name)}
            className="w-100 pointer"
            title={str.COPY_TO_CLIPBOARD}
          >
            <FontAwesomeIcon icon={faCopy} /> {str.COPY_NAME}
          </button>
        </div>
      }
    </LocaleConsumer>
  );
}

export default ItemDropdown;
