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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Mailto action for enquiry
    const subject = `Enquiry for ${product.name}`;
    const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AProduct: ${product.name}%0A%0AMessage:%0A${formData.message}`;
    window.location.href = `mailto:info@vedvet.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    setShowModal(false);
  };

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
            { label: 'Home', href: '/#hero' },
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
                  <button className="btn-primary" onClick={() => setShowModal(true)}>
                    Enquire Now <i className="bi bi-chat-dots" />
                  </button>
                  <a href={`#tab-description`} className="btn-dark">
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
              <a href={`https://vedvet.com/product/${product.slug}`} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: 'var(--lime-dark)', borderColor: 'var(--border-light)', backgroundColor: 'var(--white)' }}>
                Download Additional Information <i className="bi bi-download" />
              </a>
            </div>

          </div>
        </section>


        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="section-pad" style={{ backgroundColor: '#f8fafc' }}>
            <div className="container-wide">
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <span className="section-label" style={{ justifyContent: 'center' }}>More Solutions</span>
                <h2 className="section-title">Related Products</h2>
              </div>
              <div className="products-grid">
                {relatedProducts.map((p, index) => (
                  <Link href={`/product/${p.slug}`} key={p.slug} style={{ textDecoration: 'none' }} passHref>
                    <div className="product-card" data-aos="fade-up" data-aos-delay={index * 100}>
                      <div className="product-image-wrapper">
                        <img src={p.image} alt={p.name} className="product-image" />
                      </div>
                      <div className="product-category">{p.category}</div>
                      <h3 className="product-title">{p.name}</h3>
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
        )}
      </main>

      <Footer />

      {/* Enquiry Modal Form */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ opacity: 0.5, backgroundColor: '#000' }}></div>
          <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Enquiry - {product.name}</h5>
                  <button type="button" className="drawer-close" onClick={() => setShowModal(false)} aria-label="Close" style={{ border: 'none', background: 'transparent' }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleEnquirySubmit}>
                    <div className="form-group mb-3">
                      <label className="fw-bold mb-2">Name *</label>
                      <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group mb-3">
                      <label className="fw-bold mb-2">Email *</label>
                      <input type="email" className="form-control" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="form-group mb-3">
                      <label className="fw-bold mb-2">Phone</label>
                      <input type="tel" className="form-control" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="form-group mb-3">
                      <label className="fw-bold mb-2">Product Name</label>
                      <input type="text" className="form-control" readOnly value={product.name} style={{ backgroundColor: '#f8fafc' }} />
                    </div>
                    <div className="form-group mb-4">
                      <label className="fw-bold mb-2">Message *</label>
                      <textarea className="form-control" rows={3} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn-lime w-100 justify-content-center">Submit Enquiry</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
