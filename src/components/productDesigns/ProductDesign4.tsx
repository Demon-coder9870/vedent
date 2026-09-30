import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import { products } from '../../data/products';

type Product = typeof products[0];
interface ProductPageProps { product: Product; relatedProducts: Product[]; }

export default function ProductDesign4({ product, relatedProducts }: ProductPageProps) {
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

      <main className="pd4-main">

        {/* ── CINEMATIC HERO ──────────────────── */}
        <section className="pd4-hero">
          <div className="pd4-hero-content" data-aos="fade-up">
            <span className="pd4-eyebrow">{product.category}</span>
            <h1 className="pd4-h1">{product.name}</h1>
            <p className="pd4-tagline">{product.shortDescription}</p>
            <div className="pd4-hero-foot">
              <a href={whatsappMsg} target="_blank" rel="noopener noreferrer" className="btn-primary pd4-enq-btn">
                <i className="bi bi-whatsapp"></i> Get In Touch
              </a>
              <span className="pd4-pres-badge">
                <i className="bi bi-box-seam"></i> {product.presentation}
              </span>
            </div>
          </div>
          <div className="pd4-hero-visual" data-aos="zoom-in" data-aos-delay="300">
            <div className="pd4-orbit-ring pd4-ring-1"></div>
            <div className="pd4-orbit-ring pd4-ring-2"></div>
            <div className="pd4-orbit-ring pd4-ring-3"></div>
            <div className="pd4-hero-img-frame">
              <img src={product.image} alt={product.name} className="pd4-hero-img" />
            </div>
          </div>
        </section>

        {/* ── OVERVIEW BANNER ─────────────────── */}
        <section className="pd4-overview-banner" data-aos="fade-up">
          <div className="container-wide">
            <div className="pd4-overview-inner">
              <div className="pd4-overview-icon"><i className="bi bi-info-circle-fill"></i></div>
              <div>
                <h3>Product Overview</h3>
                <p>{product.fullDescription}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BENEFITS SHOWCASE ───────────────── */}
        <section className="pd4-benefits-section">
          <div className="container-wide">
            <div className="pd4-benefits-header" data-aos="fade-up">
              <span className="section-label">Key Advantages</span>
              <h2 className="section-title">Why {product.name}?</h2>
            </div>
            <div className="pd4-benefits-showcase">
              {product.benefits && product.benefits.map((b, i) => (
                <div className="pd4-benefit-tile" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                  <div className="pd4-tile-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="pd4-tile-icon"><i className={`bi ${b.icon}`}></i></div>
                  <h4 className="pd4-tile-title">{b.title}</h4>
                  <p className="pd4-tile-text">{b.text}</p>
                  <div className="pd4-tile-line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDICATIONS + CTA BLOCK ─────────── */}
        <section className="pd4-ind-section">
          <div className="container-wide">
            <div className="pd4-ind-grid">

              <div className="pd4-ind-content" data-aos="fade-right">
                <span className="section-label">Clinical Use</span>
                <h2 className="section-title">When to Administer</h2>
                <ul className="pd4-ind-list">
                  {product.indications && product.indications.map((ind, i) => (
                    <li key={i}>
                      <span className="pd4-ind-bullet"></span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
                <div className="pd4-vet-notice">
                  <i className="bi bi-shield-fill-check"></i>
                  <span>Use under qualified veterinary guidance.</span>
                </div>
              </div>

              <div className="pd4-cta-card" data-aos="fade-left" data-aos-delay="100">
                <div className="pd4-cta-bg"></div>
                <div className="pd4-cta-content">
                  <h3>Ready to learn more about {product.name}?</h3>
                  <p>Reach out to our expert team via WhatsApp for dosage, availability, and pricing information.</p>
                  <a href={whatsappMsg} target="_blank" rel="noopener noreferrer" className="pd4-cta-btn">
                    <i className="bi bi-whatsapp"></i> Contact Expert
                  </a>
                  <div className="pd4-cta-divider"></div>
                  <div className="pd4-cta-stats">
                    <div className="pd4-stat">
                      <span className="pd4-stat-num">500+</span>
                      <span className="pd4-stat-label">Happy Clients</span>
                    </div>
                    <div className="pd4-stat-sep"></div>
                    <div className="pd4-stat">
                      <span className="pd4-stat-num">15+</span>
                      <span className="pd4-stat-label">Years of Trust</span>
                    </div>
                    <div className="pd4-stat-sep"></div>
                    <div className="pd4-stat">
                      <span className="pd4-stat-num">100%</span>
                      <span className="pd4-stat-label">Quality Assured</span>
                    </div>
                  </div>
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
