import { LocaleConsumer } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MouseEventHandler } from 'react';
import './FloatingButton.css';

export default function FloatingButton({ showAddList }: { showAddList: MouseEventHandler<HTMLDivElement> }) {
  return (
    <LocaleConsumer>
      {(str) => (
        <div
          onClick={showAddList}
          title={str.ADD_LIST}
          className="floating-button w3 h3 br-100 fixed z-1 bottom-1 right-1 bg-green hover-bg-dark-green white pointer shadow-3 tc lh-copy"
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
    </LocaleConsumer>
  );
}
