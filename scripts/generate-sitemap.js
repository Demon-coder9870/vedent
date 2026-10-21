const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.vedvet.com';
const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Static routes in the project
const staticRoutes = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/about/who-we-are', priority: '0.8', changefreq: 'monthly' },
  { url: '/about/what-we-do', priority: '0.8', changefreq: 'monthly' },
  { url: '/products', priority: '0.9', changefreq: 'daily' },
  { url: '/products/poultry', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/swine', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/livestock', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/aqua', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/pets', priority: '0.9', changefreq: 'weekly' },
  { url: '/highlights', priority: '0.8', changefreq: 'monthly' },
  { url: '/accreditations', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  let products = [];
  try {
    const raw = fs.readFileSync(productsPath, 'utf8');
    products = JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products.json:', err.message);
  }

  const staticEntries = staticRoutes.map((route) => {
    return `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  const productEntries = products.map((p) => {
    return `  <url>
    <loc>${SITE_URL}/product/${p.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.join('\n')}
${productEntries.join('\n')}
</urlset>
`;

  fs.writeFileSync(sitemapPath, sitemapXml.trim() + '\n', 'utf8');
  console.log(`Successfully generated sitemap at ${sitemapPath} with ${staticRoutes.length + products.length} URLs.`);
}

generateSitemap();
