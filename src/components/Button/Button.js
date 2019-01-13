import React from 'react';

const Button = ({ onClick, color, children, classes }) => {
  return (
    <button type="button" onClick={onClick}
    className={`white b--none ph3 ph4-ns pv3 b pointer bg-${color} hover-bg-dark-${color} ${classes}`}>
      {children}
    </button>
  );
}

export default Button;
