import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { editList, deleteList } from '../../actions/lists';
import { deleteItem, toggleItem, addItem } from '../../actions/items';
import { checkEmptyString } from '../../helpers';
import ListItem from '../ListItem/ListItem';
import AddItem from '../AddItem/AddItem';
import './CurrentList.css';

const mapStateToProps = (state) => {
  return {
    list: state.listsReducer.currentList,
    items: state.itemsReducer.currentItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditList: (id, title, modified) => dispatch(editList(id, title, modified)),
    onDeleteList: (listId) => dispatch(deleteList(listId)),
    onDeleteItem: (itemId) => dispatch(deleteItem(itemId)),
    onToggleItem: (itemId, checked) => dispatch(toggleItem(itemId, checked)),
    onAddItem: (listId, name) => dispatch(addItem(listId, name))
  }
}

class CurrentList extends Component {
  constructor() {
    super();
    this.state = {
      isEditTitle: false,
      newListTitle: '',
      newItemName: ''
    };
  }

  hideEditTitle = () => {
    this.setState({
      isEditTitle: false,
      newListTitle: ''
    });
  }

  showEditTitle = () => {
    this.setState({
      isEditTitle: true,
      newListTitle: this.props.list.title
    });
  }

  onChangeListTitle = (e) => {
    this.setState({ newListTitle: e.target.value });
  }

  /* handle editing a list */
  onClickEditTitle = (listId, title) => () => {
    this.handleEditTitle(listId, title);
  }

  onKeyPressEditTitle = (listId, title) => (e) => {
    if (e.key === 'Enter') {
      this.handleEditTitle(listId, title);
    }
  }

  handleEditTitle = (listId, title) => {
    this.props.onEditList(listId, title, new Date());
    this.setState({
      newListTitle: '',
      isEditTitle: false
    });
  }

  /* handle deleting a list */
  handleDeleteList = (listId) => () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      this.props.onDeleteList(listId);
      this.hideEditTitle();
      this.setState({ newItemName: '' });
    }
  }

  /* handle toggling an item and deleting an item */
  onClickDeleteItem = (listId, itemId) => (e) => {
    e.stopPropagation();
    this.handleDeleteItem(listId, itemId);
  }

  onClickItem = (listId, itemId, checked) => () => {
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
      this.props.onEditList(listId, this.props.list.title, new Date());
    }
  }

  handleToggleItem = (listId, itemId, checked) => {
    this.props.onToggleItem(itemId, checked);
    this.props.onEditList(listId, this.props.list.title, new Date());
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
    this.props.onEditList(listId, this.props.list.title, new Date());
    this.setState({ newItemName: '' });
  }

  onChangeNewItemName = (e) => {
    this.setState({ newItemName: e.target.value });
  }

  render() {
    const { list, items } = this.props;
    const { isEditTitle, newListTitle, newItemName } = this.state;
    if (!list) return null;

    return (
      <Fragment>
        <button type="button" onClick={this.handleDeleteList(list.id)}
        className="white b--none ph4 pv3 b pointer bg-red hover-bg-dark-red">
          Delete
        </button>
        {
          isEditTitle ?
            <Fragment>
              <button type="button"
              onClick={this.onClickEditTitle(list.id, newListTitle)}
              className="white b--none ph4 pv3 b pointer bg-green hover-bg-dark-green">
                Save title
              </button>
              <button type="button" onClick={this.hideEditTitle}
              className="white b--none ph4 pv3 b pointer bg-blue hover-bg-dark-blue">
                Don't save
              </button>
            </Fragment>
          :
            <button type="button" onClick={this.showEditTitle}
            className="white b--none ph4 pv3 b pointer bg-blue hover-bg-dark-blue">
              Edit title
            </button>
        }
        {
          isEditTitle ?
            <input
              type="text"
              value={newListTitle}
              onChange={this.onChangeListTitle}
              onKeyPress={this.onKeyPressEditTitle(list.id, newListTitle)}
              placeholder="List title"
              className="pa3 b--none mv4 db"
            />
          :
            <h2 className="f2 mv4 truncate" style={{height:'50.4px'}}>{list.title}</h2>
        }
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
          onSetNewItemName={this.onChangeNewItemName}
          onClickAddItem={this.onClickAddItem}
          onKeyPressAddItem={this.onKeyPressAddItem}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);
