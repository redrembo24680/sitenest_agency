import React, { createContext, useContext, useState } from 'react';
import { translations } from './translations';
import type { Language } from './translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations.uk;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'uk',
  setLang: () => {},
  t: translations.uk,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('uk');
  const t = translations[lang] as typeof translations.uk;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
