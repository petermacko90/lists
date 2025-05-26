import { Dispatch } from 'redux';
import { FETCH_LISTS, SET_CURRENT_LIST, EDIT_LIST, DELETE_LIST, ADD_LIST } from '../constants/action-types';
import { List } from '../constants/types';
import { loadState } from '../localStorage';

export const requestLists = () => (dispatch: Dispatch) => {
  const lists = loadState() === undefined ? [] : loadState().listsReducer.lists;
  dispatch({ type: FETCH_LISTS, payload: lists });
};

export const setCurrentList = (list: List) => ({
  type: SET_CURRENT_LIST,
  payload: list,
});

export const editList = (id: number, title: string, modified: Date) => ({
  type: EDIT_LIST,
  payload: { id, title, modified },
});

export const deleteList = (listId: number) => ({
  type: DELETE_LIST,
  payload: listId,
});

export const addList = (title: string) => ({
  type: ADD_LIST,
  payload: { title, modified: new Date() },
});
