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
        placeholder="Add item"
        className="pa3 b--none"
      />
      <button type="button" onClick={onClickAddItem(listId, newItemName)}
      className="white b--none ph4 pv3 b pointer bg-green hover-bg-dark-green">
        Add
      </button>
    </div>
  );
}

export default AddItem;