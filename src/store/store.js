import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { listsReducer } from '../reducers/lists';
import { itemsReducer } from '../reducers/items';
import { addListOrItemMiddleware } from '../middleware/middleware';

const rootReducer = combineReducers({
  listsReducer, itemsReducer
});
const store = createStore(
  rootReducer, applyMiddleware(addListOrItemMiddleware, thunkMiddleware, logger)
);

export default store;
