import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

interface ServicesPageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'Web Development Services | Front-end, Back-end, DevOps & SMM — SiteNest Agency',
      description: 'SiteNest Agency offers full-cycle web development services: React/Next.js front-end, Node.js/Python back-end, Docker/AWS DevOps and social media marketing.',
      openGraph: {
        title: 'Web Development Services | Front-end, Back-end, DevOps & SMM — SiteNest Agency',
        description: 'Full-cycle web development: React front-end, scalable back-end, cloud DevOps, and targeted social media marketing.',
      },
    };
  }

  return {
    title: 'Послуги веб-розробки | Front-end, Back-end, DevOps та SMM — SiteNest Agency',
    description: 'SiteNest Agency пропонує повний цикл веб-розробки: React/Next.js front-end, Node.js/Python back-end, DevOps на Docker/AWS та SMM-просування.',
    openGraph: {
      title: 'Послуги веб-розробки | Front-end, Back-end, DevOps та SMM — SiteNest Agency',
      description: 'Повний цикл розробки: React front-end, масштабований back-end, хмарний DevOps та таргетований SMM-маркетинг.',
    },
  };
}

export default function ServicesPage() {
  return <ServicesClient />;
}
