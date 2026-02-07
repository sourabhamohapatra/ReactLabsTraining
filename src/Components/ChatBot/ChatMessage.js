import React from 'react';
import classes from './ChatMessage.module.css';

const ChatMessage = ({ message }) => {
  const { text, sender, timestamp } = message;
  const isUser = sender === 'user';
  
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Simple markdown-like formatting
  const formatText = (text) => {
    // Split by newlines to handle line breaks
    return text.split('\n').map((line, index) => {
      // Handle bullet points
      if (line.trim().startsWith('•')) {
        return (
          <div key={index} className={classes.bulletPoint}>
            {line}
          </div>
        );
      }
      // Regular line
      return line ? <div key={index}>{line}</div> : <br key={index} />;
    });
  };

  return (
    <div className={`${classes.messageWrapper} ${isUser ? classes.userWrapper : classes.botWrapper}`}>
      {!isUser && <div className={classes.avatar}>🤖</div>}
      
      <div className={classes.messageContent}>
        <div className={`${classes.bubble} ${isUser ? classes.userBubble : classes.botBubble}`}>
          <div className={classes.text}>{formatText(text)}</div>
        </div>
        <div className={classes.timestamp}>{formatTime(timestamp)}</div>
      </div>
      
      {isUser && <div className={classes.avatar}>👤</div>}
    </div>
  );
};

export default ChatMessage;
