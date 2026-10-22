export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vedvet.com';

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/' || cleanPath === '') return SITE_URL;
  return `${SITE_URL}${cleanPath}`;
}
