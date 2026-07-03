import type { Metadata } from 'next';
import HomeClient from './HomeClient';

interface HomePageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'SiteNest Agency | Web Development Ukraine & Lviv',
      description: 'SiteNest Agency — custom web development studio in Ukraine. We build high-performance websites, Next.js web applications, e-commerce, cloud DevOps & digital marketing.',
      keywords: ['web development Ukraine', 'website design studio Lviv', 'Next.js web applications', 'custom website design Ukraine', 'devops consulting Ukraine'],
      openGraph: {
        title: 'SiteNest Agency | Web Development Ukraine & Lviv',
        description: 'High-performance websites, web applications, and cloud solutions. Full-cycle agency for businesses in Ukraine.',
      },
    };
  }

  return {
    title: 'SiteNest Agency | Створення та розробка сайтів під ключ в Україні',
    description: 'Веб-студія SiteNest Agency. Професійна розробка сайтів під ключ, інтернет-магазинів, веб-додатків на Next.js, DevOps та SMM-просування в Україні та Львові.',
    keywords: ['розробка сайтів україна', 'створення сайтів під ключ', 'замовити сайт', 'веб студія україна', 'розробка сайтів львів', 'розробка сайту ціна'],
    openGraph: {
      title: 'SiteNest Agency | Створення та розробка сайтів під ключ в Україні',
      description: 'Швидкі сайти, веб-додатки та хмарні DevOps рішення. Повний цикл розробки від SiteNest Agency.',
    },
  };
}

export default function HomePage() {
  return <HomeClient />;
}
