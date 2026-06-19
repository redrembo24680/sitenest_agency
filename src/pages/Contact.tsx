import React, { useState } from 'react';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import { FaqAccordionItem } from '../components/FaqAccordionItem';
import { useLanguage } from '../i18n/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'corporate',
    budget: '1000-3000',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = t.contact.errorName;
    }
    if (!formData.email.trim()) {
      errors.email = t.contact.errorEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.contact.errorEmailFormat;
    }
    if (!formData.message.trim()) {
      errors.message = t.contact.errorMessage;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setFormSuccess(true);
    }
  };

  return (
    <div className="page-fade-enter">
      <section className="container contact-layout">
        <div className="contact-grid">
          <div className="contact-info-section">
            <span className="section-subtitle">{t.contact.subtitle}</span>
            <h1>{t.contact.title} <span>{t.contact.titleHighlight}</span></h1>
            <p>{t.contact.desc}</p>
            
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-icon-box"><Mail /></div>
                <div className="contact-detail-text">
                  <h4>{t.contact.emailLabel}</h4>
                  <p>hello@sitenest.agency</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <div className="contact-detail-text">
                  <h4>{t.contact.instagramLabel}</h4>
                  <p>@sitenest_agency</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon-box"><MapPin /></div>
                <div className="contact-detail-text">
                  <h4>{t.contact.locationLabel}</h4>
                  <p>{t.contact.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card contact-form-card">
            {!formSuccess ? (
              <form id="agencyContactForm" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">{t.contact.nameLabel}</label>
                  <input 
                    type="text" 
                    className={`form-input ${formErrors.name ? 'error' : ''}`} 
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">{t.contact.emailInputLabel}</label>
                  <input 
                    type="email" 
                    className={`form-input ${formErrors.email ? 'error' : ''}`} 
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">{t.contact.projectTypeLabel}</label>
                  <select 
                    className="form-input" 
                    style={{ background: 'var(--bg-dark)' }}
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    <option value="landing">Landing Page</option>
                    <option value="corporate">{t.services.corporateTitle}</option>
                    <option value="ecommerce">{t.services.ecommerceTitle}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.contact.budgetLabel}</label>
                  <select 
                    className="form-input" 
                    style={{ background: 'var(--bg-dark)' }}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="less-1000">{t.contact.budgetLess}</option>
                    <option value="1000-3000">{t.contact.budget1k}</option>
                    <option value="3000-7000">{t.contact.budget3k}</option>
                    <option value="more-7000">{t.contact.budgetMore}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.contact.messageLabel}</label>
                  <textarea 
                    className={`form-input ${formErrors.message ? 'error' : ''}`} 
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn">
                  {t.contact.submitBtn} <Send className="btn-icon" />
                </button>
              </form>
            ) : (
              <div className="form-success-state" style={{ display: 'block', opacity: 1 }}>
                <div className="success-icon-box">
                  <Check />
                </div>
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successDesc.replace('{name}', formData.name)}</p>
                <button className="btn btn-outline" style={{ marginTop: '2rem' }} type="button" onClick={() => setFormSuccess(false)}>
                  {t.contact.sendAgain}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-section">
          <span className="section-subtitle">{t.contact.faqSubtitle}</span>
          <h2 className="section-title">{t.contact.faqTitle} <span>{t.contact.faqTitleHighlight}</span></h2>
          
          <div className="faq-grid">
            <FaqAccordionItem question={t.contact.faq1q} answer={t.contact.faq1a} />
            <FaqAccordionItem question={t.contact.faq2q} answer={t.contact.faq2a} />
            <FaqAccordionItem question={t.contact.faq3q} answer={t.contact.faq3a} />
            <FaqAccordionItem question={t.contact.faq4q} answer={t.contact.faq4a} />
          </div>
        </div>
      </section>
    </div>
  );
};
