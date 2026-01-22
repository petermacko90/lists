import { LocaleContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MouseEventHandler, useContext } from 'react';
import './AddListButton.css';

export default function AddListButton({
  showAddList,
}: {
  showAddList: MouseEventHandler<HTMLButtonElement>;
}) {
  const translation = useContext(LocaleContext);

  return (
    <button
      onClick={showAddList}
      title={translation.ADD_LIST}
      className="add-list-button w3 h3 br-100 bn fixed z-1 bottom-1 right-1 bg-green hover-bg-dark-green white pointer shadow-3 tc lh-copy"
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}
