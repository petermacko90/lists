import React from 'react';
import './Navigation.css';
import logo from '../../assests/list32.png';

const Navigation = ({ showAddList }) => {
  return (
    <nav className="bg-yellow shadow-2 mb2">
      <img src={logo} alt="Lists" className="ma3 v-mid" />
      <button type="button" onClick={showAddList}
      className="b--none ml2 bg-transparent b pointer v-mid add-list">
        <span className="f2">+</span>
        <span className="f3 dn di-ns"> Add list</span>
      </button>
    </nav>
  );
}

export default Navigation;
