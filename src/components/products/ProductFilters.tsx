import React from 'react';
import Link from 'next/link';
import styles from '../../styles/ProductCatalog.module.css';

interface ProductFiltersProps {
  activeCategory: string;
  categories: readonly string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryCounts?: Record<string, number>;
  onSelectCategory?: (category: string) => void;
}

export default function ProductFilters({
  activeCategory,
  categories,
  searchQuery,
  onSearchChange,
  categoryCounts,
  onSelectCategory,
}: ProductFiltersProps) {
  const normActive = activeCategory.toLowerCase();

  return (
    <aside className={styles.sidebar} aria-label="Product Filters">
      {/* Search Filter */}
      <div className={styles.filterGroup}>
        <h2 className={styles.filterHeading}>Search Products</h2>
        <div className={styles.searchWrapper}>
          <i className={`bi bi-search ${styles.searchIcon}`} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by name, use..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
            aria-label="Search formulations"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className={styles.clearSearchButton}
              aria-label="Clear search input"
              type="button"
            >
              <i className="bi bi-x-circle-fill" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className={styles.filterGroup}>
        <h2 className={styles.filterHeading}>Categories</h2>
        <nav className={styles.categoryList} aria-label="Category navigation">
          {categories.map((cat) => {
            const isSelected = normActive === cat.toLowerCase();
            const href = cat === 'All' ? '/products' : `/products/${cat.toLowerCase()}`;
            const count = categoryCounts ? categoryCounts[cat] : undefined;

            return (
              <Link
                key={cat}
                href={href}
                onClick={(e) => {
                  if (onSelectCategory) {
                    onSelectCategory(cat);
                  }
                }}
                className={`${styles.categoryButton} ${isSelected ? styles.categoryButtonActive : ''}`}
                aria-current={isSelected ? 'page' : undefined}
              >
                <span>{cat}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {typeof count === 'number' && (
                    <span className={styles.categoryCount}>{count}</span>
                  )}
                  {isSelected && <i className="bi bi-check2" aria-hidden="true" />}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
