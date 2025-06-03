import { Action, initialState, ItemType2, ListType2, reducer, State } from './reducer';
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

      const payload: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: null,
      };

      const action: Action = { type: 'fetched', payload: payload };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: null,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should fetch two lists with some items', () => {
      const state: State = initialState;

      const payload: State = {
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
        currentListId: null,
      };

      const action: Action = { type: 'fetched', payload: payload };

      const expected: State = {
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
        currentListId: null,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list selected', () => {
    it('should select a list when none was selected previously', () => {
      const state = {
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
        currentListId: null,
      };

      const action: Action = { type: 'list selected', payload: '123' };

      const expected = {
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
        currentListId: '123',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should select a list when there was a previously selected one', () => {
      const state = {
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
        currentListId: '123',
      };

      const action: Action = { type: 'list selected', payload: '789' };

      const expected = {
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
        currentListId: '789',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list added', () => {
    it('should add a list to empty state', () => {
      const state: State = initialState;

      const payload: ListType2 = {
        id: '123',
        title: 'Test',
        modified: new Date('2025-06-02T15:24:00Z'),
        itemsIds: [],
      };

      const action: Action = { type: 'list added', payload: payload };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: '123',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should add a list to non-empty state', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['789'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
        },
        currentListId: '123',
      };

      const payload: ListType2 = {
        id: '456',
        title: 'Test 2',
        modified: new Date('2025-06-02T15:25:00Z'),
        itemsIds: [],
      };

      const action: Action = { type: 'list added', payload: payload };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['789'],
          },
          '456': {
            id: '456',
            title: 'Test 2',
            modified: new Date('2025-06-02T15:25:00Z'),
            itemsIds: [],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
        },
        currentListId: '456',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list edited', () => {
    it('should update list title and modified date', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['789'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
        },
        currentListId: '123',
      };

      const payload: ListType2 = {
        id: '123',
        title: 'Testing',
        modified: new Date('2025-06-02T15:25:00Z'),
        itemsIds: ['789'],
      };

      const action: Action = { type: 'list edited', payload: payload };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Testing',
            modified: new Date('2025-06-02T15:25:00Z'),
            itemsIds: ['789'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
        },
        currentListId: '123',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list deleted', () => {
    it('should delete a list when there is only one list in state', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['789'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
        },
        currentListId: '123',
      };

      const action: Action = { type: 'list deleted', payload: '123' };

      const expected: State = {
        lists: {},
        items: {},
        currentListId: null,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should delete a list when there are multiple lists in state', () => {
      const state = {
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

      const action: Action = { type: 'list deleted', payload: '456' };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:23:00Z'),
            itemsIds: ['789', '987'],
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
        },
        currentListId: null,
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('list modified date updated', () => {
    it('should update modified date', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['789'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
        },
        currentListId: '123',
      };

      const action: Action = {
        type: 'list modified date updated',
        payload: new Date('2025-06-02T15:26:00Z'),
      };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:26:00Z'),
            itemsIds: ['789'],
          },
        },
        items: {
          '789': {
            id: '789',
            checked: false,
            text: 'Item 1',
          },
        },
        currentListId: '123',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('item added', () => {
    it('should add an item to a list without items', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: '123',
      };

      const payload: ItemType2 = {
        id: '456',
        text: 'Item',
        checked: false,
      };

      const action: Action = { type: 'item added', payload: payload };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['456'],
          },
        },
        items: {
          '456': {
            id: '456',
            text: 'Item',
            checked: false,
          },
        },
        currentListId: '123',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should add an item to a list with items', () => {
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

      const payload: ItemType2 = {
        id: '777',
        text: 'Test',
        checked: false,
      };

      const action: Action = { type: 'item added', payload: payload };

      const expected: State = {
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
            itemsIds: ['654', '321', '159', '777'],
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
          '777': {
            id: '777',
            text: 'Test',
            checked: false,
          },
        },
        currentListId: '456',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('item edited', () => {
    it('should check an item', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['456'],
          },
        },
        items: {
          '456': {
            id: '456',
            text: 'Item',
            checked: false,
          },
        },
        currentListId: '123',
      };

      const payload: ItemType2 = {
        id: '456',
        text: 'Item',
        checked: true,
      };

      const action: Action = { type: 'item edited', payload: payload };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['456'],
          },
        },
        items: {
          '456': {
            id: '456',
            text: 'Item',
            checked: true,
          },
        },
        currentListId: '123',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should update item text', () => {
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

      const payload: ItemType2 = {
        id: '159',
        checked: false,
        text: 'Testing',
      };

      const action: Action = { type: 'item edited', payload: payload };

      const expected: State = {
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
            text: 'Testing',
          },
        },
        currentListId: '456',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });

  describe('item deleted', () => {
    it('should delete the only item of a list', () => {
      const state: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: ['456'],
          },
        },
        items: {
          '456': {
            id: '456',
            text: 'Item',
            checked: true,
          },
        },
        currentListId: '123',
      };

      const action: Action = { type: 'item deleted', payload: '456' };

      const expected: State = {
        lists: {
          '123': {
            id: '123',
            title: 'Test',
            modified: new Date('2025-06-02T15:24:00Z'),
            itemsIds: [],
          },
        },
        items: {},
        currentListId: '123',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });

    it('should delete an item from a list with multiple items', () => {
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

      const action: Action = { type: 'item deleted', payload: '321' };

      const expected: State = {
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
            itemsIds: ['654', '159'],
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
          '159': {
            id: '159',
            checked: false,
            text: 'Item 5',
          },
        },
        currentListId: '456',
      };

      const result = reducer(state, action);
      expect(result).toEqual(expected);
    });
  });
});
