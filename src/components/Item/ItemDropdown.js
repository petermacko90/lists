import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  STR_COPY_NAME,
  STR_COPY_TO_CLIPBOARD,
  STR_DELETE,
  STR_DELETE_ITEM,
  STR_EDIT,
  STR_EDIT_ITEM_NAME
} from '../../constants/strings';

const ItemDropdown = ({
  id, listId, name, checked, checkAction,
  onClickItem, onClickDelete, setTextToCopy, setItemToEdit
}) => {
  return (
    <div className="actions-content w4 shadow-3">
      <button type="button" onClick={setItemToEdit(id, name)}
      className="w-100 pointer" title={STR_EDIT_ITEM_NAME}>
        <FontAwesomeIcon icon={faEdit} /> {STR_EDIT}
      </button>
      <button type="button" onClick={onClickItem(listId, id, name, !checked)}
      className="w-100 pointer" title={checkAction}>
        <FontAwesomeIcon icon={faCheck} /> {checkAction}
      </button>
      <button type="button" onClick={onClickDelete(listId, id)}
      className="w-100 pointer" title={STR_DELETE_ITEM}>
        <FontAwesomeIcon icon={faTrashAlt} /> {STR_DELETE}
      </button>
      <button type="button" onClick={setTextToCopy(name)}
      className="w-100 pointer" title={STR_COPY_TO_CLIPBOARD}>
        <FontAwesomeIcon icon={faCopy} /> {STR_COPY_NAME}
      </button>
    </div>
  );
}

export default ItemDropdown;
