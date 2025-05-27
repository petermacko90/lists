import './List.css';
import { LocaleConsumer } from '../../App';
import { ListType, ItemType } from '../../constants/types';

export default function List({
  list,
  items,
  onClickList,
  onEnterList,
}: {
  list: ListType;
  items: ItemType[];
  onClickList: Function;
  onEnterList: Function;
}) {
  const numItemsToShow = 5;
  let itemsSlice = '';
  items.slice(0, numItemsToShow).forEach((item, i) => {
    itemsSlice += `${i === 0 ? '' : ', '}${item.name}`;
  });
  if (items.length > numItemsToShow) {
    itemsSlice += ', ...';
  }

  return (
    <LocaleConsumer>
      {(str) => (
        <div
          className="pa2 ma3 bg-yellow pointer shadow-3 noselect list-menu"
          tabIndex={0}
          onClick={onClickList(list, list.id)}
          onKeyUp={onEnterList(list, list.id)}
        >
          <h3 className="f3-l f4-m f5 truncate">{list.title.length === 0 ? str.NO_TITLE : list.title}</h3>
          <p>{list.modified.toLocaleDateString()}</p>
          <p className="truncate pb1">{itemsSlice}</p>
        </div>
      )}
    </LocaleConsumer>
  );
}
