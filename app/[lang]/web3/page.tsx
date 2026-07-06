import type { Metadata } from 'next';
import Web3Client from './Web3Client';

interface Web3PageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Web3PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'Web3 & NFT Club | SiteNest Agency',
      description: 'Join the SiteNest Web3 & NFT Club. Get our agency Member Pass NFT to unlock lifetime web development discounts, priority support, and free cloud maintenance.',
      keywords: ['web3 agency', 'nft loyalty program', 'crypto discount', 'site development discount', 'nft member pass', 'base blockchain', 'solana'],
      openGraph: {
        title: 'Web3 & NFT Club | SiteNest Agency',
        description: 'Unlock 15% lifetime discount on development, priority support, and free cloud hosting with our Web3 Member NFT.',
      },
    };
  }

  return {
    title: 'Web3 та NFT Клуб | SiteNest Agency',
    description: 'Приєднуйтесь до Web3 & NFT Клубу від SiteNest. Отримайте наш Member Pass NFT та розблокуйте довічні знижки на розробку сайтів, пріоритетну підтримку та безкоштовний хостинг.',
    keywords: ['web3 агенція', 'nft лояльність', 'крипто знижка', 'знижка на розробку сайту', 'nft членство', 'блокчейн base', 'solana', 'смарт-контракт'],
    openGraph: {
      title: 'Web3 та NFT Клуб | SiteNest Agency',
      description: 'Отримайте 15% довічної знижки на розробку, пріоритетну підтримку та безкоштовний хостинг з нашим Web3 Member NFT.',
    },
  };
}

export default function Web3Page() {
  return <Web3Client />;
}
