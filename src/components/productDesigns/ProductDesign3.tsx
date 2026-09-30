import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { products } from '../../data/products';

type Product = typeof products[0];
interface ProductPageProps { product: Product; relatedProducts: Product[]; }

export default function ProductDesign3({ product, relatedProducts }: ProductPageProps) {
  const whatsappMsg = `https://wa.me/919997714800?text=${encodeURIComponent('Hi, I am interested in your product: ' + product.name + '. Could you please provide more details?')}`;

  return (
    <>
      <Head>
        <title>{product.name} | VEDVET</title>
        <meta name="description" content={product.shortDescription} />
      </Head>
      <Header />

      <main className="pd3-main">

        {/* ── FULL-PAGE SPLIT HERO ─────────────── */}
        <section className="pd3-hero">

          {/* Left: Image Panel */}
          <div className="pd3-left-panel">
            <div className="pd3-panel-bg"></div>
            <div className="pd3-breadcrumb">
              <Link href="/">Home</Link>
              <i className="bi bi-chevron-right"></i>
              <Link href="/products">Products</Link>
              <i className="bi bi-chevron-right"></i>
              <span>{product.name}</span>
            </div>
            <div className="pd3-img-wrapper" data-aos="zoom-in" data-aos-duration="1000">
              <img src={product.image} alt={product.name} className="pd3-main-img" />
              <div className="pd3-img-glow"></div>
            </div>
            <div className="pd3-meta-tag">
              <i className="bi bi-box-seam"></i> {product.presentation}
            </div>
          </div>

          {/* Right: Info Panel */}
          <div className="pd3-right-panel">
            <div className="pd3-right-inner" data-aos="fade-up" data-aos-delay="200">
              <span className="pd3-eyebrow">{product.category}</span>
              <h1 className="pd3-h1">{product.name}</h1>
              <p className="pd3-tagline">{product.shortDescription}</p>

              <a href={whatsappMsg} target="_blank" rel="noopener noreferrer" className="pd3-enq-btn">
                <i className="bi bi-whatsapp"></i> Request Information
              </a>

              <div className="pd3-quick-benefits">
                {product.benefits && product.benefits.slice(0, 4).map((b, i) => (
                  <div className="pd3-qb-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="pd3-qb-icon"><i className={`bi ${b.icon}`}></i></div>
                    <span className="pd3-qb-label">{b.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* ── SCROLLABLE DETAILS ────────────────── */}
        <div className="pd3-detail-body">
          <div className="container-wide">
            <div className="pd3-detail-grid">

              {/* Left Sticky: Navigation indicator */}
              <div className="pd3-sticky-nav">
                <div className="pd3-nav-track">
                  <a href="#pd3-desc" className="pd3-nav-dot active"><span>Description</span></a>
                  <a href="#pd3-benefits" className="pd3-nav-dot"><span>Benefits</span></a>
                  <a href="#pd3-when" className="pd3-nav-dot"><span>Indications</span></a>
                </div>
              </div>

              {/* Right Scrolling Content */}
              <div className="pd3-detail-content">

                <div id="pd3-desc" className="pd3-detail-section" data-aos="fade-up">
                  <div className="pd3-section-num">01</div>
                  <h2 className="pd3-detail-h">Product Description</h2>
                  <p className="pd3-body-text">{product.fullDescription}</p>
                </div>

                <div id="pd3-benefits" className="pd3-detail-section" data-aos="fade-up">
                  <div className="pd3-section-num">02</div>
                  <h2 className="pd3-detail-h">Key Benefits</h2>
                  <div className="pd3-benefits-rows">
                    {product.benefits && product.benefits.map((b, i) => (
                      <div className="pd3-ben-row" key={i}>
                        <div className="pd3-ben-icon"><i className={`bi ${b.icon}`}></i></div>
                        <div className="pd3-ben-content">
                          <h4>{b.title}</h4>
                          <p>{b.text}</p>
                        </div>
                        <span className="pd3-ben-num">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="pd3-when" className="pd3-detail-section" data-aos="fade-up">
                  <div className="pd3-section-num">03</div>
                  <h2 className="pd3-detail-h">When to Administer</h2>
                  <div className="pd3-indications-cards">
                    {product.indications && product.indications.map((ind, i) => (
                      <div className="pd3-ind-card" key={i}>
                        <span className="pd3-ind-num">{String(i + 1).padStart(2, '0')}</span>
                        <p>{ind}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pd3-disclaimer-box">
                    <i className="bi bi-shield-check"></i>
                    <p>Always administer under the guidance of a qualified veterinarian where appropriate.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
