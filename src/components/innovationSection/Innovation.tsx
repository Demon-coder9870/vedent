import React from 'react';

const steps = [
  {
    icon: 'bi-binoculars',
    num: '01',
    title: '— Understand',
    desc: 'Working closely with pet parents and veterinarians across the country to deeply understand practical requirements and real-world challenges in pet healthcare.',
  },
  {
    icon: 'bi-lightbulb',
    num: '02',
    title: '— Innovate',
    desc: 'Developing cutting-edge, innovative and sustainable treatments that can safely and reliably cure various pet ailments and significantly improve quality of life.',
  },
  {
    icon: 'bi-box-seam',
    num: '03',
    title: '— Deliver',
    desc: 'Providing high-quality veterinary medicines and wellness supplements, ensuring a practical and comprehensive range of products across global markets.',
  },
];

export default function Innovation() {
  return (
    <section id="innovation" className="innovation-section">
      <div className="container-wide">
        <div className="innovation-grid">
          <div className="innovation-sticky" data-aos="fade-up">
            <span className="section-label">Our Process</span>
            <h2 className="section-title">
              Driven by Innovation.<br />Guided by Experience.
            </h2>
            <p className="section-subtitle">
              We continuously work to meet the ever-changing demands and needs of the animal healthcare industry through a focused three-step approach.
            </p>
            <div style={{ marginTop: 40, padding: '28px', background: 'var(--lime-light)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--lime)' }}>
              <p style={{ fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8, fontSize: '1rem' }}>
                <i className="bi bi-award-fill" style={{ color: 'var(--lime-dark)', marginRight: 8 }} />
                GMP Certified Facilities
              </p>
              <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
                All our products are manufactured in certified facilities following strict international quality standards.
              </p>
            </div>
          </div>

          <div className="innovation-steps">
            {steps.map(({ icon, num, title, desc }, i) => (
              <div key={i} className="step-card" data-aos="fade-up" style={{ transitionDelay: `${i * 0.12}s` }}>
                <span className="step-num">{num}</span>
                <div className="step-icon"><i className={`bi ${icon}`} /></div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
