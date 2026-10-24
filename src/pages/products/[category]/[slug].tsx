import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import ProductDetail from '../../../components/productDesigns/ProductDetail';
import {
  Product,
  getAllProductPaths,
  getProductBySlug,
  getRelatedProducts,
  legacySlugMap,
} from '../../../lib/products';
import { getProductAllCategories } from '../../../data/categoryHelpers';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  category: string;
}

export default function CategoryProductDetailPage({
  product,
  relatedProducts,
  category,
}: ProductDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Product not found
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      currentCategory={category}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllProductPaths();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async ({ params }) => {
  const rawCat = typeof params?.category === 'string' ? params.category : '';
  const categoryParam = rawCat.toLowerCase();
  const rawSlug = typeof params?.slug === 'string' ? params.slug : '';
  const slugLower = rawSlug.toLowerCase();
  const canonicalSlug = legacySlugMap[slugLower] || slugLower;

  // Find product by canonical slug
  const product = getProductBySlug(canonicalSlug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  // Validate that the product belongs to this category
  const validCategories = getProductAllCategories(product.category);
  if (!validCategories.includes(categoryParam)) {
    return {
      notFound: true,
    };
  }

  // If the requested URL has uppercase, legacy numbers, or doesn't match clean slug, 301 redirect
  if (rawSlug !== product.slug || rawCat !== categoryParam) {
    return {
      redirect: {
        destination: `/products/${categoryParam}/${product.slug}`,
        permanent: true,
      },
    };
  }

  const relatedProducts = getRelatedProducts(product.slug, product.category, 4);

  return {
    props: {
      product,
      relatedProducts,
      category: categoryParam,
    },
  };
};
