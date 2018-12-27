import React from 'react';

const ListItem = ({
  id, listId, checked, name, onClick, onClickDelete, onKeyPress
}) => {
  return (
    <li className={"noselect" + (checked ? ' checked' : '')}
    tabIndex="0" onKeyUp={onKeyPress(listId, id, checked)}
    onClick={onClick(listId, id, checked)}>
      {name}
      <span className="close" title="Delete item"
      onClick={onClickDelete(listId, id)}>
        &times;
      </span>
    </li>
  );
}

export default ListItem;
