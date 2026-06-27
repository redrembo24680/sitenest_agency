'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/components/Link';
import { Check, ArrowRight, Rocket, Award, Zap } from 'lucide-react';
import { FrontendVisual, BackendVisual, DevopsVisual, SmmVisual } from '@/components/ServiceCodeMockups';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Services() {
  const { t, lang } = useLanguage();

  // Calculator states inside the component
  const [calcType, setCalcType] = useState<'landing' | 'corporate' | 'ecommerce'>('corporate');
  const [calcPages, setCalcPages] = useState<number>(10);
  const [calcDevops, setCalcDevops] = useState<boolean>(true);
  const [calcSmm, setCalcSmm] = useState<boolean>(false);
  const [calcApi, setCalcApi] = useState<boolean>(false);
  const [animatedPrice, setAnimatedPrice] = useState<number>(1600);

  // Estimator price calculator effect
  useEffect(() => {
    let base = 250;
    if (calcType === 'landing') base = 150;
    if (calcType === 'ecommerce') base = 400;

    const pageCost = calcPages * 5;
    const addonsCost = 
      (calcDevops ? 50 : 0) + 
      (calcSmm ? 100 : 0) + 
      (calcApi ? 100 : 0);

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

  return (
    <div className="page-fade-enter">
      <section className="services-hero">
        <div className="container">
          <span className="section-subtitle">{t.services.subtitle}</span>
          <h1>{t.services.title} <span>{t.services.titleHighlight}</span></h1>
          <p>{t.services.desc}</p>
        </div>
      </section>

      {/* FULL SERVICES LIST WITH INTERACTIVE GRAPHICS */}
      <section className="container services-full-list">
        <div className="glass-card service-detail-card">
          <div className="service-detail-info">
            <h2><span className="icon-number">01</span> {t.services.frontendTitle}</h2>
            <p>{t.services.frontendDesc}</p>
            <div className="tech-tags">
              <span className="tech-tag">React.js</span>
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">HTML5/CSS3</span>
              <span className="tech-tag">GSAP / Framer Motion</span>
            </div>
            <ul className="service-benefits">
              <li><Check /> {t.services.frontendBenefit1}</li>
              <li><Check /> {t.services.frontendBenefit2}</li>
              <li><Check /> {t.services.frontendBenefit3}</li>
            </ul>
            <Link href="/services/frontend" className="btn btn-outline" style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }}>
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>
          <div className="service-detail-visual">
            <FrontendVisual />
          </div>
        </div>

        <div className="glass-card service-detail-card">
          <div className="service-detail-info">
            <h2><span className="icon-number">02</span> {t.services.backendTitle}</h2>
            <p>{t.services.backendDesc}</p>
            <div className="tech-tags">
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Express / NestJS</span>
              <span className="tech-tag">Python (FastAPI / Django)</span>
              <span className="tech-tag">PostgreSQL / MongoDB</span>
              <span className="tech-tag">Redis Cache</span>
              <span className="tech-tag">REST & GraphQL APIs</span>
            </div>
            <ul className="service-benefits">
              <li><Check /> {t.services.backendBenefit1}</li>
              <li><Check /> {t.services.backendBenefit2}</li>
              <li><Check /> {t.services.backendBenefit3}</li>
            </ul>
            <Link href="/services/backend" className="btn btn-outline" style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }}>
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>
          <div className="service-detail-visual">
            <BackendVisual />
          </div>
        </div>

        <div className="glass-card service-detail-card">
          <div className="service-detail-info">
            <h2><span className="icon-number">03</span> {t.services.devopsTitle}</h2>
            <p>{t.services.devopsDesc}</p>
            <div className="tech-tags">
              <span className="tech-tag">Docker</span>
              <span className="tech-tag">AWS / DigitalOcean</span>
              <span className="tech-tag">CI/CD (GitHub Actions)</span>
              <span className="tech-tag">Nginx Server</span>
              <span className="tech-tag">Cloudflare CDN / Security</span>
            </div>
            <ul className="service-benefits">
              <li><Check /> {t.services.devopsBenefit1}</li>
              <li><Check /> {t.services.devopsBenefit2}</li>
              <li><Check /> {t.services.devopsBenefit3}</li>
            </ul>
            <Link href="/services/devops" className="btn btn-outline" style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }}>
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>
          <div className="service-detail-visual">
            <DevopsVisual />
          </div>
        </div>

        <div className="glass-card service-detail-card">
          <div className="service-detail-info">
            <h2><span className="icon-number">04</span> {t.services.smmTitle}</h2>
            <p>{t.services.smmDesc}</p>
            <div className="tech-tags">
              <span className="tech-tag">Meta Ads Manager</span>
              <span className="tech-tag">Google Analytics 4</span>
              <span className="tech-tag">SEO Copywriting</span>
              <span className="tech-tag">Instagram Growth</span>
              <span className="tech-tag">A/B Testing Creatives</span>
            </div>
            <ul className="service-benefits">
              <li><Check /> {t.services.smmBenefit1}</li>
              <li><Check /> {t.services.smmBenefit2}</li>
              <li><Check /> {t.services.smmBenefit3}</li>
            </ul>
            <Link href="/services/smm" className="btn btn-outline" style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }}>
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>
          <div className="service-detail-visual">
            <SmmVisual />
          </div>
        </div>
      </section>

      {/* ESTIMATOR CALCULATOR */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="container calculator-box">
          <span className="section-subtitle">{t.services.calcSubtitle}</span>
          <h2 className="section-title">{t.services.calcTitle} <span>{t.services.calcTitleHighlight}</span></h2>
          
          <div className="glass-card">
            <div className="calc-step">
              <h3><span className="step-num">1</span> {t.services.step1}</h3>
              <div className="calc-options-grid">
                <div 
                  className={`calc-option ${calcType === 'landing' ? 'selected' : ''}`}
                  onClick={() => setCalcType('landing')}
                >
                  <Rocket className="calc-option-icon" />
                  <h4>{t.services.landingTitle}</h4>
                  <p>{t.services.landingDesc}</p>
                </div>
                <div 
                  className={`calc-option ${calcType === 'corporate' ? 'selected' : ''}`}
                  onClick={() => setCalcType('corporate')}
                >
                  <Award className="calc-option-icon" />
                  <h4>{t.services.corporateTitle}</h4>
                  <p>{t.services.corporateDesc}</p>
                </div>
                <div 
                  className={`calc-option ${calcType === 'ecommerce' ? 'selected' : ''}`}
                  onClick={() => setCalcType('ecommerce')}
                >
                  <Zap className="calc-option-icon" />
                  <h4>{t.services.ecommerceTitle}</h4>
                  <p>{t.services.ecommerceDesc}</p>
                </div>
              </div>
            </div>

            <div className="calc-step">
              <div className="calc-range-wrapper">
                <div className="range-labels">
                  <span className="range-label-title">{t.services.pagesLabel}</span>
                  <span className="range-value">{calcPages}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={calcPages} 
                  className="calc-slider"
                  onChange={(e) => setCalcPages(parseInt(e.target.value))}
                />
                <div className="range-labels" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  <span>{t.services.page1}</span>
                  <span>{t.services.page30}</span>
                </div>
              </div>
            </div>

            <div className="calc-step">
              <h3><span className="step-num">2</span> {t.services.step2}</h3>
              <div className="calc-addons-grid">
                <div 
                  className={`calc-addon ${calcDevops ? 'selected' : ''}`}
                  onClick={() => setCalcDevops(!calcDevops)}
                >
                  <div className="calc-checkbox">
                    {calcDevops && <Check />}
                  </div>
                  <div className="addon-details">
                    <h4>{t.services.devopsAddon}</h4>
                    <p>{t.services.devopsAddonDesc}</p>
                  </div>
                </div>

                <div 
                  className={`calc-addon ${calcSmm ? 'selected' : ''}`}
                  onClick={() => setCalcSmm(!calcSmm)}
                >
                  <div className="calc-checkbox">
                    {calcSmm && <Check />}
                  </div>
                  <div className="addon-details">
                    <h4>{t.services.smmAddon}</h4>
                    <p>{t.services.smmAddonDesc}</p>
                  </div>
                </div>

                <div 
                  className={`calc-addon ${calcApi ? 'selected' : ''}`}
                  onClick={() => setCalcApi(!calcApi)}
                >
                  <div className="calc-checkbox">
                    {calcApi && <Check />}
                  </div>
                  <div className="addon-details">
                    <h4>{t.services.apiAddon}</h4>
                    <p>{t.services.apiAddonDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="calc-summary-wrapper">
              <div className="summary-title">{t.services.estimatedCost}</div>
              <div className="summary-price"><span>$</span>{animatedPrice}</div>
              <div className="summary-disclaimer">{t.services.disclaimer}</div>
              <Link href="/contact" className="btn btn-primary">
                {t.services.orderCalc} <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
