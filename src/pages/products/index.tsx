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
  const categories = ['All', 'Natural', 'Aqua', 'Pets'];
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
                      onClick={() => setActiveCategory(cat)}
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
              {filteredProducts.map((product, index) => (
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
