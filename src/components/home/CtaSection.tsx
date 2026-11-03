import React from 'react';
import Link from 'next/link';

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CtaSection({
  title = 'Better Animal Health\nStarts With Better Solutions.',
  subtitle = 'Join thousands of veterinarians and farmers who trust VEDVET for premium animal healthcare solutions.',
  primaryLabel = 'Talk to VEDVET',
  primaryHref = '/contact',
  secondaryLabel = 'Who We Are',
  secondaryHref = '/about/who-we-are',
}: CtaSectionProps) {
  const lines = title.split('\n');

  return (
    <section className="cta-section">
      <div className="cta-bg-glow" />
      <div className="container-wide">
        <div className="cta-content" data-aos="fade-up">
          <span className="section-label" style={{ justifyContent: 'center', color: 'var(--lime)', marginBottom: 20 }}>
            <i className="bi bi-stars" /> Get in Touch
          </span>
          <h2 className="cta-title">
            {lines[0]}<br />
            {lines[1] && <span className="accent">{lines[1]}</span>}
          </h2>
          <p className="cta-sub">{subtitle}</p>
          <div className="cta-actions">
            <Link href={primaryHref} className="btn-lime">
              <i className="bi bi-envelope-fill" /> {primaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
