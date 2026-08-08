import { useEffect, useReducer, useRef, useState } from 'react';
import { getLocale } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import AddList from './components/AddList/AddList';
import AddListButton from './components/Button/AddListButton';
import { MEDIUM_SCREEN_BREAKPOINT } from './constants/constants';
import {
  Locale,
  LocaleContext,
  StateContext,
  StateDispatchContext,
} from './context';
import { initialState, reducer } from './reducers/reducer';
import { loadState, saveState } from './localStorage';
import { State } from './reducers/types';
import ToggleListsButton from './components/Button/ToggleListsButton';

export default function App() {
  const [showLists, setShowLists] = useState(true);
  const [isShowAddList, setIsShowAddList] = useState(false);
  const [locale, setLocale] = useState<Locale>(getLocale());

  const addItemRef = useRef<HTMLInputElement | null>(null);
  const addListRef = useRef<HTMLInputElement | null>(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const state: State | undefined = loadState();
    if (state !== undefined) {
      dispatch({ type: 'fetched', payload: state });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      saveState(state);
    }
  }, [state]);

  function showCurrentList() {
    if (window.innerWidth < MEDIUM_SCREEN_BREAKPOINT) {
      setShowLists(false);
    }
    setIsShowAddList(false);
  }

  function showAddList() {
    if (window.innerWidth < MEDIUM_SCREEN_BREAKPOINT) {
      setShowLists(false);
    }
    setIsShowAddList(true);
    setTimeout(() => addListRef.current?.focus());
  }

  function hideAddList() {
    if (window.innerWidth < MEDIUM_SCREEN_BREAKPOINT) {
      setShowLists(true);
    }
    setIsShowAddList(false);
  }

  return (
    <StateContext value={state}>
      <StateDispatchContext value={dispatch}>
        <LocaleContext.Provider value={locale}>
          <Navigation
            showAddList={showAddList}
            setLocale={setLocale}
            showLists={showLists}
            setShowLists={setShowLists}
          />
          <main className="flex flex-wrap">
            <Lists
              showLists={showLists}
              scrollToCurrentList={showCurrentList}
              showAddList={showAddList}
            />
            {isShowAddList ? (
              <AddList
                addItemRef={addItemRef}
                addListRef={addListRef}
                scrollToCurrentList={showCurrentList}
                hideAddList={hideAddList}
              />
            ) : (
              <CurrentList
                key={state.currentListId}
                showLists={showLists}
                addItemRef={addItemRef}
                displayLists={() => setShowLists(true)}
              />
            )}
          </main>
          <ToggleListsButton
            showLists={showLists}
            setShowLists={setShowLists}
          />
          {!isShowAddList && <AddListButton showAddList={showAddList} />}
        </LocaleContext.Provider>
      </StateDispatchContext>
    </StateContext>
  );
}
