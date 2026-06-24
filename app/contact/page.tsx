'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, Loader2 } from 'lucide-react';
import { FaqAccordionItem } from '@/components/FaqAccordionItem';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { sendContactEmail } from '@/app/actions/contact';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: t.services.corporateTitle as string,
    budget: t.contact.budget1k as string,
    message: '',
    botcheck: '' // honeypot
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
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
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('projectType', formData.projectType);
      submitData.append('budget', formData.budget);
      submitData.append('message', formData.message);
      submitData.append('botcheck', formData.botcheck);

      const result = await sendContactEmail(submitData);
      
      if (result.success) {
        setFormSuccess(true);
        setFormData({ ...formData, message: '', botcheck: '' });
      } else {
        setFormErrors({ submit: result.message || 'Failed to send' });
      }
    } catch (error) {
      setFormErrors({ submit: 'An error occurred while sending' });
    } finally {
      setIsSubmitting(false);
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
                <div className="contact-icon-box"><Mail aria-hidden="true" /></div>
                <div className="contact-detail-text">
                  <p><strong>{t.contact.emailLabel}</strong></p>
                  <p><a href="mailto:sitenest.ua@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>sitenest.ua@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <div className="contact-detail-text">
                  <p><strong>{t.contact.instagramLabel}</strong></p>
                  <p><a href="https://www.instagram.com/sitenest_agency?igsh=YXJkZmYwZzFyY2c0&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>@sitenest_agency</a></p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon-box"><MapPin aria-hidden="true" /></div>
                <div className="contact-detail-text">
                  <p><strong>{t.contact.locationLabel}</strong></p>
                  <p>{t.contact.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card contact-form-card">
            {!formSuccess ? (
              <form id="agencyContactForm" onSubmit={handleFormSubmit}>
                {formErrors.submit && (
                  <div className="error-message" style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(255, 0, 0, 0.1)', borderLeft: '3px solid red' }}>
                    {formErrors.submit}
                  </div>
                )}

                {/* Honeypot field (hidden from users) */}
                <input 
                  type="checkbox" 
                  name="botcheck" 
                  style={{ display: 'none' }}
                  onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked ? 'true' : '' })}
                />

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">{t.contact.nameLabel}</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    className={`form-input ${formErrors.name ? 'error' : ''}`} 
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    autoComplete="name"
                  />
                  {formErrors.name && <span className="error-message" role="alert">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">{t.contact.emailInputLabel}</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    className={`form-input ${formErrors.email ? 'error' : ''}`} 
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="email"
                  />
                  {formErrors.email && <span className="error-message" role="alert">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-project-type">{t.contact.projectTypeLabel}</label>
                  <select 
                    id="contact-project-type"
                    className="form-input" 
                    style={{ background: 'var(--bg-dark)' }}
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    <option value={t.services.landingTitle}>{t.services.landingTitle}</option>
                    <option value={t.services.corporateTitle}>{t.services.corporateTitle}</option>
                    <option value={t.services.ecommerceTitle}>{t.services.ecommerceTitle}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-budget">{t.contact.budgetLabel}</label>
                  <select 
                    id="contact-budget"
                    className="form-input" 
                    style={{ background: 'var(--bg-dark)' }}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value={t.contact.budgetLess}>{t.contact.budgetLess}</option>
                    <option value={t.contact.budget1k}>{t.contact.budget1k}</option>
                    <option value={t.contact.budget3k}>{t.contact.budget3k}</option>
                    <option value={t.contact.budgetMore}>{t.contact.budgetMore}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">{t.contact.messageLabel}</label>
                  <textarea 
                    id="contact-message"
                    className={`form-input ${formErrors.message ? 'error' : ''}`} 
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {formErrors.message && <span className="error-message" role="alert">{formErrors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Надсилання... <Loader2 className="btn-icon animate-spin" /></>
                  ) : (
                    <>{t.contact.submitBtn} <Send className="btn-icon" /></>
                  )}
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
}
