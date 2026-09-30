import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import { products } from '../../data/products';

type Product = typeof products[0];
interface ProductPageProps { product: Product; relatedProducts: Product[]; }

export default function ProductDesign3({ product, relatedProducts }: ProductPageProps) {
  const [activeImg, setActiveImg] = React.useState((product.gallery && product.gallery.length > 0) ? product.gallery[0] : product.image);
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

      <main className="pd3-main">

        {/* ── FULL-PAGE SPLIT HERO ─────────────── */}
        <section className="pd3-hero">

          {/* Left: Image Panel */}
          <div className="pd3-left-panel">
            <div className="pd3-panel-bg"></div>
            
            <div className="pd3-img-wrapper" data-aos="zoom-in" data-aos-duration="1000">
              <img src={activeImg} alt={product.name} className="pd3-main-img" style={{ transition: 'all 0.3s ease', mixBlendMode: 'multiply' }} />
              <div className="pd3-img-glow"></div>
            </div>

            {/* Custom Gallery Thumbnails for Design 3 */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '15px', marginTop: '40px', zIndex: 10 }}>
                {product.gallery.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      border: activeImg === img ? '2px solid var(--lime-dark)' : '2px solid transparent',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#fff',
                      boxShadow: activeImg === img ? '0 4px 10px rgba(0,0,0,0.1)' : '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            <div className="pd3-meta-tag">
              <i className="bi bi-box-seam"></i> {product.presentation}
            </div>
          </div>

          {/* Right: Info Panel */}
          <div className="pd3-right-panel">
            <div className="pd3-right-inner" data-aos="fade-up" data-aos-delay="200">
              <span className="pd3-eyebrow">{product.category}</span>
              <h1 className="pd3-h1">{product.name}</h1>
              {product.tagline && (
                <p className="pd3-tagline-text"><i className="bi bi-quote"></i>{product.tagline}</p>
              )}
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
                  {product.composition && product.composition.length > 0 && (
                    <a href="#pd3-comp" className="pd3-nav-dot"><span>Composition</span></a>
                  )}
                  {product.dosage && product.dosage.methods && (
                    <a href="#pd3-dosage" className="pd3-nav-dot"><span>Dosage</span></a>
                  )}
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


                {/* Composition */}
                {product.composition && product.composition.length > 0 && (
                  <div id="pd3-comp" className="pd3-detail-section" data-aos="fade-up">
                    <div className="pd3-section-num">04</div>
                    <h2 className="pd3-detail-h">Composition</h2>
                    {product.compositionBase && <p style={{ marginBottom: '15px', color: 'var(--charcoal)', fontWeight: '600' }}>{product.compositionBase}</p>}
                    <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #eee' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <tbody>
                          {product.composition.map((item: any, i: number) => (
                            <tr key={i} style={{ borderBottom: i !== product.composition.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                              <td style={{ padding: '12px 10px', color: 'var(--charcoal)' }}>{item.ingredient}</td>
                              <td style={{ padding: '12px 10px', color: 'var(--lime-dark)', fontWeight: '700', textAlign: 'right' }}>{item.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Dosage */}
                {product.dosage && product.dosage.methods && (
                  <div id="pd3-dosage" className="pd3-detail-section" data-aos="fade-up">
                    <div className="pd3-section-num">05</div>
                    <h2 className="pd3-detail-h">Dosage & Administration</h2>
                    <div>
                      {product.dosage.methods.map((method: any, i: number) => (
                        <div key={i} style={{ marginBottom: '25px', background: '#fcfdfd', border: '1px solid #eef2f6', borderRadius: '12px', overflow: 'hidden' }}>
                          <div style={{ background: '#f5f8fb', padding: '15px 20px', borderBottom: '1px solid #eef2f6' }}>
                            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--lime-dark)' }}>{method.name}</h4>
                          </div>
                          <div style={{ padding: '0 20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                              <tbody>
                                {method.dosages.map((dosage: any, j: number) => (
                                  <tr key={j} style={{ borderBottom: j !== method.dosages.length - 1 ? '1px solid #f0f4f8' : 'none' }}>
                                    <td style={{ padding: '15px 0', color: 'var(--charcoal)', width: '50%' }}>{dosage.target}</td>
                                    <td style={{ padding: '15px 0', color: 'var(--text-color)', fontWeight: '600', textAlign: 'right' }}>{dosage.amount}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                    {product.dosage.note && (
                      <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <i>* {product.dosage.note}</i>
                      </p>
                    )}
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
