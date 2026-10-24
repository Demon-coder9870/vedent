import React from 'react';
import Link from 'next/link';
import FeaturedBadge from '../productDesigns/FeaturedBadge';
import { ProductSummary } from '../../lib/products';
import { getProductPrimaryCategory } from '../../data/categoryHelpers';
import styles from '../../styles/ProductCatalog.module.css';

interface ProductCardProps {
  product: ProductSummary;
  categoryContext?: string;
  index?: number;
}

export default function ProductCard({ product, categoryContext = 'All', index = 0 }: ProductCardProps) {
  const normCategory = categoryContext.toLowerCase();
  const cardCategory = normCategory !== 'all'
    ? normCategory
    : getProductPrimaryCategory(product.category);

  return (
    <Link
      href={`/products/${cardCategory}/${product.slug}`}
      className={styles.cardLink}
      aria-label={`View details for ${product.name}`}
    >
      <div
        className={styles.card}
        data-aos="fade-up"
        data-aos-delay={(index % 6) * 80}
      >
        {product.featured && (
          <div className={styles.cardBadgeWrap}>
            <FeaturedBadge featured={product.featured} size="md" />
          </div>
        )}

        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>

        <div className={styles.categoryTag}>{product.category}</div>
        <h3 className={styles.title}>{product.name}</h3>

        {product.presentation && (
          <div className={styles.presentation}>
            Presentation: {product.presentation}
          </div>
        )}

        <p className={styles.description}>{product.shortDescription}</p>

        <div className={styles.buttonWrapper}>
          <span className={styles.viewButton}>
            View Product <i className="bi bi-arrow-right" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
