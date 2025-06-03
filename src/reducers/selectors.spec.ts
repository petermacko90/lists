import { describe, expect, it } from 'vitest';
import { ItemType2, ListType2, State } from './reducer';
import { selectCurrentList, selectItems } from './selectors';

describe('selectors', () => {
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

    const expected: ListType2 = {
      id: '456',
      title: 'Test 2',
      modified: new Date('2025-06-02T15:24:00Z'),
      itemsIds: ['654', '321', '159'],
    };

    const result = selectCurrentList(state);
    expect(result).toEqual(expected);
  });

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

    expect(selectItems(state)).toEqual([]);
  });

  it('should return items of current list when there are multiple lists', () => {
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

    const expected: ItemType2[] = [
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

    expect(selectItems(state)).toEqual(expected);
  });
});
