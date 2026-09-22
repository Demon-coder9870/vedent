import React from 'react';

const services = [
  { icon: 'bi-heart-pulse', title: 'Wellness Exams', desc: 'Comprehensive health checks designed for diverse pet healthcare needs — from routine checkups to diagnosis.', num: '01' },
  { icon: 'bi-basket2', title: 'Pet Nutrition', desc: 'Quality-focused supplements and premium diets supporting optimal pet nutrition and lifelong wellbeing.', num: '02' },
  { icon: 'bi-scissors', title: 'Grooming Services', desc: 'Professional grooming solutions aligned with breed-specific requirements and skin care standards.', num: '03' },
  { icon: 'bi-bandaid', title: 'Surgical Care', desc: 'State-of-the-art surgical expertise focused on safety, precision, and quick recovery for your furry friends.', num: '04' },
  { icon: 'bi-people', title: 'Behavioral Training', desc: 'Working closely with pet parents to understand and address practical behavioral requirements.', num: '05' },
  { icon: 'bi-house-heart', title: 'Boarding & Daycare', desc: 'Developing safe, fun, and enriching environments with a focus on long-term happiness and socialization.', num: '06' },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container-wide">
        <div className="services-header">
          <div data-aos="fade-up">
            <span className="section-label">What We Do</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Comprehensive Petcare<br />Solutions
            </h2>
          </div>
          <p className="section-subtitle" style={{ maxWidth: 380 }} data-aos="fade-up">
            Six pillars of animal healthcare excellence, delivering real-world results for veterinarians and farmers globally.
          </p>
        </div>

        <div className="services-grid">
          {services.map(({ icon, title, desc, num }, i) => (
            <div key={i} className="service-card" data-aos="fade-up" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="service-card-number">{num}</div>
              <div className="service-icon"><i className={`bi ${icon}`} /></div>
              <h3 className="service-title">{title}</h3>
              <p className="service-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
