'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { FrontendVisual, BackendVisual, DevopsVisual, SmmVisual } from '@/components/ServiceCodeMockups';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetail({ params }: ServicePageProps) {
  const { slug } = use(params);
  const { t } = useLanguage();

  const serviceId = slug as 'frontend' | 'backend' | 'devops' | 'smm';

  // Find the translation object for this service
  const serviceData = t.serviceDetails[serviceId];

  if (!serviceData) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <Link href="/services" className="btn btn-outline" style={{ marginTop: '2rem' }}>
          {t.serviceDetails.backBtn}
        </Link>
      </div>
    );
  }

  // Choose the visual based on the service ID
  const renderVisual = () => {
    switch (serviceId) {
      case 'frontend':
        return <FrontendVisual />;
      case 'backend':
        return <BackendVisual />;
      case 'devops':
        return <DevopsVisual />;
      case 'smm':
        return <SmmVisual />;
      default:
        return null;
    }
  };

  return (
    <div className="page-fade-enter">
      {/* HERO SECTION */}
      <section className="services-hero">
        <div className="container" style={{ textAlign: 'left', position: 'relative' }}>
          <Link 
            href="/services" 
            className="btn btn-outline" 
            style={{ marginBottom: '2.5rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center' }} 
          >
            <ArrowLeft className="btn-icon" style={{ transform: 'none', width: '14px', height: '14px', marginRight: '6px' }} /> 
            {t.serviceDetails.backBtn}
          </Link>
          
          <span className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 0.5rem 0' }}>
            {serviceId.toUpperCase()}
          </span>
          <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '1rem', fontWeight: 800 }}>
            {serviceData.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-blue)', maxWidth: '800px', margin: 0, fontWeight: 500 }}>
            {serviceData.tagline}
          </p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 0.8fr', 
            gap: '3.5rem', 
            alignItems: 'start' 
          }}
          className="service-detail-grid-layout"
        >
          {/* LEFT SIDE: Text and Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                {serviceData.desc1}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                {serviceData.desc2}
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 700 }}>
                {t.serviceDetails.keyFeaturesTitle}
              </h3>
              <ul className="service-benefits" style={{ gap: '1rem' }}>
                {serviceData.features.map((feature: string, idx: number) => (
                  <li key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.5', alignItems: 'flex-start' }}>
                    <Check style={{ marginTop: '3px' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 700 }}>
                {t.serviceDetails.techStackTitle}
              </h3>
              <div className="tech-tags" style={{ gap: '0.75rem' }}>
                {serviceData.technologies.map((tech: string, idx: number) => (
                  <span 
                    className="tech-tag" 
                    key={idx} 
                    style={{ fontSize: '0.9rem', padding: '0.45rem 1.1rem', background: 'rgba(255,255,255,0.03)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Graphic & Call to Action */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'sticky', top: '100px' }} className="service-detail-sidebar">
            <div className="service-detail-visual" style={{ width: '100%', height: 'auto', minHeight: '260px' }}>
              {renderVisual()}
            </div>

            <div className="glass-card" style={{ padding: '2.5rem', background: 'radial-gradient(circle at top right, rgba(0, 240, 255, 0.05), transparent 70%), var(--bg-card)', border: '1px solid rgba(0, 240, 255, 0.15)' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>
                {t.serviceDetails.ctaTitle}
              </h3>
              <p style={{ color: 'var(--text-slate)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                {t.serviceDetails.ctaDesc}
              </p>
              <Link 
                href="/contact"
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} 
              >
                {t.serviceDetails.ctaBtn} <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
