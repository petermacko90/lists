import { selectCurrentList } from './selectors';
import { Action, State } from './types';

export const initialState: State = {
  lists: {},
  items: {},
  currentListId: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'fetched': {
      return {
        lists: action.payload.lists,
        items: action.payload.items,
        currentListId: null,
      };
    }
    case 'list selected': {
      return {
        ...state,
        currentListId: action.payload,
      };
    }
    case 'list added': {
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.id]: action.payload,
        },
        currentListId: action.payload.id,
      };
    }
    case 'list edited': {
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.id]: action.payload,
        },
      };
    }
    case 'list deleted': {
      const newItems = { ...state.items };
      selectCurrentList(state).itemsIds.forEach((itemId) => {
        delete newItems[itemId];
      });
      const { [action.payload]: deleted, ...newLists } = state.lists;
      return {
        lists: newLists,
        items: newItems,
        currentListId: null,
      };
    }
    case 'list modified date updated': {
      const currentList = { ...selectCurrentList(state) };
      currentList.modified = action.payload;
      return {
        ...state,
        lists: {
          ...state.lists,
          [currentList.id]: currentList,
        },
      };
    }
    case 'item added': {
      const currentList = { ...selectCurrentList(state) };
      return {
        ...state,
        lists: {
          ...state.lists,
          [currentList.id]: {
            ...currentList,
            itemsIds: currentList.itemsIds.concat(action.payload.id),
          },
        },
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    }
    case 'item edited': {
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    }
    case 'item deleted': {
      const currentList = { ...selectCurrentList(state) };
      currentList.itemsIds = currentList.itemsIds.filter((itemId) => itemId !== action.payload);
      const { [action.payload]: deleted, ...newItems } = state.items;
      return {
        ...state,
        lists: {
          ...state.lists,
          [currentList.id]: currentList,
        },
        items: newItems,
      };
    }
  }
}
