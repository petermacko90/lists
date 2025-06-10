import { Dispatch, MouseEventHandler, SetStateAction, useContext } from 'react';
import List from '../List/List';
import Button from '../Button/Button';
import './Lists.css';
import { LocaleContext, StateContext, StateDispatchContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { selectListsCount } from '../../reducers/selectors';

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
  const dispatch = useContext(StateDispatchContext);

  const listsCount = selectListsCount(state);

  function handleSelectList(id: string) {
    dispatch({ type: 'list selected', payload: id });
    scrollToCurrentList();
  }

  return (
    <div className="w-25-l w-third-m w-100">
      <button
        type="button"
        onClick={() => setShowLists(showLists ? false : true)}
        className="bg-yellow b--none pointer pv1 ml3 mv1 toggle-lists"
      >
        {showLists ? `${translation.HIDE_LISTS}` : `${translation.SHOW_LISTS}`}{' '}
        <FontAwesomeIcon icon={showLists ? faCaretUp : faCaretDown} />
      </button>
      <div className={`lists${showLists ? '' : ' dn'}`}>
        {listsCount === 0 ? (
          <div className="ml3">
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
                  onEnterList={(e) => e.key === 'Enter' && handleSelectList(list.id)}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
