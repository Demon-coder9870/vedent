import React from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  bgImage?: string;
}

export default function PageHeader({ title, breadcrumbs, bgImage = '/images/hero.jpg' }: PageHeaderProps) {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="page-header-overlay"></div>
      <div className="container-wide page-header-content">
        <h1 className="page-header-title" data-aos="fade-up">{title}</h1>
        <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="100">
          <ol className="breadcrumb breadcrumb-glass">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const isFirst = index === 0;
              return (
                <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
                  {isLast ? (
                    <span className="breadcrumb-text">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href || '/'} className="breadcrumb-link">
                      {isFirst && <i className="bi bi-house-door-fill" style={{ marginRight: '6px', fontSize: '0.95em' }} />}
                      {crumb.label}
                    </Link>
                  )}
                  {!isLast && <i className="bi bi-chevron-right breadcrumb-separator" />}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
