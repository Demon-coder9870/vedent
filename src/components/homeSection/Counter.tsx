import React, { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 15, suffix: '', label: 'YEARS OF EXCELLENCE' },
  { value: 200, suffix: '+', label: 'PRODUCTS PORTFOLIO' },
  { value: 50, suffix: '+', label: 'COUNTRIES SERVED' },
  { value: 10, suffix: '+', label: 'HAPPY CLIENTS' },
];

const AnimatedNumber = ({ target, suffix }: { target: number, suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000;
          const startTime = performance.now();
          
          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // easeOutExpo for smooth deceleration
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(Math.floor(easeOut * target));
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(target);
            }
          };
          
          requestAnimationFrame(updateCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="counter-value" ref={ref}>
      {count}{suffix}
    </div>
  );
};

export default function Counter() {
  return (
    <section className="counter-section">
      <div className="container-wide">
        <div className="counter-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="counter-item" data-aos="fade-up" data-aos-delay={idx * 100}>
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <div className="counter-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
