import { ItemId, ListId, ListType, State } from './types';

export const listId123 = '123' as ListId;
export const listId456 = '456' as ListId;

export const itemId159 = '159' as ItemId;
export const itemId321 = '321' as ItemId;
export const itemId654 = '654' as ItemId;
export const itemId777 = '777' as ItemId;
export const itemId789 = '789' as ItemId;
export const itemId987 = '987' as ItemId;

export const listType123: ListType = {
  id: listId123,
  title: 'Test',
  modified: new Date('2025-06-02T15:23:00Z'),
  itemsIds: [],
};

export const listType456: ListType = {
  id: listId456,
  title: 'Test 2',
  modified: new Date('2025-06-02T15:24:00Z'),
  itemsIds: [],
};

export const oneListWithoutItems: State = {
  lists: {
    [listId123]: listType123,
  },
  items: {},
  currentListId: null,
};

export const oneListWithOneItem: State = {
  lists: {
    [listId123]: {
      ...listType123,
      itemsIds: [itemId789],
    },
  },
  items: {
    [itemId789]: {
      id: itemId789,
      checked: false,
      text: 'Item 1',
    },
  },
  currentListId: listId123,
};

export const oneListWithTwoItems: State = {
  lists: {
    [listId123]: {
      ...listType123,
      itemsIds: [itemId789, itemId987],
    },
  },
  items: {
    [itemId789]: {
      id: itemId789,
      checked: false,
      text: 'Item 1',
    },
    [itemId987]: {
      id: itemId987,
      checked: false,
      text: 'Item 2',
    },
  },
  currentListId: null,
};

export const twoListsWithSomeItems: State = {
  lists: {
    [listId123]: {
      ...listType123,
      itemsIds: [itemId789, itemId987],
    },
    [listId456]: {
      id: listId456,
      title: 'Test 2',
      modified: new Date('2025-06-02T15:24:00Z'),
      itemsIds: [itemId654, itemId321, itemId159],
    },
  },
  items: {
    [itemId789]: {
      id: itemId789,
      checked: false,
      text: 'Item 1',
    },
    [itemId987]: {
      id: itemId987,
      checked: false,
      text: 'Item 2',
    },
    [itemId654]: {
      id: itemId654,
      checked: false,
      text: 'Item 3',
    },
    [itemId321]: {
      id: itemId321,
      checked: false,
      text: 'Item 4',
    },
    [itemId159]: {
      id: itemId159,
      checked: false,
      text: 'Item 5',
    },
  },
  currentListId: null,
};
