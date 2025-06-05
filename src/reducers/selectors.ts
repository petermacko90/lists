import { ItemType, ListType, State } from './types';

export function selectCurrentList(state: State): ListType {
  return state.lists[state.currentListId!];
}

export function selectList(state: State, id: string): ListType {
  return state.lists[id];
}

export function selectListsCount(state: State): number {
  return Object.keys(state.lists).length;
}

export function selectItems(state: State, id: string): ItemType[] {
  const items: ItemType[] = [];
  selectList(state, id).itemsIds.forEach((itemId) => {
    items.push(state.items[itemId]);
  });
  return items;
}
