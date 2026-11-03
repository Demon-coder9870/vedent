import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sectors = [
  { bg: '/images/poultry.webp', mob: '/images/poultry-mobile.webp', tag: 'Poultry', title: 'Poultry', sub: 'Targeted wellness and nutrition for poultry farming.' },
  { bg: '/images/swine.webp', mob: '/images/swine-mobile.webp', tag: 'Swine', title: 'Swine', sub: 'Advanced health solutions for swine management and care.' },
  { bg: '/images/livestock.webp', mob: '/images/livestock-mobile.webp', tag: 'Livestock', title: 'Livestock', sub: 'Comprehensive healthcare products for healthy livestock.' },
  { bg: '/images/aqua_fish.webp', mob: '/images/aqua_fish-mobile.webp', tag: 'Aqua', title: 'Aqua', sub: 'Premium solutions for aquaculture health and growth.' },
  { bg: '/images/pets.webp', mob: '/images/pets-mobile.webp', tag: 'Pets', title: 'Pets', sub: 'Complete health management solutions for your loyal companions.' },
];

export default function Sectors() {
  return (
    <section id="sectors" className="sectors-section" style={{ position: 'relative' }}>
      <div className="container-wide">
        <div className="sectors-header" data-aos="fade-up">
          <span className="section-label">Our Range</span>
          <h2 className="section-title">
            Animal Healthcare<br />Across every sector
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.5)', margin: '0 auto' }}>
            From Poultry to Pets — dedicated, specialized solutions for every animal sector.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <Swiper
            className="sectors-swiper"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: '.sectors-swiper-prev',
              nextEl: '.sectors-swiper-next',
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {sectors.map(({ bg, mob, tag, title, sub }, i) => (
              <SwiperSlide key={i}>
                <Link href={`/products/${title.toLowerCase()}`} className="sector-card" prefetch={false}>
                  <div className="sector-card-bg">
                    <picture>
                      <source media="(max-width: 768px)" srcSet={mob} />
                      <img
                        src={bg}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                        }}
                      />
                    </picture>
                  </div>
                  <div className="sector-card-overlay" />
                  <div className="sector-card-content">
                    <span className="sector-card-tag">{tag}</span>
                    <h3 className="sector-card-title">{title}</h3>
                    <p className="sector-card-sub">{sub}</p>
                    <span className="sector-card-btn">
                      Explore <i className="bi bi-arrow-right" />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="sectors-swiper-prev hero-swiper-prev" aria-label="Previous Sector Slide">
            <i className="bi bi-chevron-left" />
          </button>
          <button className="sectors-swiper-next hero-swiper-next" aria-label="Next Sector Slide">
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
