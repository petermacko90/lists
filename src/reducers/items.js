import {
  FETCH_ITEMS,
  SET_CURRENT_ITEMS,
  DELETE_ITEM,
  TOGGLE_ITEM,
  ADD_ITEM,
  SET_NEW_ITEM_NAME
} from '../constants/action-types';

const initialStateItems = {
  items: [],
  currentItems: null,
  newItemName: ''
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
    case ADD_ITEM:
      const maxId = state.items.reduce((a, b) => (a.id > b.id) ? a.id : b.id);
      const newItem = {
        list_id: action.payload.listId,
        id: maxId + 1,
        name: action.payload.name,
        checked: false
      };
      return {
        ...state,
        items: state.items.concat(newItem),
        currentItems: state.currentItems.concat(newItem),
        newItemName: ''
      };
    case SET_NEW_ITEM_NAME:
      return { ...state, newItemName: action.payload };
    default:
      return state;
  }
};
