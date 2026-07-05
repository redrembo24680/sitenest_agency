'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
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

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const ViberIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const CONTACT_LINKS = {
  instagram: 'https://www.instagram.com/sitenest_agency',
  email: 'https://mail.google.com/mail/?view=cm&fs=1&to=sitenest.ua@gmail.com',
  telegram: 'https://t.me/sitenest_agency',
  viber: 'viber://chat?number=+380000000000',
  whatsapp: 'https://wa.me/380000000000'
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
    goToPage: 'Перейти на сторінку',
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
    goToPage: 'Go to page',
  }
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
  action?: { type: 'redirect'; path: string };
  widget?: 'messengers' | 'calculator' | 'quick_form';
}

const QUICK_REPLIES = {
  uk: [
    { label: "Яка ціна? 💰", query: "Яка ціна?" },
    { label: "Показати портфоліо 🎨", query: "Показати портфоліо" },
    { label: "Зв'язатися з вами 📞", query: "Зв'язатися з вами" }
  ],
  en: [
    { label: "What's the price? 💰", query: "What's the price?" },
    { label: "Show portfolio 🎨", query: "Show portfolio" },
    { label: "Contact you 📞", query: "Contact you" }
  ]
};

const ChatCalculator = ({ lang }: { lang: 'uk' | 'en' }) => {
  const [type, setType] = useState<'landing' | 'corporate' | 'ecommerce'>('landing');
  const [pages, setPages] = useState(1);
  const [devops, setDevops] = useState(false);
  const [seo, setSeo] = useState(false);

  const basePrice = { landing: 150, corporate: 250, ecommerce: 400 }[type];
  const pagesPrice = Math.max(0, pages - 1) * 5;
  const devopsPrice = devops ? 50 : 0;
  const seoPrice = seo ? 100 : 0;
  const total = basePrice + pagesPrice + devopsPrice + seoPrice;

  const labels = {
    uk: {
      type: 'Тип сайту:',
      landing: 'Лендінг',
      corporate: 'Корпоративний',
      ecommerce: 'Магазин',
      pages: 'Кількість сторінок: ',
      devops: 'DevOps / CDN (+$50)',
      seo: 'SEO / SMM (+$100)',
      total: 'Орієнтовна вартість:'
    },
    en: {
      type: 'Project Type:',
      landing: 'Landing',
      corporate: 'Corporate',
      ecommerce: 'E-commerce',
      pages: 'Number of pages: ',
      devops: 'DevOps / CDN (+$50)',
      seo: 'SEO / SMM (+$100)',
      total: 'Estimated Price:'
    }
  }[lang];

  return (
    <div style={{ marginTop: '15px', background: 'var(--bg-dark)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-glow)', fontSize: '13px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', color: 'var(--text-dim)', marginBottom: '5px' }}>{labels.type}</label>
        <select 
          value={type} 
          onChange={e => setType(e.target.value as any)}
          style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'var(--bg-darker)', color: 'white', border: '1px solid var(--border-glow)' }}
        >
          <option value="landing">{labels.landing} ($150)</option>
          <option value="corporate">{labels.corporate} ($250)</option>
          <option value="ecommerce">{labels.ecommerce} ($400)</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', color: 'var(--text-dim)', marginBottom: '5px' }}>
          {labels.pages} <span style={{ color: 'var(--color-blue)' }}>{pages}</span>
        </label>
        <input 
          type="range" 
          min="1" 
          max="30" 
          value={pages} 
          onChange={e => setPages(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--color-blue)' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={devops} onChange={e => setDevops(e.target.checked)} style={{ accentColor: 'var(--color-pink)' }} />
          {labels.devops}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={seo} onChange={e => setSeo(e.target.checked)} style={{ accentColor: 'var(--color-pink)' }} />
          {labels.seo}
        </label>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-slate)' }}>{labels.total}</span>
        <strong style={{ fontSize: '18px', color: 'var(--color-orange)' }}>${total}</strong>
      </div>
    </div>
  );
};

