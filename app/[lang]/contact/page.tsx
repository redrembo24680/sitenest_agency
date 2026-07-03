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
      title: 'Contact Us | Order a Website in Ukraine — SiteNest Agency',
      description: 'Contact SiteNest Agency to order a website. We serve clients across Ukraine from our studio in Lviv. Get a free estimate for your web project.',
      keywords: ['contact web agency Ukraine', 'order website Ukraine', 'hire web developer Ukraine', 'get website quote Ukraine'],
      openGraph: {
        title: 'Contact Us | Order a Website in Ukraine — SiteNest Agency',
        description: 'Reach out to SiteNest Agency and get a free consultation for your web project.',
      },
    };
  }

  return {
    title: 'Замовити сайт в Україні | Зв\'яжіться з нами — SiteNest Agency',
    description: 'Замовте розробку сайту в SiteNest Agency. Працюємо з клієнтами з усієї України (студія у Львові). Безкоштовна консультація та кошторис.',
    keywords: ['замовити сайт', 'замовити розробку сайту', 'замовити сайт під ключ', 'розробка сайту ціна', 'вартість сайту', 'замовити сайт львів'],
    openGraph: {
      title: 'Замовити сайт в Україні | Зв\'яжіться з нами — SiteNest Agency',
      description: 'Напишіть нам — отримайте безкоштовну консультацію та кошторис для вашого веб-проєкту.',
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const isEn = lang === 'en';

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': isEn ? 'Contact SiteNest Agency' : 'Контакти SiteNest Agency',
    'description': isEn 
      ? 'Get in touch with SiteNest Agency to order a website. Free consultation.' 
      : 'Зв\'яжіться з SiteNest Agency для замовлення сайту. Безкоштовна консультація.',
    'url': isEn ? 'https://sitenest.work/en/contact' : 'https://sitenest.work/contact',
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'sitenest.ua@gmail.com',
      'contactType': 'customer service',
      'areaServed': 'UA',
      'availableLanguage': ['Ukrainian', 'English']
    },
    'mainEntity': {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': isEn ? 'How much does it cost to develop a website?' : 'Скільки коштує розробка сайту під ключ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': isEn
              ? 'The cost depends on the project scope and complexity. Our landing pages start from $150, and custom corporate websites or e-commerce sites start from $500. Contact us for a free estimate.'
              : 'Вартість залежить від складності проекту. Ціна на лендинг стартує від $150, корпоративні сайти та інтернет-магазини — від $500. Зв\'яжіться з нами для детального розрахунку.'
          }
        },
        {
          '@type': 'Question',
          'name': isEn ? 'What is the website development timeline?' : 'Які терміни створення сайту?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': isEn
              ? 'Usually, website development takes from 1 to 4 weeks depending on the complexity of design and features.'
              : 'Зазвичай розробка сайту займає від 1 до 4 тижнів залежно від обсягу роботи, дизайну та функціоналу.'
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactClient />
    </>
  );
}

