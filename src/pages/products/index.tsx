import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import { products } from '../../data/products';

export default function ProductsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/#hero' },
    { label: 'Products' }
  ];

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


            <div className="products-grid">
              {products.map((product, index) => (
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
                      <span className="btn-primary">
                        View Product <i className="bi bi-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
