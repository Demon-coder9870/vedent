import React from 'react';
import styles from '../../styles/ProductCatalog.module.css';

interface CategoryBannerProps {
  tagline?: string;
  categoryName?: string;
}

export default function CategoryBanner({ tagline }: CategoryBannerProps) {
  if (!tagline) return null;

  return (
    <div className={styles.categoryBanner} role="note" aria-label="Category Overview">
      <i className={`bi bi-shield-check ${styles.bannerIcon}`} aria-hidden="true" />
      <p className={styles.bannerText}>{tagline}</p>
    </div>
  );
}
