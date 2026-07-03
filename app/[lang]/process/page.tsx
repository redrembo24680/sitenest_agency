import type { Metadata } from 'next';
import ProcessClient from './ProcessClient';

interface ProcessPageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: ProcessPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'Our Website Development Process Ukraine — SiteNest Agency',
      description: 'Discover how SiteNest Agency builds websites under key: from research and design to development, testing, and cloud launch. A transparent workflow for businesses in Ukraine.',
      keywords: ['website development process', 'how to build website', 'web agency workflow Ukraine', 'custom web development stages'],
      openGraph: {
        title: 'Our Website Development Process Ukraine — SiteNest Agency',
        description: 'A transparent step-by-step process — from research and UX design to development, QA and cloud deployment.',
      },
    };
  }

  return {
    title: 'Етапи створення веб-сайтів під ключ в Україні — SiteNest Agency',
    description: 'Дізнайтесь, як SiteNest Agency створює сайти під ключ: від дослідження та дизайну до розробки, тестування та запуску. Прозорий процес розробки для бізнесу в Україні.',
    keywords: ['етапи створення веб сайтів', 'етапи розробки сайту', 'процес розробки сайту', 'розробка сайту покроково', 'створення сайту під ключ україна'],
    openGraph: {
      title: 'Етапи створення веб-сайтів під ключ в Україні — SiteNest Agency',
      description: 'Прозорий покроковий процес — від дослідження та UX-дизайну до розробки, тестування та хмарного деплою.',
    },
  };
}

export default function ProcessPage() {
  return <ProcessClient />;
}
