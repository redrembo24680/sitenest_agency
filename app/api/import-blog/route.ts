import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force Node.js runtime — required for 'fs' and GitHub fetch in production
export const runtime = 'nodejs';

// ─── Config ──────────────────────────────────────────────────────────────────
const GITHUB_REPO = 'redrembo24680/sitenest_agency';
const GITHUB_BRANCH = 'main';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\sа-яёіїєґ-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && value) result[key] = value;
  }
  return result;
}

/**
 * Transforms the frontmatter for Keystatic compatibility:
 * - Keeps title as a plain string (fields.text)
 * - Adds a slug field (fields.slug, used as slugField) with name+slug
 * - Strips coverImage (user attaches manually in Keystatic)
 */
function transformFrontmatter(content: string, slug: string): string {
  return content.replace(
    /^(---\r?\n)([\s\S]*?)(\r?\n---)/,
    (_full, open, fm, close) => {
      // Extract plain title value
      const titleMatch = fm.match(/^title:\s*['"]?(.*?)['"]?\s*$/m);
      const rawTitle = titleMatch ? titleMatch[1].trim() : slug;

      let cleaned = fm
        // Remove coverImage (single-line and multi-line)
        .replace(/^coverImage:\s*>-?\r?\n(?:[ \t]+[^\n]*\r?\n?)+/m, '')
        .replace(/^coverImage:.*\r?\n?/m, '')
        // Remove any existing slug field (will re-add below)
        .replace(/^slug:.*\r?\n?/m, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      // Build slug field in Keystatic's nested format
      const safeTitle = rawTitle.replace(/'/g, "\\'");
      const slugField = `slug:\n  name: '${safeTitle}'\n  slug: ${slug}`;

      return `${open}${cleaned}\n${slugField}${close}`;
    }
  );
}

// ─── GitHub API: create or update a file ─────────────────────────────────────
async function writeToGitHub(
  filePath: string,
  content: string,
  overwrite: boolean
): Promise<{ slug: string; alreadyExists?: boolean }> {
  const token = process.env.GITHUB_PAT;
  if (!token) {
    throw new Error(
      'GITHUB_PAT environment variable is not set. ' +
      'Add it in Vercel → Settings → Environment Variables.'
    );
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Check if file already exists (get its SHA for update)
  let existingSha: string | undefined;
  const checkRes = await fetch(apiUrl, { headers });
  if (checkRes.ok) {
    const existing = await checkRes.json();
    existingSha = existing.sha;
    if (!overwrite) {
      throw Object.assign(
        new Error(`File already exists: ${filePath}`),
        { code: 'EXISTS', slug: filePath }
      );
    }
  }

  // Create or update the file
  const body: Record<string, string> = {
    message: `📥 Import blog post: ${filePath}`,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: GITHUB_BRANCH,
  };
  if (existingSha) body.sha = existingSha;

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    throw new Error(`GitHub API error: ${putRes.status} — ${(err as {message?: string}).message ?? 'unknown'}`);
  }

  return { slug: filePath };
}

// ─── Filesystem write (development only) ────────────────────────────────────
function writeToFilesystem(slug: string, content: string, overwrite: boolean): void {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(blogDir, `${slug}.mdoc`);

  if (!filePath.startsWith(blogDir)) throw new Error('Invalid filename');

  if (!overwrite && fs.existsSync(filePath)) {
    throw Object.assign(new Error(`File already exists: ${slug}.mdoc`), { code: 'EXISTS' });
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}

// ─── Route handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { content, filename, overwrite = false } = await req.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const frontmatter = extractFrontmatter(content);

    // Determine slug
    let slug: string;
    if (filename) {
      slug = filename.replace(/\.mdoc$/, '');
    } else if (frontmatter.title) {
      slug = slugify(frontmatter.title);
    } else {
      slug = `blog-${Date.now()}`;
    }
    slug = slug.replace(/[^a-zA-Z0-9а-яёіїєґА-ЯЁІЇЄҐ_-]/g, '-').replace(/-+/g, '-');

    // Transform frontmatter: convert title to Keystatic slug format + strip coverImage
    const cleanedContent = transformFrontmatter(content, slug);

    // VERCEL is set to "1" by Vercel on all deployments (system env var)
    const isProduction = process.env.VERCEL === '1';

    if (isProduction) {
      // ── Production: commit to GitHub ──────────────────────────────────────
      const ghPath = `content/blog/${slug}.mdoc`;
      try {
        await writeToGitHub(ghPath, cleanedContent, overwrite);
      } catch (err) {
        const e = err as Error & { code?: string };
        if (e.code === 'EXISTS') {
          return NextResponse.json(
            { error: `File already exists: ${slug}.mdoc`, slug },
            { status: 409 }
          );
        }
        throw err;
      }
    } else {
      // ── Development: write to filesystem ─────────────────────────────────
      try {
        writeToFilesystem(slug, cleanedContent, overwrite);
      } catch (err) {
        const e = err as Error & { code?: string };
        if (e.code === 'EXISTS') {
          return NextResponse.json(
            { error: `File already exists: ${slug}.mdoc`, slug },
            { status: 409 }
          );
        }
        throw err;
      }
    }

    return NextResponse.json({
      success: true,
      slug,
      filename: `${slug}.mdoc`,
      path: `content/blog/${slug}.mdoc`,
      via: isProduction ? 'github' : 'filesystem',
    });
  } catch (err) {
    console.error('[import-blog]', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
