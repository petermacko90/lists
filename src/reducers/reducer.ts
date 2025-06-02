export type ListType2 = {
  id: string;
  title: string;
  modified: Date;
  itemsIds: string[];
};

type ListsRecord = Record<string, ListType2>;

type ItemType2 = {
  id: string;
  text: string;
  checked: boolean;
};

type ItemsRecord = Record<string, ItemType2>;

export type State = {
  lists: ListsRecord;
  items: ItemsRecord;
  currentListId: string | null;
};

export const initialState: State = {
  lists: {},
  items: {},
  currentListId: null,
};

export type Action =
  | { type: 'fetched'; payload: State }
  | { type: 'list selected'; payload: string }
  | { type: 'list added'; payload: ListType2 }
  | { type: 'list edited'; payload: ListType2 }
  | { type: 'list deleted'; payload: string }
  | { type: 'list modified date updated'; payload: Date }
  | { type: 'item added'; payload: ItemType2 }
  | { type: 'item edited'; payload: ItemType2 }
  | { type: 'item deleted'; payload: string };

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
      currentList.itemsIds.push(action.payload.id);
      return {
        ...state,
        lists: {
          ...state.lists,
          [currentList.id]: currentList,
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

export function selectCurrentList(state: State) {
  return state.lists[state.currentListId!];
}

export function selectItems(state: State) {
  const items: ItemType2[] = [];
  selectCurrentList(state).itemsIds.forEach((itemId) => {
    items.push(state.items[itemId]);
  });
  return items;
}
