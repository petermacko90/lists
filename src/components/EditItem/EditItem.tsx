import Button from '../Button/Button';
import { LocaleConsumer } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';
import { ItemType } from '../../constants/types';

export default function EditItem({
  item,
  onCloseEdit,
  value,
  onChange,
  onClick,
  onKeyPress,
}: {
  item: ItemType;
  onCloseEdit: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: Function;
  onKeyPress: Function;
}) {
  return (
    <LocaleConsumer>
      {(str) => (
        <div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyUp={onKeyPress(item.list_id, item.id, value, item.checked)}
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
          <Button onClick={onCloseEdit} color="red" title={str.CLOSE_EDIT} classes="w-20 w-auto-l">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      )}
    </LocaleConsumer>
  );
}
