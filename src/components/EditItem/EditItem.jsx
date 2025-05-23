import { Fragment } from 'react';
import Button from '../Button/Button';
import { LocaleConsumer } from '../../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';

export default function EditItem({ item, hide, value, onChange, onClick, onKeyPress }) {
  return (
    <LocaleConsumer>
      {(str) => (
        <Fragment>
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress(item.list_id, item.id, value, item.checked)}
            placeholder={str.ITEM_NAME}
            className="pa3 b--none w-60 w-auto-l"
            maxLength={MAX_LENGTH_ITEM}
            autoFocus
          />
          <Button
            onClick={onClick(item.list_id, item.id, value, item.checked)}
            color="green"
            title={str.SAVE}
            disabled={isEmptyString(value)}
            classes="w-20 w-auto-l"
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button onClick={hide} color="red" title={str.CLOSE_EDIT} classes="w-20 w-auto-l">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Fragment>
      )}
    </LocaleConsumer>
  );
}
