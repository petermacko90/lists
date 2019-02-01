import React, { Fragment } from 'react';
import Button from '../Button/Button';
import { checkEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';

const EditItem = ({ item, hide, value, onChange, onClick, onKeyPress }) => {
  return (
    <Fragment>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress(item.list_id, item.id, value, item.checked)}
        placeholder="Item name"
        className="pa3 b--none w-60 w-auto-l"
        maxLength={MAX_LENGTH_ITEM}
        autoFocus
      />
      <Button onClick={onClick(item.list_id, item.id, value, item.checked)}
      color="green" title="Save" disabled={checkEmptyString(value)}
      classes="w-20 w-auto-l">
        &#10003;
      </Button>
      <Button onClick={hide} color="red" title="Close edit"
      classes="w-20 w-auto-l">
        &times;
      </Button>
    </Fragment>
  );
}

export default EditItem;
