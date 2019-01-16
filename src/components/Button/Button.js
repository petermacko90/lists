import React from 'react';
import './Button.css';

const Button = ({ onClick, color, children, title, classes, disabled }) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
    className={`white b--none pa3 b pointer bg-${color} hover-bg-dark-${color} ${classes ? classes : ''}`}>
      {children}
    </button>
  );
}

export default Button;
