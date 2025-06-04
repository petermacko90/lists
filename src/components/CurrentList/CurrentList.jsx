import React, { Component, useState, useRef, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { editList, deleteList } from '../../actions/lists';
import { editItem, deleteItem, addItem } from '../../actions/items';
import { isEmptyString } from '../../helpers';
import Item from '../Item/Item';
import AddItem from '../AddItem/AddItem';
import EditItem from '../EditItem/EditItem';
import ToastNotification from '../ToastNotification/ToastNotification';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './CurrentList.css';
import { MAX_LENGTH_LIST } from '../../constants/constants';
import { LocaleContext, StateContext, StateDispatchContext } from '../../context';
import { selectCurrentList } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  list: state.listsReducer.currentList,
  items: state.itemsReducer.currentItems,
});

const mapDispatchToProps = (dispatch) => ({
  onEditList: (id, title, modified) => dispatch(editList(id, title, modified)),
  onDeleteList: (listId) => dispatch(deleteList(listId)),
  onEditItem: (list_id, id, name, checked) => dispatch(editItem(list_id, id, name, checked)),
  onDeleteItem: (itemId) => dispatch(deleteItem(itemId)),
  onAddItem: (listId, name) => dispatch(addItem(listId, name)),
});

// class CurrentList extends Component {
//   constructor() {
//     super();
//     this.editTitle = React.createRef();
//     this.state = {
//       isEditTitle: false,
//       newListTitle: '',
//       newItemName: '',
//       editItemId: -1,
//       editItemName: '',
//       notification: {
//         show: false,
//         text: '',
//       },
//     };
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.list && this.props.list && this.props.list.id !== prevProps.list.id) {
//       this.hideEditTitle();
//       this.hideItemToEdit();
//     }
//   }

//   setTextToCopy = (textToCopy) => () => {
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       this.showNotification(`${this.props.str.COPIED}: ${textToCopy}`);
//     });
//   };

//   showNotification = (text) => {
//     this.setState({ notification: { show: true, text } });
//     setTimeout(() => {
//       let notification = { ...this.state.notification, show: false };
//       this.setState({ notification });
//     }, 3000);
//   };

//   focusEditTitle = () => {
//     this.editTitle.current.focus();
//   };

//   hideEditTitle = () => {
//     this.setState({
//       isEditTitle: false,
//       newListTitle: '',
//     });
//   };

//   showEditTitle = () => {
//     this.setState(
//       {
//         isEditTitle: true,
//         newListTitle: this.props.list.title,
//       },
//       () => this.focusEditTitle()
//     );
//   };

//   onChangeListTitle = (e) => {
//     this.setState({ newListTitle: e.target.value });
//   };

//   /* handle editing a list */
//   onClickEditTitle = (listId, title) => () => {
//     this.handleEditTitle(listId, title);
//   };

//   onKeyPressEditTitle = (listId, title) => (e) => {
//     if (e.key === 'Enter') {
//       this.handleEditTitle(listId, title);
//     }
//   };

//   handleEditTitle = (listId, title) => {
//     this.props.onEditList(listId, title, new Date());
//     this.hideEditTitle();
//   };

//   /* handle deleting a list */
//   handleDeleteList = (listId) => () => {
//     if (window.confirm(this.props.str.CONFIRM_DELETE_LIST)) {
//       this.props.onDeleteList(listId);
//       this.hideEditTitle();
//       this.setState({ newItemName: '' });
//       this.props.showLists();
//     }
//   };

//   /* handle editing an item */
//   onClickItem = (list_id, id, name, checked) => () => {
//     this.handleEditItem(list_id, id, name, checked);
//   };

//   onKeyPressItem = (list_id, id, name, checked) => (e) => {
//     if (e.key === 'Enter') {
//       this.handleEditItem(list_id, id, name, checked);
//     }
//   };

//   handleEditItem = (list_id, id, name, checked) => {
//     if (isEmptyString(name)) {
//       return;
//     }
//     this.props.onEditItem(list_id, id, name, checked);
//     this.props.onEditList(list_id, this.props.list.title, new Date());
//     this.hideItemToEdit();
//   };

//   setItemToEdit = (editItemId, editItemName) => () => {
//     this.setState({ editItemId, editItemName });
//   };

//   hideItemToEdit = () => {
//     this.setState({
//       editItemId: -1,
//       editItemName: '',
//     });
//   };

//   onChangeEditItemName = (e) => {
//     this.setState({ editItemName: e.target.value });
//   };

//   /* handle deleting an item */
//   handleDeleteItem = (listId, itemId) => () => {
//     if (window.confirm(this.props.str.CONFIRM_DELETE_ITEM)) {
//       this.props.onDeleteItem(itemId);
//       this.props.onEditList(listId, this.props.list.title, new Date());
//     }
//   };

//   /* handle adding an item */
//   onClickAddItem = (listId, name) => () => {
//     this.handleAddItem(listId, name);
//   };

//   onKeyPressAddItem = (listId, name) => (e) => {
//     if (e.key === 'Enter') {
//       this.handleAddItem(listId, name);
//     }
//   };

//   handleAddItem = (listId, name) => {
//     if (isEmptyString(name)) {
//       return;
//     }
//     this.props.onAddItem(listId, name);
//     this.props.onEditList(listId, this.props.list.title, new Date());
//     this.setState({ newItemName: '' });
//   };

//   onChangeNewItemName = (e) => {
//     this.setState({ newItemName: e.target.value });
//   };

//   render() {
//     const { list, items, str } = this.props;
//     if (!list) return null;
//     const { isEditTitle, newListTitle, newItemName, editItemId, editItemName } = this.state;
//     const { show, text } = this.state.notification;

//     const itemsComponent = items.map((item) => {
//       if (item.id === editItemId) {
//         return (
//           <EditItem
//             key={item.id}
//             item={item}
//             value={editItemName}
//             onChange={this.onChangeEditItemName}
//             onClick={this.onClickItem}
//             onKeyPress={this.onKeyPressItem}
//             onCloseEdit={this.hideItemToEdit}
//           />
//         );
//       } else {
//         return (
//           <Item
//             key={item.id}
//             item={item}
//             onClickItem={this.onClickItem}
//             onKeyPressItem={this.onKeyPressItem}
//             onClickDelete={this.handleDeleteItem}
//             setTextToCopy={this.setTextToCopy}
//             setItemToEdit={this.setItemToEdit}
//           />
//         );
//       }
//     });

//     return (
//       <div className="fl w-75-l w-two-thirds-m w-100 pa3">
//         <ToastNotification show={show} text={text} />
//         <Button onClick={this.handleDeleteList(list.id)} color="red">
//           <FontAwesomeIcon icon={faTrashAlt} /> {str.DELETE_LIST}
//         </Button>
//         {isEditTitle ? (
//           <div className="mv4">
//             <input
//               type="text"
//               value={newListTitle}
//               onChange={this.onChangeListTitle}
//               onKeyDown={this.onKeyPressEditTitle(list.id, newListTitle)}
//               placeholder={str.LIST_TITLE}
//               className="pa3 b--none w-60 w-auto-l"
//               maxLength={MAX_LENGTH_LIST}
//               ref={this.editTitle}
//             />
//             <Button
//               onClick={this.onClickEditTitle(list.id, newListTitle)}
//               color="green"
//               title={str.SAVE}
//               classes="w-20 w-auto-l"
//             >
//               <FontAwesomeIcon icon={faCheck} />
//             </Button>
//             <Button onClick={this.hideEditTitle} color="red" title={str.CLOSE_EDIT} classes="w-20 w-auto-l">
//               <FontAwesomeIcon icon={faTimes} />
//             </Button>
//           </div>
//         ) : (
//           <div className="mv4">
//             <Button onClick={this.showEditTitle} color="blue" title={str.EDIT_TITLE}>
//               <FontAwesomeIcon icon={faEdit} />
//             </Button>
//             <h2 className="f3 mv0 ml3 di list-title">
//               {list.title.length === 0 ? str.NO_TITLE : list.title}
//             </h2>
//           </div>
//         )}
//         <p>{list.modified.toLocaleDateString()}</p>
//         <ul className="ma0 pa0 list">{items.length > 0 ? itemsComponent : <p>{str.NO_ITEMS}</p>}</ul>
//         <AddItem
//           listId={list.id}
//           newItemName={newItemName}
//           onSetNewItemName={this.onChangeNewItemName}
//           onClickAddItem={this.onClickAddItem}
//           onKeyPressAddItem={this.onKeyPressAddItem}
//         />
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);

