export type List = {
  id: number;
  title: string;
  modified: Date;
};

export type ListsState = {
  lists: List[];
  currentList: List | null;
};
