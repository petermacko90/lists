import { ItemType2, ListType2, State } from './reducer';

export function selectCurrentList(state: State): ListType2 {
  return state.lists[state.currentListId!];
}

export function selectList(state: State, id: string): ListType2 {
  return state.lists[id];
}

export function selectListsCount(state: State): number {
  return Object.keys(state.lists).length;
}

export function selectItems(state: State, id: string): ItemType2[] {
  const items: ItemType2[] = [];
  selectList(state, id).itemsIds.forEach((itemId) => {
    items.push(state.items[itemId]);
  });
  return items;
}
