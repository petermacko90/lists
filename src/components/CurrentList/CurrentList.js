import React from 'react';
import ListItem from '../ListItem/ListItem';
import './CurrentList.css';

const CurrentList = ({
  list, items, onClickItem, onClickDeleteItem, onKeyPressItem
}) => {
  return (
    <div className="fl w-75-l w-two-thirds-m w-100 pa3 pt0">
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
    </div>
  );
}

export default CurrentList;
