import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
  { bg: '/images/slider/1.jpg' },
  { bg: '/images/slider/2.jpg' },
  { bg: '/images/slider/3.jpg' },
  { bg: '/images/slider/4.jpg' },
  { bg: '/images/slider/5.jpg' },
  { bg: '/images/slider/6.jpg' },
  { bg: '/images/slider/7.jpg' },
  { bg: '/images/slider/8.jpg' },
  { bg: '/images/slider/9.jpg' },
  { bg: '/images/slider/10.jpg' },
];

const heroSectors = [
  { name: 'Poultry', icon: 'bi-egg' },
  { name: 'Swine', icon: 'bi-piggy-bank' },
  { name: 'Livestock', icon: 'bi-box-seam' },
  { name: 'Aqua', icon: 'bi-droplet' },
  { name: 'Pets', icon: 'bi-heart' },
];

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <Swiper
        className="hero-swiper"
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="hero-bg" style={{ backgroundImage: `url(${slide.bg})` }} />
            <div className="hero-overlay" />
          </SwiperSlide>
        ))}

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
                  href={`/products?category=${encodeURIComponent(sector.name)}`}
                  className="pill"
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
