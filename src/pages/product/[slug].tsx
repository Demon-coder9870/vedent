import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import { products } from '../../data/products';

type Product = typeof products[0];

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const router = useRouter();
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | VEDVET</title>
        <meta name="description" content={product.shortDescription} />
      </Head>

      <Header />

      <main>
        {/* Page Header */}
        <PageHeader
          title="Product Details"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.name }
          ]}
          bgImage="/images/hero.jpg"
        />

        {/* Hero Section */}
        <section className="product-hero-section">
          <div className="container-wide">
            <div className="product-hero-grid">

              {/* Left Side: Image */}
              <div data-aos="fade-right">
                <div className="product-hero-image-box">
                  <img src={product.image} alt={product.name} className="product-hero-main-img" />
                </div>
              </div>

              {/* Right Side: Info */}
              <div className="product-hero-content" data-aos="fade-left">
                <div className="product-hero-category">{product.category}</div>
                <h2 className="product-hero-title">{product.name}</h2>
                <p className="product-hero-desc">{product.shortDescription}</p>

                <div className="product-presentation-box">
                  <i className="bi bi-box-seam"></i>
                  Presentation: {product.presentation}
                </div>

                <div className="product-hero-actions">
                  <a 
                    href={`https://wa.me/919997714800?text=${encodeURIComponent('Hi, I am interested in your product: ' + product.name + '. Could you please provide more details?')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    Enquire Now <i className="bi bi-whatsapp" />
                  </a>
                  <a href={`#tab-description`} className="btn-red">
                    Learn More <i className="bi bi-arrow-down" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Product Information - Stacked Sections */}
        <section id="tab-description" className="product-details-section bg-pattern-dots" style={{ backgroundColor: '#fdfdfd', padding: '80px 0' }}>
          <div className="container-wide">

            {/* Description */}
            <div className="tab-content-box" data-aos="fade-up">
              <h3 className="tab-content-title" style={{ marginBottom: '15px' }}>Product Description</h3>
              <div className="title-underline"></div>
              <p className="tab-content-text" style={{ borderLeft: '3px solid var(--lime-light)', paddingLeft: '20px', marginLeft: '5px' }}>{product.fullDescription}</p>
            </div>

            {/* Benefits */}
            <div className="tab-content-box" data-aos="fade-up">
              <h3 className="tab-content-title" style={{ marginBottom: '15px' }}>Key Benefits</h3>
              <div className="title-underline"></div>
              <div className="benefits-grid" style={{ marginTop: '30px' }}>
                {product.benefits && product.benefits.map((benefit, i) => (
                  <div className="benefit-card" key={i}>
                    <div className="benefit-icon">
                      <i className={`bi ${benefit.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="benefit-title">{benefit.title}</h4>
                      <p className="benefit-text">{benefit.text}</p>
                    </div>
                  </div>
                ))}
                {(!product.benefits || product.benefits.length === 0) && (
                  <p className="tab-content-text">Benefit details are being updated.</p>
                )}
              </div>
            </div>

            {/* Indications */}
            <div className="tab-content-box" data-aos="fade-up">
              <h3 className="tab-content-title" style={{ marginBottom: '15px' }}>Indications — When to Administer</h3>
              <div className="title-underline"></div>
              <ul className="indications-list" style={{ marginTop: '20px' }}>
                {product.indications && product.indications.map((ind, i) => (
                  <li key={i}>{ind}</li>
                ))}
                {(!product.indications || product.indications.length === 0) && (
                  <li>Indication details are being updated.</li>
                )}
              </ul>
              <div className="veterinary-warning">
                <i className="bi bi-info-circle-fill"></i>
                Use under the guidance of a qualified veterinarian where appropriate.
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px' }} data-aos="fade-up">
              <a href={`https://vedvet.com/product/${product.slug}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                Download Additional Information <i className="bi bi-download" />
              </a>
            </div>

          </div>
        </section>



      </main>

      <Footer />


    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.slug === params?.slug);
  const relatedProducts = products.filter((p) => p.slug !== params?.slug).slice(0, 4);

  return {
    props: {
      product: product || null,
      relatedProducts,
    },
  };
};
