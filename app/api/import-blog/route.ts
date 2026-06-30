import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Only allow in development or with a secret token
function isAuthorized(req: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  const token = req.headers.get('x-import-token');
  return token === process.env.IMPORT_SECRET;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\sа-яёіїєґ-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatter: Record<string, string> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && value) frontmatter[key] = value;
  }

  return { frontmatter, body: match[2] };
}

/**
 * Removes the coverImage field from YAML frontmatter.
 * Handles both single-line and multi-line block scalar (>-) values.
 */
function stripCoverImage(content: string): string {
  // Match the frontmatter block
  return content.replace(
    /^(---\r?\n)([\s\S]*?)(\r?\n---)/,
    (_full, open, fm, close) => {
      const cleaned = fm
        // Remove multi-line block scalar: "coverImage: >-\n  /path/...\n"
        .replace(/^coverImage:\s*>-?\r?\n(?:[ \t]+[^\n]*\r?\n?)+/m, '')
        // Remove single-line: "coverImage: /path/..."
        .replace(/^coverImage:.*\r?\n?/m, '')
        // Clean up any double blank lines left behind
        .replace(/\n{3,}/g, '\n\n');
      return `${open}${cleaned}${close}`;
    }
  );
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { content, filename, overwrite } = await req.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const { frontmatter } = extractFrontmatter(content);

    // Determine the filename/slug
    let slug: string;
    if (filename) {
      // Use provided filename (strip .mdoc extension if present)
      slug = filename.replace(/\.mdoc$/, '');
    } else if (frontmatter.title) {
      slug = slugify(frontmatter.title);
    } else {
      slug = `blog-${Date.now()}`;
    }

    // Sanitize slug — only allow safe filesystem characters
    slug = slug.replace(/[^a-zA-Z0-9а-яёіїєґА-ЯЁІЇЄҐ_-]/g, '-').replace(/-+/g, '-');

    const blogDir = path.join(process.cwd(), 'content', 'blog');
    const filePath = path.join(blogDir, `${slug}.mdoc`);

    // Check for path traversal attacks
    if (!filePath.startsWith(blogDir)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    // Check if file already exists (unless overwrite is requested)
    if (!overwrite && fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File already exists: ${slug}.mdoc`, slug },
        { status: 409 }
      );
    }

    // Strip coverImage — user will attach it manually in Keystatic
    const cleanedContent = stripCoverImage(content);

    fs.writeFileSync(filePath, cleanedContent, 'utf-8');

    return NextResponse.json({
      success: true,
      slug,
      filename: `${slug}.mdoc`,
      path: `content/blog/${slug}.mdoc`,
    });
  } catch (err) {
    console.error('[import-blog]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
