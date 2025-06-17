import { ItemId, ItemType, ListId, ListType, State } from './types';

export function selectCurrentList(state: State): ListType {
  return state.lists[state.currentListId!];
}

export function selectList(state: State, listId: ListId): ListType {
  return state.lists[listId];
}

export function selectListsCount(state: State): number {
  return Object.keys(state.lists).length;
}

export function selectItems(state: State, listId: ListId): ItemType[] {
  const items: ItemType[] = [];
  selectList(state, listId).itemsIds.forEach((itemId) => {
    items.push(state.items[itemId]);
  });
  return items;
}

export function selectItem(state: State, itemId: ItemId): ItemType {
  return state.items[itemId];
}

export function selectFirstFewItems(state: State, listId: ListId): string {
  const numItemsToShow = 5;
  let items = '';
  const itemsIds = selectList(state, listId).itemsIds;
  itemsIds.slice(0, numItemsToShow).forEach((itemId, i) => {
    items += `${i === 0 ? '' : ', '}${selectItem(state, itemId).text}`;
  });
  if (itemsIds.length > numItemsToShow) {
    items += ', ...';
  }
  return items;
}
