'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { LogoIcon } from '@/components/LogoIcon';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/translations';

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const switchLang = (l: Language) => { setLang(l); setLangOpen(false); };

  const NAV_ITEMS = [
    { key: 'home', label: t.nav.home, href: '/' },
    { key: 'services', label: t.nav.services, href: '/services' },
    { key: 'process', label: t.nav.process, href: '/process' },
    { key: 'portfolio', label: t.nav.portfolio, href: '/portfolio' },
    { key: 'team', label: t.nav.team, href: '/team' },
    { key: 'blog', label: t.nav.blog, href: '/blog' },
    { key: 'contact', label: t.nav.contact, href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={headerScrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="nav-container">
          <Link href="/" className="logo" aria-label="SiteNest Agency - На головну">
            <LogoIcon />
            <div className="logo-text">sitenest<span>_agency</span></div>
          </Link>

          <nav aria-label="Головна навігація">
            <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
              {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={isActive(href) ? 'active' : ''}
                    aria-current={isActive(href) ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lang-switcher">
            <button className="lang-btn" type="button" onClick={() => setLangOpen(!langOpen)} aria-label="Switch language">
              <Globe style={{ width: '15px', height: '15px' }} />
              <span>{lang.toUpperCase()}</span>
              <span className={`lang-arrow ${langOpen ? 'open' : ''}`}>▾</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                <button className={`lang-option ${lang === 'uk' ? 'active' : ''}`} onClick={() => switchLang('uk')}>🇺🇦 Українська</button>
                <button className={`lang-option ${lang === 'en' ? 'active' : ''}`} onClick={() => switchLang('en')}>🇬🇧 English</button>
              </div>
            )}
          </div>

          <Link href="/contact" className="nav-cta">{t.nav.orderProject}</Link>

          <button className="menu-toggle" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'} aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X style={{ color: '#fff' }} /> : <Menu style={{ color: '#fff' }} />}
          </button>
        </div>
      </div>
    </header>
  );
}
