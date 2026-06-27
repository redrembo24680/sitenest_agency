'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@/components/Link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Code, Server, Cpu, TrendingUp, Send } from 'lucide-react';
import { LogoIcon } from '@/components/LogoIcon';
import { Testimonials } from '@/components/Testimonials';
import { PORTFOLIO_PROJECTS } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Animated counter hook
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const [portfolioFilter, setPortfolioFilter] = useState('all');

  const filterLabels: Record<string, string> = {
    all: t.home.allProjects,
    development: t.home.development,
    devops: t.home.devops,
    marketing: t.home.marketing,
  };

  return (
    <div className="page-fade-enter">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span>{t.home.badge}</span>
            </div>
            <h1>
              {t.home.heroTitle1} <span>{t.home.heroTitleHighlight}</span>{' '}
              {t.home.heroTitle2}
            </h1>
            <p className="hero-desc">{t.home.heroDesc}</p>
            <div className="hero-actions">
              <Link href="/services" className="btn btn-primary">
                {t.home.ourServices} <ArrowRight className="btn-icon" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                {t.home.orderProject}
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="cyber-nest">
              <div className="nest-ring ring-1"></div>
              <div className="nest-ring ring-2"></div>
              <div className="nest-ring ring-3"></div>
              <div className="nest-center">
                <LogoIcon />
              </div>
              <div className="floating-node node-1" aria-hidden="true">
                <Code className="node-icon" />
              </div>
              <div className="floating-node node-2" aria-hidden="true">
                <Server className="node-icon" />
              </div>
              <div className="floating-node node-3" aria-hidden="true">
                <Cpu className="node-icon" />
              </div>
              <div className="floating-node node-4" aria-hidden="true">
                <TrendingUp className="node-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="container">
        <div className="glass-card stats-grid">
          <AnimatedStat value={999} label={t.home.statsUptime} suffix="%" />
          <AnimatedStat value={100} label={t.home.statsPagespeed} suffix="+" />
          <div className="stat-card">
            <div className="stat-number">2.5x</div>
            <div className="stat-label">{t.home.statsConversion}</div>
          </div>
          <AnimatedStat value={4} label={t.home.statsExperts} />
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-padding">
        <div className="container">
          <span className="section-subtitle">{t.home.whatWeDo}</span>
          <h2 className="section-title">{t.home.servicesTitle} <span>{t.home.servicesTitleHighlight}</span></h2>
          <div className="services-summary-grid">
            <div className="glass-card service-summary-card">
              <div className="icon-box"><Code /></div>
              <h3>Front-end</h3>
              <p>
                {lang === 'uk'
                  ? 'Інтерактивні, адаптивні інтерфейси на React та Next.js з плавними анімаціями на 60fps. Ваші клієнти будуть у захваті від швидкості роботи.'
                  : 'Interactive, responsive interfaces with React and Next.js with smooth 60fps animations. Your clients will love the speed.'}
              </p>
              <Link href="/services/frontend" className="service-link">
                {t.home.learnMore} <span>&rarr;</span>
              </Link>
            </div>
            <div className="glass-card service-summary-card">
              <div className="icon-box"><Server /></div>
              <h3>Back-end</h3>
              <p>
                {lang === 'uk'
                  ? 'Масштабовані API сервери, надійна архітектура БД та інтеграція платіжних систем. Швидкодія та повна безпека бізнес-даних.'
                  : 'Scalable API servers, reliable DB architecture and payment integration. Performance and full business data security.'}
              </p>
              <Link href="/services/backend" className="service-link">
                {t.home.learnMore} <span>&rarr;</span>
              </Link>
            </div>
            <div className="glass-card service-summary-card">
              <div className="icon-box"><Cpu /></div>
              <h3>DevOps</h3>
              <p>
                {lang === 'uk'
                  ? 'Хмарні сервери, Docker, Kubernetes, CI/CD автоматизація та CDN налаштування. Гарантуємо відмовостійкість вашого сайту.'
                  : 'Cloud servers, Docker, Kubernetes, CI/CD automation and CDN setup. We guarantee your website resilience.'}
              </p>
              <Link href="/services/devops" className="service-link">
                {t.home.learnMore} <span>&rarr;</span>
              </Link>
            </div>
            <div className="glass-card service-summary-card">
              <div className="icon-box"><TrendingUp /></div>
              <h3>SMM & SEO</h3>
              <p>
                {lang === 'uk'
                  ? 'Просування брендів у соцмережах, цільова реклама Meta Ads, оптимізація під пошукові системи та SEO наповнення.'
                  : 'Brand promotion in social networks, Meta Ads targeting, search engine optimization and SEO content.'}
              </p>
              <Link href="/services/smm" className="service-link">
                {t.home.learnMore} <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="container">
          <span className="section-subtitle">{t.home.ourWork}</span>
          <h2 className="section-title">
            {t.home.portfolioTitle} <span>{t.home.portfolioTitleHighlight}</span>{' '}
            {t.home.portfolioTitleSuffix}
          </h2>
          
          <div className="portfolio-tabs">
            {['all', 'development', 'devops', 'marketing'].map(cat => (
              <button 
                key={cat} 
                className={`portfolio-tab ${portfolioFilter === cat ? 'active' : ''}`}
                type="button"
                onClick={() => setPortfolioFilter(cat)}
              >
                {filterLabels[cat]}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {PORTFOLIO_PROJECTS.filter(p => portfolioFilter === 'all' || p.cat === portfolioFilter).map((project, i) => (
              <Link
                className="portfolio-item"
                key={i}
                href="/portfolio"
                aria-label={`Переглянути проект: ${project.title}`}
              >
                <Image className="portfolio-img" src={project.img} alt={project.title} loading="lazy" width={600} height={400} />
                <div className="portfolio-overlay" aria-hidden="true">
                  <span className="portfolio-cat">{project.catLabel}</span>
                  <h3 className="portfolio-title">{project.title}</h3>
                  <span className="portfolio-link">
                    {t.home.viewCase} <ChevronRight className="btn-icon" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* BANNER CTA */}
      <section className="section-padding">
        <div className="container">
          <div className="glass-card cta-banner">
            <h2>
              {t.home.ctaTitle1} <span>{t.home.ctaTitleHighlight}</span>
              {t.home.ctaTitle2}
            </h2>
            <p>{t.home.ctaDesc}</p>
            <Link href="/contact" className="btn btn-primary">
              {t.home.ctaBtn} <Send className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
