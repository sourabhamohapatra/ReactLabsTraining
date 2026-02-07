import React from 'react';
import classes from './ChatBotButton.module.css';

const ChatBotButton = ({ onClick }) => {
  return (
    <button className={classes.fabButton} onClick={onClick} title="Open AI Assistant">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span className={classes.badge}>AI</span>
    </button>
  );
};

export default ChatBotButton;
