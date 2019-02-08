import React, { Fragment } from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';
import { STR_CLOSE_EDIT, STR_ITEM_NAME, STR_SAVE } from '../../constants/strings';

const EditItem = ({ item, hide, value, onChange, onClick, onKeyPress }) => {
  return (
    <Fragment>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress(item.list_id, item.id, value, item.checked)}
        placeholder={STR_ITEM_NAME}
        className="pa3 b--none w-60 w-auto-l"
        maxLength={MAX_LENGTH_ITEM}
        autoFocus
      />
      <Button onClick={onClick(item.list_id, item.id, value, item.checked)}
      color="green" title={STR_SAVE} disabled={checkEmptyString(value)}
      classes="w-20 w-auto-l">
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button onClick={hide} color="red" title={STR_CLOSE_EDIT}
      classes="w-20 w-auto-l">
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </Fragment>
  );
}

export default EditItem;
