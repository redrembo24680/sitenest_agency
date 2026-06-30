'use client';

import { usePathname } from 'next/navigation';

export default function ImportButton() {
  const pathname = usePathname();

  // Hide the button on the import page itself
  if (pathname === '/keystatic/import') return null;

  return (
    <a
      href="/keystatic/import"
      title="Імпортувати статтю з .mdoc файлу"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 18px',
        borderRadius: 999,
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: '#fff',
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontWeight: 700,
        fontSize: 14,
        textDecoration: 'none',
        boxShadow: '0 4px 24px rgba(99,102,241,0.45)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        transition: 'transform .2s, box-shadow .2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.04)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(99,102,241,0.6)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(99,102,241,0.45)';
      }}
    >
      <span style={{ fontSize: 16 }}>📥</span>
      Імпорт статті
    </a>
  );
}
