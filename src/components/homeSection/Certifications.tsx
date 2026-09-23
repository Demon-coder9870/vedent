import React from 'react';
import Link from 'next/link';

const certs = [
  { name: 'ISO 9001:2015', icon: 'bi-patch-check-fill' },
  { name: 'GMP Certified', icon: 'bi-shield-fill-check' },
  { name: 'WHO-GMP', icon: 'bi-globe' },
  { name: 'FDA Compliant', icon: 'bi-check2-circle' },
  { name: 'FSSAI', icon: 'bi-cup-hot-fill' },
  { name: 'Organic', icon: 'bi-flower1' },
  { name: 'HALAL', icon: 'bi-star-fill' },
];

export default function Certifications() {
  // Double the array for seamless marquee loop
  const duplicatedCerts = [...certs, ...certs, ...certs];

  return (
    <section id="certifications" className="certifications-section">
      <div className="container-wide">
        <div className="certifications-header" data-aos="fade-up">
          <span className="section-label">Accreditations</span>
          <h2 className="section-title">Our Commitment to Quality</h2>
          <div className="title-underline" style={{ margin: '0 auto' }}></div>
        </div>
        
        <div className="marquee-container" data-aos="fade-up" data-aos-delay="100">
          <div className="marquee-content">
            {duplicatedCerts.map((cert, index) => (
              <Link href="/accreditations" key={index} className="cert-logo-link">
                <div className="cert-logo-circle">
                  <i className={`bi ${cert.icon}`}></i>
                </div>
                <span className="cert-logo-name">{cert.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
