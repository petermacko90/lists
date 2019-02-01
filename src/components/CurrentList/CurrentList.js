import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editList, deleteList } from '../../actions/lists';
import { editItem, deleteItem, addItem } from '../../actions/items';
import { checkEmptyString } from '../../helpers';
import Item from '../Item/Item';
import AddItem from '../AddItem/AddItem';
import EditItem from '../EditItem/EditItem';
import ToastNotification from '../ToastNotification/ToastNotification';
import Button from '../Button/Button';
import './CurrentList.css';
import { MAX_LENGTH_LIST } from '../../constants/constants';

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
    onEditItem: (list_id, id, name, checked) => dispatch(editItem(list_id, id, name, checked)),
    onDeleteItem: (itemId) => dispatch(deleteItem(itemId)),
    onAddItem: (listId, name) => dispatch(addItem(listId, name))
  }
}

class CurrentList extends Component {
  constructor() {
    super();
    this.editTitle = React.createRef();
    this.copyText = React.createRef();
    this.state = {
      isEditTitle: false,
      newListTitle: '',
      newItemName: '',
      textToCopy: '',
      editItemId: -1,
      editItemName: '',
      notification: {
        show: false,
        text: ''
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.list && this.props.list &&
      this.props.list.id !== prevProps.list.id
    ) {
      this.hideEditTitle();
      this.hideItemToEdit();
    }
  }

  setTextToCopy = (textToCopy) => () => {
    this.setState(
      { textToCopy },
      () => {
        this.copyText.current.select();
        document.execCommand('copy');
        this.showNotification('Copied: ' + textToCopy);
      }
    );
  }

  showNotification = (text) => {
    this.setState({ notification: { show: true, text } });
    setTimeout(() => {
      let notification = { ...this.state.notification, show: false };
      this.setState({ notification });
    }, 3000);
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

  /* handle editing an item */
  onClickItem = (list_id, id, name, checked) => () => {
    this.handleEditItem(list_id, id, name, checked);
  }

  onKeyPressItem = (list_id, id, name, checked) => (e) => {
    if (e.key === 'Enter') {
      this.handleEditItem(list_id, id, name, checked);
    }
  }

  handleEditItem = (list_id, id, name, checked) => {
    if (checkEmptyString(name)) {
      return;
    }
    this.props.onEditItem(list_id, id, name, checked);
    this.props.onEditList(list_id, this.props.list.title, new Date());
    this.hideItemToEdit();
  }

  setItemToEdit = (editItemId, editItemName) => () => {
    this.setState({ editItemId, editItemName });
  }

  hideItemToEdit = () => {
    this.setState({
      editItemId: -1,
      editItemName: ''
    });
  }

  onChangeEditItemName = (e) => {
    this.setState({ editItemName: e.target.value });
  }

  /* handle deleting an item */
  handleDeleteItem = (listId, itemId) => () => {
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
    if (!list) return null;
    const {
      isEditTitle, newListTitle, newItemName, textToCopy, editItemId,
      editItemName
    } = this.state;
    const { show, text } = this.state.notification;
    const title = list.title.length === 0 ? '<No title>' : list.title;

    let itemsComponent = [];
    if (items.length > 0) {
      itemsComponent = items.map(item => {
        if (item.id === editItemId) {
          return (
            <EditItem
              key={item.id}
              item={item}
              value={editItemName}
              onChange={this.onChangeEditItemName}
              onClick={this.onClickItem}
              onKeyPress={this.onKeyPressItem}
              hide={this.hideItemToEdit}
            />
          );
        } else {
          return (
            <Item
              key={item.id}
              item={item}
              onClickItem={this.onClickItem}
              onKeyPressItem={this.onKeyPressItem}
              onClickDelete={this.handleDeleteItem}
              setTextToCopy={this.setTextToCopy}
              setItemToEdit={this.setItemToEdit}
            />
          );
        }
      });
    } else {
      itemsComponent = <p>No items</p>;
    }

    return (
      <div className="fl w-75-l w-two-thirds-m w-100 pa3">
        <ToastNotification show={show} text={text} />
        <Button onClick={this.handleDeleteList(list.id)} color="red">
          Delete list
        </Button>
        {
          isEditTitle ?
            <div className="mv4">
              <input
                type="text"
                value={newListTitle}
                onChange={this.onChangeListTitle}
                onKeyPress={this.onKeyPressEditTitle(list.id, newListTitle)}
                placeholder="List title"
                className="pa3 b--none w-60 w-auto-l"
                maxLength={MAX_LENGTH_LIST}
                ref={this.editTitle}
              />
              <Button onClick={this.onClickEditTitle(list.id, newListTitle)}
              color="green" title="Save" classes="w-20 w-auto-l">
                &#10003;
              </Button>
              <Button onClick={this.hideEditTitle} color="red"
              title="Close edit" classes="w-20 w-auto-l">
                &times;
              </Button>
            </div>
          :
            <div className="mv4">
              <Button onClick={this.showEditTitle} color="blue"
              title="Edit title">
                &#9999;
              </Button>
              <h2 className="f3 mv0 ml3 di list-title">{title}</h2>
            </div>
        }
        <p>{list.modified.toLocaleDateString()}</p>
        <ul className="ma0 pa0 list">{itemsComponent}</ul>
        <input
          type="text"
          readOnly
          value={textToCopy}
          ref={this.copyText}
          className="copy-text"
          tabIndex="-1"
        />
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
