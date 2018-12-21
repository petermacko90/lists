import {
  FETCH_ITEMS,
  SET_CURRENT_ITEMS,
  DELETE_ITEM,
  TOGGLE_ITEM,
  ADD_ITEM_WITH_ID,
  ADD_LIST_WITH_ID,
  DELETE_LIST
} from '../constants/action-types';

const initialState = {
  items: [],
  currentItems: []
};

export const itemsReducer = (state = initialState, action = {}) => {
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
    case ADD_ITEM_WITH_ID:
      const newItem = {
        list_id: action.payload.listId,
        id: action.payload.nextId,
        name: action.payload.name,
        checked: false
      };
      return {
        ...state,
        items: state.items.concat(newItem),
        currentItems: state.currentItems.concat(newItem)
      };
    case ADD_LIST_WITH_ID:
      return { ...state, currentItems: [] };
    case DELETE_LIST:
      return {
        ...state,
        items: state.items.filter(item => {
          return item.list_id !== action.payload
        }),
        currentItems: state.currentItems.filter(item => {
          return item.list_id !== action.payload
        })
      };
    default:
      return state;
  }
};
