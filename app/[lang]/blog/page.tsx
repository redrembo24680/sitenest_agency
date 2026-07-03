import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import BlogClient, { SerializedBlogPost } from './BlogClient';

interface BlogPageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang === 'en') {
    return {
      title: 'Blog | Web Development Insights & Tips — SiteNest Agency',
      description: 'Read SiteNest Agency\'s blog for expert articles on web development, Next.js, DevOps, SEO, and digital marketing strategies.',
      openGraph: {
        title: 'Blog | Web Development Insights & Tips — SiteNest Agency',
        description: 'Expert articles on web development, Next.js, DevOps, SEO and digital marketing from the SiteNest team.',
      },
    };
  }

  return {
    title: 'Блог | Статті про веб-розробку та digital — SiteNest Agency',
    description: 'Читайте блог SiteNest Agency: експертні статті з веб-розробки, Next.js, DevOps, SEO та стратегій digital-маркетингу.',
    openGraph: {
      title: 'Блог | Статті про веб-розробку та digital — SiteNest Agency',
      description: 'Експертні матеріали з веб-розробки, Next.js, DevOps, SEO та digital-маркетингу від команди SiteNest.',
    },
  };
}

export async function generateStaticParams() {
  return [
    { lang: 'uk' },
    { lang: 'en' },
  ];
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const allPosts = await getBlogPosts();
  
  // Filter posts by language and serialize the content AST
  const posts: SerializedBlogPost[] = await Promise.all(
    allPosts
      .filter((post) => post.entry.language === lang)
      .map(async (post) => {
        const content = await post.entry.content();
        return {
          slug: post.slug,
          entry: {
            title: post.entry.title,
            description: post.entry.description,
            date: post.entry.date || '',
            coverImage: post.entry.coverImage,
            category: post.entry.category,
            language: post.entry.language,
            content: content,
          },
        };
      })
  );

  return <BlogClient initialPosts={posts} />;
}
