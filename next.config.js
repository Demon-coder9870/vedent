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

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    const productRedirects = [];

    for (const p of products) {
      const cat = getPrimaryCategory(p.category);
      // Legacy /product/:slug -> /products/:category/:slug
      productRedirects.push({
        source: `/product/${p.slug}`,
        destination: `/products/${cat}/${p.slug}`,
        permanent: true,
      });
      // Direct /products/:slug -> /products/:category/:slug
      productRedirects.push({
        source: `/products/${p.slug}`,
        destination: `/products/${cat}/${p.slug}`,
        permanent: true,
      });
    }

    return productRedirects;
  },
};

module.exports = nextConfig;
