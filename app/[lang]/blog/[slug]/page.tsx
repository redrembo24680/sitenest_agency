import React from 'react';
import { Link } from '@/components/Link';
import Image from 'next/image';
import { ArrowLeft, Share2 } from 'lucide-react';
import { MemberAvatar } from '@/components/MemberAvatar';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { translations } from '@/lib/i18n/translations';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ lang: 'uk' | 'en'; slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const t = translations[lang];
  
  if (!post) {
    return {
      title: t.blog.notFound,
    };
  }

  return {
    title: `${post.title} | SiteNest Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    lang: post.entry.language,
    slug: post.slug,
  }));
}

export default async function BlogPostDetail({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const t = translations[lang];
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2>{t.blog.notFound}</h2>
        <Link href="/blog" className="btn btn-outline" style={{ marginTop: '2rem' }}>
          {t.blog.backToBlog}
        </Link>
      </div>
    );
  }

  // Redirect to correct language if there is a mismatch
  if (post.language !== lang) {
    if (lang === 'en') {
      const enSlug = `${slug}-en`;
      const enPost = await getBlogPostBySlug(enSlug);
      if (enPost) {
        redirect(`/en/blog/${enSlug}`);
      }
    } else {
      const ukSlug = slug.endsWith('-en') ? slug.slice(0, -3) : slug;
      const ukPost = await getBlogPostBySlug(ukSlug);
      if (ukPost) {
        redirect(`/blog/${ukSlug}`);
      }
    }
    // Fallback redirect if no cross-language slug match exists
    const targetUrl = post.language === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`;
    redirect(targetUrl);
  }

  // Load and parse the document content
  const content = await post.content();

  return (
    <div className="page-fade-enter">
      <section className="post-layout container">
        <div className="post-header">
          <div className="blog-meta post-meta">
            <span className="blog-cat">{post.category.toUpperCase()}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="post-author-box">
            <div className="author-avatar">
              <MemberAvatar colorClass={slug} devType={post.category} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="author-name">{post.author}</div>
              <div className="author-role">{t.blog.expert}</div>
            </div>
          </div>
        </div>

        <div className="post-cover-image">
          {post.coverImage ? (
            <Image src={post.coverImage} alt={post.title} className="blog-cover-img-full" width={1200} height={600} priority />
          ) : (
            <MemberAvatar colorClass={slug} devType={post.category} />
          )}
        </div>

        <div className="post-grid">
          <article className="post-content">
            <DocumentRenderer document={content} />
          </article>
          
          <aside className="post-sidebar">
            <div className="sidebar-widget">
              <h4>{t.blog.tableOfContents}</h4>
              <ul className="toc-list">
                <li className="toc-link">1. {post.title}</li>
                <li className="toc-link">2. {post.description}</li>
              </ul>
            </div>

            <div className="sidebar-widget">
              <h4>{t.blog.shareArticle}</h4>
              <div className="share-buttons">
                <span className="share-btn"><Share2 style={{ width: '16px', height: '16px' }} /></span>
                <span className="share-btn">
                  <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </span>
              </div>
            </div>

            <div className="sidebar-widget">
              <Link href="/blog" className="btn btn-outline" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft className="btn-icon" style={{ transform: 'none', marginRight: '6px' }} /> {t.blog.backToBlog}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
