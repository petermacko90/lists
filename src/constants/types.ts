export type ListType = {
  id: number;
  title: string;
  modified: Date;
};

export type ListsState = {
  lists: ListType[];
  currentList: ListType | null;
};

export type ItemType = {
  list_id: number;
  id: number;
  name: string;
  checked: boolean;
};

export type ItemsState = {
  items: ItemType[];
  currentItems: ItemType[];
};
