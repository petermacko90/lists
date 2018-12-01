import {
  ADD_ITEM, ADD_ITEM_WITH_ID, ADD_LIST, ADD_LIST_WITH_ID
} from '../constants/action-types';

export const addListOrItemMiddleware = store => next => action => {
  if (action.type === ADD_ITEM) {
    const items = store.getState().itemsReducer.items;
    const maxId = items.reduce((a, b) => (a.id > b.id) ? a.id : b.id);
    store.dispatch({
      type: ADD_ITEM_WITH_ID,
      payload: {
        listId: action.payload.listId,
        name: action.payload.name,
        nextId: maxId + 1
      }
    });
  }
  if (action.type === ADD_LIST) {
    const lists = store.getState().listsReducer.lists;
    const maxId = lists.reduce((a, b) => (a.id > b.id) ? a.id : b.id);
    store.dispatch({
      type: ADD_LIST_WITH_ID,
      payload: {
        title: action.payload.title,
        nextId: maxId + 1,
        modified: action.payload.modified
      }
    })
  }
  next(action);
}
