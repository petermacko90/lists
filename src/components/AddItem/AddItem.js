import React from 'react';
import Button from '../Button/Button';

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
        maxLength="100"
        className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
      />
      <Button onClick={onClickAddItem(listId, newItemName)} color="green"
      classes="w-25 w-third-m w-auto-l">
        Add
      </Button>
    </div>
  );
}

export default AddItem;