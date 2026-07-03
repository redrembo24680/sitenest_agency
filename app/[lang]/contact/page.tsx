import type { Metadata } from 'next';
import ContactClient from './ContactClient';

interface ContactPageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'Contact Us | Start Your Web Project — SiteNest Agency',
      description: 'Get in touch with SiteNest Agency. Tell us about your project and get a free estimate. We build fast, modern websites for businesses of all sizes.',
      openGraph: {
        title: 'Contact Us | Start Your Web Project — SiteNest Agency',
        description: 'Reach out to SiteNest Agency and get a free consultation for your web project.',
      },
    };
  }

  return {
    title: 'Зв\'яжіться з нами | Замовити сайт у Львові — SiteNest Agency',
    description: 'Зв\'яжіться з SiteNest Agency та отримайте безкоштовну консультацію. Розробляємо сучасні, швидкі сайти для бізнесу будь-якого масштабу.',
    openGraph: {
      title: 'Зв\'яжіться з нами | Замовити сайт у Львові — SiteNest Agency',
      description: 'Напишіть нам — отримайте безкоштовну консультацію та кошторис для вашого веб-проєкту.',
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
