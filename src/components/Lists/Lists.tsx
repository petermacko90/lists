import { MouseEventHandler, useContext, useState } from 'react';
import List from '../List/List';
import Button from '../Button/Button';
import './Lists.css';
import { LocaleContext, StateContext, useDispatchContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { selectListsCount } from '../../reducers/selectors';
import { ListId, ListType } from '../../reducers/types';
import { ENTER_KEY } from '../../constants/constants';
import SortSelect, { SortValue } from '../SortSelect/SortSelect';

export default function Lists({
  showLists,
  scrollToCurrentList,
  showAddList,
}: {
  showLists: boolean;
  scrollToCurrentList: () => void;
  showAddList: MouseEventHandler<HTMLButtonElement>;
}) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);
  const dispatch = useDispatchContext();

  const listsCount = selectListsCount(state);

  const [sortValue, setSortValue] = useState<SortValue>('dateDesc');
  const sortedLists = sortLists(sortValue);

  function handleSelectList(listId: ListId) {
    dispatch({ type: 'list selected', payload: listId });
    scrollToCurrentList();
  }

  function sortLists(value: SortValue): ListType[] {
    switch (value) {
      case 'dateAsc':
        return Object.values(state.lists).toSorted(
          (a, b) => a.modified.getTime() - b.modified.getTime(),
        );
      case 'dateDesc':
        return Object.values(state.lists).toSorted(
          (a, b) => b.modified.getTime() - a.modified.getTime(),
        );
      case 'titleAsc':
        return Object.values(state.lists).toSorted((a, b) =>
          a.title.localeCompare(b.title),
        );
      case 'titleDesc':
        return Object.values(state.lists).toSorted((a, b) =>
          b.title.localeCompare(a.title),
        );
    }
  }

  return (
    <div
      className={`lists-container pa3 ${showLists ? 'w-100 w-third-m w-25-l' : 'dn'}`}
    >
      {listsCount === 0 ? (
        <>
          <p>{translation.NO_LIST_FOUND}</p>
          <Button onClick={showAddList} color="green">
            <FontAwesomeIcon icon={faPlus} /> {translation.ADD_LIST}
          </Button>
        </>
      ) : (
        <>
          <div className="dn db-m mb3">
            <SortSelect value={sortValue} setValue={setSortValue} />
          </div>
          <ul className="ma0 pa0 list">
            {sortedLists.map((list) => {
              return (
                <List
                  key={list.id}
                  list={list}
                  onClickList={() => handleSelectList(list.id)}
                  onEnterList={(e) =>
                    e.key === ENTER_KEY && handleSelectList(list.id)
                  }
                />
              );
            })}
          </ul>
          <div className="flex justify-center dn-m">
            <SortSelect value={sortValue} setValue={setSortValue} />
          </div>
        </>
      )}
    </div>
  );
}
