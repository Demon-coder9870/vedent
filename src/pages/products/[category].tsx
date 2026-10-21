import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import ProductsView, { categories } from '../../components/products/ProductsView';

interface CategoryPageProps {
  initialCategory: string;
}

export default function CategoryProductsPage({ initialCategory }: CategoryPageProps) {
  return <ProductsView initialCategory={initialCategory} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = categories
    .filter((c) => c !== 'All')
    .map((c) => c.toLowerCase());

  const paths = slugs.map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryParam = typeof params?.category === 'string' ? params.category : 'All';

  return {
    props: {
      initialCategory: categoryParam,
    },
  };
};