const ChatQuickForm = ({ lang }: { lang: 'uk' | 'en' }) => {
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const translations = {
    uk: {
      placeholder: 'Email або телефон...',
      submit: 'Надіслати',
      success: 'Дякуємо! Контакти збережено. Наш менеджер зв\'яжеться з вами найближчим часом. ✨',
      error: 'Помилка надсилання. Спробуйте ще раз.',
      invalid: 'Введіть коректний Email або номер телефону.'
    },
    en: {
      placeholder: 'Email or phone...',
      submit: 'Submit',
      success: 'Thank you! Contacts saved. Our manager will contact you soon. ✨',
      error: 'Sending failed. Please try again.',
      invalid: 'Please enter a valid email or phone number.'
    }
  }[lang] || {
    placeholder: 'Email or phone...',
    submit: 'Submit',
    success: 'Thank you! Contacts saved. Our manager will contact you soon. ✨',
    error: 'Sending failed. Please try again.',
    invalid: 'Please enter a valid email or phone number.'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim() || contact.trim().length < 6) {
      setError(translations.invalid);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { sendQuickLead } = await import('@/app/actions/contact');
      const res = await sendQuickLead(contact);
      if (res.success) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8 }
          });
        } catch(e) {}
      } else {
        setError(translations.error);
      }
    } catch (err) {
      setError(translations.error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ marginTop: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px 15px', borderRadius: '12px', color: '#10b981', fontSize: '13px', lineHeight: '1.5' }}>
        {translations.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          placeholder={translations.placeholder} 
          value={contact}
          onChange={e => {
            setContact(e.target.value);
            setError('');
          }}
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'var(--bg-darker)',
            color: 'white',
            border: error ? '1px solid var(--color-pink)' : '1px solid var(--border-glow)',
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'var(--gradient-neon)',
            color: 'white',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : translations.submit}
        </button>
      </div>
      {error && (
        <span style={{ fontSize: '11px', color: 'var(--color-pink)', paddingLeft: '4px' }}>
          {error}
        </span>
      )}
    </form>
  );
};

