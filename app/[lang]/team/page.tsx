import type { Metadata } from 'next';
import TeamClient from './TeamClient';

interface TeamPageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'Our Team | Web Development Experts — SiteNest Agency',
      description: 'Meet the SiteNest Agency team — a passionate group of web developers, designers, DevOps engineers and digital marketers from Lviv, Ukraine.',
      openGraph: {
        title: 'Our Team | Web Development Experts — SiteNest Agency',
        description: 'Meet the SiteNest Agency team — passionate professionals in web development, design, DevOps and digital marketing.',
      },
    };
  }

  return {
    title: 'Наша команда | Фахівці з веб-розробки — SiteNest Agency',
    description: 'Познайомтесь з командою SiteNest Agency — пристрасними розробниками, дизайнерами, DevOps-інженерами та SMM-фахівцями зі Львова.',
    openGraph: {
      title: 'Наша команда | Фахівці з веб-розробки — SiteNest Agency',
      description: 'Познайомтесь з командою SiteNest Agency — пристрасними фахівцями у веб-розробці, дизайні, DevOps та digital-маркетингу.',
    },
  };
}

export default function TeamPage() {
  return <TeamClient />;
}
