import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
  { bg: '/images/hero.jpg' },
  { bg: '/images/pets.jpg' },
  { bg: '/images/livestock.jpg' },
];

const heroSectors = [
  { name: 'Swine', icon: 'bi-piggy-bank' },
  { name: 'Aqua', icon: 'bi-droplet' },
  { name: 'Livestock', icon: 'bi-box-seam' },
  { name: 'Poultry', icon: 'bi-egg' },
  { name: 'Pets', icon: 'bi-heart' },
];

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <Swiper
        className="hero-swiper"
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          prevEl: '.hero-swiper-prev',
          nextEl: '.hero-swiper-next',
        }}
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
                <a key={sector.name} href={`#${sector.name.toLowerCase()}`} className="pill">
                  {sector.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Custom Navigation */}
        <div className="hero-swiper-prev" style={{ zIndex: 11 }}><FiChevronLeft /></div>
        <div className="hero-swiper-next" style={{ zIndex: 11 }}><FiChevronRight /></div>
      </Swiper>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="mouse-icon" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
