import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
  { bg: '/images/slider/1.webp', mob: '/images/slider/1-mobile.webp' },
  { bg: '/images/slider/2.webp', mob: '/images/slider/2-mobile.webp' },
  { bg: '/images/slider/3.webp', mob: '/images/slider/3-mobile.webp' },
  { bg: '/images/slider/4.webp', mob: '/images/slider/4-mobile.webp' },
  { bg: '/images/slider/5.webp', mob: '/images/slider/5-mobile.webp' },
  { bg: '/images/slider/6.webp', mob: '/images/slider/6-mobile.webp' },
  { bg: '/images/slider/7.webp', mob: '/images/slider/7-mobile.webp' },
  { bg: '/images/slider/8.webp', mob: '/images/slider/8-mobile.webp' },
  { bg: '/images/slider/9.webp', mob: '/images/slider/9-mobile.webp' },
  { bg: '/images/slider/10.webp', mob: '/images/slider/10-mobile.webp' },
];

const heroSectors = [
  { name: 'Poultry', icon: 'bi-egg' },
  { name: 'Swine', icon: 'bi-piggy-bank' },
  { name: 'Livestock', icon: 'bi-box-seam' },
  { name: 'Aqua', icon: 'bi-droplet' },
  { name: 'Pets', icon: 'bi-heart' },
];

export default function Hero() {
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0]);

  const loadSlideAndNext = (index: number) => {
    setLoadedIndices((prev) => {
      const nextIdx = (index + 1) % heroSlides.length;
      if (prev.includes(index) && prev.includes(nextIdx)) return prev;
      return Array.from(new Set([...prev, index, nextIdx]));
    });
  };

  const handleInteraction = () => {
    loadSlideAndNext(0);
  };

  return (
    <section id="hero" className="hero-section" onTouchStart={handleInteraction} onMouseEnter={handleInteraction}>
      <Swiper
        className="hero-swiper"
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => loadSlideAndNext(swiper.realIndex)}
      >
        {heroSlides.map((slide, i) => {
          const shouldRender = loadedIndices.includes(i);
          return (
            <SwiperSlide
              key={i}
              className={i === 0 ? 'swiper-slide-active' : ''}
              style={i === 0 ? { opacity: 1 } : undefined}
            >
              <div className="hero-bg">
                {shouldRender ? (
                  <picture>
                    <source media="(max-width: 768px)" srcSet={slide.mob} />
                    <img
                      src={slide.bg}
                      alt="VEDVET Animal Healthcare"
                      width={1920}
                      height={1080}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding={i === 0 ? 'sync' : 'async'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                  </picture>
                ) : null}
              </div>
              <div className="hero-overlay" />
            </SwiperSlide>
          );
        })}

        {/* Static content that stays fixed while backgrounds transition */}
        <div className="container-wide" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
          <div className="hero-content" style={{ pointerEvents: 'auto', width: '100%' }}>
            <div className="hero-badge">
              <i className="bi bi-star-fill" style={{ fontSize: '0.7rem' }} />
              Premium Animal Wellness
            </div>
            <h1 className="hero-title">
              <><b>INGREDIENTS by Nature, FORMULATIONS BY Vedvet</b></>
            </h1>
            <p className="hero-subtitle">
              <small style={{ fontSize: '0.8em' }}>Care without limits – For every Companion</small>
            </p>
            <div className="hero-pills-inner" style={{ marginTop: '20px' }}>
              <span className="hero-pills-label">Explore:</span>
              {heroSectors.map(sector => (
                <Link
                  key={sector.name}
                  href={`/products/${encodeURIComponent(sector.name.toLowerCase())}`}
                  className="pill"
                  prefetch={false}
                >
                  {sector.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Swiper>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="mouse-icon" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
