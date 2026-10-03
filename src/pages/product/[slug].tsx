import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { products } from '../../data/products';
import ProductDetail from '../../components/productDesigns/ProductDetail';

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

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
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
