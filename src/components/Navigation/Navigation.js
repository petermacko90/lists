import React from 'react';
import './Navigation.css';
import { LocaleConsumer } from '../../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assests/list32.png';

const Navigation = ({ showAddList }) => {
  return (
    <LocaleConsumer>
      {str =>
        <nav className="bg-yellow shadow-2 mb2 flex justify-between">
          <div>
            <img src={logo} alt="logo" className="ma3 v-mid" />
            <h1 className="dib f2 mv2 v-mid">Lists</h1>
          </div>
          <button
            type="button"
            onClick={showAddList}
            className="b--none ml4 mr3 bg-transparent f3 b pointer v-mid add-list"
            aria-label={str.ADD_LIST}
          >
            <span><FontAwesomeIcon icon={faPlus} /></span>
            <span className="dn di-ns"> {str.ADD_LIST}</span>
          </button>
        </nav>
      }
    </LocaleConsumer>
  );
}

export default Navigation;
