'use client';
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

import { useRouter, usePathname } from 'next/navigation';

export const LanguageProvider: React.FC<{ children: React.ReactNode, initialLang?: Language }> = ({ children, initialLang = 'uk' }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Derive lang from pathname
  let derivedLang: Language = 'uk';
  if (pathname.startsWith('/en/') || pathname === '/en') {
    derivedLang = 'en';
  }
  
  // We keep a local state just for optimistic updates before the navigation completes
  const [optimisticLang, setOptimisticLang] = useState<Language | null>(null);
  
  // Reset optimistic state when pathname matches
  React.useEffect(() => {
    setOptimisticLang(null);
  }, [pathname]);

  const lang = optimisticLang || derivedLang;
  
  const setLang = (newLang: Language) => {
    if (newLang === lang) return;
    setOptimisticLang(newLang);
    
    let newPath = pathname;
    if (pathname.startsWith('/en/') || pathname === '/en') {
      newPath = pathname.replace(/^\/en/, '') || '/';
    } else if (pathname.startsWith('/uk/') || pathname === '/uk') {
      newPath = pathname.replace(/^\/uk/, '') || '/';
    }
    
    if (newLang !== 'uk') {
      newPath = `/${newLang}${newPath === '/' ? '' : newPath}`;
    }
    
    router.push(newPath);
  };

  const t = translations[lang] as typeof translations.uk;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
