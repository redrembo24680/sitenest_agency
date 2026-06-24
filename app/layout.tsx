import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sitenest.work'),
  title: {
    default: 'SiteNest Agency | Розробка веб-сайтів у Львові',
    template: '%s | SiteNest Agency',
  },
  description: 'SiteNest Agency — веб-агенція з Львова. Розробляємо швидкі, адаптивні сайти: Front-end, Back-end, DevOps та SMM просування.',
  keywords: ['веб-агенція', 'розробка сайтів', 'Львів', 'Next.js', 'React', 'DevOps', 'SEO'],
  authors: [{ name: 'SiteNest Agency', url: 'https://sitenest.work' }],
  creator: 'SiteNest Agency',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://sitenest.work',
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
  alternates: { canonical: 'https://sitenest.work' },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body>
        <LanguageProvider>
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
