import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sitenest.work';
  
  // Fetch live articles from Keystatic filesystem
  const posts = await getBlogPosts();

  const staticPages = [
    '',
    '/services',
    '/services/frontend',
    '/services/backend',
    '/services/devops',
    '/services/smm',
    '/team',
    '/blog',
    '/contact',
    '/process',
    '/portfolio',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
    alternates: {
      languages: {
        'uk-UA': `${baseUrl}${route}`,
        'en-US': `${baseUrl}/en${route}`,
      },
    },
  }));

  const blogPages = posts.map((post) => {
    const slug = post.slug;
    const isEn = post.entry.language === 'en';
    const lastMod = post.entry.date || new Date().toISOString().split('T')[0];

    return {
      url: isEn ? `${baseUrl}/en/blog/${slug}` : `${baseUrl}/blog/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          'uk-UA': `${baseUrl}/blog/${slug}`,
          'en-US': `${baseUrl}/en/blog/${slug}`,
        },
      },
    };
  });

  return [...staticPages, ...blogPages];
}
