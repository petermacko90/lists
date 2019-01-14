import React from 'react';
import './Button.css';

const Button = ({ onClick, color, children, classes, disabled }) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
    className={`white b--none ph3 ph4-ns pv3 b pointer bg-${color} hover-bg-dark-${color} ${classes ? classes : ''}`}>
      {children}
    </button>
  );
}

export default Button;
