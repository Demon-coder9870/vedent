import React from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  tagline?: string;
  eyebrow?: string;
  breadcrumbs: Breadcrumb[];
  bgImage?: string;
}

export default function PageHeader({ 
  title, 
  tagline, 
  eyebrow,
  breadcrumbs, 
  bgImage = '/images/hero.jpg' 
}: PageHeaderProps) {
  // Determine badge text: use provided eyebrow, or derive from breadcrumbs, or default to brand
  const badgeText = eyebrow || (breadcrumbs.length > 2 ? breadcrumbs[breadcrumbs.length - 2].label : 'VedVet Healthcare');

  return (
    <div className="page-header" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Modern cinematic dark gradient overlay & high-tech grid mesh */}
      <div className="page-header-overlay" />
      <div className="page-header-grid-mesh" />

      {/* Ambient luminous glow spheres */}
      <div className="page-header-glow page-header-glow-left" />
      <div className="page-header-glow page-header-glow-right" />

      <div className="container-wide page-header-content">
        {/* Subtle Category / Brand Badge */}
        {badgeText && (
          <div className="page-header-badge" data-aos="fade-down" data-aos-duration="600">
            <span className="page-header-badge-dot" />
            <span className="page-header-badge-text">{badgeText}</span>
          </div>
        )}

        {/* Hero Title */}
        <h1 className="page-header-title" data-aos="fade-up" data-aos-duration="700">
          {title}
        </h1>

        {/* Decorative Glowing Accent Bar */}
        <div className="page-header-divider" data-aos="zoom-in" data-aos-delay="100" />

        {/* Tagline / Subtitle */}
        {tagline && (
          <p className="page-header-tagline" data-aos="fade-up" data-aos-delay="140">
            <i className="bi bi-quote"></i>
            <span>{tagline}</span>
          </p>
        )}

        {/* Ultra-Refined Frosted Glass Breadcrumbs */}
        <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="200">
          <ol className="breadcrumb breadcrumb-glass">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const isFirst = index === 0;
              return (
                <li 
                  key={index} 
                  className={`breadcrumb-item ${isLast ? 'active' : ''}`} 
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isLast ? (
                    <span className="breadcrumb-text">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href || '/'} className="breadcrumb-link">
                      {isFirst && <i className="bi bi-house-door-fill breadcrumb-home-icon" />}
                      <span>{crumb.label}</span>
                    </Link>
                  )}
                  {!isLast && <i className="bi bi-chevron-right breadcrumb-separator" />}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Bottom glowing border accent */}
      <div className="page-header-bottom-accent" />
    </div>
  );
}
