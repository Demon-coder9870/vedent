import React from 'react';
import Head from 'next/head';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import ProductCatalog from './ProductCatalog';
import {
  ProductSummary,
  getAllProductSummaries,
  getProductSummariesByCategory,
  getCategorySEO,
  CategorySEOInfo,
  CATEGORY_SEO_CONFIG,
} from '../../lib/products';
import { categories, formatCategoryLabel } from '../../data/categoryHelpers';
import { getCanonicalUrl } from '../../data/seoConfig';
import { getCollectionPageSchema } from '../../data/schemaConfig';

export { categories, CATEGORY_SEO_CONFIG };
export type { CategorySEOInfo };

export function normalizeCategory(cat?: string | string[]): string {
  if (!cat || typeof cat !== 'string') return 'All';
  const trimmed = cat.trim();
  const match = categories.find((c) => c.toLowerCase() === trimmed.toLowerCase());
  return match || trimmed;
}

interface ProductsViewProps {
  initialCategory?: string;
  initialProducts?: ProductSummary[];
}

export default function ProductsView({
  initialCategory = 'All',
  initialProducts,
}: ProductsViewProps) {
  const normCategory = normalizeCategory(initialCategory);
  const products = initialProducts || (
    normCategory === 'All'
      ? getAllProductSummaries()
      : getProductSummariesByCategory(normCategory)
  );

  const seo = getCategorySEO(normCategory);
  const canonicalPath = normCategory === 'All' ? '/products' : `/products/${normCategory.toLowerCase()}`;
  const canonicalUrl = getCanonicalUrl(canonicalPath);

  const breadcrumbs = normCategory === 'All'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Products' },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: normCategory },
      ];

  const pageTitle = seo.pageTitle || (normCategory === 'All' ? 'Our Products' : `${normCategory} Products`);

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getCollectionPageSchema(
                seo.title,
                seo.description,
                canonicalUrl,
                breadcrumbs,
                products
              )
            ),
          }}
        />
      </Head>

      <Header />

      <PageHeader
        title={pageTitle}
        tagline={seo.tagline}
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero.jpg"
      />

      <main style={{ backgroundColor: '#f8fafc' }}>
        <section className="section-pad">
          <div className="container-wide">
            <h1 className="visually-hidden">{seo.title}</h1>
            <ProductCatalog
              products={products}
              activeCategory={normCategory}
              tagline={seo.tagline}
              itemsPerPage={9}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
