import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { listsReducer, setCurrentList } from '../reducers/lists';
import { itemsReducer } from '../reducers/items';

const rootReducer = combineReducers({
  listsReducer, setCurrentList, itemsReducer
});
const store = createStore(
  rootReducer, applyMiddleware(thunkMiddleware, logger)
);

export default store;
