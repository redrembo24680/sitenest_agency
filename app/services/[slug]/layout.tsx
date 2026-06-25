import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug === 'ai-integration') {
    return {
      title: 'Впровадження штучного інтелекту в бізнесі | Інтеграція ChatGPT',
      description: 'Професійне впровадження штучного інтелекту та розробка AI-агентів. Інтеграція ChatGPT для бізнесу, автоматизація процесів та розробка розумних ботів у Львові та Україні.',
      keywords: ['впровадження штучного інтелекту', 'інтеграція chatgpt', 'ai для бізнесу', 'штучний інтелект в бізнесі', 'розробка ai агентів'],
      alternates: { canonical: 'https://sitenest.work/services/ai-integration' },
    };
  }
  
  if (slug === 'web-scraping') {
    return {
      title: 'Парсинг сайтів та Розробка парсера | SiteNest',
      description: 'Професійний парсинг сайтів, збір даних та обхід захисту (Playwright). Розробка парсера для моніторингу цін конкурентів, крипто-спредів та ігрової статистики (CS2).',
      keywords: ['парсинг сайтів', 'розробка парсера', 'моніторинг цін конкурентів', 'замовити парсинг сайту', 'веб скрапінг'],
      alternates: { canonical: 'https://sitenest.work/services/web-scraping' },
    };
  }

  if (slug === 'telegram-bots') {
    return {
      title: 'Розробка телеграм ботів для B2B | SiteNest',
      description: 'Професійна розробка телеграм ботів. Створюємо багатоканальні системи сповіщень (AnyAlert), боти для P2P-трейдингу та мультиагентні ШІ-системи (LLM).',
      keywords: ['розробка телеграм ботів', 'замовити телеграм бота', 'telegram бот для магазину', 'автоматизація бізнесу телеграм'],
      alternates: { canonical: 'https://sitenest.work/services/telegram-bots' },
    };
  }

  return {
    title: `${slug.toUpperCase()} послуги | SiteNest Agency`,
  };
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
