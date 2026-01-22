import { Dispatch, MouseEventHandler, SetStateAction, useContext } from 'react';
import List from '../List/List';
import Button from '../Button/Button';
import './Lists.css';
import { LocaleContext, StateContext, useDispatchContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { selectListsCount } from '../../reducers/selectors';
import { ListId } from '../../reducers/types';
import { ENTER_KEY } from '../../constants/constants';

export default function Lists({
  showLists,
  setShowLists,
  scrollToCurrentList,
  showAddList,
}: {
  showLists: boolean;
  setShowLists: Dispatch<SetStateAction<boolean>>;
  scrollToCurrentList: () => void;
  showAddList: MouseEventHandler<HTMLButtonElement>;
}) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);
  const dispatch = useDispatchContext();

  const listsCount = selectListsCount(state);

  function handleSelectList(listId: ListId) {
    dispatch({ type: 'list selected', payload: listId });
    scrollToCurrentList();
  }

  return (
    <div
      className={`lists-container ${showLists ? 'w-25-l w-third-m w-100' : 'w-0'}`}
    >
      {listsCount === 0 ? (
        <div>
          <p>{translation.NO_LIST_FOUND}</p>
          <Button onClick={showAddList} color="green">
            <FontAwesomeIcon icon={faPlus} /> {translation.ADD_LIST}
          </Button>
        </div>
      ) : (
        <ul className="ma0 pa0 list">
          {Object.values(state.lists).map((list) => {
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
      )}
    </div>
  );
}
