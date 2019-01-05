import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { editList, deleteList } from '../../actions/lists';
import { deleteItem, toggleItem, addItem } from '../../actions/items';
import { checkEmptyString } from '../../helpers';
import Item from '../Item/Item';
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
    this.editTitle = React.createRef();
    this.state = {
      isEditTitle: false,
      newListTitle: '',
      newItemName: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.list && !this.props.list &&
      this.props.list.id !== prevProps.list.id
    ) {
      this.hideEditTitle();
    }
  }

  focusEditTitle = () => {
    this.editTitle.current.focus();
  }

  hideEditTitle = () => {
    this.setState({
      isEditTitle: false,
      newListTitle: ''
    });
  }

  showEditTitle = () => {
    this.setState(
      {
        isEditTitle: true,
        newListTitle: this.props.list.title
      },
      () => this.focusEditTitle()
    );
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
    if (checkEmptyString(title)) {
      return;
    }
    this.props.onEditList(listId, title, new Date());
    this.hideEditTitle();
  }

  /* handle deleting a list */
  handleDeleteList = (listId) => () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      this.props.onDeleteList(listId);
      this.hideEditTitle();
      this.setState({ newItemName: '' });
      this.props.showLists();
    }
  }

  /* handle toggling an item */
  handleToggleItem = (listId, itemId, checked) => () => {
    this.props.onToggleItem(itemId, checked);
    this.props.onEditList(listId, this.props.list.title, new Date());
  }

  /* handle deleting an item */
  handleDeleteItem = (listId, itemId) => (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.props.onDeleteItem(itemId);
      this.props.onEditList(listId, this.props.list.title, new Date());
    }
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
      <div className="fl w-75-l w-two-thirds-m w-100 pa3">
        <button type="button" onClick={this.handleDeleteList(list.id)}
        className="white b--none ph4 pv3 b pointer bg-red hover-bg-dark-red">
          Delete list
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
                Don't save title
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
              maxLength="50"
              ref={this.editTitle}
            />
          :
            <h2 className="f2 mv4 list-title">{list.title}</h2>
        }
        <p>{list.modified.toLocaleDateString()}</p>
        <ul>
          {
            items.length > 0 ?
              items.map((item) => {
                return (
                  <Item
                    key={item.id}
                    id={item.id}
                    listId={list.id}
                    checked={item.checked}
                    name={item.name}
                    onClick={this.handleToggleItem}
                    onClickDelete={this.handleDeleteItem}
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);
