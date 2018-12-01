import {
  FETCH_LISTS,
  SET_CURRENT_LIST,
  SET_LIST_DATE,
  DELETE_LIST,
  ADD_LIST_WITH_ID,
  SET_NEW_LIST_TITLE
} from '../constants/action-types';

const initialStateLists = {
  lists: [],
  currentList: null,
  newListTitle: ''
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
    case ADD_LIST_WITH_ID:
      const newList = {
        id: action.payload.nextId,
        title: action.payload.title,
        modified: new Date()
      };
      return {
        ...state,
        lists: state.lists.concat(newList),
        currentList: newList,
        newListTitle: ''
      }
    case SET_NEW_LIST_TITLE:
      return { ...state, newListTitle: action.payload.title };
    default:
      return state;
  }
};
