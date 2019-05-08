import React from 'react';
import { LocaleConsumer } from '../../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const FloatingButton = ({ onClick }) => {
  return (
    <LocaleConsumer>
      {str =>
        <div
          onClick={onClick}
          title={str.ADD_LIST}
          style={{ fontSize: '2.5rem' }}
          className="w3 h3 br-100 fixed z-1 bottom-1 right-1 bg-green hover-bg-dark-green white pointer shadow-3 tc lh-copy"
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      }
    </LocaleConsumer>
  );
}

export default FloatingButton;
