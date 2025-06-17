import {
  itemId159,
  itemId777,
  itemId789,
  listId123,
  listId456,
  listType123,
  listType456,
  oneListWithOneItem,
  oneListWithoutItems,
  oneListWithTwoItems,
  twoListsWithSomeItems,
} from './mocks';
import { initialState, reducer } from './reducer';
import { Action } from './types';
import { ItemType, ListType, State } from './types';
import { describe, expect, it } from 'vitest';

describe('reducer', () => {
  describe('fetched', () => {
    it('should fetch empty state', () => {
      const state: State = initialState;

      const payload: State = {
        lists: {},
        items: {},
        currentListId: null,
      };

      const action: Action = { type: 'fetched', payload: payload };

      const expected: State = {
        lists: {},
        items: {},
        currentListId: null,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should fetch one list with zero items', () => {
      const state: State = initialState;

      const payload: State = oneListWithoutItems;

      const action: Action = { type: 'fetched', payload: payload };

      const expected: State = oneListWithoutItems;

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should fetch two lists with some items', () => {
      const state: State = initialState;

      const payload: State = twoListsWithSomeItems;

      const action: Action = { type: 'fetched', payload: payload };

      const expected: State = twoListsWithSomeItems;

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list selected', () => {
    it('should select a list when none was selected previously', () => {
      const state: State = twoListsWithSomeItems;

      const action: Action = { type: 'list selected', payload: listId123 };

      const expected: State = {
        ...twoListsWithSomeItems,
        currentListId: listId123,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should select a list when there was a previously selected one', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId123,
      };

      const action: Action = { type: 'list selected', payload: listId456 };

      const expected: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list added', () => {
    it('should add a list to empty state', () => {
      const state: State = initialState;

      const payload: ListType = listType123;

      const action: Action = { type: 'list added', payload: payload };

      const expected: State = {
        ...oneListWithoutItems,
        currentListId: listId123,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should add a list to non-empty state', () => {
      const state: State = oneListWithOneItem;

      const payload: ListType = listType456;

      const action: Action = { type: 'list added', payload: payload };

      const expected: State = {
        ...oneListWithOneItem,
        lists: {
          ...oneListWithOneItem.lists,
          [listId456]: listType456,
        },
        currentListId: listId456,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list edited', () => {
    it('should update list title and modified date', () => {
      const state: State = oneListWithOneItem;

      const payload: ListType = {
        id: listId123,
        title: 'Testing',
        modified: new Date('2025-06-02T15:25:00Z'),
        itemsIds: [itemId789],
      };

      const action: Action = { type: 'list edited', payload: payload };

      const expected: State = {
        ...oneListWithOneItem,
        lists: {
          [listId123]: payload,
        },
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list deleted', () => {
    it('should delete a list when there is only one list in state', () => {
      const state: State = oneListWithOneItem;

      const action: Action = { type: 'list deleted', payload: listId123 };

      const expected: State = {
        lists: {},
        items: {},
        currentListId: null,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should delete a list when there are multiple lists in state', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const action: Action = { type: 'list deleted', payload: listId456 };

      const expected: State = oneListWithTwoItems;

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list modified date updated', () => {
    it('should update modified date', () => {
      const state: State = oneListWithOneItem;

      const action: Action = {
        type: 'list modified date updated',
        payload: new Date('2025-06-02T15:26:00Z'),
      };

      const expected: State = {
        ...oneListWithOneItem,
        lists: {
          ...oneListWithOneItem.lists,
          [listId123]: {
            ...oneListWithOneItem.lists[listId123],
            modified: new Date('2025-06-02T15:26:00Z'),
          },
        },
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('item added', () => {
    it('should add an item to a list without items', () => {
      const state: State = {
        ...oneListWithoutItems,
        currentListId: listId123,
      };

      const payload: ItemType = {
        id: itemId789,
        text: 'Item',
        checked: false,
      };

      const action: Action = { type: 'item added', payload: payload };

      const expected: State = {
        ...oneListWithoutItems,
        lists: {
          ...oneListWithoutItems.lists,
          [listId123]: {
            ...oneListWithoutItems.lists[listId123],
            itemsIds: [itemId789],
          },
        },
        currentListId: listId123,
        items: {
          [itemId789]: payload,
        },
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should add an item to a list with items', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const payload: ItemType = {
        id: itemId777,
        text: 'Test',
        checked: false,
      };

      const action: Action = { type: 'item added', payload: payload };

      const expected: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
        lists: {
          ...twoListsWithSomeItems.lists,
          [listId456]: {
            ...twoListsWithSomeItems.lists[listId456],
            itemsIds: [...twoListsWithSomeItems.lists[listId456].itemsIds, itemId777],
          },
        },
        items: {
          ...twoListsWithSomeItems.items,
          [itemId777]: payload,
        },
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('item edited', () => {
    it('should check an item', () => {
      const state: State = oneListWithOneItem;

      const payload: ItemType = {
        id: itemId789,
        text: 'Item 1',
        checked: true,
      };

      const action: Action = { type: 'item edited', payload: payload };

      const expected: State = {
        ...oneListWithOneItem,
        items: {
          ...oneListWithOneItem.items,
          [itemId789]: {
            ...oneListWithOneItem.items[itemId789],
            checked: true,
          },
        },
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should update item text', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const payload: ItemType = {
        id: itemId159,
        checked: false,
        text: 'Testing',
      };

      const action: Action = { type: 'item edited', payload: payload };

      const expected: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
        items: {
          ...twoListsWithSomeItems.items,
          [itemId159]: payload,
        },
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('item deleted', () => {
    it('should delete the only item of a list', () => {
      const state: State = oneListWithOneItem;

      const action: Action = { type: 'item deleted', payload: itemId789 };

      const expected: State = {
        ...oneListWithoutItems,
        currentListId: listId123,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should delete an item from a list with multiple items', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        lists: {
          ...twoListsWithSomeItems.lists,
          [listId456]: {
            ...twoListsWithSomeItems.lists[listId456],
            itemsIds: [...twoListsWithSomeItems.lists[listId456].itemsIds, itemId777],
          },
        },
        items: {
          ...twoListsWithSomeItems.items,
          [itemId777]: {
            id: itemId777,
            checked: false,
            text: 'Item 6',
          },
        },
        currentListId: listId456,
      };

      const action: Action = { type: 'item deleted', payload: itemId777 };

      const expected: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });
});
