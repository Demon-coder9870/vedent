/** @type {import('next').NextConfig} */
const products = require('./src/data/products.json');

function getPrimaryCategory(cat) {
  const l = (cat || '').toLowerCase();
  if (l.includes('aqua')) return 'aqua';
  if (l.includes('pet')) return 'pets';
  if (l.includes('poultry')) return 'poultry';
  if (l.includes('livestock')) return 'livestock';
  if (l.includes('swine')) return 'swine';
  return 'poultry';
}

const slugAliases = {
  'clean-care-shampoo-and-powder': 'clean-and-care',
  'ved-selvit-e': 'vedselvit-e',
  'ved-meth': 'vedmeth',
  'vedcal-b12': 'vedcal-b-twelve',
  'vedresp-2': 'vedresp',
  'vedworm-2': 'vedworm',
  'vedprovib': 'vedprovib-aq',
  'vita-mv-ved': 'ved-mv',
  'oxy-ved': 'oxyved-aq',
  'v-choline-90': 'v-choline',
  'o2ved-aq': 'o-two-ved-aq',
  'ved-crd': 'ved-crd-herb',
  'vedcrd': 'ved-crd-herb',
  'ved-crd-powder': 'ved-crd-herb',
  'vedliv': 'vedliv-herb',
  'vedkidney': 'ved-kidney-power',
};

const categoryMap = {
  poultry: '/products/poultry',
  swine: '/products/swine',
  livestock: '/products/livestock',
  aqua: '/products/aqua',
  pets: '/products/pets',
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    const redirectsList = [
      // 0. Canonical host redirect: vedvet.com -> www.vedvet.com
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'vedvet.com' }],
        destination: 'https://www.vedvet.com/:path*',
        permanent: true,
      },
      // 1. Static legacy page redirects
      {
        source: '/company-accreditions',
        destination: '/accreditations',
        permanent: true,
      },
      {
        source: '/company-accreditions/:path*',
        destination: '/accreditations',
        permanent: true,
      },
      {
        source: '/contacts',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contacts/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/shop/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/donation-failed',
        destination: '/',
        permanent: true,
      },
      {
        source: '/donation-failed/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cgi-sys/:path*',
        destination: '/',
        permanent: true,
      },
      // 2. Old WordPress legacy paths (wp-admin, wp-content, wp-includes, etc.)
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-json/:path*',
        destination: '/',
        permanent: true,
      },
    ];

    // Build product lookup map
    const productBySlug = new Map();
    for (const p of products) {
      productBySlug.set(p.slug.toLowerCase(), p);
    }

    // 2. Specific alias redirects (/product/:alias, /products/:alias, /product-tag/:alias)
    for (const [alias, targetSlug] of Object.entries(slugAliases)) {
      const p = productBySlug.get(targetSlug.toLowerCase());
      const cat = p ? getPrimaryCategory(p.category) : 'poultry';
      const targetUrl = `/products/${cat}/${targetSlug}`;

      redirectsList.push({
        source: `/product/${alias}`,
        destination: targetUrl,
        permanent: true,
      });
      redirectsList.push({
        source: `/products/${alias}`,
        destination: targetUrl,
        permanent: true,
      });
      redirectsList.push({
        source: `/product-tag/${alias}`,
        destination: targetUrl,
        permanent: true,
      });
    }

    // 3. All standard products (/product/:slug, /products/:slug, /product-tag/:slug)
    for (const p of products) {
      const cat = getPrimaryCategory(p.category);
      const targetUrl = `/products/${cat}/${p.slug}`;

      redirectsList.push({
        source: `/product/${p.slug}`,
        destination: targetUrl,
        permanent: true,
      });
      redirectsList.push({
        source: `/products/${p.slug}`,
        destination: targetUrl,
        permanent: true,
      });
      redirectsList.push({
        source: `/product-tag/${p.slug}`,
        destination: targetUrl,
        permanent: true,
      });
    }

    // 4. Known category redirects (/product-category/:cat, /product-tag/:cat)
    for (const [catSlug, targetUrl] of Object.entries(categoryMap)) {
      redirectsList.push({
        source: `/product-category/${catSlug}`,
        destination: targetUrl,
        permanent: true,
      });
      redirectsList.push({
        source: `/product-tag/${catSlug}`,
        destination: targetUrl,
        permanent: true,
      });
    }

    // 5. Fallback catch-all redirects for discontinued/unmatched products, tags, and categories
    redirectsList.push({
      source: '/product-category/:slug*',
      destination: '/products',
      permanent: true,
    });
    redirectsList.push({
      source: '/product-tag/:slug*',
      destination: '/products',
      permanent: true,
    });
    redirectsList.push({
      source: '/product/:slug*',
      destination: '/products',
      permanent: true,
    });

    return redirectsList;
  },
};

module.exports = nextConfig;
