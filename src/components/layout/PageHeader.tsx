import React, { useEffect, useRef } from 'react';
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

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const particleCount = isMobile ? 35 : 65;
    const maxDistance = isMobile ? 85 : 120;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 360),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.45 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22;
            ctx.strokeStyle = `rgba(96, 165, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and drift particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}

export default function PageHeader({ 
  title, 
  tagline, 
  eyebrow,
  breadcrumbs, 
}: PageHeaderProps) {
  // Determine badge text: use provided eyebrow, or derive from breadcrumbs, or default to brand
  const badgeText = eyebrow || (breadcrumbs.length > 2 ? breadcrumbs[breadcrumbs.length - 2].label : 'VedVet Healthcare');

  return (
    <div className="page-header">
      {/* Dynamic interactive constellation particles */}
      <ParticlesCanvas />

      {/* High-tech grid mesh */}
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
