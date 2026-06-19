import React, { useEffect, useRef } from 'react';
import { Search, Paintbrush, Code2, TestTube2, Rocket, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const PROCESS_STEPS = [
  { icon: Search, color: 'var(--color-blue)', num: '01' },
  { icon: Paintbrush, color: 'var(--color-pink)', num: '02' },
  { icon: Code2, color: 'var(--color-orange)', num: '03' },
  { icon: TestTube2, color: 'var(--color-purple)', num: '04' },
  { icon: Rocket, color: 'var(--color-blue)', num: '05' },
  { icon: HeartHandshake, color: 'var(--color-pink)', num: '06' },
];

const TECH_STACK = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI / Django', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Cloudflare', category: 'CDN/Security' },
  { name: 'GitHub Actions', category: 'CI/CD' },
  { name: 'Nginx', category: 'Server' },
  { name: 'Figma', category: 'Design' },
  { name: 'Meta Ads', category: 'Marketing' },
];

export const Process: React.FC = () => {
  const { t } = useLanguage();
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = stepsRef.current?.querySelectorAll('.process-step-card');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stepTitles = [
    t.process.step1Title, t.process.step2Title, t.process.step3Title,
    t.process.step4Title, t.process.step5Title, t.process.step6Title,
  ];
  const stepDescs = [
    t.process.step1Desc, t.process.step2Desc, t.process.step3Desc,
    t.process.step4Desc, t.process.step5Desc, t.process.step6Desc,
  ];

  return (
    <div className="page-fade-enter">
      {/* HERO */}
      <section className="process-hero">
        <div className="container">
          <span className="section-subtitle">{t.process.subtitle}</span>
          <h1>{t.process.title} <span>{t.process.titleHighlight}</span></h1>
          <p>{t.process.desc}</p>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="section-padding">
        <div className="container" ref={stepsRef}>
          <div className="process-steps-grid">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  className="glass-card process-step-card"
                  key={i}
                  style={{ '--step-color': step.color, animationDelay: `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className="process-step-num">{step.num}</div>
                  <div className="process-step-icon-wrap">
                    <Icon className="process-step-icon" />
                  </div>
                  <h3>{stepTitles[i]}</h3>
                  <p>{stepDescs[i]}</p>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="process-connector" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section-padding" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <span className="section-subtitle">{t.process.techSubtitle}</span>
          <h2 className="section-title">{t.process.techTitle} <span>{t.process.techTitleHighlight}</span></h2>
          <div className="tech-cloud">
            {TECH_STACK.map((tech, i) => (
              <div className="tech-cloud-item" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="tech-cloud-name">{tech.name}</span>
                <span className="tech-cloud-cat">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
