import { describe, expect, it } from 'vitest';
import { initialState, ItemType, ListType, State } from './reducer';
import { selectCurrentList, selectItems, selectList, selectListsCount } from './selectors';

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
});
