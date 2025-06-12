import { useEffect, useReducer, useState } from 'react';
import { getTranslations } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import AddList from './components/AddList/AddList';
import Footer from './components/Footer/Footer';
import FloatingButton from './components/Button/FloatingButton';
import { MEDIUM_SCREEN_BREAKPOINT } from './constants/constants';
import { LocaleContext, StateContext, StateDispatchContext } from './context';
import { initialState, reducer } from './reducers/reducer';
import { loadState, saveState } from './localStorage';
import { State } from './reducers/types';
import { Translations } from './constants/strings';

const initialTranslations = getTranslations();

export default function App() {
  const [showLists, setShowLists] = useState(true);
  const [showAddList, setShowAddList] = useState(false);
  const [translations, setTranslations] = useState<Translations | null>(null);

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
    setShowAddList(false);
  }

  return (
    <StateContext value={state}>
      <StateDispatchContext value={dispatch}>
        <LocaleContext.Provider value={translations ?? initialTranslations}>
          <main>
            <Navigation showAddList={() => setShowAddList(true)} setTranslations={setTranslations} />
            <div className="flex flex-wrap">
              <Lists
                showLists={showLists}
                setShowLists={setShowLists}
                scrollToCurrentList={showCurrentList}
                showAddList={() => setShowAddList(true)}
              />
              {showAddList ? (
                <AddList scrollToCurrentList={showCurrentList} />
              ) : (
                <CurrentList showLists={() => setShowLists(true)} />
              )}
            </div>
          </main>
          {!showAddList && <FloatingButton showAddList={() => setShowAddList(true)}></FloatingButton>}
          <Footer />
        </LocaleContext.Provider>
      </StateDispatchContext>
    </StateContext>
  );
}
