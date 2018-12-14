import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { listsReducer } from '../reducers/lists';
import { itemsReducer } from '../reducers/items';
import { addListOrItemMiddleware } from '../middleware/middleware';
import { loadState, saveState } from '../localStorage';
import { debounce } from '../helpers';

const persistedState = loadState();
const rootReducer = combineReducers({ listsReducer, itemsReducer });
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(addListOrItemMiddleware, thunkMiddleware, logger)
);

store.subscribe(
  debounce(() => {
    saveState({
      listsReducer: { lists: store.getState().listsReducer.lists },
      itemsReducer: { items: store.getState().itemsReducer.items }
    });
  }, 1000)
);

export default store;
