import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import { products } from '../../data/products';

type Product = typeof products[0];
interface ProductPageProps { product: Product; relatedProducts: Product[]; }

export default function ProductDesign2({ product, relatedProducts }: ProductPageProps) {
  const whatsappMsg = `https://wa.me/919997714800?text=${encodeURIComponent('Hi, I am interested in your product: ' + product.name + '. Could you please provide more details?')}`;

  return (
    <>
      <Head>
        <title>{product.name} | VEDVET</title>
        <meta name="description" content={product.shortDescription} />
      </Head>
      <Header />

      <PageHeader
        title={product.name}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: product.name }]}
        bgImage="/images/hero.jpg"
      />

      <main className="pd2-main">

        {/* ── HERO ────────────────────────────────── */}
        <section className="pd2-hero">
          <div className="pd2-hero-orb pd2-orb-1"></div>
          <div className="pd2-hero-orb pd2-orb-2"></div>
          <div className="container-wide pd2-hero-inner">

            {/* Image Side */}
            <div className="pd2-img-area" data-aos="fade-right">
              <div className="pd2-img-ring pd2-ring-outer"></div>
              <div className="pd2-img-ring pd2-ring-inner"></div>
              <div className="pd2-img-card">
                <img src={product.image} alt={product.name} className="pd2-product-img" />
              </div>
              <div className="pd2-float-chip pd2-chip-top">
                <i className="bi bi-award-fill"></i> Premium Quality
              </div>
              <div className="pd2-float-chip pd2-chip-bottom">
                <i className="bi bi-heart-pulse-fill"></i> Vet Approved
              </div>
            </div>

            {/* Content Side */}
            <div className="pd2-content-area" data-aos="fade-left" data-aos-delay="100">
              <span className="pd2-eyebrow">{product.category}</span>
              <h1 className="pd2-h1">{product.name}</h1>
              <p className="pd2-lead">{product.shortDescription}</p>

              <div className="pd2-pill-row">
                <span className="pd2-pres-pill"><i className="bi bi-box-seam"></i> {product.presentation}</span>
              </div>

              <div className="pd2-cta-row">
                <a href={whatsappMsg} target="_blank" rel="noopener noreferrer" className="btn-primary pd2-main-btn">
                  <i className="bi bi-whatsapp"></i> Enquire Now
                </a>
                <a href="#pd2-details" className="btn-ghost pd2-ghost-btn">
                  View Details <i className="bi bi-arrow-down-short"></i>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ── DETAILS ─────────────────────────────── */}
        <section id="pd2-details" className="pd2-details">
          <div className="container-wide">

            {/* Top: Overview */}
            <div className="pd2-overview-wrap" data-aos="fade-up">
              <div className="pd2-overview-label">
                <span>01</span>
                <span>Overview</span>
              </div>
              <div className="pd2-overview-text">
                <h2 className="pd2-section-h">Product Description</h2>
                <p>{product.fullDescription}</p>
              </div>
            </div>

            <div className="pd2-sep"></div>

            {/* Mid: Benefits Bento */}
            <div className="pd2-bento-wrap" data-aos="fade-up">
              <div className="pd2-bento-header">
                <h2 className="pd2-section-h">Key Benefits</h2>
                <p className="pd2-bento-sub">Science-backed advantages designed to improve animal health outcomes.</p>
              </div>
              <div className="pd2-bento-grid">
                {product.benefits && product.benefits.map((b, i) => (
                  <div className="pd2-bento-card" key={i}>
                    <div className="pd2-bento-icon"><i className={`bi ${b.icon}`}></i></div>
                    <h4 className="pd2-bento-title">{b.title}</h4>
                    <p className="pd2-bento-text">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pd2-sep"></div>

            {/* Bot: Indications */}
            <div className="pd2-indications-wrap" data-aos="fade-up">
              <div className="pd2-indications-left">
                <h2 className="pd2-section-h">When to Use</h2>
                <p>Administer under veterinary guidance for optimal results and safety.</p>
                <a href={whatsappMsg} target="_blank" rel="noopener noreferrer" className="btn-primary pd2-ind-btn">
                  <i className="bi bi-whatsapp"></i> Talk to an Expert
                </a>
              </div>
              <div className="pd2-indications-right">
                <ul className="pd2-ind-list">
                  {product.indications && product.indications.map((ind, i) => (
                    <li key={i}><i className="bi bi-check-circle-fill"></i><span>{ind}</span></li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Related */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="pd2-related">
            <div className="container-wide">
              <h2 className="pd2-related-title">Related Products</h2>
              <div className="pd2-related-grid">
                {relatedProducts.slice(0, 3).map((rp, i) => (
                  <Link key={i} href={`/product/${rp.slug}`} className="pd2-rel-card">
                    <img src={rp.image} alt={rp.name} className="pd2-rel-img" />
                    <div className="pd2-rel-info">
                      <span className="pd2-rel-cat">{rp.category}</span>
                      <h4>{rp.name}</h4>
                    </div>
                    <i className="bi bi-arrow-right pd2-rel-arrow"></i>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
