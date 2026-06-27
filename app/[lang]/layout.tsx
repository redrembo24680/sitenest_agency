import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
  
  return {
    metadataBase: new URL(url),
    title: {
      default: 'SiteNest Agency | Розробка веб-сайтів у Львові',
      template: '%s | SiteNest Agency',
    },
    description: 'SiteNest Agency — веб-агенція з Львова. Розробляємо швидкі, адаптивні сайти: Front-end, Back-end, DevOps та SMM просування.',
    keywords: ['веб-агенція', 'розробка сайтів', 'Львів', 'Next.js', 'React', 'DevOps', 'SEO'],
    authors: [{ name: 'SiteNest Agency', url }],
    creator: 'SiteNest Agency',
    openGraph: {
      type: 'website',
      locale: lang === 'uk' ? 'uk_UA' : 'en_US',
      url: currentCanonical,
      siteName: 'SiteNest Agency',
      title: 'SiteNest Agency | Розробка веб-сайтів у Львові',
      description: 'SiteNest Agency — веб-агенція з Львова. Front-end, Back-end, DevOps та SMM.',
      images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'SiteNest Agency' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SiteNest Agency | Розробка веб-сайтів',
      description: 'SiteNest Agency — веб-агенція з Львова.',
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
        { url: '/favicon.ico?v=9', sizes: 'any' },
        { url: '/icon-opaque.png?v=9', type: 'image/png', sizes: '512x512' },
      ],
      apple: [
        { url: '/apple-touch-icon.png?v=9', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'SiteNest Agency',
    'image': 'https://sitenest.work/og-image.webp',
    '@id': 'https://sitenest.work/#organization',
    'url': 'https://sitenest.work',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Львів',
      'addressRegion': 'Львівська область',
      'addressCountry': 'UA',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 49.8397,
      'longitude': 24.0297,
    },
    'sameAs': [
      'https://www.instagram.com/sitenest_agency',
    ],
    'priceRange': '$$',
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'SiteNest Agency',
    'url': 'https://sitenest.work',
  };

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5K8Z6R3';

  return (
    <html lang={lang} className={`${outfit.variable} ${plusJakartaSans.variable}`}>
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
          <div className="bg-grid" />
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />
          <div className="glow-orb glow-orb-3" />
          <Header />
          <main style={{ minHeight: '80vh' }}>
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
