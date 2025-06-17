export type ListId = string & { readonly brand: unique symbol };

export type ListType = {
  id: ListId;
  title: string;
  modified: Date;
  itemsIds: ItemId[];
};

type ListsRecord = Record<ListId, ListType>;

export type ItemId = string & { readonly brand: unique symbol };

export type ItemType = {
  id: ItemId;
  text: string;
  checked: boolean;
};

type ItemsRecord = Record<ItemId, ItemType>;

export type State = {
  lists: ListsRecord;
  items: ItemsRecord;
  currentListId: ListId | null;
};

export type Action =
  | { type: 'fetched'; payload: State }
  | { type: 'list selected'; payload: ListId }
  | { type: 'list added'; payload: ListType }
  | { type: 'list edited'; payload: ListType }
  | { type: 'list deleted'; payload: ListId }
  | { type: 'list modified date updated'; payload: Date }
  | { type: 'item added'; payload: ItemType }
  | { type: 'item edited'; payload: ItemType }
  | { type: 'item deleted'; payload: ItemId };
