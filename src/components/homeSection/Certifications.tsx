import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const certs = [
  { name: 'ISO 9001:2015', image: '/images/accreditations/ISO 9001 2015.png' },
  { name: 'ISO 22000', image: '/images/accreditations/ISO 22000.png' },
  { name: 'GMP Certified', image: '/images/accreditations/GMP.png' },
  { name: 'HACCP', image: '/images/accreditations/HACCP.png' },
  { name: 'HALAL', image: '/images/accreditations/Halal.png' },
  { name: 'FAMI-QS', image: '/images/accreditations/FAMI-QS.png' },
  { name: 'GMO Certified', image: '/images/accreditations/GMO.png' },
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
                  <Image src={cert.image} alt={cert.name} width={60} height={60} style={{ objectFit: 'contain' }} />
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
