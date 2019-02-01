import React from 'react';
import {
  STR_COPY_NAME,
  STR_COPY_TO_CLIPBOARD,
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
        {STR_EDIT}
      </button>
      <button type="button" onClick={onClickItem(listId, id, name, !checked)}
      className="w-100 pointer" title={checkAction}>
        {checkAction}
      </button>
      <button type="button" onClick={onClickDelete(listId, id)}
      className="w-100 pointer" title={STR_DELETE_ITEM}>
        {STR_DELETE_ITEM}
      </button>
      <button type="button" onClick={setTextToCopy(name)}
      className="w-100 pointer" title={STR_COPY_TO_CLIPBOARD}>
        {STR_COPY_NAME}
      </button>
    </div>
  );
}

export default ItemDropdown;
