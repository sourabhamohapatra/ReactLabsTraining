import React, { useContext, useRef, useEffect } from 'react';
import ChatBotContext from '../../store/ChatBotContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import classes from './ChatBot.module.css';

const ChatBot = ({ onClose }) => {
  const { messages, isTyping, sendMessage, clearHistory, exportChat } = useContext(ChatBotContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearHistory();
    }
  };

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.chatWindow} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={classes.header}>
          <div className={classes.headerInfo}>
            <div className={classes.botAvatar}>🤖</div>
            <div className={classes.headerText}>
              <h3>AI Assistant</h3>
              <span className={classes.status}>
                <span className={classes.statusDot}></span>
                Online
              </span>
            </div>
          </div>
          <div className={classes.headerActions}>
            {messages.length > 0 && (
              <>
                <button
                  className={classes.iconButton}
                  onClick={exportChat}
                  title="Export chat"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button
                  className={classes.iconButton}
                  onClick={handleClearChat}
                  title="Clear history"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </>
            )}
            <button
              className={classes.closeButton}
              onClick={onClose}
              title="Close chat"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className={classes.messagesArea}>
          {messages.length === 0 ? (
            <div className={classes.welcomeScreen}>
              <div className={classes.welcomeIcon}>🤖</div>
              <h2>Welcome to AI Assistant!</h2>
              <p>I'm here to help you with questions, provide information, and have conversations.</p>
              <div className={classes.features}>
                <div className={classes.feature}>
                  <span className={classes.featureIcon}>💬</span>
                  <span>Natural Conversations</span>
                </div>
                <div className={classes.feature}>
                  <span className={classes.featureIcon}>🧠</span>
                  <span>Smart Responses</span>
                </div>
                <div className={classes.feature}>
                  <span className={classes.featureIcon}>💾</span>
                  <span>Chat History Saved</span>
                </div>
                <div className={classes.feature}>
                  <span className={classes.featureIcon}>⚡</span>
                  <span>Quick Actions</span>
                </div>
              </div>
              <p className={classes.startPrompt}>Start a conversation below! 👇</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatBot;
