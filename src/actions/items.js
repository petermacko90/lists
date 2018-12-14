import {
  FETCH_ITEMS,
  SET_CURRENT_ITEMS,
  DELETE_ITEM,
  TOGGLE_ITEM,
  ADD_ITEM,
  SET_NEW_ITEM_NAME
} from '../constants/action-types';
import { loadState } from '../localStorage';

export const requestItems = () => (dispatch) => {
  const items = loadState() === undefined ? [] : loadState().itemsReducer.items;
  dispatch({ type: FETCH_ITEMS, payload: items });
}

export const setCurrentItems = (listId) => ({
  type: SET_CURRENT_ITEMS,
  payload: listId
});

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId
});

export const toggleItem = (itemId, checked) => ({
  type: TOGGLE_ITEM,
  payload: { itemId, checked }
});

export const addItem = (listId, name) => ({
  type: ADD_ITEM,
  payload: { listId, name }
});

export const setNewItemName = (text) => ({
  type: SET_NEW_ITEM_NAME,
  payload: text
});
