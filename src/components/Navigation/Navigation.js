import React from 'react';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assests/list32.png';
import { STR_ADD_LIST } from '../../constants/strings';

const Navigation = ({ showAddList }) => {
  return (
    <nav className="bg-yellow shadow-2 mb2 flex justify-between">
      <div>
        <img src={logo} alt="logo" className="ma3 v-mid" />
        <h1 className="dib f2 mv2 v-mid">Lists</h1>
      </div>
      <button
        type="button"
        onClick={showAddList}
        className="b--none ml4 mr3 bg-transparent f3 b pointer v-mid add-list"
        aria-label="Add List"
      >
        <span><FontAwesomeIcon icon={faPlus} /></span>
        <span className="dn di-ns"> {STR_ADD_LIST}</span>
      </button>
    </nav>
  );
}

export default Navigation;
