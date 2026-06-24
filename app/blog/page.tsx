'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { MemberAvatar } from '@/components/MemberAvatar';
import { BLOG_POSTS } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Blog() {
  const [blogFilter, setBlogFilter] = useState<string>('all');
  const [blogSearch, setBlogSearch] = useState<string>('');
  const { t } = useLanguage();

  const filteredPosts = BLOG_POSTS
    .filter(post => blogFilter === 'all' || post.category === blogFilter)
    .filter(post => post.title.toLowerCase().includes(blogSearch.toLowerCase()) || post.summary.toLowerCase().includes(blogSearch.toLowerCase()));

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

        <div className="blog-grid">
          {filteredPosts.map((post, idx) => (
            <Link 
              href={`/blog/${post.id}`}
              className="glass-card blog-card" 
              key={idx}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="blog-card-img">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="blog-cover-img" />
                ) : (
                  <MemberAvatar colorClass={post.id} devType={post.category} />
                )}
              </div>
              <div className="blog-meta">
                <span className="blog-cat">{post.category.toUpperCase()}</span>
                <span>&bull;</span>
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <span className="read-more">
                {t.blog.readArticle} <span>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
