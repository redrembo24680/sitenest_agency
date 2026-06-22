import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const TESTIMONIALS_DATA = {
  uk: [
    {
      name: 'Олексій Петренко',
      role: 'CEO, TechStart UA',
      text: 'SiteNest — це найкраща команда, з якою ми працювали. Сайт запустили за 18 днів, швидкість 99 балів PageSpeed, конверсія зросла на 210%. Вражаюча синергія Front-end і DevOps.',
      rating: 5,
      initials: 'ОП',
    },
    {
      name: 'Марина Ковальчук',
      role: 'Marketing Director, BrandUp',
      text: 'Соломія та команда SMM повністю перетворили наш Instagram. За 4 місяці — з 1200 підписників до 34K органічно. Таргет дає ROAS 4.5x. Дуже рекомендую!',
      rating: 5,
      initials: 'МК',
    },
    {
      name: 'Ігор Дмитренко',
      role: 'Founder, NestMall',
      text: 'Роман розробив бекенд, який спокійно витримує пікові навантаження в Чорну П\'ятницю — 8000+ замовлень одночасно без жодного збою. Це рівень великих компаній.',
      rating: 5,
      initials: 'ІД',
    },
    {
      name: 'Наталія Романенко',
      role: 'CTO, FinEdge',
      text: 'DevOps-налаштування від Михайла скоротили наші витрати на AWS на 38% і час деплою з 40 хвилин до 3. Kubernetes кластер працює бездоганно вже рік.',
      rating: 5,
      initials: 'НР',
    },
  ],
  en: [
    {
      name: 'Alex Petrenko',
      role: 'CEO, TechStart UA',
      text: 'SiteNest is the best team we have ever worked with. Site launched in 18 days, 99/100 PageSpeed, conversion grew by 210%. Impressive Front-end and DevOps synergy.',
      rating: 5,
      initials: 'AP',
    },
    {
      name: 'Marina Kovalchuk',
      role: 'Marketing Director, BrandUp',
      text: 'Solomiya and the SMM team completely transformed our Instagram. In 4 months — from 1,200 followers to 34K organically. Targeting delivers 4.5x ROAS. Highly recommended!',
      rating: 5,
      initials: 'MK',
    },
    {
      name: 'Igor Dmytrenko',
      role: 'Founder, NestMall',
      text: "Roman built a backend that easily handles peak Black Friday loads — 8000+ simultaneous orders with zero downtime. This is enterprise-level engineering.",
      rating: 5,
      initials: 'ID',
    },
    {
      name: 'Nataliya Romanenko',
      role: 'CTO, FinEdge',
      text: "Mykhailo's DevOps setup cut our AWS costs by 38% and deployment time from 40 minutes to 3. The Kubernetes cluster has been running flawlessly for a year.",
      rating: 5,
      initials: 'NR',
    },
  ],
};

export const Testimonials: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials = TESTIMONIALS_DATA[lang];

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testimonials.length]);

  const current = testimonials[activeIdx];

  return (
    <section className="section-padding testimonials-section">
      <div className="container">
        <span className="section-subtitle">{t.home.testimonialsSubtitle}</span>
        <h2 className="section-title">
          {t.home.testimonialsTitle} <span>{t.home.testimonialsTitleHighlight}</span>
        </h2>

        <div className="testimonials-wrapper">
          <div className={`testimonial-card glass-card ${isAnimating ? 'testimonial-fade-out' : 'testimonial-fade-in'}`}>
            <Quote className="testimonial-quote-icon" />
            <p className="testimonial-text">"{current.text}"</p>
            <div className="testimonial-stars">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="testimonial-star" />
              ))}
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{current.initials}</div>
              <div>
                <div className="testimonial-name">{current.name}</div>
                <div className="testimonial-role">{current.role}</div>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === activeIdx ? 'active' : ''}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Side cards preview */}
          <div className="testimonial-side-cards">
            {testimonials.map((t, i) => {
              if (i === activeIdx) return null;
              return (
                <div
                  key={i}
                  className="testimonial-mini-card"
                  onClick={() => goTo(i)}
                >
                  <div className="testimonial-avatar testimonial-avatar-sm">{t.initials}</div>
                  <div>
                    <div className="testimonial-name" style={{ fontSize: '0.85rem' }}>{t.name}</div>
                    <div className="testimonial-role" style={{ fontSize: '0.75rem' }}>{t.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
