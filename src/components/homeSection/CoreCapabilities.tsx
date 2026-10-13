import React from 'react';

const capabilities = [
  {
    title: 'Distribution Network',
    desc: 'Seamless international logistics and distribution channels delivering veterinary healthcare products across 18+ countries efficiently.',
    img: '/images/Distribution-Network.jpg',
    badge: 'Global Reach',
    icon: 'bi-truck',
    delay: 100,
  },
  {
    title: 'Premium Quality',
    desc: 'State-of-the-art laboratory testing, GMP manufacturing standards, and stringent quality assurance across every batch.',
    img: '/images/Premium-Quality.jpg',
    badge: 'Certified',
    icon: 'bi-shield-check',
    delay: 200,
  },
  {
    title: 'Research & Innovation',
    desc: 'Continuous scientific research pioneering cutting-edge formulations that integrate herbal extracts with modern animal nutrition.',
    img: '/images/Innovation.jpg',
    badge: 'R&D Driven',
    icon: 'bi-lightbulb',
    delay: 300,
  },
  {
    title: 'Customer & Partner Trust',
    desc: 'Dedicated to supporting veterinarians, farmers, and healthcare partners with personalized guidance and reliable animal healthcare solutions.',
    img: '/images/It-Customers.jpg',
    badge: 'Trusted',
    icon: 'bi-people',
    delay: 400,
  },
];

export default function CoreCapabilities() {
  return (
    <section id="capabilities" className="about-section-pad" style={{ backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container-wide">
        <div className="wwd-section-header" data-aos="fade-up" style={{ marginBottom: '50px' }}>
          <div>
            <span className="section-label">Core Capabilities</span>
            <h2 className="section-title">What Drives Our Work</h2>
            <div className="title-underline"></div>
          </div>
          <p className="section-subtitle" style={{ maxWidth: '500px' }}>
            From world-class research and premium manufacturing to seamless global distribution and customer trust.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {capabilities.map((item, idx) => (
            <div key={idx} className="wwd-pillar-card" data-aos="fade-up" data-aos-delay={item.delay}>
              <div className="wwd-pillar-img-wrap">
                <img src={item.img} alt={item.title} className="wwd-pillar-img" />
                <div className="wwd-pillar-badge">
                  <i className={`bi ${item.icon}`} /> {item.badge}
                </div>
              </div>
              <div className="wwd-pillar-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
