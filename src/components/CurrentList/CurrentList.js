import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setListDate, deleteList } from '../../actions/lists';
import {
  deleteItem, toggleItem, addItem, setNewItemName
} from '../../actions/items';
import { checkEmptyString } from '../../helpers';
import ListItem from '../ListItem/ListItem';
import AddItem from '../AddItem/AddItem';
import './CurrentList.css';

const mapStateToProps = (state) => {
  return {
    list: state.listsReducer.currentList,
    items: state.itemsReducer.currentItems,
    newItemName: state.itemsReducer.newItemName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetListDate: (listId) => dispatch(setListDate(listId)),
    onDeleteList: (listId) => dispatch(deleteList(listId)),
    onDeleteItem: (itemId) => dispatch(deleteItem(itemId)),
    onToggleItem: (itemId, checked) => dispatch(toggleItem(itemId, checked)),
    onAddItem: (listId, name) => dispatch(addItem(listId, name)),
    onSetNewItemName: (e) => dispatch(setNewItemName(e.target.value))
  }
}

class CurrentList extends Component {
  /* handle deleting a list */
  handleDeleteList = (listId) => (e) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      this.props.onDeleteList(listId);
    }
  }

  /* handle toggling an item and deleting an item */
  onClickDeleteItem = (listId, itemId) => (e) => {
    e.stopPropagation();
    this.handleDeleteItem(listId, itemId);
  }

  onClickItem = (listId, itemId, checked) => (e) => {
    this.handleToggleItem(listId, itemId, checked);
  }

  onKeyPressItem = (listId, itemId, checked) => (e) => {
    if (e.key === 'Delete') {
      this.handleDeleteItem(listId, itemId);
    } else if (e.key === 'Enter') {
      this.handleToggleItem(listId, itemId, checked);
    }
  }

  handleDeleteItem = (listId, itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.props.onDeleteItem(itemId);
      this.props.onSetListDate(listId);
    }
  }

  handleToggleItem = (listId, itemId, checked) => {
    this.props.onToggleItem(itemId, checked);
    this.props.onSetListDate(listId);
  }

  /* handle adding an item */
  onClickAddItem = (listId, name) => () => {
    this.handleAddItem(listId, name);
  }

  onKeyPressAddItem = (listId, name) => (e) => {
    if (e.key === 'Enter') {
      this.handleAddItem(listId, name);
    }
  }

  handleAddItem = (listId, name) => {
    if (checkEmptyString(name)) {
      return;
    }
    this.props.onAddItem(listId, name);
    this.props.onSetListDate(listId);
  }

  render() {
    const { list, items, newItemName, onSetNewItemName } = this.props;
    if (!list) return null;

    return (
      <Fragment>
        <button type="button" onClick={this.handleDeleteList(list.id)}
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
                    onClick={this.onClickItem}
                    onClickDelete={this.onClickDeleteItem}
                    onKeyPress={this.onKeyPressItem}
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
          onClickAddItem={this.onClickAddItem}
          onKeyPressAddItem={this.onKeyPressAddItem}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);
