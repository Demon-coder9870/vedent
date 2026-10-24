import React, { useState, useMemo, useRef } from 'react';
import { ProductSummary, getSortedProductSummaries } from '../../lib/products';
import { categories } from '../../data/categoryHelpers';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import ProductPagination from './ProductPagination';
import CategoryBanner from './CategoryBanner';
import styles from '../../styles/ProductCatalog.module.css';

interface ProductCatalogProps {
  products: ProductSummary[];
  activeCategory?: string;
  tagline?: string;
  categoryCounts?: Record<string, number>;
  itemsPerPage?: number;
}

export default function ProductCatalog({
  products,
  activeCategory = 'All',
  tagline,
  categoryCounts,
  itemsPerPage = 9,
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const catalogTopRef = useRef<HTMLDivElement>(null);

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.presentation.toLowerCase().includes(q)
      );
    });
  }, [products, searchQuery]);

  // Sort products according to category display orders
  const sortedProducts = useMemo(() => {
    return getSortedProductSummaries(filteredProducts, activeCategory);
  }, [filteredProducts, activeCategory]);

  // Pagination calculation
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (catalogTopRef.current) {
      catalogTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div ref={catalogTopRef} className={styles.pageLayout}>
      {/* Sidebar with search & category filters */}
      <ProductFilters
        activeCategory={activeCategory}
        categories={categories}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        categoryCounts={categoryCounts}
      />

      {/* Main product area */}
      <div style={{ minWidth: 0 }}>
        {tagline && <CategoryBanner tagline={tagline} categoryName={activeCategory} />}

        <div className={styles.catalogHeaderBar}>
          <div className={styles.resultsInfo}>
            {totalItems === 0
              ? 'No products found'
              : `Showing ${startItem}–${endItem} of ${totalItems} formulation${totalItems === 1 ? '' : 's'}`}
          </div>
          {searchQuery && (
            <div style={{ fontSize: '0.85rem', color: 'var(--lime-dark, #65a30d)', fontWeight: 600 }}>
              Filtered by: &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>

        <ProductGrid
          products={paginatedProducts}
          categoryContext={activeCategory}
          onResetSearch={() => handleSearchChange('')}
        />

        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalProducts={totalItems}
          productsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}
