import React, { useState, useRef, useEffect } from 'react';
import classes from './ChatInput.module.css';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickActions = [
    { label: '👋 Hello', value: 'Hello!' },
    { label: '❓ Help', value: 'What can you do?' },
    { label: '😄 Joke', value: 'Tell me a joke' },
  ];

  return (
    <div className={classes.inputContainer}>
      <div className={classes.quickActions}>
        {quickActions.map((action, index) => (
          <button
            key={index}
            type="button"
            className={classes.quickButton}
            onClick={() => {
              setMessage(action.value);
              inputRef.current?.focus();
            }}
            disabled={disabled}
          >
            {action.label}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? 'AI is typing...' : 'Type your message...'}
          className={classes.input}
          disabled={disabled}
          maxLength={500}
        />
        <button
          type="submit"
          className={classes.sendButton}
          disabled={!message.trim() || disabled}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
