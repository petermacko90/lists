import React, { Fragment } from 'react';

const AddList = ({
  newListTitle,
  isShowAddListInput,
  onChangeNewListTitle,
  onClickAddList,
  onKeyPressAddList,
  addListRef
}) => {
  return (
    <Fragment>
      <button type="button" onClick={onClickAddList}
      className="white b--none ph3 ph4-ns pv3 b pointer bg-green hover-bg-dark-green mv3 w-40 w-auto-ns">
        Add list
      </button>
      {
        isShowAddListInput &&
          <input
            type="text"
            value={newListTitle}
            onChange={onChangeNewListTitle}
            onKeyPress={onKeyPressAddList}
            placeholder="List title"
            className="pa3 b--none mv3 w-60 w-auto-ns"
            maxLength="50"
            ref={addListRef}
          />
      }
    </Fragment>
  );
}

export default AddList;
