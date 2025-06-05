import './List.css';
import { LocaleContext } from '../../context';
import { KeyboardEventHandler, MouseEventHandler, useContext } from 'react';
import { ItemType, ListType } from '../../reducers/reducer';

export default function List({
  list,
  items,
  onClickList,
  onEnterList,
}: {
  list: ListType;
  items: ItemType[];
  onClickList: MouseEventHandler<HTMLDivElement>;
  onEnterList: KeyboardEventHandler<HTMLDivElement>;
}) {
  const numItemsToShow = 5;
  let itemsSlice = '';
  items.slice(0, numItemsToShow).forEach((item, i) => {
    itemsSlice += `${i === 0 ? '' : ', '}${item.text}`;
  });
  if (items.length > numItemsToShow) {
    itemsSlice += ', ...';
  }

  const translation = useContext(LocaleContext);

  return (
    <div
      className="pa2 ma3 bg-yellow pointer shadow-3 noselect list-menu"
      tabIndex={0}
      onClick={onClickList}
      onKeyUp={onEnterList}
    >
      <h3 className="f3-l f4-m f5 truncate">{list.title.length === 0 ? translation.NO_TITLE : list.title}</h3>
      <p>{list.modified.toLocaleDateString()}</p>
      <p className="truncate pb1">{itemsSlice}</p>
    </div>
  );
}
