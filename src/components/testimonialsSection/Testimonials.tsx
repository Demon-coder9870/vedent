import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    text: '"Their innovative joint supplements have fundamentally improved our senior dog\'s mobility. Remarkable results within just a few weeks."',
    name: 'Rajesh Sharma',
    role: 'Golden Retriever Parent, Maharashtra',
    init: 'RS',
  },
  {
    text: '"A trustworthy partner in veterinary healthcare. The quality of their care is consistent, reliable and always meets our clinic\'s stringent requirements."',
    name: 'Dr. Priya Nair',
    role: 'Veterinary Practitioner, Kerala',
    init: 'PN',
  },
  {
    text: '"VEDVET understands the real-world challenges of raising a high-energy breed. Their practical range of nutritional products is unmatched in quality."',
    name: 'Sunil Verma',
    role: 'German Shepherd Parent, Punjab',
    init: 'SV',
  },
  {
    text: '"Exceptional veterinary expertise and a genuinely compassionate approach to feline care. We\'ve been bringing our cats here for over 7 years now."',
    name: 'Anil Mathew',
    role: 'Cat Rescuer, Andhra',
    init: 'AM',
  },
  {
    text: '"The team at VEDVET is constantly ahead of the curve. Their innovations in herbal pet medicines have been a game changer for our sensitive pup."',
    name: 'Meena Gupta',
    role: 'Pet Parent, Delhi NCR',
    init: 'MG',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: 60 }} data-aos="fade-up">
          <span className="section-label" style={{ justifyContent: 'center' }}>Testimonials</span>
          <h2 className="section-title">Voices from the Field</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            What our clients say about the VEDVET difference.
          </p>
        </div>

        <Swiper
          className="testi-swiper"
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map(({ text, name, role, init }, i) => (
            <SwiperSlide key={i} style={{ height: 'auto' }}>
              <div className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"</p>
                <p className="testi-text">{text.replace(/^"|"$/g, '')}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{init}</div>
                  <div>
                    <div className="testi-name">{name}</div>
                    <div className="testi-role">{role}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
