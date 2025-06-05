import { LocaleContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MouseEventHandler, useContext } from 'react';
import './FloatingButton.css';

export default function FloatingButton({ showAddList }: { showAddList: MouseEventHandler<HTMLDivElement> }) {
  const translation = useContext(LocaleContext);

  return (
    <div
      onClick={showAddList}
      title={translation.ADD_LIST}
      className="floating-button w3 h3 br-100 fixed z-1 bottom-1 right-1 bg-green hover-bg-dark-green white pointer shadow-3 tc lh-copy"
    >
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
}
