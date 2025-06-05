export type ListType = {
  id: string;
  title: string;
  modified: Date;
  itemsIds: string[];
};

type ListsRecord = Record<string, ListType>;

export type ItemType = {
  id: string;
  text: string;
  checked: boolean;
};

type ItemsRecord = Record<string, ItemType>;

export type State = {
  lists: ListsRecord;
  items: ItemsRecord;
  currentListId: string | null;
};

export type Action =
  | { type: 'fetched'; payload: State }
  | { type: 'list selected'; payload: string }
  | { type: 'list added'; payload: ListType }
  | { type: 'list edited'; payload: ListType }
  | { type: 'list deleted'; payload: string }
  | { type: 'list modified date updated'; payload: Date }
  | { type: 'item added'; payload: ItemType }
  | { type: 'item edited'; payload: ItemType }
  | { type: 'item deleted'; payload: string };
