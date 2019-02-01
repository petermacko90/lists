import React from 'react';
import Button from '../Button/Button';
import { checkEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';
import { STR_ADD, STR_ITEM_NAME } from '../../constants/strings';

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
        placeholder={STR_ITEM_NAME}
        maxLength={MAX_LENGTH_ITEM}
        className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
      />
      <Button onClick={onClickAddItem(listId, newItemName)} color="green"
      classes="w-25 w-third-m w-auto-l"
      disabled={checkEmptyString(newItemName)}>
        {STR_ADD}
      </Button>
    </div>
  );
}

export default AddItem;