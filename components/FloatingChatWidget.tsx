'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  ArrowLeft, 
  Bot, 
  Loader2,
  Mail
} from 'lucide-react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const CONTACT_LINKS = {
  instagram: 'https://www.instagram.com/sitenest_agency',
  email: 'https://mail.google.com/mail/?view=cm&fs=1&to=sitenest.ua@gmail.com'
};

const WIDGET_TRANSLATIONS = {
  uk: {
    helpButton: 'Потрібна допомога? Залиште повідомлення',
    helpHeader: 'SiteNest Асистент',
    statusOnline: 'В мережі • AI-помічник',
    chatPlaceholder: 'Напишіть повідомлення...',
    messengerTitle: 'Швидкий зв\'язок:',
    instagram: 'Instagram',
    email: 'Пошта',
    startChat: 'Чат з AI-асистентом',
    backToLinks: 'Назад до контактів',
    typing: 'AI думає...',
    welcomeMessage: 'Привіт! Я AI-асистент SiteNest. Я знаю все про наші послуги, ціни та команду. Яку задачу ви хочете вирішити або який сайт плануєте розробити?',
  },
  en: {
    helpButton: 'Need help? Leave a message',
    helpHeader: 'SiteNest Assistant',
    statusOnline: 'Online • AI Assistant',
    chatPlaceholder: 'Type a message...',
    messengerTitle: 'Quick Contact:',
    instagram: 'Instagram',
    email: 'Email',
    startChat: 'Chat with AI Assistant',
    backToLinks: 'Back to Contacts',
    typing: 'AI is thinking...',
    welcomeMessage: 'Hello! I am the SiteNest AI assistant. I know everything about our prices, services, and team. What kind of project or website are you planning to build?',
  }
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingChatWidget() {
  const { lang } = useLanguage();
  const t = WIDGET_TRANSLATIONS[lang as 'uk' | 'en'] || WIDGET_TRANSLATIONS.uk;

  const [isOpen, setIsOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message when chat becomes active or language changes
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: t.welcomeMessage
      }
    ]);
  }, [lang, t.welcomeMessage]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatActive && isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isChatActive, isOpen]);

  // Auto show a subtle notification badge after 10 seconds of landing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotificationBadge(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setShowNotificationBadge(false);
    if (isOpen) {
      setIsChatActive(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessageText = inputValue.trim();
    setInputValue('');

    // Append user message
    const updatedMessages = [...messages, { role: 'user', content: userMessageText } as Message];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages,
          lang
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: data.content || 'Error generating response.' 
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: lang === 'uk' 
            ? 'Вибачте, виникла помилка підключення. Будь ласка, спробуйте ще раз або зв\'яжіться з нами поштою.'
            : 'Sorry, a connection error occurred. Please try again or reach out to us via email.'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="floating-widget-container">
      {/* Expanded Chat Window */}
      <div className={`widget-chat-window ${isChatActive && isOpen ? 'active' : ''}`}>
        <div className="chat-window-header">
          <div className="chat-header-profile">
            <div className="chat-profile-avatar">
              <Bot size={20} />
              <span className="online-indicator"></span>
            </div>
            <div className="chat-header-info">
              <h4>{t.helpHeader}</h4>
              <span>{t.statusOnline}</span>
            </div>
          </div>
          <button className="chat-close-btn" onClick={toggleWidget} aria-label="Close Chat">
            <X size={18} />
          </button>
        </div>

        {/* Messages list */}
        <div className="chat-window-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-bubble ${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message-bubble assistant">
              <div className="typing-dots">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form className="chat-window-input-bar" onSubmit={handleSendMessage}>
          <button 
            type="button" 
            className="chat-close-btn" 
            onClick={() => setIsChatActive(false)} 
            title={t.backToLinks}
          >
            <ArrowLeft size={18} />
          </button>
          <textarea
            ref={inputRef as any}
            className="chat-input-field"
            placeholder={t.chatPlaceholder}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Auto-expand textarea
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
            }}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            rows={1}
          />
          <button 
            type="submit" 
            className="chat-send-btn" 
            disabled={!inputValue.trim() || isTyping}
          >
            {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>
      </div>

      {/* Social Links Menu (Instagram, Email, AI Chat) */}
      <div className={`widget-social-menu ${isOpen && !isChatActive ? 'active' : ''}`}>
        {/* Instagram */}
        <a 
          href={CONTACT_LINKS.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-menu-item instagram"
          title={t.instagram}
        >
          <InstagramIcon />
        </a>
        
        {/* Email */}
        <a 
          href={CONTACT_LINKS.email} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-menu-item email"
          title={t.email}
        >
          <Mail size={20} />
        </a>

        {/* AI Chat button */}
        <button 
          onClick={() => setIsChatActive(true)} 
          className="social-menu-item ai-chat-btn"
          title={t.startChat}
        >
          <Bot size={20} />
        </button>
      </div>

      {/* Floating Action Button with Optional Greeting Text */}
      <div className="widget-fab-wrapper">
        {!isOpen && (
          <button className="widget-fab-label" onClick={toggleWidget}>
            {t.helpButton}
          </button>
        )}
        <button 
          className={`widget-fab ${isOpen ? 'active' : ''}`} 
          onClick={toggleWidget}
          aria-label="Contact Widget"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          {showNotificationBadge && !isOpen && (
            <span 
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '12px',
                height: '12px',
                background: 'var(--color-pink)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--color-pink)'
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
