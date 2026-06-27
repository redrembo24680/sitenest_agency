import { createReader } from '@keystatic/core/reader';
import config from '@/keystatic.config';

export const reader = createReader(process.cwd(), config);

export interface BlogPost {
  slug: string;
  entry: {
    title: string;
    description: string;
    date: string | null;
    coverImage: string | null;
    category: 'devops' | 'backend' | 'marketing' | 'general';
    author: string;
    readTime: string;
    language: 'uk' | 'en';
    content: () => Promise<any>;
  };
}

export async function getBlogPosts() {
  const posts = await reader.collections.blog.all();
  // Sort posts by date descending
  return posts.sort((a, b) => {
    const dateA = a.entry.date ? new Date(a.entry.date).getTime() : 0;
    const dateB = b.entry.date ? new Date(b.entry.date).getTime() : 0;
    return dateB - dateA;
  }) as unknown as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const post = await reader.collections.blog.read(slug);
  return post as unknown as BlogPost['entry'] | null;
}
