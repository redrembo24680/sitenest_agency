'use client';

import NextLink from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import React from 'react';

export function Link({ href, children, ...props }: any) {
  const { lang } = useLanguage();
  
  let localizedHref = href;
  if (lang !== 'uk' && typeof href === 'string' && href.startsWith('/')) {
    localizedHref = `/${lang}${href}`;
  }

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
