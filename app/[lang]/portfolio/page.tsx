import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

interface PortfolioPageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'Portfolio | Web Development Case Studies — SiteNest Agency',
      description: 'Explore SiteNest Agency\'s portfolio of web projects: e-commerce stores, crypto dashboards, DevOps platforms and SMM campaigns with proven results.',
      openGraph: {
        title: 'Portfolio | Web Development Case Studies — SiteNest Agency',
        description: 'Real results: e-commerce, crypto dashboards, DevOps platforms and digital marketing campaigns by SiteNest Agency.',
      },
    };
  }

  return {
    title: 'Портфоліо | Кейси з веб-розробки — SiteNest Agency',
    description: 'Перегляньте портфоліо SiteNest Agency: інтернет-магазини, крипто-дашборди, DevOps платформи та SMM-кампанії з реальними результатами.',
    openGraph: {
      title: 'Портфоліо | Кейси з веб-розробки — SiteNest Agency',
      description: 'Реальні результати: e-commerce, криптодашборди, DevOps платформи та digital-маркетинг від SiteNest Agency.',
    },
  };
}

export default function PortfolioPage() {
  return <PortfolioClient />;
}
