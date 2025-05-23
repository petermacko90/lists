import React from 'react';

const ToastNotification = ({ show, text }) => {
  return (
    <div className={"truncate toast" + (show ? ' show' : '')}>
      {text}
    </div>
  );
}

export default ToastNotification;
