import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { requestLists, setCurrentList, setListDate } from './actions/lists';
import {
  requestItems, setCurrentItems, deleteItem, toggleItem
} from './actions/items';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import Message from './components/Message/Message';
import './App.css';

const mapStateToProps = (state) => {
  return {
    lists: state.listsReducer.lists,
    items: state.itemsReducer.items,
    currentList: state.setCurrentList.currentList,
    currentItems: state.itemsReducer.currentItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestLists: () => dispatch(requestLists()),
    onRequestItems: () => dispatch(requestItems()),
    onSetCurrentList: (list) => dispatch(setCurrentList(list)),
    onSetCurrentItems: (items) => dispatch(setCurrentItems(items)),
    onSetListDate: (listId) => dispatch(setListDate(listId)),
    onDeleteItem: (itemId) => dispatch(deleteItem(itemId)),
    onToggleItem: (itemId, checked) => dispatch(toggleItem(itemId, checked))
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestLists();
    this.props.onRequestItems();
  }

  /* handle selecting a list */
  onClickList = (list, listId) => (e) => {
    this.handleSelectList(list, listId);
  }

  onEnterList = (list, listId) => (e) => {
    if (e.key === 'Enter') {
      this.handleSelectList(list, listId);
    }
  }

  handleSelectList = (list, listId) => {
    this.props.onSetCurrentList(list);
    this.props.onSetCurrentItems(listId);
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

  render() {
    const { lists, items, currentList, currentItems } = this.props;

    return (
      <Fragment>
        <Navigation />
        {
          lists.length > 0 ?
            <Lists
              lists={lists}
              items={items}
              onClickList={this.onClickList}
              onEnterList={this.onEnterList}
            />
          :
            <Message text="No lists found" />
        }
        {
          currentList &&
            <CurrentList
              list={currentList}
              items={currentItems}
              onClickItem={this.onClickItem}
              onClickDeleteItem={this.onClickDeleteItem}
              onKeyPressItem={this.onKeyPressItem}
            />
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
