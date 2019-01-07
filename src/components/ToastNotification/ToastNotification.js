import React from 'react';
import './ToastNotification.css';

const ToastNotification = ({ show, text }) => {
  return (
    <div className={"w5 fixed z-2 pa3 tc bg-green truncate shadow-3 toast" + (show ? ' show' : '')}>
      {text}
    </div>
  );
}

export default ToastNotification;
