import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { debounce, getTranslations } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import AddList from './components/AddList/AddList';
import Footer from './components/Footer/Footer';
import FloatingButton from './components/Button/FloatingButton';
import { MEDIUM_SCREEN_BREAKPOINT } from './constants/constants';
import store from './store/store';
import { LocaleContext, LocaleConsumer } from './context';

const translations = getTranslations();

export default function App() {
  const [showLists, setShowLists] = useState(true);
  const [showAddList, setShowAddList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function showCurrentList() {
    if (window.innerWidth < MEDIUM_SCREEN_BREAKPOINT) {
      setShowLists(false);
    }
    setShowAddList(false);
  }

  return (
    <Provider store={store}>
      <LocaleContext.Provider value={translations}>
        <LocaleConsumer>
          {(str) => (
            <>
              <Navigation
                showAddList={() => setShowAddList(true)}
                toggleMenu={() => setShowMenu(!showMenu)}
              />
              <main>
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
    </Provider>
  );
}
