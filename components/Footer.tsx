'use client';
import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { LogoIcon } from '@/components/LogoIcon';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo" aria-label="SiteNest Agency">
            <LogoIcon />
            <div className="logo-text">sitenest<span>_agency</span></div>
          </Link>
          <p>{t.footer.tagline}</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/sitenest_agency?igsh=YXJkZmYwZzFyY2c0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="SiteNest Agency в Instagram">
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="mailto:sitenest.ua@gmail.com" className="social-icon" aria-label="Email"><Mail style={{ width: '18px', height: '18px' }} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>{t.footer.navigation}</h3>
          <ul className="footer-links">
            <li><Link href="/">{t.nav.home}</Link></li>
            <li><Link href="/services">{t.nav.services}</Link></li>
            <li><Link href="/process">{t.nav.process}</Link></li>
            <li><Link href="/portfolio">{t.nav.portfolio}</Link></li>
            <li><Link href="/team">{t.nav.team}</Link></li>
            <li><Link href="/blog">{t.nav.blog}</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>{t.footer.services}</h3>
          <ul className="footer-links">
            <li><Link href="/services/frontend">Front-end</Link></li>
            <li><Link href="/services/backend">Back-end</Link></li>
            <li><Link href="/services/devops">DevOps</Link></li>
            <li><Link href="/services/smm">SMM &amp; SEO</Link></li>
          </ul>
        </div>

        <div className="footer-column footer-contacts">
          <h3>{t.footer.contacts}</h3>
          <p><Mail />{' '}<a href="mailto:sitenest.ua@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>sitenest.ua@gmail.com</a></p>
          <p>
            <svg style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <a href="https://www.instagram.com/sitenest_agency" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>@sitenest_agency</a>
          </p>
          <p><MapPin />{' '}{lang === 'uk' ? 'Львів, Україна' : 'Lviv, Ukraine'}</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>&copy; {year} SiteNest Agency. {t.footer.copyright}</div>
        <div>{t.footer.slogan}</div>
      </div>
    </footer>
  );
}
