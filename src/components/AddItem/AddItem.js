import React from 'react';

const AddItem = ({
  listId, newItemName, onSetNewItemName, onClickAddItem, onKeyPressAddItem
}) => {
  return (
    <div className="mt3">
      <input
        type="text"
        value={newItemName}
        onChange={onSetNewItemName}
        onKeyPress={onKeyPressAddItem(listId, newItemName)}
        placeholder="Item name"
        className="pa3 b--none w-100 w-70-m w-auto-l"
      />
      <button type="button" onClick={onClickAddItem(listId, newItemName)}
      className="white b--none ph4 pv3 mt3 mt0-ns b pointer bg-green hover-bg-dark-green w-30-m w-auto-l">
        Add
      </button>
    </div>
  );
}

export default AddItem;