import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { editList, deleteList } from '../../actions/lists';
import { editItem, deleteItem, addItem } from '../../actions/items';
import { checkEmptyString } from '../../helpers';
import Item from '../Item/Item';
import AddItem from '../AddItem/AddItem';
import ToastNotification from '../ToastNotification/ToastNotification';
import Button from '../Button/Button';
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
      notification: {
        show: false,
        text: ''
      }
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
  onClickItem = (list_id, id, name, checked) => () => {
    this.handleToggleItem(list_id, id, name, checked);
  }

  onKeyPressItem = (list_id, id, name, checked) => (e) => {
    if (e.key === 'Enter') {
      this.handleToggleItem(list_id, id, name, checked);
    }
  }

  handleToggleItem = (list_id, id, name, checked) => {
    this.props.onEditItem(list_id, id, name, checked);
    this.props.onEditList(list_id, this.props.list.title, new Date());
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
    const { isEditTitle, newListTitle, newItemName, textToCopy } = this.state;
    const { show, text } = this.state.notification;
    if (!list) return null;

    return (
      <div className="fl w-75-l w-two-thirds-m w-100 pa3">
        <ToastNotification show={show} text={text} />
        <Button onClick={this.handleDeleteList(list.id)} color="red">
          Delete list
        </Button>
        {
          isEditTitle ?
            <Fragment>
              <Button onClick={this.onClickEditTitle(list.id, newListTitle)}
              color="green">
                Save title
              </Button>
              <Button onClick={this.hideEditTitle} color="blue">
                {"Don't save title"}
              </Button>
            </Fragment>
          :
            <Button onClick={this.showEditTitle} color="blue">
              Edit title
            </Button>
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
        <ul className="ma0 pa0 list">
          {
            items.length > 0 ?
              items.map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    onClickItem={this.onClickItem}
                    onKeyPressItem={this.onKeyPressItem}
                    onClickDelete={this.handleDeleteItem}
                    setTextToCopy={this.setTextToCopy}
                  />
                );
              })
            :
              <p>No items</p>
          }
        </ul>
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
