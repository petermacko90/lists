import './List.css';
import { LocaleContext, StateContext } from '../../context';
import { KeyboardEventHandler, MouseEventHandler, useContext } from 'react';
import { ListType } from '../../reducers/types';
import { selectFirstFewItems } from '../../reducers/selectors';

export default function List({
  list,
  onClickList,
  onEnterList,
}: {
  list: ListType;
  onClickList: MouseEventHandler<HTMLLIElement>;
  onEnterList: KeyboardEventHandler<HTMLLIElement>;
}) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);
  const firstFewItems = selectFirstFewItems(state, list.id);

  return (
    <li
      className="pa2 ma3 bg-yellow pointer shadow-3 noselect list-menu"
      tabIndex={0}
      onClick={onClickList}
      onKeyUp={onEnterList}
    >
      <h2 className="f3-l f4-m f5 truncate">{list.title.length === 0 ? translation.NO_TITLE : list.title}</h2>
      <p>{list.modified.toLocaleDateString()}</p>
      <p className="truncate pb1">{firstFewItems}</p>
    </li>
  );
}
