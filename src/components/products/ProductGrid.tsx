import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { ProductSummary } from '../../lib/products';
import styles from '../../styles/ProductCatalog.module.css';

interface ProductGridProps {
  products: ProductSummary[];
  categoryContext?: string;
  onResetSearch?: () => void;
}

export default function ProductGrid({
  products,
  categoryContext = 'All',
  onResetSearch,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <i className={`bi bi-box-seam ${styles.emptyIcon}`} aria-hidden="true" />
        <h3 className={styles.emptyTitle}>No products found</h3>
        <p className={styles.emptyText}>
          We couldn&apos;t find any products matching your search criteria. Try adjusting your keywords or browse all categories.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {onResetSearch && (
            <button
              onClick={onResetSearch}
              className="btn-outline-primary"
              style={{ padding: '9px 22px', fontSize: '0.9rem', cursor: 'pointer' }}
              type="button"
            >
              Clear Search
            </button>
          )}
          <Link
            href="/products"
            className="btn-primary"
            style={{ padding: '9px 22px', fontSize: '0.9rem', textDecoration: 'none' }}
          >
            View All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product, index) => (
        <ProductCard
          key={`${product.slug}-${index}`}
          product={product}
          categoryContext={categoryContext}
          index={index}
        />
      ))}
    </div>
  );
}
