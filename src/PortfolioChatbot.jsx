import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, RotateCcw } from 'lucide-react';

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const CHAT_ENDPOINT = 'https://chatbot.moses.it.com/chat';

  const welcomeMessages = [
    "Hello. I'm Moses's AI assistant.",
    "How can I help you today?"
  ];

  const quickButtons = [
    { label: 'About', value: 'tell me about moses' },
    { label: 'Skills', value: 'what are moses technical skills' },
    { label: 'Experience', value: 'tell me about moses work experience' },
    { label: 'Contact', value: 'how can I contact moses' }
  ];

  const parseMarkdown = (text) => {
    if (!text) return '';
    
    let formatted = text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>');
    
    if (!formatted.includes('<p>')) {
      formatted = `<p>${formatted}</p>`;
    }
    
    formatted = formatted
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>')
      .replace(/(?<!_)_(?!_)([^_]+)_(?!_)/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-white/5 p-3 rounded my-2 overflow-x-auto border border-white/10"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-2 py-1 rounded text-xs">$1</code>')
      .replace(/^### (.*$)/gm, '<h3 class="text-base font-light mt-3 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-light mt-3 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-light mt-3 mb-2">$1</h1>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline hover:text-white/80 transition-colors">$1</a>')
      .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="underline hover:text-white/80 transition-colors">$1</a>')
      .replace(/(\+?[\d\s\-()]{10,})/g, '<a href="tel:$1" class="underline hover:text-white/80 transition-colors">$1</a>')
      .replace(/^[\s]*[-*]\s+(.*)$/gm, '<li class="ml-4 mb-1 relative"><span class="absolute -left-4">•</span>$1</li>')
      .replace(/^[\s]*(\d+)\.\s+(.*)$/gm, '<li class="ml-6 mb-1 list-decimal">$2</li>');
    
    formatted = formatted
      .replace(/(<li class="ml-4[^>]*>.*?<\/li>\s*)+/gs, '<ul class="my-2 space-y-1">$&</ul>')
      .replace(/(<li class="ml-6[^>]*>.*?<\/li>\s*)+/gs, '<ol class="my-2 space-y-1 list-decimal ml-4">$&</ol>');
    
    return formatted;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownWelcome && !isOpen) {
        setUnreadCount(1);
        setHasShownWelcome(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasShownWelcome, isOpen]);

  const addBotMessage = (text) => {
    const botMessage = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    
    if (!isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: messageToSend,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setTimeout(() => {
        const botResponse = data.answer || "I'm sorry, I couldn't process your request right now.";
        addBotMessage(botResponse);
        setIsTyping(false);
      }, 800);

    } catch (error) {
      console.error('Chat API error:', error);
      
      setTimeout(() => {
        addBotMessage("Sorry, I'm experiencing technical difficulties. Please try again later or contact Moses directly.");
        setIsTyping(false);
      }, 800);
    }
  };

  const handleQuickButtonClick = async (buttonValue) => {
    const userMessage = {
      id: Date.now(),
      text: buttonValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: buttonValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setTimeout(() => {
        const botResponse = data.answer || "I'm sorry, I couldn't process your request right now.";
        addBotMessage(botResponse);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Chat API error:', error);
      
      setTimeout(() => {
        let response = "Sorry, I'm having trouble connecting. ";
        switch (buttonValue) {
          case 'tell me about moses':
            response += "Moses is a passionate Full-Stack Developer and AI Researcher.";
            break;
          case 'what are moses technical skills':
            response += "Moses specializes in React, Node.js, Python, and cloud technologies.";
            break;
          case 'tell me about moses work experience':
            response += "Moses has extensive experience as a Senior Full-Stack Developer.";
            break;
          case 'how can I contact moses':
            response += "Please try again later for contact information.";
            break;
          default:
            response += "Please try again later.";
        }
        
        addBotMessage(response);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
    
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage(welcomeMessages[0]);
      }, 500);
      setTimeout(() => {
        addBotMessage(welcomeMessages[1]);
      }, 1500);
    }
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  const resetChat = () => {
    setMessages([]);
    setUnreadCount(0);
    setHasShownWelcome(false);
    setTimeout(() => {
      addBotMessage(welcomeMessages[0]);
    }, 300);
    setTimeout(() => {
      addBotMessage(welcomeMessages[1]);
    }, 800);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 font-light">
        {/* Chat Window */}
        {isOpen && !isMinimized && (
          <div className="mb-4 w-96 h-[500px] bg-black border border-white/10 overflow-hidden animate-fadeIn flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white/60" />
                </div>
                <div>
                  <h3 className="text-sm tracking-wider">Moses AI</h3>
                  <p className="text-xs text-white/40 tracking-wider uppercase">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="p-2 hover:bg-white/5 transition-colors duration-300"
                  title="Reset"
                >
                  <RotateCcw size={14} className="text-white/40 hover:text-white/60 transition-colors" />
                </button>
                <button
                  onClick={minimizeChat}
                  className="p-2 hover:bg-white/5 transition-colors duration-300"
                  title="Minimize"
                >
                  <Minimize2 size={14} className="text-white/40 hover:text-white/60 transition-colors" />
                </button>
                <button
                  onClick={closeChat}
                  className="p-2 hover:bg-white/5 transition-colors duration-300"
                  title="Close"
                >
                  <X size={14} className="text-white/40 hover:text-white/60 transition-colors" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex animate-messageIn ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 border flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'border-white/40' 
                        : 'border-white/20'
                    }`}>
                      {message.sender === 'user' ? 
                        <User size={12} className="text-white/60" /> : 
                        <Bot size={12} className="text-white/40" />
                      }
                    </div>
                    <div className={`${
                      message.sender === 'user'
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-transparent'
                    } px-4 py-3`}>
                      {message.sender === 'bot' ? (
                        <div 
                          className="text-xs text-white/60 leading-relaxed markdown-content tracking-wide"
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
                        />
                      ) : (
                        <p className="text-xs text-white/80 leading-relaxed whitespace-pre-wrap tracking-wide">{message.text}</p>
                      )}
                      <p className={`text-xs mt-2 tracking-wider uppercase ${
                        message.sender === 'user' ? 'text-white/40' : 'text-white/30'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-messageIn">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 border border-white/20 flex items-center justify-center">
                      <Bot size={12} className="text-white/40" />
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-white/40 animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-white/40 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-white/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Buttons */}
            {messages.length <= 2 && (
              <div className="px-6 pb-4 flex-shrink-0">
                <div className="flex flex-wrap gap-2">
                  {quickButtons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickButtonClick(button.value)}
                      className="text-xs px-4 py-2 border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all duration-300 tracking-wider uppercase"
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 border-t border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type here..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent border border-white/10 px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-3 border border-white/20 hover:border-white/40 disabled:border-white/10 transition-all duration-300 disabled:cursor-not-allowed"
                >
                  <Send size={14} className="text-white/60" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Minimized Chat Indicator */}
        {isMinimized && (
          <div className="mb-4 animate-fadeIn">
            <button
              onClick={openChat}
              className="bg-black border border-white/10 px-6 py-3 text-xs text-white hover:border-white/30 transition-all duration-300 flex items-center gap-3 tracking-wider uppercase"
            >
              <Bot size={14} className="text-white/60" />
              <span>Moses AI</span>
              {unreadCount > 0 && (
                <span className="bg-white text-black text-xs px-2 py-0.5 font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Main Chat Button */}
        {!isOpen && !isMinimized && (
          <button
            onClick={openChat}
            className="relative bg-white text-black w-14 h-14 flex items-center justify-center hover:bg-white/90 transition-all duration-300"
          >
            <MessageCircle size={20} />
            
            {/* Notification Badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 flex items-center justify-center font-medium border border-black">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-messageIn {
          animation: messageIn 0.4s ease-out;
        }

        /* Custom Scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Markdown Content Styles */
        .markdown-content p {
          margin-bottom: 8px;
        }
        
        .markdown-content p:last-child {
          margin-bottom: 0;
        }
        
        .markdown-content strong {
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .markdown-content em {
          font-style: italic;
        }
        
        .markdown-content h1, .markdown-content h2, .markdown-content h3 {
          font-weight: 300;
          line-height: 1.4;
        }
        
        .markdown-content ul {
          margin: 8px 0;
        }
        
        .markdown-content ol {
          margin: 8px 0;
        }
        
        .markdown-content li {
          line-height: 1.6;
        }
        
        .markdown-content a {
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        
        .markdown-content a:hover {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .markdown-content code {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          font-size: 0.75rem;
          font-family: 'Courier New', Courier, monospace;
        }
        
        .markdown-content pre {
          background-color: rgba(255, 255, 255, 0.05);
          padding: 12px;
          margin: 8px 0;
          overflow-x: auto;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .markdown-content pre code {
          background: none;
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default PortfolioChatbot;