import React from 'react';
import './Message.css';

const Message = ({ text }) => {
  return <p className="message">{text}</p>;
}

export default Message;
