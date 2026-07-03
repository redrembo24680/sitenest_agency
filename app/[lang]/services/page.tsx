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
      title: 'Web Development Services Ukraine | Front-end, Back-end, DevOps & SMM — SiteNest Agency',
      description: 'SiteNest Agency — full-cycle web development studio from Lviv, serving clients across Ukraine. React/Next.js front-end, Node.js back-end, Docker/AWS DevOps and SMM. Order from $150.',
      keywords: ['web development Ukraine', 'website development Ukraine', 'React Next.js development', 'web agency Ukraine', 'full-cycle web development'],
      openGraph: {
        title: 'Web Development Ukraine | Full-cycle — SiteNest Agency',
        description: 'Full-cycle web development across Ukraine: React front-end, scalable back-end, cloud DevOps, and SMM marketing. Fast delivery, fixed price.',
      },
    };
  }

  return {
    title: 'Розробка сайтів під ключ в Україні | Front-end, Back-end, DevOps та SMM — SiteNest Agency',
    description: 'SiteNest Agency — веб-студія зі Львова. Розробка сайтів під ключ по всій Україні: React/Next.js, Node.js/Python back-end, DevOps (Docker, AWS) та SMM. Замовте сайт від $150.',
    keywords: ['розробка сайтів під ключ', 'розробка сайтів україна', 'створення сайту під ключ', 'веб-розробка україна', 'замовити сайт', 'розробка сайтів львів'],
    openGraph: {
      title: 'Розробка сайтів під ключ в Україні — SiteNest Agency',
      description: 'Повний цикл розробки сайтів: React front-end, масштабований back-end, хмарний DevOps та SMM. Фіксована ціна, швидкі терміни.',
    },
  };
}

export default function ServicesPage() {
  return <ServicesClient />;
}
