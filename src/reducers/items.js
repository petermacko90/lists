import {
  FETCH_ITEMS, SET_CURRENT_ITEMS, DELETE_ITEM, TOGGLE_ITEM
} from '../constants/action-types';

const initialStateItems = {
  items: [],
  currentItems: null
};

export const itemsReducer = (state = initialStateItems, action = {}) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload };
    case SET_CURRENT_ITEMS:
      return {
        ...state,
        currentItems: state.items.filter(item => {
          return item.list_id === action.payload;
        })
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        currentItems: state.currentItems.filter(item => {
          return item.id !== action.payload;
        })
      };
    case TOGGLE_ITEM:
      const items = state.items.map((item) => {
        if (item.id !== action.payload.itemId) {
          return item;
        }
        return { ...item, ...item.checked = !action.payload.checked };
      });
      const currentItems = state.currentItems.map((item) => {
        if (item.id !== action.payload.itemId) {
          return item;
        }
        return { ...item, ...item.checked = !action.payload.checked };
      });
      return { ...state, currentItems, items };
    default:
      return state;
  }
};
