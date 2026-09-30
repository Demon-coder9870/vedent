import React from 'react';
import Head from 'next/head';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PageHeader from '../layout/PageHeader';
import ProductImageGallery from './ProductImageGallery';
import { products } from '../../data/products';

type Product = typeof products[0];

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDesign1({ product, relatedProducts }: ProductPageProps) {
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
                <ProductImageGallery images={product.gallery || [product.image]} />
              </div>

              {/* Right Side: Info */}
              <div className="product-hero-content" data-aos="fade-left">
                <div className="product-hero-category">{product.category}</div>
                <h2 className="product-hero-title">{product.name}</h2>
                {product.tagline && (
                  <p className="product-hero-tagline">
                    <i className="bi bi-quote" style={{ color: 'var(--lime)', marginRight: '8px', fontSize: '1rem' }}></i>
                    {product.tagline}
                  </p>
                )}
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

            {/* Composition */}
            {product.composition && product.composition.length > 0 && (
              <div className="tab-content-box" data-aos="fade-up">
                <h3 className="tab-content-title" style={{ marginBottom: '15px' }}>Composition</h3>
                <div className="title-underline"></div>
                {product.compositionBase && (
                  <p className="tab-content-text" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{product.compositionBase}</p>
                )}
                <div className="composition-table-wrapper" style={{ marginTop: '20px', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <tbody>
                      {product.composition.map((item: any, i: number) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={{ padding: '15px 20px', color: 'var(--charcoal)' }}>{item.ingredient}</td>
                          <td style={{ padding: '15px 20px', color: 'var(--charcoal)', fontWeight: '700', textAlign: 'right' }}>{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dosage */}
            {product.dosage && product.dosage.methods && (
              <div className="tab-content-box" data-aos="fade-up">
                <h3 className="tab-content-title" style={{ marginBottom: '15px' }}>Dosage & Administration</h3>
                <div className="title-underline"></div>
                <div style={{ marginTop: '30px' }}>
                  {product.dosage.methods.map((method: any, i: number) => (
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <h4 style={{ fontSize: '1.05rem', letterSpacing: '0.5px', color: 'var(--lime-dark)', marginBottom: '15px', borderBottom: '2px solid var(--lime-light)', paddingBottom: '8px', display: 'inline-block', fontStyle: 'italic' }}>{method.name}</h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#f8fafd', borderRadius: '8px', overflow: 'hidden' }}>
                        <tbody>
                          {method.dosages.map((dosage: any, j: number) => (
                            <tr key={j} style={{ borderBottom: j !== method.dosages.length - 1 ? '1px solid #e1e8f0' : 'none' }}>
                              <td style={{ padding: '15px 20px', color: 'var(--charcoal)', width: '50%' }}>{dosage.target}</td>
                              <td style={{ padding: '15px 20px', color: 'var(--lime-dark)', fontWeight: '700' }}>{dosage.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                  {product.dosage.note && (
                    <div className="veterinary-warning" style={{ marginTop: '10px' }}>
                      <i className="bi bi-info-circle-fill"></i>
                      {product.dosage.note}
                    </div>
                  )}
                </div>
              </div>
            )}

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
