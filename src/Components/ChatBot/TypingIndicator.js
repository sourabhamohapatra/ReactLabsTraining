import React from 'react';
import classes from './TypingIndicator.module.css';

const TypingIndicator = () => {
  return (
    <div className={classes.typingIndicator}>
      <div className={classes.avatar}>🤖</div>
      <div className={classes.bubbleContainer}>
        <div className={classes.bubble}>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
