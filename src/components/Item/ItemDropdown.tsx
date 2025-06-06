import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LocaleContext, StateDispatchContext } from '../../context';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ItemType } from '../../reducers/types';
import './ItemDropdown.css';

export default function ItemDropdown({
  item,
  setTextToCopy,
  setItemToEdit,
}: {
  item: ItemType;
  setTextToCopy: (text: string) => void;
  setItemToEdit: Dispatch<SetStateAction<string>>;
}) {
  const translation = useContext(LocaleContext);

  const dispatch = useContext(StateDispatchContext);

  function handleItemCheck() {
    dispatch({
      type: 'item edited',
      payload: {
        id: item.id,
        text: item.text,
        checked: !item.checked,
      },
    });
    dispatch({ type: 'list modified date updated', payload: new Date() });
  }

  function handleItemDelete() {
    if (window.confirm(translation.CONFIRM_DELETE_ITEM)) {
      dispatch({ type: 'item deleted', payload: item.id });
      dispatch({ type: 'list modified date updated', payload: new Date() });
    }
  }

  return (
    <div className="actions-content w4 shadow-3">
      <button
        type="button"
        onClick={() => setItemToEdit(item.id)}
        className="w-100 pointer"
        title={translation.EDIT_ITEM_NAME}
      >
        <FontAwesomeIcon icon={faEdit} /> {translation.EDIT}
      </button>
      <button
        type="button"
        onClick={() => handleItemCheck()}
        className="w-100 pointer"
        title={item.checked ? translation.UNCHECK : translation.CHECK}
      >
        <FontAwesomeIcon icon={faCheck} /> {item.checked ? translation.UNCHECK : translation.CHECK}
      </button>
      <button
        type="button"
        onClick={() => handleItemDelete()}
        className="w-100 pointer"
        title={translation.DELETE_ITEM}
      >
        <FontAwesomeIcon icon={faTrashAlt} /> {translation.DELETE}
      </button>
      <button
        type="button"
        onClick={() => setTextToCopy(item.text)}
        className="w-100 pointer"
        title={translation.COPY_TO_CLIPBOARD}
      >
        <FontAwesomeIcon icon={faCopy} /> {translation.COPY_NAME}
      </button>
    </div>
  );
}
