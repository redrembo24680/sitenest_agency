'use client';

import { useState, useCallback, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Frontmatter {
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  author?: string;
  readTime?: string;
  language?: string;
  coverImage?: string;
}

interface ImportResult {
  success?: boolean;
  error?: string;
  slug?: string;
  filename?: string;
  path?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseFrontmatter(content: string): Frontmatter {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Frontmatter = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim() as keyof Frontmatter;
    const val = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^['">\-\s]+/, '')
      .replace(/['"]$/, '');
    if (key && val) (result as Record<string, string>)[key] = val;
  }
  return result;
}

function countWords(content: string): number {
  const body = content.replace(/^---[\s\S]*?---\r?\n?/, '');
  return body.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label, value }: { label: string; value: string }) {
  const colors: Record<string, string> = {
    uk: '#3b82f6',
    en: '#8b5cf6',
    general: '#10b981',
    devops: '#f59e0b',
    backend: '#ef4444',
    marketing: '#ec4899',
  };
  const color = colors[value] ?? '#6b7280';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: color + '22',
        color,
        border: `1px solid ${color}44`,
      }}
    >
      {label}: {value}
    </span>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ImportBlogPage() {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('');
  const [overwrite, setOverwrite] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fm = content ? parseFrontmatter(content) : null;
  const wordCount = content ? countWords(content) : 0;
  const hasContent = content.trim().length > 0;

  // ── File drop / select ──────────────────────────────────────────────────────
  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.mdoc') && !file.name.endsWith('.md')) {
      alert('Підтримуються лише .mdoc та .md файли');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setContent(text);
      // Auto-fill filename from file
      setFilename(file.name.replace(/\.(mdoc|md)$/, ''));
      setStatus('idle');
      setResult(null);
    };
    reader.readAsText(file, 'utf-8');
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleImport = async () => {
    if (!hasContent) return;
    setStatus('loading');
    setResult(null);

    try {
      const res = await fetch('/api/import-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, filename: filename || undefined }),
      });

      const data: ImportResult = await res.json();

      if (res.status === 409 && overwrite) {
        // Retry with overwrite flag
        const res2 = await fetch('/api/import-blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, filename: filename || undefined, overwrite: true }),
        });
        const data2: ImportResult = await res2.json();
        setResult(data2);
        setStatus(res2.ok ? 'success' : 'error');
        return;
      }

      setResult(data);
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setResult({ error: 'Мережева помилка. Перевірте з\'єднання.' });
      setStatus('error');
    }
  };

  const handleClear = () => {
    setContent('');
    setFilename('');
    setStatus('idle');
    setResult(null);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#e2e8f0', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderBottom: '1px solid #1e293b',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <a
          href="/keystatic"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: 14,
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid #334155',
            transition: 'all .2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e2e8f0'; (e.currentTarget as HTMLElement).style.borderColor = '#4f6a8a'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.borderColor = '#334155'; }}
        >
          ← Назад до Keystatic
        </a>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>
            📥 Імпорт статті
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Завантажте або вставте .mdoc файл — стаття з'явиться в Keystatic автоматично
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 32px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        {/* ── Left: Editor ────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? '#6366f1' : '#334155'}`,
              borderRadius: 12,
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragging ? '#1e1b4b22' : '#1e293b44',
              transition: 'all .2s',
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".mdoc,.md"
              style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
            <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>
              Перетягніть <strong style={{ color: '#a5b4fc' }}>.mdoc</strong> файл або{' '}
              <span style={{ color: '#818cf8', textDecoration: 'underline' }}>оберіть файл</span>
            </p>
          </div>

          {/* Filename override */}
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase' }}>
              Ім'я файлу (slug) — необов'язково
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{ background: '#1e293b', border: '1px solid #334155', borderRight: 'none', padding: '10px 12px', borderRadius: '8px 0 0 8px', fontSize: 13, color: '#475569' }}>
                content/blog/
              </span>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="назва-статті"
                style={{
                  flex: 1,
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRight: 'none',
                  padding: '10px 12px',
                  color: '#e2e8f0',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <span style={{ background: '#1e293b', border: '1px solid #334155', padding: '10px 12px', borderRadius: '0 8px 8px 0', fontSize: 13, color: '#475569' }}>
                .mdoc
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 11, color: '#475569' }}>
              Якщо порожньо — буде згенеровано з заголовку або імені файлу
            </p>
          </div>

          {/* Textarea */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase' }}>
                Вміст .mdoc
              </label>
              {hasContent && (
                <span style={{ fontSize: 11, color: '#475569' }}>{wordCount} слів</span>
              )}
            </div>
            <textarea
              value={content}
              onChange={(e) => { setContent(e.target.value); setStatus('idle'); setResult(null); }}
              placeholder={'---\ntitle: \'Заголовок статті\'\ndescription: \'Короткий опис\'\ndate: 2026-06-30\ncategory: general\nauthor: SiteNest Team\nreadTime: 5 хв\nlanguage: uk\n---\n\nТекст статті...'}
              style={{
                width: '100%',
                minHeight: 380,
                background: '#0d1117',
                border: '1px solid #334155',
                borderRadius: 8,
                padding: 16,
                color: '#e2e8f0',
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 1.6,
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={handleImport}
              disabled={!hasContent || status === 'loading'}
              style={{
                flex: 1,
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                background: hasContent && status !== 'loading'
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : '#1e293b',
                color: hasContent && status !== 'loading' ? '#fff' : '#475569',
                fontWeight: 700,
                fontSize: 15,
                cursor: hasContent && status !== 'loading' ? 'pointer' : 'not-allowed',
                transition: 'all .2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {status === 'loading' ? '⏳ Імпортую...' : '✨ Імпортувати статтю'}
            </button>
            {hasContent && (
              <button
                onClick={handleClear}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid #334155',
                  background: 'transparent',
                  color: '#64748b',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Очистити
              </button>
            )}
          </div>

          {/* Result message */}
          {result && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 10,
                border: `1px solid ${status === 'success' ? '#10b98144' : '#ef444444'}`,
                background: status === 'success' ? '#10b98111' : '#ef444411',
              }}
            >
              {status === 'success' ? (
                <>
                  <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#34d399', fontSize: 15 }}>
                    ✅ Стаття успішно імпортована!
                  </p>
                  <p style={{ margin: '0 0 4px', fontSize: 13, color: '#6ee7b7' }}>
                    📁 <code style={{ background: '#0d1117', padding: '2px 6px', borderRadius: 4 }}>{result.path}</code>
                  </p>
                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <a
                      href={`/keystatic/collection/blog/item/${result.slug}`}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 7,
                        background: '#10b981',
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      Відкрити в Keystatic →
                    </a>
                    <button
                      onClick={handleClear}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 7,
                        border: '1px solid #334155',
                        background: 'transparent',
                        color: '#94a3b8',
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      Імпортувати ще
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ margin: '0 0 6px', fontWeight: 700, color: '#f87171', fontSize: 15 }}>
                    ❌ Помилка імпорту
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: '#fca5a5' }}>{result.error}</p>
                  {result.error?.includes('already exists') && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13, color: '#f87171', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={overwrite}
                        onChange={(e) => setOverwrite(e.target.checked)}
                        style={{ accentColor: '#f87171' }}
                      />
                      Перезаписати існуючий файл
                    </label>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Right: Preview panel ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Frontmatter preview */}
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px' }}>
              📋 Попередній перегляд
            </h3>

            {fm ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {fm.title && (
                  <div>
                    <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>Заголовок</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.4 }}>{fm.title}</div>
                  </div>
                )}
                {fm.description && (
                  <div>
                    <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>Опис</div>
                    <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{fm.description}</div>
                  </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {fm.language && <Badge label="мова" value={fm.language} />}
                  {fm.category && <Badge label="категорія" value={fm.category} />}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: '👤 Автор', value: fm.author },
                    { label: '📅 Дата', value: fm.date },
                    { label: '⏱ Час читання', value: fm.readTime },
                    { label: '📝 Слів', value: String(wordCount) },
                  ].map(({ label, value }) =>
                    value ? (
                      <div key={label} style={{ background: '#0f172a', borderRadius: 8, padding: '10px 12px' }}>
                        <div style={{ fontSize: 11, color: '#475569', marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 600 }}>{value}</div>
                      </div>
                    ) : null
                  )}
                </div>
                {fm.coverImage && (
                  <div>
                    <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>🖼 Обкладинка</div>
                    <code style={{ fontSize: 11, color: '#818cf8', background: '#0f172a', padding: '4px 8px', borderRadius: 5, wordBreak: 'break-all' }}>
                      {fm.coverImage}
                    </code>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#475569' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
                <p style={{ margin: 0, fontSize: 13 }}>Вставте або завантажте .mdoc файл</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px' }}>
              📖 Інструкція
            </h3>
            <ol style={{ margin: 0, paddingLeft: 18, color: '#94a3b8', fontSize: 13, lineHeight: 2 }}>
              <li>Перетягніть <strong style={{ color: '#a5b4fc' }}>.mdoc</strong> файл або вставте текст</li>
              <li>Перевірте дані в попередньому перегляді</li>
              <li>Натисніть <strong style={{ color: '#a5b4fc' }}>Імпортувати</strong></li>
              <li>Відкрийте статтю в Keystatic</li>
              <li>Додайте обкладинку вручну 🖼</li>
            </ol>

            <div style={{ marginTop: 16, padding: '12px', background: '#0f172a', borderRadius: 8, fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
              <strong style={{ color: '#fbbf24' }}>💡 Підказка:</strong> Для англійської версії додайте суфікс <code style={{ color: '#a5b4fc' }}>-en</code> до імені файлу, наприклад: <code style={{ color: '#a5b4fc' }}>nazva-statti-en</code>
            </div>
          </div>

          {/* Quick link to Keystatic blog */}
          <a
            href="/keystatic/collection/blog"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 12,
              textDecoration: 'none',
              color: '#94a3b8',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all .2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#6366f1'; (e.currentTarget as HTMLElement).style.color = '#e2e8f0'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#334155'; (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
          >
            <span>📚 Всі статті в Keystatic</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
