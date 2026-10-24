import React from 'react';
import styles from '../../styles/ProductCatalog.module.css';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalProducts?: number;
  productsPerPage?: number;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalProducts,
  productsPerPage,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('ellipsis-start');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className={styles.pagination} aria-label="Product catalog pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageNavButton}
        aria-label="Go to previous page"
      >
        <i className="bi bi-chevron-left" aria-hidden="true" /> Previous
      </button>

      <div className={styles.pageNumbers}>
        {pages.map((p, idx) => {
          if (typeof p === 'string') {
            return (
              <span key={`ell-${idx}`} className={styles.pageEllipsis} aria-hidden="true">
                &hellip;
              </span>
            );
          }

          const isActive = currentPage === p;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${styles.pageNumberButton} ${isActive ? styles.pageNumberActive : ''}`}
              aria-label={`Page ${p}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageNavButton}
        aria-label="Go to next page"
      >
        Next <i className="bi bi-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  );
}
