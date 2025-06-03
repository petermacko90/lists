import { ItemType2, ListType2, State } from './reducer';

export function selectCurrentList(state: State): ListType2 {
  return state.lists[state.currentListId!];
}

export function selectItems(state: State): ItemType2[] {
  const items: ItemType2[] = [];
  selectCurrentList(state).itemsIds.forEach((itemId) => {
    items.push(state.items[itemId]);
  });
  return items;
}
