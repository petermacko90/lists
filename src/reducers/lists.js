import {
  FETCH_LISTS, SET_CURRENT_LIST, SET_LIST_DATE
} from '../constants/action-types';

const initialStateLists = {
  lists: []
};

export const listsReducer = (state = initialStateLists, action = {}) => {
  switch (action.type) {
    case FETCH_LISTS:
      return { ...state, lists: action.payload };
    case SET_LIST_DATE:
      const lists = state.lists.map((list) => {
        if (list.id === action.payload) {
          return { ...list, ...list.modified = new Date() };
        }
        return  list;
      });
      return { ...state, lists };
    default:
      return state;
  }
};

const initialStateCurrentList = {
  currentList: null
}

export const setCurrentList = (
  state = initialStateCurrentList, action = {}
) => {
  switch (action.type) {
    case SET_CURRENT_LIST:
      return { ...state, currentList: action.payload };
    default:
      return state;
  }
};
