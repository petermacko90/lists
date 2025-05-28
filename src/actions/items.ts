import { Dispatch } from 'redux';
import { FETCH_ITEMS, SET_CURRENT_ITEMS, EDIT_ITEM, DELETE_ITEM, ADD_ITEM } from '../constants/action-types';
import { loadState } from '../localStorage';

export const requestItems = () => (dispatch: Dispatch) => {
  const items = loadState() === undefined ? [] : loadState().itemsReducer.items;
  dispatch({ type: FETCH_ITEMS, payload: items });
};

export const setCurrentItems = (listId: number) => ({
  type: SET_CURRENT_ITEMS,
  payload: listId,
});

export const editItem = (list_id: number, id: number, name: string, checked: boolean) => ({
  type: EDIT_ITEM,
  payload: { list_id, id, name, checked },
});

export const deleteItem = (itemId: number) => ({
  type: DELETE_ITEM,
  payload: itemId,
});

export const addItem = (listId: number, name: string) => ({
  type: ADD_ITEM,
  payload: { listId, name },
});
