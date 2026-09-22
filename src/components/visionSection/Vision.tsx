import React from 'react';

export default function Vision() {
  return (
    <section id="vision" className="vision-section section-pad">
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: 60 }} data-aos="fade-up">
          <span className="section-label" style={{ justifyContent: 'center' }}>VEDVET Vision</span>
          <h2 className="section-title">Our Vision in Action</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            See how we are transforming animal healthcare and bringing our expertise to the world.
          </p>
        </div>
        <div className="vision-grid">
          <div className="vision-main-video" data-aos="fade-up">
            <iframe 
              src="https://www.youtube.com/embed/J5xIneVJnwA" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="vision-sub-videos">
            <div className="vision-sub-video" data-aos="fade-up" data-aos-delay="100">
              <iframe 
                src="https://www.youtube.com/embed/vWxs4Nl3r0Q?start=68" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="vision-sub-video" data-aos="fade-up" data-aos-delay="200">
              <iframe 
                src="https://www.youtube.com/embed/vWxs4Nl3r0Q?start=68" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
