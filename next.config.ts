import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Redirect old service URLs to new semantic URLs
      { source: '/service-frontend', destination: '/services/frontend', permanent: true },
      { source: '/service-backend',  destination: '/services/backend',  permanent: true },
      { source: '/service-devops',   destination: '/services/devops',   permanent: true },
      { source: '/service-smm',      destination: '/services/smm',      permanent: true },
      // Redirect old blog URLs
      { source: '/blog-post-1', destination: '/blog/blog-post-1', permanent: true },
      { source: '/blog-post-2', destination: '/blog/blog-post-2', permanent: true },
      { source: '/blog-post-3', destination: '/blog/blog-post-3', permanent: true },
    ];
  },
};

export default nextConfig;
