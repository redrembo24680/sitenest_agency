import React from 'react';
import { Check, ArrowRight, Rocket, Award, Zap } from 'lucide-react';
import { FrontendVisual, BackendVisual, DevopsVisual, SmmVisual } from '../components/ServiceCodeMockups';
import { useLanguage } from '../i18n/LanguageContext';

interface ServicesProps {
  navigateTo: (page: string) => void;
  calcType: 'landing' | 'corporate' | 'ecommerce';
  setCalcType: (type: 'landing' | 'corporate' | 'ecommerce') => void;
  calcPages: number;
  setCalcPages: (pages: number) => void;
  calcDevops: boolean;
  setCalcDevops: (val: boolean) => void;
  calcSmm: boolean;
  setCalcSmm: (val: boolean) => void;
  calcApi: boolean;
  setCalcApi: (val: boolean) => void;
  animatedPrice: number;
}

export const Services: React.FC<ServicesProps> = ({
  navigateTo,
  calcType,
  setCalcType,
  calcPages,
  setCalcPages,
  calcDevops,
  setCalcDevops,
  calcSmm,
  setCalcSmm,
  calcApi,
  setCalcApi,
  animatedPrice
}) => {
  const { t, lang } = useLanguage();

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
            <button 
              className="btn btn-outline" 
              style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }} 
              onClick={() => navigateTo('service-frontend')}
            >
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </button>
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
            <button 
              className="btn btn-outline" 
              style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }} 
              onClick={() => navigateTo('service-backend')}
            >
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </button>
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
            <button 
              className="btn btn-outline" 
              style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }} 
              onClick={() => navigateTo('service-devops')}
            >
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </button>
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
            <button 
              className="btn btn-outline" 
              style={{ marginTop: '1.75rem', padding: '0.65rem 1.6rem', fontSize: '0.85rem' }} 
              onClick={() => navigateTo('service-smm')}
            >
              {lang === 'uk' ? 'Детальніше про послугу' : 'Service Details'} <ArrowRight className="btn-icon" style={{ width: '14px', height: '14px' }} />
            </button>
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
              <button className="btn btn-primary" type="button" onClick={() => navigateTo('contact')}>
                {t.services.orderCalc} <ArrowRight className="btn-icon" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
