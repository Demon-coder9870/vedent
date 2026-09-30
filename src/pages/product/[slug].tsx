import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { products } from '../../data/products';
import ProductDesign1 from '../../components/productDesigns/ProductDesign1';
import ProductDesign2 from '../../components/productDesigns/ProductDesign2';
import ProductDesign3 from '../../components/productDesigns/ProductDesign3';
import ProductDesign4 from '../../components/productDesigns/ProductDesign4';

type Product = typeof products[0];

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Assigning different designs based on product slug
  if (product.slug === 'vetvita-plus') {
    return <ProductDesign2 product={product} relatedProducts={relatedProducts} />;
  }

  if (product.slug === 'herbovet-care') {
    return <ProductDesign3 product={product} relatedProducts={relatedProducts} />;
  }

  if (product.slug === 'immunovet-pro') {
    return <ProductDesign4 product={product} relatedProducts={relatedProducts} />; 
  }

  // Default: digyved-plus
  return <ProductDesign1 product={product} relatedProducts={relatedProducts} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.slug === params?.slug);
  const relatedProducts = products.filter((p) => p.slug !== params?.slug).slice(0, 4);

  return {
    props: {
      product: product || null,
      relatedProducts,
    },
  };
};
