import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import FloatingChatWidget from '@/components/FloatingChatWidget';
import { Web3Provider } from '@/components/Web3Provider';
import '../globals.css';

import { headers } from 'next/headers';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'uk';
  const url = 'https://sitenest.work';
  
  // Await the headers() function in Next.js 15+
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
  // Clean up pathname to construct canonicals
  let cleanPath = pathname;
  if (cleanPath.startsWith('/en/') || cleanPath === '/en') {
    cleanPath = cleanPath.replace(/^\/en/, '') || '/';
  } else if (cleanPath.startsWith('/uk/') || cleanPath === '/uk') {
    cleanPath = cleanPath.replace(/^\/uk/, '') || '/';
  }

  const canonicalUrlUk = `${url}${cleanPath === '/' ? '' : cleanPath}`;
  const canonicalUrlEn = `${url}/en${cleanPath === '/' ? '' : cleanPath}`;
  const currentCanonical = lang === 'en' ? canonicalUrlEn : canonicalUrlUk;
  
  const isEn = lang === 'en';

  const defaultTitle = isEn
    ? 'SiteNest Agency | Web Development in Lviv, Ukraine'
    : 'SiteNest Agency | Розробка веб-сайтів у Львові';

  const defaultDescription = isEn
    ? 'SiteNest Agency — a web agency from Lviv. We build fast, responsive websites: Front-end, Back-end, DevOps and SMM marketing.'
    : 'SiteNest Agency — веб-агенція з Львова. Розробляємо швидкі, адаптивні сайти: Front-end, Back-end, DevOps та SMM просування.';

  const defaultKeywords = isEn
    ? ['web agency', 'website development', 'Lviv', 'Next.js', 'React', 'DevOps', 'SEO', 'Ukraine']
    : ['веб-агенція', 'розробка сайтів', 'Львів', 'Next.js', 'React', 'DevOps', 'SEO'];

  return {
    metadataBase: new URL(url),
    title: {
      default: defaultTitle,
      template: '%s | SiteNest Agency',
    },
    description: defaultDescription,
    keywords: defaultKeywords,
    authors: [{ name: 'SiteNest Agency', url }],
    creator: 'SiteNest Agency',
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'uk_UA',
      url: currentCanonical,
      siteName: 'SiteNest Agency',
      title: defaultTitle,
      description: defaultDescription,
      images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'SiteNest Agency' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn ? 'SiteNest Agency | Web Development' : 'SiteNest Agency | Розробка веб-сайтів',
      description: isEn ? 'SiteNest Agency — a web agency from Lviv, Ukraine.' : 'SiteNest Agency — веб-агенція з Львова.',
      images: ['/og-image.webp'],
    },
    alternates: {
      canonical: currentCanonical,
      languages: {
        'uk-UA': canonicalUrlUk,
        'en-US': canonicalUrlEn,
      },
    },
    icons: {
      icon: [
        { url: 'https://sitenest.work/icon-48x48.png?v=11', type: 'image/png', sizes: '48x48' },
        { url: 'https://sitenest.work/icon-192x192.png?v=11', type: 'image/png', sizes: '192x192' },
      ],
      apple: [
        { url: 'https://sitenest.work/apple-touch-icon.png?v=11', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

// Viewport configuration — required for proper mobile rendering
// viewport-fit=cover ensures content fills iPhone notch/Dynamic Island areas
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow user zoom (accessibility)
  viewportFit: 'cover', // iOS safe-area support
};

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin', 'cyrillic-ext'],
  variable: '--font-body',
  display: 'swap',
});

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'uk';
  const isEn = lang === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://sitenest.work/#organization',
    'name': 'SiteNest Agency',
    'alternateName': isEn ? 'SiteNest Web Development Agency Lviv' : 'SiteNest веб-агенція Львів',
    'description': isEn
      ? 'Full-cycle web development agency in Lviv, Ukraine. We build fast, modern websites: React/Next.js front-end, Node.js back-end, Docker DevOps and SMM promotion.'
      : 'Веб-агенція повного циклу у Львові. Розробляємо швидкі, адаптивні сайти: React/Next.js front-end, Node.js back-end, DevOps та SMM-просування.',
    'image': 'https://sitenest.work/og-image.webp',
    'logo': 'https://sitenest.work/icon-192x192.png?v=11',
    'url': 'https://sitenest.work',
    'email': 'sitenest.ua@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': isEn ? 'Lviv' : 'Львів',
      'addressRegion': isEn ? 'Lviv Oblast' : 'Львівська область',
      'addressCountry': 'UA',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 49.8397,
      'longitude': 24.0297,
    },
    'areaServed': [
      { '@type': 'City', 'name': isEn ? 'Lviv' : 'Львів' },
      { '@type': 'Country', 'name': isEn ? 'Ukraine' : 'Україна' },
    ],
    'priceRange': '$$',
    'currenciesAccepted': 'UAH, USD, EUR',
    'paymentAccepted': isEn ? 'Bank transfer, Card' : 'Банківський переказ, Картка',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00',
      },
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': isEn ? 'Web Development Services' : 'Послуги веб-розробки',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': isEn ? 'Front-end Development (React/Next.js)' : 'Front-end розробка (React/Next.js)',
            'description': isEn
              ? 'Interactive, responsive interfaces with React and Next.js, smooth 60fps animations.'
              : 'Інтерактивні адаптивні інтерфейси на React та Next.js з плавними анімаціями 60fps.',
            'url': 'https://sitenest.work/services/frontend',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': isEn ? 'Back-end Development (Node.js, Python)' : 'Back-end розробка (Node.js, Python)',
            'description': isEn
              ? 'Scalable REST APIs, database design, payment integrations.'
              : 'Масштабовані REST API, проектування БД, інтеграція платіжних систем.',
            'url': 'https://sitenest.work/services/backend',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': isEn ? 'DevOps & Cloud Infrastructure (Docker, AWS)' : 'DevOps і хмарна інфраструктура (Docker, AWS)',
            'description': isEn
              ? 'Cloud deployment, CI/CD automation, Nginx, Cloudflare CDN and security.'
              : 'Хмарний деплой, CI/CD автоматизація, Nginx, Cloudflare CDN та захист.',
            'url': 'https://sitenest.work/services/devops',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': isEn ? 'SMM & SEO Marketing' : 'SMM та SEO просування',
            'description': isEn
              ? 'Brand promotion on social networks, Meta Ads targeting, SEO content optimization.'
              : 'Просування бренду в соцмережах, таргетована реклама Meta Ads, SEO-оптимізація.',
            'url': 'https://sitenest.work/services/smm',
          },
        },
      ],
    },
    'sameAs': [
      'https://www.instagram.com/sitenest_agency',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'SiteNest Agency',
    'url': 'https://sitenest.work',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://sitenest.work/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5K8Z6R3';

  return (
    <html lang={lang} className={`${outfit.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LanguageProvider initialLang={lang as any}>
          <Web3Provider>
            <div className="bg-grid" />
            <div className="glow-orb glow-orb-1" />
            <div className="glow-orb glow-orb-2" />
            <div className="glow-orb glow-orb-3" />
            <Header />
            <main style={{ minHeight: '80vh' }}>
              {children}
            </main>
            <Footer />
            <FloatingChatWidget />
          </Web3Provider>
        </LanguageProvider>
      </body>
    </html>
  );
}
