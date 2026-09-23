import React from 'react';

const commitments = [
  {
    icon: 'bi-people-fill',
    title: "It's Customers.",
    span: 'bento-wide',
    desc: "Building lasting relationships founded on trust, transparency, and a genuine understanding of our customers' needs. We see every customer as a long-term partner in growth.",
    variant: 'bento-image-bg',
    bgImage: '/images/hero.jpg',
    tag: 'Customer First',
  },
  {
    icon: 'bi-star-fill',
    title: 'Premium Quality',
    span: 'bento-tall',
    desc: 'Upholding the highest standards of quality at every stage — from raw material sourcing to final dispatch — ensuring consistency, safety, and reliability in every batch.',
    variant: 'bento-lime-bg',
    tag: 'ISO & GMP Certified',
  },
  {
    icon: 'bi-diagram-3-fill',
    title: 'Distributor Networks',
    span: 'bento-wide',
    desc: 'Fostering strong partnerships with distributors through co-branding opportunities. We invest in relationships to ensure shared goals and sustained growth across all regions.',
    variant: 'bento-teal-bg',
    tag: '20+ Countries',
  },
  {
    icon: 'bi-lightbulb-fill',
    title: 'Innovations',
    span: 'bento-full',
    desc: 'Continuously investing in R&D to bring forward science-backed, sustainable animal healthcare solutions. We combine traditional herbal wisdom with modern veterinary science.',
    variant: 'bento-dark-bg',
    tag: 'R&D Driven',
  },
];

export default function Commitment() {
  return (
    <section id="commitment" className="about-section-pad bg-pattern-dots" style={{ backgroundColor: '#f9f9fc' }}>
      <div className="container-wide">
        <div className="wwd-section-header" style={{ marginBottom: '50px' }} data-aos="fade-up">
          <div>
            <h2 className="section-title">VEDVET IS COMMITTED TO</h2>
            <div className="title-underline"></div>
          </div>
        </div>

        <div className="bento-grid-v2">
          {commitments.map((c, i) => (
            <div
              key={i}
              className={`bento-card-v2 ${c.span} ${c.variant}`}
              data-aos="fade-up"
              style={{
                animationDelay: `${i * 0.12}s`,
                ...(c.bgImage ? { backgroundImage: `url(${c.bgImage})` } : {}),
              }}
            >
              <div className="bento-card-overlay" />
              <div className="bento-content-v2">
                <div className="bento-top-row">
                  <span className="bento-tag">{c.tag}</span>
                  <div className="bento-icon-v2"><i className={`bi ${c.icon}`} /></div>
                </div>
                <div className="bento-bottom-row">
                  <h3 className="bento-title-v2">{c.title}</h3>
                  <p className="bento-desc-v2">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
