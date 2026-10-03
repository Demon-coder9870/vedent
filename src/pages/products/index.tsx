import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import { products } from '../../data/products';

export default function ProductsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products' }
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const categories = ['All', 'Poultry', 'Livestock', 'Livestock & Swine'];
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory || p.category === 'All');

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <Head>
        <title>Products | VEDVET</title>
        <meta name="description" content="Explore our premium range of veterinary healthcare products." />
      </Head>

      <Header />

      <PageHeader
        title="Our Products"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero.jpg"
      />

      <main style={{ backgroundColor: '#f8fafc' }}>
        <section className="section-pad">
          <div className="container-wide">

            <div className="products-page-layout">
              {/* Sidebar */}
              <aside className="products-sidebar">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: 600, color: 'var(--charcoal)' }}>Categories</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
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
                <div className="products-grid" style={{ paddingTop: 0 }}>
              {paginatedProducts.map((product, index) => (
                <Link href={`/product/${product.slug}`} key={product.slug} style={{ textDecoration: 'none' }} passHref>
                  <div className="product-card" data-aos="fade-up" data-aos-delay={index * 100}>
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
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '50px' }}>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                        width: '38px', height: '38px',
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
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
