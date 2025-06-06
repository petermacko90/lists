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

describe('selectors', () => {
  describe('selectCurrentList', () => {
    it('should select current list', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: ['789', '987'],
          },
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['654', '321', '159'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
          '987': {
            id: '987',
            checked: false,
            text: 'Item 2',
          },
          '654': {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          '321': {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: '456',
      };

      const expected: ListType = {
        id: '456',
        title: 'Test 2',
        modified: new Date('2025-06-02T15:24:00Z'),
        itemsIds: ['654', '321', '159'],
      };

      const result = selectCurrentList(state);
      expect(result).toEqual(expected);
    });
  });

  describe('selectList', () => {
    it('should select list by id', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: ['789', '987'],
          },
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['654', '321', '159'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
          '987': {
            id: '987',
            checked: false,
            text: 'Item 2',
          },
          '654': {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          '321': {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: '456',
      };

      const expected: ListType = {
        id: '123',
        title: 'Test',
        modified: new Date('2025-06-02T15:23:00Z'),
        itemsIds: ['789', '987'],
      };

      const result = selectList(state, '123');
      expect(result).toEqual(expected);
    });
  });

  describe('selectListsCount', () => {
    it('should return zero if state is empty', () => {
      const state: State = initialState;
      expect(selectListsCount(state)).toBe(0);
    });

    it('should return 1 when there is one list in state', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: '123',
      };

      expect(selectListsCount(state)).toBe(1);
    });

    it('should return 2 when there are two lists in state', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: ['789', '987'],
          },
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['654', '321', '159'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
          '987': {
            id: '987',
            checked: false,
            text: 'Item 2',
          },
          '654': {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          '321': {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: '456',
      };

      expect(selectListsCount(state)).toBe(2);
    });
  });

  describe('selectItems', () => {
    it('should return empty array if list has no items', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: '123',
      };

      expect(selectItems(state, '123')).toEqual([]);
    });

    it('should return items of selected list when there are multiple lists', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: ['789', '987'],
          },
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['654', '321', '159'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
          '987': {
            id: '987',
            checked: false,
            text: 'Item 2',
          },
          '654': {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          '321': {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: '456',
      };

      const expected: ItemType[] = [
        {
          id: '654',
          checked: false,
          text: 'Item 3',
        },
        {
          id: '321',
          checked: false,
          text: 'Item 4',
        },
        {
          id: '159',
          checked: false,
          text: 'Item 5',
        },
      ];

      expect(selectItems(state, '456')).toEqual(expected);
    });
  });

  describe('selectItem', () => {
    it('should select an item', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: ['789', '987'],
          },
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['654', '321', '159'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
          '987': {
            id: '987',
            checked: false,
            text: 'Item 2',
          },
          '654': {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          '321': {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: '456',
      };

      const expected: ItemType = {
        id: '321',
        checked: false,
        text: 'Item 4',
      };

      expect(selectItem(state, '321')).toEqual(expected);
    });
  });

  describe('selectFirstFewItems', () => {
    it('should return empty string if list has no items', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: '123',
      };

      expect(selectFirstFewItems(state, '123')).toBe('');
    });

    it('should return concatenated item texts when there are five or less items', () => {
      const state: State = {
        lists: {
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['654', '321', '159'],
          },
        },
        items: {
          '654': {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          '321': {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: '456',
      };

      expect(selectFirstFewItems(state, '456')).toBe('Item 3, Item 4, Item 5');
    });

    it('should return concatenated item texts and ellipsis when there are more than five items', () => {
      const state: State = {
        lists: {
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['123', '157', '654', '321', '159', '777'],
          },
        },
        items: {
          '123': {
            id: '123',
            checked: false,
            text: 'Item 1',
          },
          '157': {
            id: '157',
            checked: false,
            text: 'Item 2',
          },
          '654': {
            id: '654',
            checked: false,
            text: 'Item 3',
          },
          '321': {
            id: '321',
            checked: false,
            text: 'Item 4',
          },
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
          '777': {
            id: '777',
            checked: false,
            text: 'Item 6',
          },
        },
        currentListId: '456',
      };

      expect(selectFirstFewItems(state, '456')).toBe('Item 1, Item 2, Item 3, Item 4, Item 5, ...');
    });
  });
});
