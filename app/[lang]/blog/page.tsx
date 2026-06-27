import { getBlogPosts } from '@/lib/blog';
import BlogClient, { SerializedBlogPost } from './BlogClient';

interface BlogPageProps {
  params: Promise<{ lang: 'uk' | 'en' }>;
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
