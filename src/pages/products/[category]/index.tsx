import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PageHeader from '../../../components/layout/PageHeader';
import ProductCatalog from '../../../components/products/ProductCatalog';
import {
  ProductSummary,
  getAllProductSummaries,
  getProductSummariesByCategory,
  getCategorySEO,
  getAllCategorySlugs,
  CategorySEOInfo,
} from '../../../lib/products';
import { categories, formatCategoryLabel, getProductAllCategories } from '../../../data/categoryHelpers';
import { getCanonicalUrl } from '../../../data/seoConfig';
import { getCollectionPageSchema } from '../../../data/schemaConfig';

interface CategoryPageProps {
  categorySlug: string;
  categoryLabel: string;
  products: ProductSummary[];
  categoryCounts: Record<string, number>;
  seo: CategorySEOInfo;
}

export default function CategoryProductsPage({
  categorySlug,
  categoryLabel,
  products,
  categoryCounts,
  seo,
}: CategoryPageProps) {
  const canonicalUrl = getCanonicalUrl(`/products/${categorySlug}`);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: categoryLabel },
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
        title={seo.pageTitle || `${categoryLabel} Products`}
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
              activeCategory={categoryLabel}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllCategorySlugs();

  const paths = slugs.map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const rawParam = typeof params?.category === 'string' ? params.category : '';
  const validSlugs = getAllCategorySlugs();
  const lowerParam = rawParam.toLowerCase();

  // 404 if invalid category
  if (!validSlugs.includes(lowerParam)) {
    return {
      notFound: true,
    };
  }

  // 301 Permanent Redirect if URL has uppercase characters
  if (rawParam !== lowerParam) {
    return {
      redirect: {
        destination: `/products/${lowerParam}`,
        permanent: true,
      },
    };
  }

  const categoryLabel = formatCategoryLabel(lowerParam);
  const products = getProductSummariesByCategory(lowerParam);
  const allSummaries = getAllProductSummaries();

  const categoryCounts: Record<string, number> = {
    All: allSummaries.length,
  };

  for (const cat of categories) {
    if (cat === 'All') continue;
    const catLower = cat.toLowerCase();
    const count = allSummaries.filter((p) => {
      const validCats = getProductAllCategories(p.category);
      return validCats.includes(catLower) || p.category.toLowerCase().includes(catLower);
    }).length;
    categoryCounts[cat] = count;
  }

  const seo = getCategorySEO(lowerParam);

  return {
    props: {
      categorySlug: lowerParam,
      categoryLabel,
      products,
      categoryCounts,
      seo,
    },
  };
};
