import { useReducer, useState } from 'react';
import { Provider } from 'react-redux';
import { getTranslations } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import AddList from './components/AddList/AddList';
import Footer from './components/Footer/Footer';
import FloatingButton from './components/Button/FloatingButton';
import { MEDIUM_SCREEN_BREAKPOINT } from './constants/constants';
import store from './store/store';
import { LocaleContext, LocaleConsumer, StateContext, StateDispatchContext } from './context';
import { initialState, reducer } from './reducers/reducer';

const translations = getTranslations();

export default function App() {
  const [showLists, setShowLists] = useState(true);
  const [showAddList, setShowAddList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  function showCurrentList() {
    if (window.innerWidth < MEDIUM_SCREEN_BREAKPOINT) {
      setShowLists(false);
    }
    setShowAddList(false);
  }

  return (
    <Provider store={store}>
      <StateContext value={state}>
        <StateDispatchContext value={dispatch}>
          <LocaleContext.Provider value={translations}>
            <LocaleConsumer>
              {(str) => (
                <>
                  <Navigation
                    showAddList={() => setShowAddList(true)}
                    toggleMenu={() => setShowMenu(!showMenu)}
                  />
                  <main className="cf">
                    <Lists
                      showLists={showLists}
                      setShowLists={setShowLists}
                      scrollToCurrentList={showCurrentList}
                      showAddList={() => setShowAddList(true)}
                    />
                    {showAddList ? (
                      <AddList scrollToCurrentList={showCurrentList} />
                    ) : (
                      <CurrentList showLists={() => setShowLists(true)} str={str} />
                    )}
                  </main>
                  <Footer />
                  {!showAddList && <FloatingButton showAddList={() => setShowAddList(true)}></FloatingButton>}
                </>
              )}
            </LocaleConsumer>
          </LocaleContext.Provider>
        </StateDispatchContext>
      </StateContext>
    </Provider>
  );
}
