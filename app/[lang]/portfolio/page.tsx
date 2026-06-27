'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/components/Link';
import Image from 'next/image';
import { ChevronRight, X, ExternalLink, TrendingUp, Users, Zap } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const EXTENDED_PORTFOLIO = [
  {
    ...PORTFOLIO_PROJECTS[0],
    description: 'Розробка мінімалістичного, але висококонверсійного інтернет-магазину для бренду одягу з фокусом на мобільні пристрої.',
    descriptionEn: 'Development of a minimalist yet high-converting e-commerce store for a clothing brand with a mobile-first focus.',
    technologies: ['React', 'Next.js', 'Framer Motion', 'Stripe', 'Tailwind CSS'],
    results: [
      { label: 'Конверсія', labelEn: 'Conversion', value: '+140%' },
      { label: 'Завантаження', labelEn: 'Load Time', value: '1.2s' },
      { label: 'Мобільний UX', labelEn: 'Mobile UX', value: '99/100' },
    ],
  },
  {
    ...PORTFOLIO_PROJECTS[1],
    description: 'Комплексний дашборд для відстеження криптоактивів з графіками реального часу та WebSocket оновленнями.',
    descriptionEn: 'Comprehensive dashboard for tracking crypto assets with real-time charts and WebSocket updates.',
    technologies: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Chart.js'],
    results: [
      { label: 'Користувачів', labelEn: 'Users', value: '15K+' },
      { label: 'Затримка', labelEn: 'Latency', value: '<40ms' },
      { label: 'Точність даних', labelEn: 'Data Accuracy', value: '99.9%' },
    ],
  },
  {
    ...PORTFOLIO_PROJECTS[2],
    description: 'Розробка айдентики та SMM-стратегії для крафтової пекарні з акцентом на локальне SEO та естетичний контент.',
    descriptionEn: 'Identity development and SMM strategy for a craft bakery with a focus on local SEO and aesthetic content.',
    technologies: ['Figma', 'Instagram Ads', 'Google My Business', 'Photography'],
    results: [
      { label: 'Охоплення', labelEn: 'Reach', value: '120K' },
      { label: 'Локальні ліди', labelEn: 'Local Leads', value: '+300%' },
      { label: 'Залученість', labelEn: 'Engagement', value: '8.5%' },
    ],
  },
  {
    ...PORTFOLIO_PROJECTS[3],
    description: 'Проектування інтерфейсу для DevOps платформи управління хмарними серверами AWS. Темна тема з фокусом на аналітику.',
    descriptionEn: 'Interface design for a DevOps platform managing AWS cloud servers. Dark theme focusing on analytics.',
    technologies: ['React', 'AWS SDK', 'Tailwind CSS', 'Grafana UI', 'Redux'],
    results: [
      { label: 'Задоволеність', labelEn: 'Satisfaction', value: '4.8/5' },
      { label: 'Ефективність', labelEn: 'Efficiency', value: '+45%' },
      { label: 'Код бази', labelEn: 'Codebase', value: '-20%' },
    ],
  }
];

const RESULT_ICONS = [TrendingUp, Zap, Users];

export default function Portfolio() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<typeof EXTENDED_PORTFOLIO[0] | null>(null);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        const textElement = document.querySelector('.portfolio-modal-body h2');
        if (textElement) {
          textElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selected]);

  const filtered = EXTENDED_PORTFOLIO.filter(
    (p) => filter === 'all' || p.cat === filter
  );

  const filterLabels: Record<string, string> = {
    all: t.portfolio.allProjects,
    development: t.portfolio.development,
    devops: t.portfolio.devops,
    marketing: t.portfolio.marketing,
  };

  return (
    <div className="page-fade-enter">
      <section className="portfolio-page-hero">
        <div className="container">
          <span className="section-subtitle">{t.portfolio.subtitle}</span>
          <h1>{t.portfolio.title} <span>{t.portfolio.titleHighlight}</span></h1>
          <p>{t.portfolio.desc}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="portfolio-tabs" style={{ marginBottom: '3rem' }}>
            {['all', 'development', 'devops', 'marketing'].map((cat) => (
              <button
                key={cat}
                className={`portfolio-tab ${filter === cat ? 'active' : ''}`}
                type="button"
                onClick={() => setFilter(cat)}
              >
                {filterLabels[cat]}
              </button>
            ))}
          </div>

          <div className="portfolio-extended-grid">
            {filtered.map((project, i) => (
              <div
                className="portfolio-extended-card glass-card"
                key={i}
                onClick={() => setSelected(project)}
              >
                <div className="portfolio-extended-img-wrap">
                  <Image
                    src={project.img}
                    alt={project.title}
                    className="portfolio-extended-img"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                  <span className="portfolio-cat portfolio-cat-badge">{project.catLabel}</span>
                </div>
                <div className="portfolio-extended-body">
                  <h3>{project.title}</h3>
                  <p>{lang === 'uk' ? project.description : project.descriptionEn}</p>
                  <div className="portfolio-extended-techs">
                    {project.technologies.slice(0, 4).map((tech, ti) => (
                      <span className="tech-tag" key={ti}>{tech}</span>
                    ))}
                  </div>
                  <div className="portfolio-extended-results">
                    {project.results.map((res, ri) => {
                      const Icon = RESULT_ICONS[ri % RESULT_ICONS.length];
                      return (
                        <div className="port-result" key={ri}>
                          <Icon className="port-result-icon" />
                          <div>
                            <div className="port-result-value">{res.value}</div>
                            <div className="port-result-label">{lang === 'uk' ? res.label : res.labelEn}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <span className="portfolio-link port-open-btn">
                    {t.portfolio.viewCase} <ChevronRight className="btn-icon" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/contact" className="btn btn-primary">
              {t.portfolio.orderSimilar} <ExternalLink className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="team-details-modal active"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            className="glass-card portfolio-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={() => setSelected(null)} aria-label="Закрити модальне вікно">
              <X aria-hidden="true" />
            </button>
            <Image src={selected.img} alt={selected.title} className="portfolio-modal-img" loading="lazy" width={1000} height={600} />
            <div className="portfolio-modal-body">
              <span className="portfolio-cat">{selected.catLabel}</span>
              <h2>{selected.title}</h2>
              <p style={{ color: 'var(--text-slate)', marginBottom: '1.5rem' }}>
                {lang === 'uk' ? selected.description : selected.descriptionEn}
              </p>

              <h3 style={{ marginBottom: '0.75rem' }}>{t.portfolio.technologies}</h3>
              <div className="tech-tags" style={{ marginBottom: '1.75rem' }}>
                {selected.technologies.map((tech, i) => (
                  <span className="tech-tag" key={i}>{tech}</span>
                ))}
              </div>

              <h3 style={{ marginBottom: '0.75rem' }}>{t.portfolio.results}</h3>
              <div className="portfolio-extended-results" style={{ marginBottom: '2rem' }}>
                {selected.results.map((res, ri) => {
                  const Icon = RESULT_ICONS[ri % RESULT_ICONS.length];
                  return (
                    <div className="port-result" key={ri}>
                      <Icon className="port-result-icon" aria-hidden="true" />
                      <div>
                        <div className="port-result-value">{res.value}</div>
                        <div className="port-result-label">{lang === 'uk' ? res.label : res.labelEn}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/contact" className="btn btn-primary">
                {t.portfolio.orderSimilar} <ChevronRight className="btn-icon" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
