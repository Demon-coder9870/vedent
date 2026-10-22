import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import { products } from '../../data/products';
import FeaturedBadge from '../productDesigns/FeaturedBadge';
import { getProductPrimaryCategory } from '../../data/categoryHelpers';
import { getCanonicalUrl } from '../../data/seoConfig';

export const categories = ['All', 'Poultry', 'Swine', 'Livestock', 'Aqua', 'Pets'];

export function normalizeCategory(cat?: string | string[]): string {
  if (!cat || typeof cat !== 'string') return 'All';
  const trimmed = cat.trim();
  const match = categories.find((c) => c.toLowerCase() === trimmed.toLowerCase());
  return match || trimmed;
}

interface ProductsViewProps {
  initialCategory?: string;
}

export default function ProductsView({ initialCategory = 'All' }: ProductsViewProps) {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    return normalizeCategory(initialCategory || (router.query.category as string));
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    if (!router.isReady) return;

    // Backward compatibility: If accessed via ?category=..., redirect to clean path /products/:category
    if (router.pathname === '/products' && router.query.category && typeof router.query.category === 'string') {
      const norm = normalizeCategory(router.query.category);
      if (norm !== 'All') {
        router.replace(`/products/${encodeURIComponent(norm.toLowerCase())}`);
      } else {
        router.replace('/products');
      }
      return;
    }

    // Dynamic category from /products/[category]
    if (router.query.category && typeof router.query.category === 'string') {
      const norm = normalizeCategory(router.query.category);
      setActiveCategory(norm);
      setCurrentPage(1);
    } else if (router.pathname === '/products') {
      setActiveCategory('All');
    }
  }, [router.isReady, router.query.category, router.pathname]);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setSearchQuery('');
    if (cat === 'All') {
      router.push('/products');
    } else {
      router.push(`/products/${encodeURIComponent(cat.toLowerCase())}`);
    }
  };

  const getProductDisplayOrder = (product: typeof products[0], category: string): number => {
    const orderObj = (product as unknown as { displayOrder?: Record<string, number> }).displayOrder;
    if (!orderObj) return 9999;

    if (category === 'Poultry') {
      return orderObj['Poultry'] ?? 9999;
    }
    if (category === 'Livestock' || category === 'Swine') {
      return orderObj['Livestock/Swine'] ?? orderObj['Livestock'] ?? orderObj['Swine'] ?? 9999;
    }
    if (category === 'Aqua') {
      return orderObj['Aqua'] ?? 9999;
    }
    if (category === 'Pets') {
      return orderObj['Pets'] ?? 9999;
    }

    // Default when category is 'All':
    if (orderObj['Poultry'] !== undefined) {
      return orderObj['Poultry'];
    }
    if (orderObj['Livestock/Swine'] !== undefined) {
      return 100 + orderObj['Livestock/Swine'];
    }
    if (orderObj['Aqua'] !== undefined) {
      return 200 + orderObj['Aqua'];
    }
    if (orderObj['Pets'] !== undefined) {
      return 300 + orderObj['Pets'];
    }
    return 9999;
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        activeCategory === 'All' ||
        p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.category === 'All';
      const searchMatch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const orderA = getProductDisplayOrder(a, activeCategory);
      const orderB = getProductDisplayOrder(b, activeCategory);
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.name.localeCompare(b.name);
    });
  }, [filteredProducts, activeCategory]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    return sortedProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
  }, [sortedProducts, currentPage, productsPerPage]);

  const breadcrumbs = activeCategory === 'All'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Products' }
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: activeCategory }
      ];

  const pageTitle = activeCategory === 'All' ? 'Our Products' : `${activeCategory} Products`;
  const canonicalPath = activeCategory === 'All' ? '/products' : `/products/${activeCategory.toLowerCase()}`;

  return (
    <>
      <Head>
        <title>{activeCategory === 'All' ? 'Herbal Animal Nutrition Supplements | feed Additives Products' : `${activeCategory} Veterinary Products & Healthcare | VEDVET`}</title>
        <meta
          name="description"
          content={activeCategory === 'All'
            ? 'Boost livestock health with premium herbal animal nutrition supplements. Get natural feed additives for better growth and strong immunity.'
            : `Explore VEDVET's premium veterinary healthcare formulations and feed supplements for ${activeCategory.toLowerCase()}. Trusted by veterinarians in 18+ countries.`
          }
        />
        <meta property="og:title" content={activeCategory === 'All' ? 'Herbal Animal Nutrition Supplements | feed Additives Products' : `${activeCategory} Veterinary Products & Healthcare | VEDVET`} />
        <meta
          property="og:description"
          content={activeCategory === 'All'
            ? 'Boost livestock health with premium herbal animal nutrition supplements. Get natural feed additives for better growth and strong immunity.'
            : `Explore VEDVET's premium veterinary healthcare formulations and feed supplements for ${activeCategory.toLowerCase()}. Trusted by veterinarians in 18+ countries.`
          }
        />
        <meta property="og:url" content={getCanonicalUrl(canonicalPath)} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={activeCategory === 'All' ? 'Herbal Animal Nutrition Supplements | feed Additives Products' : `${activeCategory} Veterinary Products & Healthcare | VEDVET`} />
        <meta
          name="twitter:description"
          content={activeCategory === 'All'
            ? 'Boost livestock health with premium herbal animal nutrition supplements. Get natural feed additives for better growth and strong immunity.'
            : `Explore VEDVET's premium veterinary healthcare formulations and feed supplements for ${activeCategory.toLowerCase()}. Trusted by veterinarians in 18+ countries.`
          }
        />
        <link rel="canonical" href={getCanonicalUrl(canonicalPath)} key="canonical" />
      </Head>

      <Header />

      <PageHeader
        title={pageTitle}
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero.jpg"
      />

      <main style={{ backgroundColor: '#f8fafc' }}>
        <section className="section-pad">
          <div className="container-wide">
            <div className="products-page-layout">
              {/* Sidebar */}
              <aside className="products-sidebar" aria-label="Product Filters">
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: 600, color: 'var(--charcoal)', fontFamily: 'var(--font-heading)' }} role="heading" aria-level={2}>
                    Search
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      aria-label="Search products"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        paddingLeft: '40px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        background: '#fff',
                        color: 'var(--charcoal)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                    />
                    <i
                      className="bi bi-search"
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8'
                      }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: 600, color: 'var(--charcoal)', fontFamily: 'var(--font-heading)' }} role="heading" aria-level={2}>
                  Categories
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeCategory === cat ? 'var(--grad-primary)' : 'transparent',
                        color: activeCategory === cat ? '#fff' : 'var(--text-body)',
                        fontWeight: activeCategory === cat ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'left'
                      }}
                    >
                      <span>{cat}</span>
                      {activeCategory === cat && <i className="bi bi-check2" />}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Main Product Grid */}
              <div>
                <h2 className="visually-hidden">
                  {activeCategory === 'All' ? 'All Formulations Catalog' : `${activeCategory} Formulations Catalog`}
                </h2>
                {paginatedProducts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    <i className="bi bi-box-seam" style={{ fontSize: '2.5rem', color: '#94a3b8', display: 'block', marginBottom: '15px' }}></i>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '8px' }}>No products found</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                      We couldn't find any products matching your criteria in this category.
                    </p>
                    <button
                      onClick={() => handleCategorySelect('All')}
                      className="btn-primary"
                      style={{ padding: '8px 20px', fontSize: '0.9rem', cursor: 'pointer' }}
                    >
                      View All Products
                    </button>
                  </div>
                ) : (
                  <div className="products-grid" style={{ paddingTop: 0 }}>
                    {paginatedProducts.map((product, index) => {
                      const cardCategory = activeCategory !== 'All' ? activeCategory.toLowerCase() : getProductPrimaryCategory(product.category);
                      return (
                        <Link href={`/products/${cardCategory}/${product.slug}`} key={product.slug} style={{ textDecoration: 'none' }} passHref>
                          <div className="product-card" data-aos="fade-up" data-aos-delay={index * 100}>
                          {product.featured && (
                            <div className="product-card-badge-wrap">
                              <FeaturedBadge featured={product.featured} size="md" />
                            </div>
                          )}
                          <div className="product-image-wrapper">
                            <img src={product.image} alt={product.name} className="product-image" />
                          </div>
                          <div className="product-category">{product.category}</div>
                          <h3 className="product-title">{product.name}</h3>
                          <div className="product-presentation">
                            Presentation: {product.presentation}
                          </div>
                          <p className="product-desc">
                            {product.shortDescription}
                          </p>
                          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                            <span className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
                              View Product <i className="bi bi-arrow-right" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '50px' }}>
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid var(--border-light)',
                        background: '#fff',
                        borderRadius: '8px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 1 ? 0.5 : 1,
                        color: 'var(--charcoal)',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                      }}
                    >
                      Previous
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          style={{
                            width: '38px',
                            height: '38px',
                            border: 'none',
                            background: currentPage === i + 1 ? 'var(--lime-dark)' : '#fff',
                            color: currentPage === i + 1 ? '#fff' : 'var(--charcoal)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            boxShadow: currentPage === i + 1 ? '0 4px 10px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s'
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid var(--border-light)',
                        background: '#fff',
                        borderRadius: '8px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        color: 'var(--charcoal)',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
