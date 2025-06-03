import { ItemType2, State } from './reducer';

export function selectCurrentList(state: State) {
  return state.lists[state.currentListId!];
}

export function selectItems(state: State) {
  const items: ItemType2[] = [];
  selectCurrentList(state).itemsIds.forEach((itemId) => {
    items.push(state.items[itemId]);
  });
  return items;
}
