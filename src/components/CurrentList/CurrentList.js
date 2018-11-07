import React from 'react';
import ListItem from '../ListItem/ListItem';
import AddItem from '../AddItem/AddItem';
import './CurrentList.css';

const CurrentList = ({
  list, items, newItemName,
  onClickDeleteList, onClickItem, onClickDeleteItem, onKeyPressItem,
  onSetNewItemName, onClickAddItem, onKeyPressAddItem
}) => {
  return (
    <div className="fl w-75-l w-two-thirds-m w-100 pa3">
      <button type="button" onClick={onClickDeleteList(list.id)}
      className="white b--none ph4 pv3 b pointer bg-red hover-bg-dark-red">
        Delete
      </button>
      <h2 className="f2-l f3-m f4 mv4 truncate">{list.title}</h2>
      <p>{list.modified.toLocaleDateString()}</p>
      <ul>
        {
          items.length > 0 ?
            items.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  id={item.id}
                  listId={list.id}
                  checked={item.checked}
                  name={item.name}
                  onClick={onClickItem}
                  onClickDelete={onClickDeleteItem}
                  onKeyPress={onKeyPressItem}
                />
              );
            })
          :
            <p>No items</p>
        }
      </ul>
      <AddItem
        listId={list.id}
        newItemName={newItemName}
        onSetNewItemName={onSetNewItemName}
        onClickAddItem={onClickAddItem}
        onKeyPressAddItem={onKeyPressAddItem}
      />
    </div>
  );
}

export default CurrentList;
