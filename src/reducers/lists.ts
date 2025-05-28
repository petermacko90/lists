import {
  FETCH_LISTS,
  SET_CURRENT_LIST,
  EDIT_LIST,
  DELETE_LIST,
  ADD_LIST_WITH_ID,
} from '../constants/action-types';
import { ListType, ListsState } from '../constants/types';

const initialStateLists: ListsState = {
  lists: [],
  currentList: null,
};

export const listsReducer = (state = initialStateLists, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return { ...state, lists: action.payload };
    case SET_CURRENT_LIST:
      return { ...state, currentList: action.payload };
    case EDIT_LIST:
      const lists = state.lists.map((list) => {
        if (list.id === action.payload.id) {
          return { ...list, ...action.payload };
        }
        return list;
      });
      return {
        ...state,
        lists,
        currentList: { ...state.currentList, ...action.payload },
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        currentList: null,
      };
    case ADD_LIST_WITH_ID:
      const newList: ListType = {
        id: action.payload.nextId,
        title: action.payload.title,
        modified: action.payload.modified,
      };
      return {
        ...state,
        lists: state.lists.concat(newList),
        currentList: newList,
      };
    default:
      return state;
  }
};
