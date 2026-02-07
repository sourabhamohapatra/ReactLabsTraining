import React, { createContext, useState, useEffect, useCallback } from 'react';

const ChatBotContext = createContext({
  messages: [],
  isTyping: false,
  sendMessage: (message) => {},
  clearHistory: () => {},
  exportChat: () => {},
});

export const ChatBotProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Generate intelligent AI responses
  const generateAIResponse = (userMessage) => {
    const messageLower = userMessage.toLowerCase();
    
    // Greeting responses
    if (messageLower.match(/^(hi|hello|hey|greetings)/)) {
      return 'Hello! 👋 I\'m your AI assistant. How can I help you today?';
    }
    
    // Help requests
    if (messageLower.includes('help') || messageLower.includes('what can you do')) {
      return 'I can help you with:\n\n' +
             '• Answering general questions\n' +
             '• Providing recommendations\n' +
             '• Explaining concepts\n' +
             '• Having casual conversations\n\n' +
             'Just ask me anything! 💡';
    }
    
    // Time-related queries
    if (messageLower.includes('time') || messageLower.includes('date')) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()} and today's date is ${now.toLocaleDateString()}. ⏰`;
    }
    
    // React questions
    if (messageLower.includes('react')) {
      return 'React is a powerful JavaScript library for building user interfaces! ' +
             'It uses a component-based architecture and virtual DOM for efficient rendering. ' +
             'Would you like to know more about specific React features? 🚀';
    }
    
    // JavaScript questions
    if (messageLower.includes('javascript') || messageLower.includes('js')) {
      return 'JavaScript is an essential programming language for web development! ' +
             'It runs in browsers and on servers (Node.js), enabling dynamic and interactive web applications. 💻';
    }
    
    // Weather (mock)
    if (messageLower.includes('weather')) {
      return 'I don\'t have real-time weather data, but I can tell you it\'s always sunny in the coding world! ☀️ ' +
             'For actual weather information, try a weather API service.';
    }
    
    // Jokes
    if (messageLower.includes('joke')) {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
        'Why did the developer go broke? Because they used up all their cache! 💰',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡',
        'Why do Java developers wear glasses? Because they don\'t C#! 👓'
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Gratitude
    if (messageLower.match(/^(thanks|thank you|thx)/)) {
      return 'You\'re welcome! Feel free to ask me anything else. 😊';
    }
    
    // Goodbye
    if (messageLower.match(/^(bye|goodbye|see you)/)) {
      return 'Goodbye! Have a great day! 👋 Feel free to come back anytime.';
    }
    
    // Generic responses based on message length
    if (userMessage.length < 10) {
      return 'Could you please provide more details? I\'m here to help! 🤔';
    }
    
    // Default intelligent response
    const responses = [
      `That's an interesting point about "${userMessage}". Let me help you with that! 💭`,
      `I understand you're asking about "${userMessage}". While I don't have specific information about that, I'm here to assist you! 🤝`,
      `Thanks for sharing that! Could you tell me more about what you'd like to know? 📝`,
      `Great question! I'm processing that and learning from our conversation. Is there anything specific you'd like help with? 🧠`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = useCallback((messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time with realistic delay
    const thinkingTime = 1000 + Math.random() * 1500; // 1-2.5 seconds
    
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      
      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, thinkingTime);
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  }, []);

  const exportChat = useCallback(() => {
    const chatText = messages
      .map((msg) => {
        const time = new Date(msg.timestamp).toLocaleTimeString();
        return `[${time}] ${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`;
      })
      .join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [messages]);

  const contextValue = {
    messages,
    isTyping,
    sendMessage,
    clearHistory,
    exportChat,
  };

  return (
    <ChatBotContext.Provider value={contextValue}>
      {props.children}
    </ChatBotContext.Provider>
  );
};

export default ChatBotContext;
