import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-blob" />
      <div className="container-wide">
        <div className="about-grid">
          {/* Content */}
          <div className="about-content" data-aos="fade-up">
            <span className="section-label" style={{ textTransform: 'uppercase' }}>The VEDVET Approach</span>
            <h2 className="section-title">
              Where Compassionate Care Meets Advanced Science
            </h2>
            <div className="title-underline"></div>
            <p className="section-subtitle" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '24px' }}>
              Vedvet delivers world-class wellness solutions, premium products, and expert veterinary care for your animals.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px' }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--lime)', marginTop: '4px' }} />
                <span><strong>Trusted Relationships</strong> — Built on transparency and long-term partnership with our clients</span>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--lime)', marginTop: '4px' }} />
                <span><strong>Comprehensive Range</strong> — Practical, diverse products designed for every need</span>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--lime)', marginTop: '4px' }} />
                <span><strong>Driven by Experience</strong> — Continuous innovation rooted in real-world veterinary practice</span>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--lime)', marginTop: '4px' }} />
                <span><strong>Uncompromising Quality</strong> — No shortcuts, ever</span>
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="about-image-wrap" data-aos="fade-up">
            <div className="about-image-main">
              <img src="/images/about.jpg" alt="Veterinary Science at VEDVET" loading="lazy" />
            </div>
            <div className="about-badge">
              <div className="about-badge-number">15+ yrs</div>
              <div className="about-badge-text">of veterinary excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
