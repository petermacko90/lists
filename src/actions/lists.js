import {
  FETCH_LISTS, SET_CURRENT_LIST, SET_LIST_DATE, DELETE_LIST
} from '../constants/action-types';

export const requestLists = () => (dispatch) => {
  const lists = [
    {
      id: 1,
      title: 'Food',
      modified: new Date('2018-08-20')
    },
    {
      id: 2,
      title: 'Presents',
      modified: new Date('2017-12-01')
    },
    {
      id: 3,
      title: 'Other',
      modified: new Date('2018-11-02')
    }
  ];

  dispatch({ type: FETCH_LISTS, payload: lists });
}

export const setCurrentList = (list) => ({
  type: SET_CURRENT_LIST,
  payload: list
});

export const setListDate = (listId) => ({
  type: SET_LIST_DATE,
  payload: listId
});

export const deleteList = (listId) => ({
  type: DELETE_LIST,
  payload: listId
});
