import {
  FETCH_LISTS,
  SET_CURRENT_LIST,
  EDIT_LIST,
  DELETE_LIST,
  ADD_LIST,
  SET_NEW_LIST_TITLE
} from '../constants/action-types';
import { loadState } from '../localStorage';

export const requestLists = () => (dispatch) => {
  const lists = loadState() === undefined ? [] : loadState().listsReducer.lists;
  dispatch({ type: FETCH_LISTS, payload: lists });
}

export const setCurrentList = (list) => ({
  type: SET_CURRENT_LIST,
  payload: list
});

export const editList = (id, title, modified) => ({
  type: EDIT_LIST,
  payload: { id, title, modified }
});

export const deleteList = (listId) => ({
  type: DELETE_LIST,
  payload: listId
});

export const addList = (title) => ({
  type: ADD_LIST,
  payload: { title, modified: new Date() }
});

export const setNewListTitle = (title) => ({
  type: SET_NEW_LIST_TITLE,
  payload: title
});