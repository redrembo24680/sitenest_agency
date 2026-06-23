import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Mail, MapPin, Globe } from 'lucide-react';

// Components
import { LogoIcon } from './components/LogoIcon';

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Team } from './pages/Team';
import { Blog } from './pages/Blog';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { Contact } from './pages/Contact';
import { Process } from './pages/Process';
import { Portfolio } from './pages/Portfolio';
import { ServiceDetail } from './pages/ServiceDetail';

// Mock Data
import { BLOG_POSTS } from './data/mockData';

// i18n
import { useLanguage } from './i18n/LanguageContext';
import type { Language } from './i18n/translations';

export default function App() {
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [headerScrolled, setHeaderScrolled] = useState<boolean>(false);
  const [pageTransitioning, setPageTransitioning] = useState<boolean>(false);

  // Home portfolio filter state
  const [portfolioFilter, setPortfolioFilter] = useState<string>('all');

  // Calculator states
  const [calcType, setCalcType] = useState<'landing' | 'corporate' | 'ecommerce'>('corporate');
  const [calcPages, setCalcPages] = useState<number>(10);
  const [calcDevops, setCalcDevops] = useState<boolean>(true);
  const [calcSmm, setCalcSmm] = useState<boolean>(false);
  const [calcApi, setCalcApi] = useState<boolean>(false);
  const [animatedPrice, setAnimatedPrice] = useState<number>(1600);

  // Language switcher dropdown
  const [langOpen, setLangOpen] = useState(false);

  // Page switcher navigation
  const navigateTo = (page: string) => {
    setPageTransitioning(true);
    setMobileMenuOpen(false);
    setLangOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    setTimeout(() => {
      navigate(page === 'home' ? '/' : `/${page}`);
      setPageTransitioning(false);
    }, 150);
  };

  const switchLang = (l: Language) => {
    setLang(l);
    setLangOpen(false);
  };

  // SEO page title + meta update effects
  useEffect(() => {
    let title = 'SiteNest Agency | Розробка веб-сайтів у Львові';
    let desc = lang === 'uk'
      ? 'SiteNest Agency — веб-агенція з Львова. Розробляємо швидкі, адаптивні сайти під ключ: Front-end, Back-end, DevOps та SMM просування.'
      : 'SiteNest Agency — web agency from Lviv. We build fast, responsive websites: Front-end, Back-end, DevOps and SMM.';
    let canonical = 'https://sitenest.work/';

    if (currentPage === 'services') {
      title = lang === 'uk' ? 'Послуги та Калькулятор Вартості | SiteNest Agency' : 'Services & Price Calculator | SiteNest Agency';
      desc = lang === 'uk'
        ? 'Дізнайтесь вартість вашого сайту за допомогою інтерактивного калькулятора. Front-end, Back-end, DevOps, SMM — обираємо разом.'
        : 'Find out your website cost using our interactive calculator. Front-end, Back-end, DevOps, SMM — choose together.';
      canonical = 'https://sitenest.work/services';
    } else if (currentPage.startsWith('service-')) {
      const serviceKey = currentPage.replace('service-', '') as 'frontend' | 'backend' | 'devops' | 'smm';
      const serviceName = lang === 'uk'
        ? (serviceKey === 'frontend' ? 'Front-end Розробка' : serviceKey === 'backend' ? 'Back-end Інжиніринг' : serviceKey === 'devops' ? 'DevOps & Хмари' : 'SMM & SEO')
        : (serviceKey === 'frontend' ? 'Front-end Development' : serviceKey === 'backend' ? 'Back-end Engineering' : serviceKey === 'devops' ? 'DevOps & Cloud' : 'SMM & SEO');
      title = `${serviceName} | SiteNest Agency`;
      desc = lang === 'uk'
        ? `Професійні послуги ${serviceName} від SiteNest Agency — команди з Львова. Швидко, якісно, в строк.`
        : `Professional ${serviceName} services by SiteNest Agency — a team from Lviv, Ukraine.`;
      canonical = `https://sitenest.work/${currentPage}`;
    } else if (currentPage === 'team') {
      title = lang === 'uk' ? 'Наша Команда | Фахівці SiteNest Agency' : 'Our Team | SiteNest Agency Specialists';
      desc = lang === 'uk'
        ? 'Познайомтесь із командою SiteNest Agency — 4 фахівці: Front-end, Back-end, DevOps та SMM.'
        : 'Meet the SiteNest Agency team — 4 specialists: Front-end, Back-end, DevOps and SMM.';
      canonical = 'https://sitenest.work/team';
    } else if (currentPage === 'blog') {
      title = lang === 'uk' ? 'Блог про Веб-розробку та SEO | SiteNest Agency' : 'Web Development & SEO Blog | SiteNest Agency';
      desc = lang === 'uk'
        ? 'Корисні статті про веб-розробку, SEO, швидкодію сайту та бекенд-архітектуру від команди SiteNest.'
        : 'Useful articles about web development, SEO, site performance and backend architecture from SiteNest team.';
      canonical = 'https://sitenest.work/blog';
    } else if (currentPage.startsWith('blog-post-')) {
      const post = BLOG_POSTS.find(p => p.id === currentPage);
      if (post) {
        title = `${post.title} | SiteNest Blog`;
        desc = post.summary;
      }
      canonical = `https://sitenest.work/${currentPage}`;
    } else if (currentPage === 'contact') {
      title = lang === 'uk' ? 'Контакти | Замовити Сайт | SiteNest Agency' : 'Contact | Order a Website | SiteNest Agency';
      desc = lang === 'uk'
        ? 'Зв\'яжіться з SiteNest Agency для замовлення сайту. Email: sitenest.ua@gmail.com. Відповімо протягом 24 годин.'
        : 'Contact SiteNest Agency to order a website. Email: sitenest.ua@gmail.com. We reply within 24 hours.';
      canonical = 'https://sitenest.work/contact';
    } else if (currentPage === 'process') {
      title = lang === 'uk' ? 'Процес Розробки Сайту | SiteNest Agency' : 'Website Development Process | SiteNest Agency';
      desc = lang === 'uk'
        ? 'Як ми розробляємо сайти — від брифу до релізу. Прозора методологія, фіксовані строки та постійна комунікація.'
        : 'How we build websites — from brief to launch. Transparent methodology, fixed deadlines and constant communication.';
      canonical = 'https://sitenest.work/process';
    } else if (currentPage === 'portfolio') {
      title = lang === 'uk' ? 'Портфоліо | Наші Проекти | SiteNest Agency' : 'Portfolio | Our Projects | SiteNest Agency';
      desc = lang === 'uk'
        ? 'Реальні кейси та проекти команди SiteNest Agency. Перегляньте наші роботи та оцініть якість.'
        : 'Real case studies and projects by the SiteNest Agency team. Review our work and assess the quality.';
      canonical = 'https://sitenest.work/portfolio';
    }

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    // Update canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    // Update OG tags
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    const twUrl = document.querySelector('meta[property="twitter:url"]');
    if (twUrl) twUrl.setAttribute('content', canonical);
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);
  }, [currentPage, lang]);

  // Scroll listener for header style alterations
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Estimator price calculator effect
  useEffect(() => {
    let base = 1200;
    if (calcType === 'landing') base = 600;
    if (calcType === 'ecommerce') base = 1800;

    const pageCost = calcPages * 40;
    const addonsCost = 
      (calcDevops ? 300 : 0) + 
      (calcSmm ? 400 : 0) + 
      (calcApi ? 500 : 0);

    const total = base + pageCost + addonsCost;
    
    const start = animatedPrice;
    const end = total;
    if (start === end) return;

    let current = start;
    const step = end > start ? Math.ceil((end - start) / 10) : Math.floor((end - start) / 10);
    const interval = setInterval(() => {
      current += step;
      if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
        current = end;
        clearInterval(interval);
      }
      setAnimatedPrice(current);
    }, 20);

    return () => clearInterval(interval);
  }, [calcType, calcPages, calcDevops, calcSmm, calcApi, animatedPrice]);

  const NAV_ITEMS = [
    { key: 'home', label: t.nav.home },
    { key: 'services', label: t.nav.services },
    { key: 'process', label: t.nav.process },
    { key: 'portfolio', label: t.nav.portfolio },
    { key: 'team', label: t.nav.team },
    { key: 'blog', label: t.nav.blog },
    { key: 'contact', label: t.nav.contact },
  ];

  return (
    <>
      {/* Background Matrix Effects */}
      <div className="bg-grid"></div>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>

      {/* HEADER NAVBAR */}
      <header className={headerScrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="nav-container">
            <div className="logo" role="link" tabIndex={0} aria-label="SiteNest Agency - На головну" onClick={() => navigateTo('home')} onKeyDown={(e) => e.key === 'Enter' && navigateTo('home')}>
              <LogoIcon />
              <div className="logo-text">sitenest<span>_agency</span></div>
            </div>

            <nav aria-label="Головна навігація">
              <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                {NAV_ITEMS.map(({ key, label }) => (
                  <li key={key}>
                    <a
                      href={key === 'home' ? '/' : `/${key}`}
                      className={currentPage === key || (key === 'blog' && currentPage.startsWith('blog-post-')) ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); navigateTo(key); }}
                      aria-current={currentPage === key ? 'page' : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Language Switcher */}
            <div className="lang-switcher">
              <button
                className="lang-btn"
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Switch language"
              >
                <Globe style={{ width: '15px', height: '15px' }} />
                <span>{lang.toUpperCase()}</span>
                <span className={`lang-arrow ${langOpen ? 'open' : ''}`}>▾</span>
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  <button className={`lang-option ${lang === 'uk' ? 'active' : ''}`} onClick={() => switchLang('uk')}>
                    🇺🇦 Українська
                  </button>
                  <button className={`lang-option ${lang === 'en' ? 'active' : ''}`} onClick={() => switchLang('en')}>
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>

            <button className="nav-cta" type="button" onClick={() => navigateTo('contact')}>
              {t.nav.orderProject}
            </button>

            <button className="menu-toggle" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X style={{ color: '#fff' }} /> : <Menu style={{ color: '#fff' }} />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main style={{ minHeight: '80vh', opacity: pageTransitioning ? 0 : 1, transition: 'opacity 0.15s ease' }}>
        <Routes>
          <Route path="/" element={<Home navigateTo={navigateTo} portfolioFilter={portfolioFilter} setPortfolioFilter={setPortfolioFilter} />} />
          <Route path="/services" element={
            <Services
              navigateTo={navigateTo}
              calcType={calcType}
              setCalcType={setCalcType}
              calcPages={calcPages}
              setCalcPages={setCalcPages}
              calcDevops={calcDevops}
              setCalcDevops={setCalcDevops}
              calcSmm={calcSmm}
              setCalcSmm={setCalcSmm}
              calcApi={calcApi}
              setCalcApi={setCalcApi}
              animatedPrice={animatedPrice}
            />
          } />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog navigateTo={navigateTo} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/process" element={<Process />} />
          <Route path="/portfolio" element={<Portfolio navigateTo={navigateTo} />} />
          
          <Route path="/service-frontend" element={<ServiceDetail serviceId="frontend" navigateTo={navigateTo} />} />
          <Route path="/service-backend" element={<ServiceDetail serviceId="backend" navigateTo={navigateTo} />} />
          <Route path="/service-devops" element={<ServiceDetail serviceId="devops" navigateTo={navigateTo} />} />
          <Route path="/service-smm" element={<ServiceDetail serviceId="smm" navigateTo={navigateTo} />} />

          {BLOG_POSTS.map(post => (
            <Route key={post.id} path={`/${post.id}`} element={<BlogPostDetail postId={post.id} navigateTo={navigateTo} />} />
          ))}

          <Route path="*" element={<Home navigateTo={navigateTo} portfolioFilter={portfolioFilter} setPortfolioFilter={setPortfolioFilter} />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo" role="link" tabIndex={0} aria-label="SiteNest Agency - На головну" onClick={() => navigateTo('home')} onKeyDown={(e) => e.key === 'Enter' && navigateTo('home')}>
              <LogoIcon />
              <div className="logo-text">sitenest<span>_agency</span></div>
            </div>
            <p>{t.footer.tagline}</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/sitenest_agency?igsh=YXJkZmYwZzFyY2c0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="SiteNest Agency в Instagram">
                <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="mailto:sitenest.ua@gmail.com" className="social-icon" aria-label="Написати на email sitenest.ua@gmail.com"><Mail style={{ width: '18px', height: '18px' }} aria-hidden="true" /></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>{t.footer.navigation}</h4>
            <ul className="footer-links">
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>{t.nav.home}</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>{t.nav.services}</a></li>
              <li><a href="/process" onClick={(e) => { e.preventDefault(); navigateTo('process'); }}>{t.nav.process}</a></li>
              <li><a href="/portfolio" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); }}>{t.nav.portfolio}</a></li>
              <li><a href="/team" onClick={(e) => { e.preventDefault(); navigateTo('team'); }}>{t.nav.team}</a></li>
              <li><a href="/blog" onClick={(e) => { e.preventDefault(); navigateTo('blog'); }}>{t.nav.blog}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t.footer.services}</h4>
            <ul className="footer-links">
              <li><a href="/service-frontend" onClick={(e) => { e.preventDefault(); navigateTo('service-frontend'); }}>Front-end</a></li>
              <li><a href="/service-backend" onClick={(e) => { e.preventDefault(); navigateTo('service-backend'); }}>Back-end</a></li>
              <li><a href="/service-devops" onClick={(e) => { e.preventDefault(); navigateTo('service-devops'); }}>DevOps</a></li>
              <li><a href="/service-smm" onClick={(e) => { e.preventDefault(); navigateTo('service-smm'); }}>SMM & SEO</a></li>
            </ul>
          </div>

          <div className="footer-column footer-contacts">
            <h4>{t.footer.contacts}</h4>
            <p><Mail /> <a href="mailto:sitenest.ua@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>sitenest.ua@gmail.com</a></p>
            <p>
              <svg style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <a href="https://www.instagram.com/sitenest_agency?igsh=YXJkZmYwZzFyY2c0&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>@sitenest_agency</a>
            </p>
            <p><MapPin /> {lang === 'uk' ? 'Львів, Україна' : 'Lviv, Ukraine'}</p>
          </div>
        </div>

        <div className="container footer-bottom">
          <div>&copy; {new Date().getFullYear()} SiteNest Agency. {t.footer.copyright}</div>
          <div>{t.footer.slogan}</div>
        </div>
      </footer>
    </>
  );
}
