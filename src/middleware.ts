import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle any request with query parameter ?category=...
  if (searchParams.has('category')) {
    const rawCat = (searchParams.get('category') || '').trim().toLowerCase();
    const validCats = ['poultry', 'swine', 'livestock', 'aqua', 'pets'];

    const url = request.nextUrl.clone();
    // Completely remove the query string (? and =) for a 100% clean, simple URL
    url.search = '';

    if (validCats.includes(rawCat)) {
      url.pathname = `/products/${rawCat}`;
    } else if (pathname === '/products') {
      url.pathname = '/products';
    }

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products', '/products/:path*'],
};

