import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string; lang: string }>;
};

const servicesMeta: Record<string, Record<string, { title: string; description: string; keywords: string[] }>> = {
  frontend: {
    uk: {
      title: 'Front-end розробка Львів | React та Next.js сайти під ключ — SiteNest Agency',
      description: 'Розробка Front-end у Львові на React та Next.js. Швидкі, адаптивні інтерфейси з анімаціями на 60fps. Замовити Front-end розробку в SiteNest Agency.',
      keywords: ['front-end розробка львів', 'розробка react сайту', 'next.js розробка', 'замовити front-end', 'react розробник львів'],
    },
    en: {
      title: 'Front-end Development Lviv | React & Next.js Websites — SiteNest Agency',
      description: 'Professional Front-end development in Lviv with React and Next.js. Fast, responsive interfaces with smooth 60fps animations. Order your website from SiteNest Agency.',
      keywords: ['front-end development Lviv', 'React development Ukraine', 'Next.js developer', 'hire React developer Lviv'],
    },
  },
  backend: {
    uk: {
      title: 'Back-end розробка Львів | API, Node.js та Python сервери — SiteNest Agency',
      description: 'Масштабовані Back-end рішення у Львові: REST API на Node.js та Python (FastAPI/Django), PostgreSQL, Redis, інтеграція платіжних систем. Замовити Back-end розробку.',
      keywords: ['back-end розробка львів', 'розробка api', 'node.js розробник', 'python розробка', 'замовити back-end'],
    },
    en: {
      title: 'Back-end Development Lviv | Node.js & Python APIs — SiteNest Agency',
      description: 'Scalable back-end development in Lviv: REST APIs with Node.js and Python (FastAPI/Django), PostgreSQL, Redis, payment gateway integrations.',
      keywords: ['back-end development Lviv', 'Node.js developer Ukraine', 'Python API development', 'hire back-end developer'],
    },
  },
  devops: {
    uk: {
      title: 'DevOps послуги Львів | Docker, AWS, CI/CD автоматизація — SiteNest Agency',
      description: 'DevOps та хмарна інфраструктура у Львові: Docker, Kubernetes, AWS, Cloudflare, CI/CD через GitHub Actions. Гарантуємо 99.9% uptime вашого сайту.',
      keywords: ['devops послуги львів', 'docker kubernetes налаштування', 'aws cloudflare', 'ci/cd автоматизація', 'адміністрування серверів'],
    },
    en: {
      title: 'DevOps Services Lviv | Docker, AWS, CI/CD Automation — SiteNest Agency',
      description: 'Professional DevOps and cloud infrastructure from Lviv: Docker, Kubernetes, AWS, Cloudflare CDN, CI/CD automation via GitHub Actions. 99.9% uptime guarantee.',
      keywords: ['DevOps services Lviv', 'Docker Kubernetes setup', 'AWS infrastructure Ukraine', 'CI/CD automation'],
    },
  },
  smm: {
    uk: {
      title: 'SMM та SEO просування Львів | Таргетована реклама Meta Ads — SiteNest Agency',
      description: 'SMM та SEO просування для бізнесу у Львові: таргетована реклама Meta Ads, Instagram Growth, SEO-копірайтинг та A/B тестування. Збільшимо ваших клієнтів.',
      keywords: ['smm просування львів', 'таргетована реклама львів', 'meta ads україна', 'seo просування львів', 'instagram просування'],
    },
    en: {
      title: 'SMM & SEO Marketing Lviv | Meta Ads & Instagram Growth — SiteNest Agency',
      description: 'Professional SMM and SEO marketing from Lviv: Meta Ads targeting, Instagram Growth, SEO copywriting and A/B testing. Grow your customer base.',
      keywords: ['SMM marketing Lviv', 'Meta Ads Ukraine', 'Instagram growth Lviv', 'SEO promotion Ukraine'],
    },
  },
  'ai-integration': {
    uk: {
      title: 'Впровадження штучного інтелекту в бізнесі | Інтеграція ChatGPT — SiteNest',
      description: 'Професійне впровадження штучного інтелекту та розробка AI-агентів у Львові. Інтеграція ChatGPT для бізнесу, автоматизація процесів та розумні боти.',
      keywords: ['впровадження штучного інтелекту', 'інтеграція chatgpt', 'ai для бізнесу', 'штучний інтелект в бізнесі', 'розробка ai агентів'],
    },
    en: {
      title: 'AI Integration for Business | ChatGPT & LLM Development — SiteNest Agency',
      description: 'Professional AI integration and agent development in Lviv. ChatGPT integration, business process automation, and intelligent bot development.',
      keywords: ['AI integration Lviv', 'ChatGPT business integration', 'LLM development Ukraine', 'AI agents'],
    },
  },
  'web-scraping': {
    uk: {
      title: 'Парсинг сайтів та Розробка парсера Львів | SiteNest Agency',
      description: 'Професійний парсинг сайтів та розробка парсерів у Львові. Збір даних, моніторинг цін конкурентів, обхід захисту (Playwright). Замовити парсинг.',
      keywords: ['парсинг сайтів', 'розробка парсера', 'моніторинг цін конкурентів', 'замовити парсинг сайту', 'веб скрапінг'],
    },
    en: {
      title: 'Web Scraping & Parser Development Lviv | SiteNest Agency',
      description: 'Professional web scraping and parser development in Lviv. Data collection, competitor price monitoring, anti-bot bypass (Playwright).',
      keywords: ['web scraping Lviv', 'parser development Ukraine', 'competitor price monitoring', 'data collection service'],
    },
  },
  'telegram-bots': {
    uk: {
      title: 'Розробка Telegram-ботів Львів для бізнесу | SiteNest Agency',
      description: 'Професійна розробка Telegram-ботів у Львові для бізнесу та B2B. Системи сповіщень, P2P-боти, мультиагентні ШІ-системи (LLM). Замовити бота.',
      keywords: ['розробка телеграм ботів', 'замовити телеграм бота', 'telegram бот для бізнесу', 'автоматизація бізнесу telegram'],
    },
    en: {
      title: 'Telegram Bot Development Lviv | Business Automation — SiteNest Agency',
      description: 'Professional Telegram bot development in Lviv for business automation. Multi-channel notification systems, P2P trading bots, AI-powered agents (LLM).',
      keywords: ['Telegram bot development Lviv', 'business automation Telegram', 'LLM Telegram bot Ukraine'],
    },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = lang === 'en' ? 'en' : 'uk';
  const canonical = locale === 'en'
    ? `https://sitenest.work/en/services/${slug}`
    : `https://sitenest.work/services/${slug}`;

  const meta = servicesMeta[slug]?.[locale];

  if (meta) {
    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      alternates: {
        canonical,
        languages: {
          'uk-UA': `https://sitenest.work/services/${slug}`,
          'en-US': `https://sitenest.work/en/services/${slug}`,
        },
      },
      openGraph: {
        title: meta.title,
        description: meta.description,
      },
    };
  }

  // fallback for unknown slugs
  return {
    title: `${slug} | SiteNest Agency`,
    alternates: { canonical },
  };
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
