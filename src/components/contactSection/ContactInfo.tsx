import React from 'react';

const contactDetails = [
  {
    icon: 'bi-geo-alt',
    title: 'Headquarters',
    desc: 'VEDVET Animal Health Pvt. Ltd.\nIndustrial Estate, Mumbai, India',
    link: '#',
    linkText: 'Get Directions'
  },
  {
    icon: 'bi-envelope',
    title: 'Email Support',
    desc: 'info@vedvet.com\nsupport@vedvet.com',
    link: 'mailto:info@vedvet.com',
    linkText: 'Drop a Line'
  },
  {
    icon: 'bi-telephone',
    title: 'Phone Support',
    desc: '+91 999 77 148 00\nMon - Sat, 9:00 AM - 6:00 PM',
    link: 'tel:+919997714800',
    linkText: 'Call Now'
  }
];

export default function ContactInfo() {
  return (
    <section id="contact-info" className="contact-info-section bg-pattern-dots" style={{ padding: '100px 0', background: 'var(--grad-section)' }}>
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: 60 }} data-aos="fade-up">
          <span className="section-label" style={{ justifyContent: 'center' }}>Reach Out</span>
          <h2 className="section-title">We're Here to Help</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have questions about our products or partnership opportunities? Contact our team.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {contactDetails.map((item, i) => (
            <div 
              key={i} 
              className="contact-info-card" 
              data-aos="fade-up" 
              data-aos-delay={i * 100}
            >
              <div className="contact-icon">
                <i className={`bi ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href={item.link} className="contact-link">{item.linkText} <i className="bi bi-arrow-right"></i></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
