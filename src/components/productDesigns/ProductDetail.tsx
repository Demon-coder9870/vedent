import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import { products } from '../../data/products';

type Product = typeof products[0];
interface ProductPageProps { product: Product; relatedProducts: Product[]; }

export default function ProductDetail({ product, relatedProducts }: ProductPageProps) {
  const [activeImg, setActiveImg] = React.useState((product.gallery && product.gallery.length > 0) ? product.gallery[0] : product.image);
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('pd3-desc');

  const displayRelated = (relatedProducts && relatedProducts.length > 0)
    ? relatedProducts.slice(0, 4)
    : products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const isAquaOrPets = Boolean(
    product.category &&
      (product.category.toLowerCase().includes('aqua') ||
        product.category.toLowerCase().includes('pet'))
  );

  const hasDosage = !isAquaOrPets && Boolean(
    product.dosage &&
      product.dosage.methods &&
      Array.isArray(product.dosage.methods) &&
      product.dosage.methods.length > 0
  );

  const isManualScrollingRef = React.useRef(false);
  const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollingRef.current) return;

      const sectionIds = ['pd3-desc', 'pd3-benefits', 'pd3-when'];
      if (product.composition && product.composition.length > 0) {
        sectionIds.push('pd3-comp');
      }
      if (hasDosage) {
        sectionIds.push('pd3-dosage');
      }
      const existingSections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (existingSections.length === 0) return;

      const header = document.querySelector('.site-header') as HTMLElement;
      const headerHeight = header ? header.offsetHeight : 80;
      const threshold = headerHeight + 50;

      // If user is near bottom of the page, activate the last existing section
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection(existingSections[existingSections.length - 1].id);
        return;
      }

      let current = existingSections[0].id;
      for (const el of existingSections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = el.id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      isManualScrollingRef.current = true;
      setActiveSection(id);

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      const header = document.querySelector('.site-header') as HTMLElement;
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPos = el.getBoundingClientRect().top + window.scrollY;
      const targetTop = elementPos - headerHeight - 20;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });

      scrollTimerRef.current = setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 700);
    }
  };

  return (
    <>
      <Head>
        <title>{product.name} | VEDVET</title>
        <meta name="description" content={product.shortDescription} />
      </Head>
      <Header />

      <PageHeader
        title={product.name}
        eyebrow={product.category}
        tagline={product.tagline}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: product.name }]}
      />

      <main className="pd3-main">

        {/* ── FULL-PAGE SPLIT HERO ─────────────── */}
        <section className="pd3-hero">

          {/* Left: Image Panel */}
          <div className="pd3-left-panel">
            <div className="pd3-panel-bg"></div>
            
            <div className="pd3-img-wrapper" data-aos="zoom-in" data-aos-duration="1000" style={{ position: 'relative' }}>
              <img src={activeImg} alt={product.name} className="pd3-main-img" style={{ transition: 'all 0.3s ease' }} />
              <div className="pd3-img-glow"></div>
              
              <button 
                onClick={() => setFullscreenOpen(true)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  color: 'var(--charcoal)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--lime)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.color = 'var(--charcoal)';
                }}
                aria-label="View Fullscreen"
              >
                <i className="bi bi-arrows-fullscreen"></i>
              </button>
            </div>

            {/* Custom Gallery Thumbnails for Design 3 */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="pd3-thumbnail-container">
                {product.gallery.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`pd3-thumbnail ${activeImg === img ? 'active' : ''}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} />
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right: Info Panel */}
          <div className="pd3-right-panel">
            <div className="pd3-right-inner" data-aos="fade-up" data-aos-delay="200">
              <span className="pd3-eyebrow">{product.category}</span>
              <h1 className="pd3-h1">{product.name}</h1>
              {product.tagline && (
                <p className="pd3-tagline-text"><i className="bi bi-quote"></i>{product.tagline}</p>
              )}
              <p className="pd3-tagline" style={{ marginBottom: '20px' }}>{product.shortDescription}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start', marginBottom: '25px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--lime-light)', padding: '10px 20px', borderRadius: 'var(--radius-md)', color: 'var(--charcoal)', fontWeight: '700' }}>
                  <i className="bi bi-box-seam" style={{ color: 'var(--lime)', fontSize: '1.2rem' }}></i> 
                  Presentation: {product.presentation}
                </div>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <Link href="/contact" className="pd3-enq-btn">
                    <i className="bi bi-envelope"></i> Request Information
                  </Link>
                </div>
              </div>

              {(() => {
                const categoryImages: string[] = (product as any).animalUsedImages || [];
                return categoryImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px', marginBottom: '15px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.95rem', color: 'var(--charcoal)', fontWeight: '600', marginRight: '5px' }}>Suitable For:</span>
                    {categoryImages.map((imgSrc, idx) => (
                      <img 
                        key={idx}
                        src={imgSrc} 
                        alt="Suitable for animals" 
                        style={{ height: '60px', width: 'auto', objectFit: 'contain', borderRadius: '5px' }} 
                      />
                    ))}
                  </div>
                );
              })()}

              <div className="pd3-quick-benefits">
                {product.benefits && product.benefits.slice(0, 4).map((b, i) => {
                  const commonIcons = ['bi-shield-check', 'bi-bandaid', 'bi-heart-pulse', 'bi-activity'];
                  const iconClass = (b as any).icon || commonIcons[i % commonIcons.length];
                  return (
                    <div className="pd3-qb-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="pd3-qb-icon"><i className={`bi ${iconClass}`}></i></div>
                      <span className="pd3-qb-label">{b.title}</span>
                    </div>
                  );
                })}
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
                  <a
                    href="#pd3-desc"
                    onClick={(e) => scrollToSection(e, 'pd3-desc')}
                    className={`pd3-nav-dot${activeSection === 'pd3-desc' ? ' active' : ''}`}
                  >
                    <span>Description</span>
                  </a>
                  <a
                    href="#pd3-benefits"
                    onClick={(e) => scrollToSection(e, 'pd3-benefits')}
                    className={`pd3-nav-dot${activeSection === 'pd3-benefits' ? ' active' : ''}`}
                  >
                    <span>Benefits</span>
                  </a>
                  <a
                    href="#pd3-when"
                    onClick={(e) => scrollToSection(e, 'pd3-when')}
                    className={`pd3-nav-dot${activeSection === 'pd3-when' ? ' active' : ''}`}
                  >
                    <span>Indications</span>
                  </a>
                  {product.composition && product.composition.length > 0 && (
                    <a
                      href="#pd3-comp"
                      onClick={(e) => scrollToSection(e, 'pd3-comp')}
                      className={`pd3-nav-dot${activeSection === 'pd3-comp' ? ' active' : ''}`}
                    >
                      <span>Composition</span>
                    </a>
                  )}
                  {hasDosage && (
                    <a
                      href="#pd3-dosage"
                      onClick={(e) => scrollToSection(e, 'pd3-dosage')}
                      className={`pd3-nav-dot${activeSection === 'pd3-dosage' ? ' active' : ''}`}
                    >
                      <span>Dosage</span>
                    </a>
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
                    {product.benefits && product.benefits.map((b, i) => {
                      const commonIcons = ['bi-shield-check', 'bi-bandaid', 'bi-heart-pulse', 'bi-activity', 'bi-capsule', 'bi-droplet-half'];
                      const iconClass = (b as any).icon || commonIcons[i % commonIcons.length];
                      return (
                        <div className="pd3-ben-row" key={i}>
                          <div className="pd3-ben-icon"><i className={`bi ${iconClass}`}></i></div>
                          <div className="pd3-ben-content">
                            <h4>{b.title}</h4>
                            <p>{b.text}</p>
                          </div>
                          <span className="pd3-ben-num">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                      );
                    })}
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
                    <div className="pd3-comp-box">
                      <div className="pd3-comp-badges">
                        {product.composition.map((item: any, i: number) => (
                          <span key={i} className="pd3-comp-badge">
                            {item.ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Dosage */}
                {hasDosage && (
                  <div id="pd3-dosage" className="pd3-detail-section" data-aos="fade-up">
                    <div className="pd3-section-num">{product.composition && product.composition.length > 0 ? '05' : '04'}</div>
                    <h2 className="pd3-detail-h">Dosage & Administration</h2>
                    <div>
                      {product.dosage.methods.map((method: any, i: number) => (
                        <div key={i} style={{ marginBottom: '25px', background: '#fcfdfd', border: '1px solid #eef2f6', borderRadius: '12px', overflow: 'hidden' }}>
                          <div style={{ background: '#f5f8fb', padding: '15px 20px', borderBottom: '1px solid #eef2f6' }}>
                            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--lime-dark)' }}>{method.name}</h4>
                          </div>
                          <div style={{ padding: '0 20px', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '300px' }}>
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

        {/* ── RELATED PRODUCTS SECTION ────────────────── */}
        {displayRelated.length > 0 && (
          <section className="pd3-related-section">
            <div className="container-wide">
              <div className="pd3-related-header" data-aos="fade-up">
                <div className="pd3-related-header-left">
                  <span className="pd3-related-eyebrow">Explore Formulations</span>
                  <h2 className="pd3-related-title">Related Products</h2>
                  <p className="pd3-related-subtitle">
                    Discover other veterinarian-grade healthcare solutions designed to deliver optimal animal wellness.
                  </p>
                </div>
                <div className="pd3-related-header-right">
                  <Link href="/products" className="pd3-related-view-all">
                    <span>View All Products</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="pd3-related-grid">
                {displayRelated.map((relProduct, idx) => (
                  <Link 
                    href={`/product/${relProduct.slug}`} 
                    key={relProduct.slug || idx} 
                    className="pd3-related-card"
                    data-aos="fade-up" 
                    data-aos-delay={idx * 100}
                  >
                    <div className="pd3-related-img-wrapper">
                      <img 
                        src={relProduct.image} 
                        alt={relProduct.name} 
                        className="pd3-related-img" 
                      />
                    </div>
                    <div className="pd3-related-body">
                      <span className="pd3-related-cat">{relProduct.category}</span>
                      <h3 className="pd3-related-name">{relProduct.name}</h3>
                      {relProduct.presentation && (
                        <div className="pd3-related-presentation">
                          <i className="bi bi-box-seam"></i>
                          <span>{relProduct.presentation}</span>
                        </div>
                      )}
                      <p className="pd3-related-desc">{relProduct.shortDescription}</p>
                      <div className="pd3-related-btn-wrapper">
                        <span className="pd3-related-btn">
                          View Details <i className="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Fullscreen Image Modal */}
      {fullscreenOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}
          onClick={() => setFullscreenOpen(false)}
        >
          <button 
            style={{ position: 'absolute', top: '25px', right: '30px', background: 'none', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '10px', zIndex: 10000 }}
            onClick={(e) => { e.stopPropagation(); setFullscreenOpen(false); }}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
          <img 
            src={activeImg} 
            alt={product.name} 
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', background: '#fff', padding: '20px', borderRadius: '30px' }}
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <Footer />
    </>
  );
}
