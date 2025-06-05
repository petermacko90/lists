import { useState, useRef, useContext, useEffect } from 'react';
import ToastNotification from '../ToastNotification/ToastNotification';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './CurrentList.css';
import { MAX_LENGTH_LIST } from '../../constants/constants';
import { LocaleContext, StateContext, StateDispatchContext } from '../../context';
import { selectCurrentList } from '../../reducers/selectors';
import Items from '../Items/Items';

export default function CurrentList({ showLists }: { showLists: () => void }) {
  const translation = useContext(LocaleContext);

  const state = useContext(StateContext);
  const dispatch = useContext(StateDispatchContext);

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const [notification, setNotification] = useState({ show: false, text: '' });

  const editTitleRef = useRef<HTMLInputElement | null>(null);

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

  function copyItemText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
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
      <Items copyItemText={copyItemText} />
    </div>
  );
}
