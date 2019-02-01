import React from 'react';
import Button from '../Button/Button';
import { checkEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';

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
        maxLength={MAX_LENGTH_ITEM}
        className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
      />
      <Button onClick={onClickAddItem(listId, newItemName)} color="green"
      classes="w-25 w-third-m w-auto-l"
      disabled={checkEmptyString(newItemName)}>
        Add
      </Button>
    </div>
  );
}

export default AddItem;