import React from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Accreditations() {
  const certifications = [
    {
      title: 'ISO 9001:2015',
      desc: 'Our quality management system is certified to ensure we consistently provide products that meet customer and regulatory requirements.',
      icon: 'bi-patch-check-fill'
    },
    {
      title: 'GMP Certified',
      desc: 'Good Manufacturing Practices compliant, ensuring our products are consistently produced and controlled according to quality standards.',
      icon: 'bi-shield-fill-check'
    },
    {
      title: 'WHO-GMP Compliant',
      desc: 'Adhering to the World Health Organization\'s strict guidelines for the manufacturing of veterinary health products.',
      icon: 'bi-globe'
    },
    {
      title: 'FDA Compliant',
      desc: 'Our facilities and products comply with strict regulatory guidelines to ensure maximum safety and efficacy.',
      icon: 'bi-check2-circle'
    },
  ];

  return (
    <>
      <Head>
        <title>Accreditations - VEDVET | Quality Standards</title>
        <meta name="description" content="Explore our industry-leading accreditations, certifications, and our commitment to premium veterinary healthcare." />
      </Head>

      <Header />

      <main style={{ paddingTop: '100px' }}>
        <section className="about-section-pad bg-pattern-dots" style={{ backgroundColor: '#f9f9fc', minHeight: '80vh' }}>
          <div className="container-wide">
            
            <div className="wwd-section-header" style={{ marginBottom: '60px', textAlign: 'center' }} data-aos="fade-up">
              <span className="section-label">Certifications</span>
              <h1 className="section-title">Our Accreditations</h1>
              <div className="title-underline" style={{ margin: '0 auto 24px auto' }}></div>
              <p className="section-subtitle">
                At VEDVET, quality is never compromised. Our world-class facilities and strict adherence to global standards ensure that every product we deliver meets the highest level of safety and efficacy.
              </p>
            </div>

            <div className="bento-grid-v2" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="bento-card-v2 bento-wide"
                  style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border-light)', padding: '40px' }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
                    <div style={{ 
                      width: '70px', height: '70px', borderRadius: '50%', 
                      background: 'var(--lime-light)', color: 'var(--lime-dark)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2rem', flexShrink: 0
                    }}>
                      <i className={`bi ${cert.icon}`}></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '15px', color: 'var(--charcoal)', fontFamily: 'var(--font-heading)' }}>
                        {cert.title}
                      </h3>
                      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        {cert.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
