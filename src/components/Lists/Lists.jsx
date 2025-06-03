import { useContext, useEffect, useReducer } from 'react';
import List from '../List/List';
import Button from '../Button/Button';
import './Lists.css';
import { LocaleContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { initialState, reducer } from '../../reducers/reducer';
import { selectItems, selectListsCount } from '../../reducers/selectors';

export default function Lists({ showLists, setShowLists, scrollToCurrentList, showAddList }) {
  useEffect(() => {
    // fetch mocked state
    dispatch({
      type: 'fetched',
      payload: {
        lists: {
          123: {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: ['789', '987'],
          },
          456: {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['654', '321', '159'],
          },
        },
        items: {
          789: {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
          987: {
            id: '987',
            checked: false,
            text: 'Item 2',
          },
          654: {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          321: {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          159: {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: null,
      },
    });
  }, []);

  const translation = useContext(LocaleContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const listsCount = selectListsCount(state);

  function handleSelectList(id) {
    dispatch({ type: 'list selected', payload: id });
    scrollToCurrentList();
  }

  return (
    <div className="fl w-25-l w-third-m w-100">
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
          <div>
            {Object.values(state.lists).map((list) => {
              return (
                <List
                  key={list.id}
                  list={list}
                  items={selectItems(state, list.id)}
                  onClickList={() => handleSelectList(list.id)}
                  onEnterList={(e) => e.key === 'Enter' && handleSelectList(list.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
