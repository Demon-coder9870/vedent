import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import ProductCatalog from '../../components/products/ProductCatalog';
import {
  ProductSummary,
  getAllProductSummaries,
  getCategorySEO,
} from '../../lib/products';
import { categories, getProductAllCategories } from '../../data/categoryHelpers';
import { getCanonicalUrl } from '../../data/seoConfig';
import { getCollectionPageSchema } from '../../data/schemaConfig';

interface ProductsPageProps {
  products: ProductSummary[];
  categoryCounts: Record<string, number>;
}

export default function ProductsPage({ products, categoryCounts }: ProductsPageProps) {
  const seo = getCategorySEO('All');
  const canonicalUrl = getCanonicalUrl('/products');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products' },
  ];

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
        title={seo.pageTitle || 'Our Products'}
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
              activeCategory="All"
              tagline={seo.tagline}
              categoryCounts={categoryCounts}
              itemsPerPage={9}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  const products = getAllProductSummaries();

  const categoryCounts: Record<string, number> = {
    All: products.length,
  };

  for (const cat of categories) {
    if (cat === 'All') continue;
    const catLower = cat.toLowerCase();
    const count = products.filter((p) => {
      const validCats = getProductAllCategories(p.category);
      return validCats.includes(catLower) || p.category.toLowerCase().includes(catLower);
    }).length;
    categoryCounts[cat] = count;
  }

  return {
    props: {
      products,
      categoryCounts,
    },
  };
};