export default function FloatingChatWidget() {
  const { lang } = useLanguage();
  const router = useRouter();
  const t = WIDGET_TRANSLATIONS[lang as 'uk' | 'en'] || WIDGET_TRANSLATIONS.uk;

  const [isOpen, setIsOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize and load chat state from LocalStorage on mount (client-only)
  useEffect(() => {
    setIsMounted(true);
    
    // Load messages
    const savedMessages = localStorage.getItem('sitenest_chat_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    } else {
      setMessages([
        {
          role: 'assistant',
          content: t.welcomeMessage
        }
      ]);
    }

    // Load open/active states
    const savedIsOpen = localStorage.getItem('sitenest_chat_is_open');
    if (savedIsOpen === 'true') {
      setIsOpen(true);
    }
    const savedIsChatActive = localStorage.getItem('sitenest_chat_is_active');
    if (savedIsChatActive === 'true') {
      setIsChatActive(true);
    }
  }, []);

  // Save messages to LocalStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('sitenest_chat_messages', JSON.stringify(messages));
  }, [messages, isMounted]);

  // Save isOpen state to LocalStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('sitenest_chat_is_open', isOpen ? 'true' : 'false');
  }, [isOpen, isMounted]);

  // Save isChatActive state to LocalStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('sitenest_chat_is_active', isChatActive ? 'true' : 'false');
  }, [isChatActive, isMounted]);

  // Dynamically update welcome message translation ONLY if it's the only message in chat
  useEffect(() => {
    if (!isMounted) return;
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([
        {
          role: 'assistant',
          content: t.welcomeMessage
        }
      ]);
    }
  }, [lang, t.welcomeMessage, isMounted]);

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

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isTyping) return;

    setInputValue('');

    // Developer test backdoors
    const cleanText = textToSend.toLowerCase().trim();
    if (cleanText === '/quickform' || cleanText === '[widget:quick_form]') {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: textToSend } as Message,
        {
          role: 'assistant',
          content: lang === 'uk' ? 'Будь ласка, заповніть форму нижче для швидкого зв\'язку:' : 'Please fill out the form below to get in touch:',
          widget: 'quick_form'
        } as Message
      ]);
      return;
    }
    if (cleanText === '/calculator' || cleanText === '[widget:calculator]') {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: textToSend } as Message,
        {
          role: 'assistant',
          content: lang === 'uk' ? 'Ось наш інтерактивний калькулятор вартості:' : 'Here is our interactive price calculator:',
          widget: 'calculator'
        } as Message
      ]);
      return;
    }
    if (cleanText === '/messengers' || cleanText === '[widget:messengers]') {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: textToSend } as Message,
        {
          role: 'assistant',
          content: lang === 'uk' ? 'Ви можете написати нам у будь-який месенджер:' : 'You can write to us in any messenger:',
          widget: 'messengers'
        } as Message
      ]);
      return;
    }

    // Append user message
    const updatedMessages = [...messages, { role: 'user', content: textToSend } as Message];
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
      let replyText = data.content || 'Error generating response.';
      
      const redirectMatch = replyText.match(/\[REDIRECT:([^\]]+)\]/);
      let actionObj: Message['action'] = undefined;
      if (redirectMatch) {
        let path = redirectMatch[1].trim();
        if (!path.startsWith('/')) {
          path = '/' + path;
        }
        replyText = replyText.replace(redirectMatch[0], '').trim();
        if (path) {
          actionObj = { type: 'redirect', path };
        }
      }

      // 2. Special WOW Actions
      if (replyText.includes('[ACTION:CONFETTI]')) {
        replyText = replyText.replace(/\[ACTION:CONFETTI\]/g, '').trim();
        try {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch(e) {}
      }

      if (replyText.includes('[ACTION:LANG_EN]')) {
        replyText = replyText.replace(/\[ACTION:LANG_EN\]/g, '').trim();
        if (lang === 'uk') {
          setTimeout(() => router.push(window.location.pathname.replace('/uk', '/en')), 2000);
        }
      }
      if (replyText.includes('[ACTION:LANG_UK]')) {
        replyText = replyText.replace(/\[ACTION:LANG_UK\]/g, '').trim();
        if (lang === 'en') {
          setTimeout(() => router.push(window.location.pathname.replace('/en', '/uk')), 2000);
        }
      }
      
      let widgetObj: Message['widget'] = undefined;
      const messengersRegex = /\[(W|В)IDGET:MESSENGERS\]/gi;
      if (replyText.match(messengersRegex)) {
        replyText = replyText.replace(messengersRegex, '').trim();
        widgetObj = 'messengers';
      }
      const calculatorRegex = /\[(W|В)IDGET:CALCULATOR\]/gi;
      if (replyText.match(calculatorRegex)) {
        replyText = replyText.replace(calculatorRegex, '').trim();
        widgetObj = 'calculator';
      }
      const quickFormRegex = /\[(W|В)IDGET:QUICK_FORM\]/gi;
      if (replyText.match(quickFormRegex)) {
        replyText = replyText.replace(quickFormRegex, '').trim();
        widgetObj = 'quick_form';
      }

      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: replyText,
          action: actionObj,
          widget: widgetObj
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
              {msg.action?.type === 'redirect' && (
                <button 
                  className="chat-action-btn"
                  onClick={() => {
                    router.push(`/${lang}${msg.action!.path}`);
                    toggleWidget();
                  }}
                >
                  {t.goToPage} →
                </button>
              )}
              {msg.widget === 'messengers' && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', justifyContent: 'center' }}>
                  <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener noreferrer" style={{ background: '#0088cc', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', width: '40px', height: '40px', boxShadow: '0 4px 10px rgba(0, 136, 204, 0.3)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <TelegramIcon />
                  </a>
                  <a href={CONTACT_LINKS.viber} target="_blank" rel="noopener noreferrer" style={{ background: '#7360f2', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', width: '40px', height: '40px', boxShadow: '0 4px 10px rgba(115, 96, 242, 0.3)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <ViberIcon />
                  </a>
                  <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', width: '40px', height: '40px', boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <WhatsAppIcon />
                  </a>
                </div>
              )}
              {msg.widget === 'calculator' && (
                <ChatCalculator lang={lang as 'uk' | 'en'} />
              )}
              {msg.widget === 'quick_form' && (
                <ChatQuickForm lang={lang as 'uk' | 'en'} />
              )}
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

        {/* Quick Replies chips */}
        {!isTyping && (
          <div className="chat-quick-replies" style={{
            display: 'flex',
            gap: '8px',
            padding: '10px 15px',
            background: 'rgba(10, 11, 20, 0.4)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            whiteSpace: 'nowrap'
          }}>
            {QUICK_REPLIES[lang as 'uk' | 'en' || 'uk'].map((reply, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(undefined, reply.query)}
                style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-slate)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'var(--color-blue)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-slate)';
                }}
              >
                {reply.label}
              </button>
            ))}
          </div>
        )}

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
