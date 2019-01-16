import React from 'react';

const ItemDropdown = ({
  id, listId, name, checked, checkAction,
  onClickItem, onClickDelete, setTextToCopy, setItemToEdit
}) => {
  return (
    <div className="actions-content w4 shadow-3">
      <button type="button" onClick={setItemToEdit(id, name)}
      className="w-100 pointer" title="Edit item name">
        Edit
      </button>
      <button type="button" onClick={onClickItem(listId, id, name, !checked)}
      className="w-100 pointer" title={checkAction}>
        {checkAction}
      </button>
      <button type="button" onClick={onClickDelete(listId, id)}
      className="w-100 pointer" title="Delete item">
        Delete item
      </button>
      <button type="button" onClick={setTextToCopy(name)}
      className="w-100 pointer" title="Copy to clipboard">
        Copy name
      </button>
    </div>
  );
}

export default ItemDropdown;