export default function CurrentList({ showLists }) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);
  const dispatch = useContext(StateDispatchContext);

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const [notification, setNotification] = useState({ show: false, text: '' });

  const editTitleRef = useRef(null); //<HTMLInputElement | null>

  useEffect(() => {
    hideEditTitle();
  }, [state.currentListId]);

  if (state.currentListId === null) return null;
  const list = selectCurrentList(state);

  function showEditTitle() {
    setIsEditTitle(true);
    setNewTitle(list.title);
    setTimeout(() => editTitleRef.current.focus());
  }

  function hideEditTitle() {
    setIsEditTitle(false);
    setNewTitle('');
  }

  function handleEditTitle() {
    dispatch({
      type: 'list edited',
      payload: {
        id: list.id,
        itemsIds: list.itemsIds,
        title: newTitle,
        modified: new Date(),
      },
    });
    hideEditTitle();
  }

  function handleDeleteList() {
    if (window.confirm(translation.CONFIRM_DELETE_LIST)) {
      dispatch({ type: 'list deleted', payload: list.id });
      hideEditTitle();
      showLists();
    }
  }

  function copyItemText(text) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setNotification({ show: true, text: `${translation.COPIED}: ${text}` });
      setTimeout(() => {
        setNotification({ show: false, text: '' });
      }, 3000);
    });
  }

  return (
    <div className="fl w-75-l w-two-thirds-m w-100 pa3">
      <ToastNotification show={notification.show} text={notification.text} />
      <Button onClick={handleDeleteList} color="red">
        <FontAwesomeIcon icon={faTrashAlt} /> {translation.DELETE_LIST}
      </Button>
      {isEditTitle ? (
        <div className="mv4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEditTitle()}
            placeholder={translation.LIST_TITLE}
            className="pa3 b--none w-60 w-auto-l"
            maxLength={MAX_LENGTH_LIST}
            ref={editTitleRef}
          />
          <Button onClick={handleEditTitle} color="green" title={translation.SAVE} classes="w-20 w-auto-l">
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button onClick={hideEditTitle} color="red" title={translation.CLOSE_EDIT} classes="w-20 w-auto-l">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      ) : (
        <div className="mv4">
          <Button onClick={showEditTitle} color="blue" title={translation.EDIT_TITLE}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <h2 className="f3 mv0 ml3 di list-title">
            {list.title.length === 0 ? translation.NO_TITLE : list.title}
          </h2>
        </div>
      )}
      <p>{list.modified.toLocaleDateString()}</p>
    </div>
  );
}
