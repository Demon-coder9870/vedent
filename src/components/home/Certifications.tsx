import React from 'react';
import Link from 'next/link';

const certs = [
  { name: 'ISO 9001:2015', image: '/images/accreditations/ISO 9001 2015.webp' },
  { name: 'ISO 22000', image: '/images/accreditations/ISO 22000.webp' },
  { name: 'GMP Certified', image: '/images/accreditations/GMP.webp' },
  { name: 'HACCP', image: '/images/accreditations/HACCP.webp' },
  { name: 'HALAL', image: '/images/accreditations/Halal.webp' },
  { name: 'FAMI-QS', image: '/images/accreditations/FAMI-QS.webp' },
  { name: 'GMO Certified', image: '/images/accreditations/GMO.webp' },
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
                <div className="cert-logo-circle" style={{ background: 'transparent', boxShadow: 'none' }}>
                  <img
                    src={cert.image}
                    alt={cert.name}
                    width={60}
                    height={60}
                    loading="lazy"
                    decoding="async"
                    style={{ objectFit: 'contain' }}
                  />
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
