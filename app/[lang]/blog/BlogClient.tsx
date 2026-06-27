'use client';

import React, { useState } from 'react';
import { Link } from '@/components/Link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { MemberAvatar } from '@/components/MemberAvatar';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface SerializedBlogPost {
  slug: string;
  entry: {
    title: string;
    description: string;
    date: string;
    coverImage: string | null;
    category: 'devops' | 'backend' | 'marketing' | 'general';
    language: 'uk' | 'en';
    content: any;
  };
}

interface BlogClientProps {
  initialPosts: SerializedBlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [blogFilter, setBlogFilter] = useState<string>('all');
  const [blogSearch, setBlogSearch] = useState<string>('');
  const { t } = useLanguage();

  const filteredPosts = initialPosts
    .filter(post => blogFilter === 'all' || post.entry.category === blogFilter)
    .filter(post => 
      post.entry.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
      post.entry.description.toLowerCase().includes(blogSearch.toLowerCase())
    );

  return (
    <div className="page-fade-enter">
      <section className="blog-hero">
        <div className="container">
          <span className="section-subtitle">{t.blog.subtitle}</span>
          <h1>{t.blog.title} <span>{t.blog.titleHighlight}</span></h1>
          <p>{t.blog.desc}</p>
        </div>
      </section>

      <section className="container">
        <div className="blog-controls">
          <div className="search-box">
            <Search />
            <input 
              type="text" 
              placeholder={t.blog.searchPlaceholder} 
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
            />
          </div>
          <div className="blog-filters">
            {(['all', 'devops', 'backend', 'marketing'] as const).map(cat => (
              <button 
                key={cat}
                className={`blog-filter ${blogFilter === cat ? 'active' : ''}`}
                type="button"
                onClick={() => setBlogFilter(cat)}
              >
                {cat === 'all' && t.blog.allCategories}
                {cat === 'devops' && t.blog.devopsFilter}
                {cat === 'backend' && t.blog.backendFilter}
                {cat === 'marketing' && t.blog.marketingFilter}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p>{t.blog.notFound}</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map((post, idx) => (
              <Link 
                href={`/blog/${post.slug}`}
                className="glass-card blog-card" 
                key={idx}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="blog-card-img">
                  {post.entry.coverImage ? (
                    <Image src={post.entry.coverImage} alt={post.entry.title} className="blog-cover-img" width={800} height={400} />
                  ) : (
                    <MemberAvatar colorClass={post.slug} devType={post.entry.category} />
                  )}
                </div>
                <div className="blog-meta">
                  <span className="blog-cat">{post.entry.category.toUpperCase()}</span>
                  <span>&bull;</span>
                  <span>{post.entry.date}</span>
                </div>
                <h3>{post.entry.title}</h3>
                <p>{post.entry.description}</p>
                <span className="read-more">
                  {t.blog.readArticle} <span>&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
