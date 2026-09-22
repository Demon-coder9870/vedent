import React, { useEffect, useRef } from 'react';

const stats = [
  { number: '15', suffix: '+', label: 'Years of Excellence' },
  { number: '50', suffix: '+', label: 'Product Portfolio' },
  { number: '20', suffix: '+', label: 'Countries Served' },
  { number: '15', suffix: '+', label: 'Happy Clients' },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const counters = containerRef.current.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt((entry.target as HTMLElement).dataset.count || '0', 10);
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            entry.target.textContent = Math.round(current).toString();
            if (current >= target) clearInterval(timer);
          }, 20);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={containerRef}>
      <div className="container-wide">
        <div className="stats-grid">
          {stats.map(({ number, suffix, label }, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">
                <span data-count={parseInt(number)}>{parseInt(number)}</span>
                <span>{suffix}</span>
              </div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
