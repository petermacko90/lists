import React from 'react';
import './Navigation.css';

const Navigation = ({ showAddList }) => {
  return (
    <nav className="bg-yellow shadow-2 mb2">
      <h1 className="dib f2 pa3 mv0">Lists</h1>
      <button type="button" onClick={showAddList}
      className="b--none ml2 bg-transparent b pointer add-list">
        <span className="f2">+</span>
        <span className="f3 dn di-ns"> Add list</span>
      </button>
    </nav>
  );
}

export default Navigation;
