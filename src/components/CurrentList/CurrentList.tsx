import { useState, useRef, useContext, useEffect } from 'react';
import ToastNotification from '../ToastNotification/ToastNotification';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './CurrentList.css';
import { LocaleContext, StateContext, StateDispatchContext } from '../../context';
import { selectCurrentList } from '../../reducers/selectors';
import Items from '../Items/Items';
import { EditListTitle } from './EditListTitle';
import { Dialog } from '../Dialog/Dialog';

export default function CurrentList({ showLists }: { showLists: () => void }) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);
  const dispatch = useContext(StateDispatchContext);

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [notification, setNotification] = useState({ show: false, text: '' });

  const editTitleRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    hideEditTitle();
  }, [state.currentListId]);

  if (state.currentListId === null) return null;
  const list = selectCurrentList(state);

  function showEditTitle() {
    setIsEditTitle(true);
    setNewTitle(list.title);
    setTimeout(() => editTitleRef.current?.focus());
  }

  function hideEditTitle() {
    setIsEditTitle(false);
    setNewTitle('');
  }

  function handleEditTitle(newTitle: string) {
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

  function showModal() {
    setShowDialog(true);
    setTimeout(() => dialogRef.current?.showModal());
  }

  function handleDialogOnClose(returnValue: string) {
    if (returnValue === 'confirm') {
      dispatch({ type: 'list deleted', payload: list.id });
      hideEditTitle();
      showLists();
    }
    setShowDialog(false);
  }

  function copyItemText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setNotification({ show: true, text: `${translation.COPIED}: ${text}` });
      setTimeout(() => {
        setNotification({ show: false, text: '' });
      }, 3000);
    });
  }

  return (
    <div className="w-75-l w-two-thirds-m w-100 pa3">
      <ToastNotification show={notification.show} text={notification.text} />
      <Button onClick={showModal} color="red">
        <FontAwesomeIcon icon={faTrashAlt} /> {translation.DELETE_LIST}
      </Button>
      <div className="mv4">
        {isEditTitle ? (
          <EditListTitle
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            handleEditTitle={handleEditTitle}
            hideEditTitle={hideEditTitle}
            editTitleRef={editTitleRef}
          />
        ) : (
          <>
            <Button onClick={showEditTitle} color="blue" title={translation.EDIT_TITLE}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <h2 className="f3 mv0 ml3 di list-title">
              {list.title.length === 0 ? translation.NO_TITLE : list.title}
            </h2>
          </>
        )}
      </div>
      <p>{list.modified.toLocaleDateString()}</p>
      <Items copyItemText={copyItemText} />
      {showDialog && (
        <Dialog ref={dialogRef} text={translation.CONFIRM_DELETE_LIST} onClose={handleDialogOnClose} />
      )}
    </div>
  );
}
