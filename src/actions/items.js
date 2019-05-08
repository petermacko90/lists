import {
  FETCH_ITEMS, SET_CURRENT_ITEMS, EDIT_ITEM, DELETE_ITEM, ADD_ITEM
} from '../constants/action-types';
import { loadState } from '../localStorage';

export const requestItems = () => (dispatch) => {
  const items = loadState() === undefined ? [] : loadState().items;
  dispatch({ type: FETCH_ITEMS, payload: items });
}

export const setCurrentItems = (listId) => ({
  type: SET_CURRENT_ITEMS,
  payload: listId
});

export const editItem = (list_id, id, name, checked) => ({
  type: EDIT_ITEM,
  payload: { list_id, id, name, checked }
});

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId
});

export const addItem = (listId, name) => ({
  type: ADD_ITEM,
  payload: { listId, name }
});
