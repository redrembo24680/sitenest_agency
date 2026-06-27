import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['uk', 'en'];
const defaultLocale = 'uk';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files, API, Keystatic, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/keystatic') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  if (pathnameHasLocale) {
    if (pathname.startsWith(`/${defaultLocale}`)) {
      request.nextUrl.pathname = pathname.replace(new RegExp(`^/${defaultLocale}`), '') || '/';
      return NextResponse.redirect(request.nextUrl);
    }
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}
