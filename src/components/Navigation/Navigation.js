import React from 'react';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assests/list32.png';
import { STR_ADD_LIST } from '../../constants/strings';

const Navigation = ({ showAddList }) => {
  return (
    <nav className="bg-yellow shadow-2 mb2">
      <img src={logo} alt="Lists" className="ma3 v-mid" />
      <button type="button" onClick={showAddList}
      className="b--none ml2 bg-transparent f3 b pointer v-mid add-list">
        <span><FontAwesomeIcon icon={faPlus} /></span>
        <span className="dn di-ns"> {STR_ADD_LIST}</span>
      </button>
    </nav>
  );
}

export default Navigation;
