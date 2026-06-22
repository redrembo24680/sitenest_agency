import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
import { MemberAvatar } from '../components/MemberAvatar';
import { BLOG_POSTS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

interface BlogPostDetailProps {
  postId: string;
  navigateTo: (page: string) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ postId, navigateTo }) => {
  const { t } = useLanguage();
  const post = BLOG_POSTS.find(p => p.id === postId);
  
  if (!post) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2>{t.blog.notFound}</h2>
        <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => navigateTo('blog')}>
          {t.blog.backToBlog}
        </button>
      </div>
    );
  }

  return (
    <div className="page-fade-enter">
      <section className="post-layout container">
        <div className="post-header">
          <div className="blog-meta post-meta">
            <span className="blog-cat">{post.category.toUpperCase()}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.time}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="post-author-box">
            <div className="author-avatar">
              <MemberAvatar colorClass={post.id} devType={post.category} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="author-name">{post.author}</div>
              <div className="author-role">{t.blog.expert}</div>
            </div>
          </div>
        </div>

        <div className="post-cover-image">
          {post.image ? (
            <img src={post.image} alt={post.title} className="blog-cover-img-full" />
          ) : (
            <MemberAvatar colorClass={post.id} devType={post.category} />
          )}
        </div>

        <div className="post-grid">
          <article className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <aside className="post-sidebar">
            <div className="sidebar-widget">
              <h4>{t.blog.tableOfContents}</h4>
              <ul className="toc-list">
                <li className="toc-link">1. {t.blog.tableOfContents}</li>
                <li className="toc-link">2. Практичні поради</li>
                <li className="toc-link">3. Методи оптимізації</li>
                <li className="toc-link">4. Результати для бізнесу</li>
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
              <button className="btn btn-outline" style={{ width: '100%' }} type="button" onClick={() => navigateTo('blog')}>
                <ArrowLeft className="btn-icon" style={{ transform: 'none' }} /> {t.blog.backToBlog}
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
