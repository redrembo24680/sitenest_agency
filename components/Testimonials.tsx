'use client';
import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials = TESTIMONIALS_DATA[lang];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding testimonials-section">
      <div className="container">
        <span className="section-subtitle">{t.home.testimonialsSubtitle}</span>
        <h2 className="section-title">
          {t.home.testimonialsTitle} <span>{t.home.testimonialsTitleHighlight}</span>
        </h2>

        <div className="testimonials-carousel-wrapper">
          <button className="carousel-nav-btn prev" onClick={scrollLeft} aria-label="Previous">
            <ChevronLeft />
          </button>
          
          <div className="testimonials-carousel" ref={carouselRef}>
            {testimonials.map((current, i) => (
              <div key={i} className="testimonial-card glass-card">
                <Quote className="testimonial-quote-icon" />
                <p className="testimonial-text">"{current.text}"</p>
                <div className="testimonial-stars">
                  {Array.from({ length: current.rating }).map((_, j) => (
                    <Star key={j} className="testimonial-star" />
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
            ))}
          </div>

          <button className="carousel-nav-btn next" onClick={scrollRight} aria-label="Next">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
