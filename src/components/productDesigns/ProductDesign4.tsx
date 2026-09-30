import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import ProductImageGallery from './ProductImageGallery';
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
            {product.tagline && (
              <p className="pd4-tagline-text"><i className="bi bi-quote"></i>{product.tagline}</p>
            )}
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
              <ProductImageGallery images={product.gallery || [product.image]} />
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

        {/* ── COMPOSITION ─────────── */}
        {product.composition && product.composition.length > 0 && (
          <section className="pd4-ind-section" style={{ paddingBottom: '0' }}>
            <div className="container-wide">
              <div data-aos="fade-up">
                <span className="section-label">Formula Details</span>
                <h2 className="section-title">Composition</h2>
                {product.compositionBase && <p style={{ marginBottom: '20px', color: 'var(--text-color)' }}>{product.compositionBase}</p>}
                
                <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tbody>
                      {product.composition.map((item: any, i: number) => (
                        <tr key={i} style={{ borderBottom: i !== product.composition.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                          <td style={{ padding: '15px 10px', color: 'var(--charcoal)', fontWeight: '500' }}>{item.ingredient}</td>
                          <td style={{ padding: '15px 10px', color: 'var(--lime-dark)', fontWeight: '700', textAlign: 'right' }}>{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── DOSAGE ─────────── */}
        {product.dosage && product.dosage.methods && (
          <section className="pd4-ind-section" style={{ paddingBottom: '0' }}>
            <div className="container-wide">
              <div data-aos="fade-up">
                <span className="section-label">Administration Guide</span>
                <h2 className="section-title">Dosage & Administration</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
                  {product.dosage.methods.map((method: any, i: number) => (
                    <div key={i} style={{ background: '#f8fafd', padding: '30px', borderRadius: '20px', border: '1px solid #eef2f6' }}>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--lime-dark)', marginBottom: '20px', fontWeight: '800' }}>{method.name}</h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <tbody>
                          {method.dosages.map((dosage: any, j: number) => (
                            <tr key={j} style={{ borderBottom: j !== method.dosages.length - 1 ? '1px dashed #dbe4ef' : 'none' }}>
                              <td style={{ padding: '12px 0', color: 'var(--charcoal)', width: '50%' }}>{dosage.target}</td>
                              <td style={{ padding: '12px 0', color: 'var(--text-color)', fontWeight: '600' }}>{dosage.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
                {product.dosage.note && (
                  <p style={{ marginTop: '20px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    <i>* {product.dosage.note}</i>
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

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
