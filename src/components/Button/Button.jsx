import React from 'react';
import './Button.css';

const Button = ({ onClick, color, children, title, classes, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`black b--none pa3 b pointer dim bg-${color} ${classes ? classes : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
