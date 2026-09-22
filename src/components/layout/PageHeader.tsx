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
          <ol className="breadcrumb">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
                  {isLast ? (
                    crumb.label
                  ) : (
                    <Link href={crumb.href || '/'}>{crumb.label}</Link>
                  )}
                  {!isLast && <span className="breadcrumb-separator">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
