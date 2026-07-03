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
      title: 'Our Development Process | How We Build Websites — SiteNest Agency',
      description: 'Discover how SiteNest Agency builds websites: from research and design to development, testing, and launch. A transparent 6-step workflow.',
      openGraph: {
        title: 'Our Development Process | How We Build Websites — SiteNest Agency',
        description: 'A transparent 6-step process — from research and UX design to development, QA and cloud deployment.',
      },
    };
  }

  return {
    title: 'Процес розробки | Як ми створюємо сайти — SiteNest Agency',
    description: 'Дізнайтесь, як SiteNest Agency розробляє сайти: від дослідження та дизайну до розробки, тестування та запуску. Прозорий 6-кроковий процес.',
    openGraph: {
      title: 'Процес розробки | Як ми створюємо сайти — SiteNest Agency',
      description: 'Прозорий 6-кроковий процес — від дослідження та UX-дизайну до розробки, тестування та хмарного деплою.',
    },
  };
}

export default function ProcessPage() {
  return <ProcessClient />;
}
