import Button from '../Button/Button';
import { isEmptyString } from '../../helpers';
import { MAX_LENGTH_ITEM } from '../../constants/constants';
import { LocaleConsumer } from '../../context';

export default function AddItem({
  listId,
  newItemName,
  onSetNewItemName,
  onClickAddItem,
  onKeyPressAddItem,
}: {
  listId: number;
  newItemName: string;
  onSetNewItemName: React.ChangeEventHandler<HTMLInputElement>;
  onClickAddItem: Function;
  onKeyPressAddItem: Function;
}) {
  return (
    <LocaleConsumer>
      {(str) => (
        <div className="mt3">
          <input
            type="text"
            value={newItemName}
            onChange={onSetNewItemName}
            onKeyUp={onKeyPressAddItem(listId, newItemName)}
            placeholder={str.ITEM_NAME}
            maxLength={MAX_LENGTH_ITEM}
            className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
          />
          <Button
            onClick={onClickAddItem(listId, newItemName)}
            color="green"
            classes="w-25 w-third-m w-auto-l"
            disabled={isEmptyString(newItemName)}
          >
            {str.ADD}
          </Button>
        </div>
      )}
    </LocaleConsumer>
  );
}
