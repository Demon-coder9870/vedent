import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { products } from '../../../data/products';
import ProductDetail from '../../../components/productDesigns/ProductDetail';
import { getProductAllCategories } from '../../../data/categoryHelpers';

type Product = (typeof products)[0];

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  category: string;
}

export default function CategoryProductDetailPage({ product, relatedProducts, category }: ProductDetailProps) {
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

  return <ProductDetail product={product} relatedProducts={relatedProducts} currentCategory={category} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { category: string; slug: string } }[] = [];

  for (const product of products) {
    const validCats = getProductAllCategories(product.category);
    for (const cat of validCats) {
      paths.push({
        params: {
          category: cat,
          slug: product.slug,
        },
      });
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryParam = typeof params?.category === 'string' ? params.category.toLowerCase() : '';
  const slugParam = typeof params?.slug === 'string' ? params.slug : '';
  const slugLower = slugParam.toLowerCase();

  // Find product by slug
  const product = products.find(
    (p) => p.slug === slugParam || p.slug.toLowerCase() === slugLower
  );

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

  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  );
  const otherCategory = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category
  );
  const relatedProducts = [...sameCategory, ...otherCategory].slice(0, 4);

  return {
    props: {
      product,
      relatedProducts,
      category: categoryParam,
    },
  };
};
