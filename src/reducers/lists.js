import {
  FETCH_LISTS, SET_CURRENT_LIST, SET_LIST_DATE, DELETE_LIST
} from '../constants/action-types';

const initialStateLists = {
  lists: [],
  currentList: null
};

export const listsReducer = (state = initialStateLists, action = {}) => {
  switch (action.type) {
    case FETCH_LISTS:
      return { ...state, lists: action.payload };
    case SET_CURRENT_LIST:
      return { ...state, currentList: action.payload };
    case SET_LIST_DATE:
      const lists = state.lists.map((list) => {
        if (list.id === action.payload) {
          return { ...list, ...list.modified = new Date() };
        }
        return  list;
      });
      return { ...state, lists };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
        currentList: null
      };
    default:
      return state;
  }
};
