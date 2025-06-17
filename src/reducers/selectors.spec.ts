import { describe, expect, it } from 'vitest';
import { initialState } from './reducer';
import { ItemType, ListType, State } from './types';
import {
  selectCurrentList,
  selectFirstFewItems,
  selectItem,
  selectItems,
  selectList,
  selectListsCount,
} from './selectors';
import {
  itemId159,
  itemId321,
  itemId654,
  itemId777,
  itemId789,
  itemId987,
  listId123,
  listId456,
  oneListWithoutItems,
  twoListsWithSomeItems,
} from './mocks';

describe('selectors', () => {
  describe('selectCurrentList', () => {
    it('should select current list', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const expected: ListType = {
        id: listId456,
        title: 'Test 2',
        modified: new Date('2025-06-02T15:24:00Z'),
        itemsIds: [itemId654, itemId321, itemId159],
      };

      const result = selectCurrentList(state);
      expect(result).toEqual(expected);
    });
  });

  describe('selectList', () => {
    it('should select list by id', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const expected: ListType = {
        id: listId123,
        title: 'Test',
        modified: new Date('2025-06-02T15:23:00Z'),
        itemsIds: [itemId789, itemId987],
      };

      const result = selectList(state, listId123);
      expect(result).toEqual(expected);
    });
  });

  describe('selectListsCount', () => {
    it('should return zero if state is empty', () => {
      const state: State = initialState;
      expect(selectListsCount(state)).toBe(0);
    });

    it('should return 1 when there is one list in state', () => {
      const state: State = oneListWithoutItems;

      expect(selectListsCount(state)).toBe(1);
    });

    it('should return 2 when there are two lists in state', () => {
      const state: State = twoListsWithSomeItems;

      expect(selectListsCount(state)).toBe(2);
    });
  });

  describe('selectItems', () => {
    it('should return empty array if list has no items', () => {
      const state: State = oneListWithoutItems;

      expect(selectItems(state, listId123)).toEqual([]);
    });

    it('should return items of selected list when there are multiple lists', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const expected: ItemType[] = [
        {
          id: itemId654,
          checked: false,
          text: 'Item 3',
        },
        {
          id: itemId321,
          checked: false,
          text: 'Item 4',
        },
        {
          id: itemId159,
          checked: false,
          text: 'Item 5',
        },
      ];

      expect(selectItems(state, listId456)).toEqual(expected);
    });
  });

  describe('selectItem', () => {
    it('should select an item', () => {
      const state: State = {
        ...twoListsWithSomeItems,
        currentListId: listId456,
      };

      const expected: ItemType = {
        id: itemId321,
        checked: false,
        text: 'Item 4',
      };

      expect(selectItem(state, itemId321)).toEqual(expected);
    });
  });

  describe('selectFirstFewItems', () => {
    it('should return empty string if list has no items', () => {
      const state: State = oneListWithoutItems;

      expect(selectFirstFewItems(state, listId123)).toBe('');
    });

    it('should return concatenated item texts when there are five or less items', () => {
      const state: State = {
        lists: {
          [listId456]: {
            id: listId456,
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: [itemId654, itemId321, itemId159],
          },
        },
        items: {
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
        currentListId: listId456,
      };

      expect(selectFirstFewItems(state, listId456)).toBe('Item 3, Item 4, Item 5');
    });

    it('should return concatenated item texts and ellipsis when there are more than five items', () => {
      const state: State = {
        lists: {
          [listId456]: {
            id: listId456,
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: [itemId789, itemId987, itemId654, itemId321, itemId159, itemId777],
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
          [itemId777]: {
            id: itemId777,
            checked: false,
            text: 'Item 6',
          },
        },
        currentListId: listId456,
      };

      expect(selectFirstFewItems(state, listId456)).toBe('Item 1, Item 2, Item 3, Item 4, Item 5, ...');
    });
  });
});
