import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sectors = [
  { bg: '/images/swine.jpg', tag: 'Swine', title: 'Swine', sub: 'Advanced health solutions for swine management and care.' },
  { bg: '/images/livestock.jpg', tag: 'Livestock', title: 'Livestock', sub: 'Comprehensive healthcare products for healthy livestock.' },
  { bg: '/images/poultry.jpg', tag: 'Poultry', title: 'Poultry', sub: 'Targeted wellness and nutrition for poultry farming.' },
  { bg: '/images/aqua.jpg', tag: 'Aqua', title: 'Aqua', sub: 'Premium solutions for aquaculture health and growth.' },
  { bg: '/images/pets.jpg', tag: 'Pets', title: 'Pets', sub: 'Complete health management solutions for your loyal companions.' },
];

export default function Sectors() {
  return (
    <section id="sectors" className="sectors-section">
      <div className="container-wide">
        <div className="sectors-header" data-aos="fade-up">
          <span className="section-label">Our Range</span>
          <h2 className="section-title">
            Animal Healthcare<br />Across every sector
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.5)', margin: '0 auto' }}>
            From Swine to Pets — dedicated, specialized solutions for every animal sector.
          </p>
        </div>

        <Swiper
          className="sectors-swiper"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {sectors.map(({ bg, tag, title, sub }, i) => (
            <SwiperSlide key={i}>
              <a href="#" className="sector-card" onClick={(e) => e.preventDefault()}>
                <div className="sector-card-bg" style={{ backgroundImage: `url(${bg})` }} />
                <div className="sector-card-overlay" />
                <div className="sector-card-content">
                  <span className="sector-card-tag">{tag}</span>
                  <h3 className="sector-card-title">{title}</h3>
                  <p className="sector-card-sub">{sub}</p>
                  <span className="sector-card-btn">
                    Explore <i className="bi bi-arrow-right" />
                  </span>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
