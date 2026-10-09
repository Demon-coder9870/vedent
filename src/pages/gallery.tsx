import React from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';

// Array of images for the gallery
const galleryImages = [
  { src: '/images/hero.jpg', alt: 'VedVet Facilities and Operations' },
  { src: '/images/products/digyved-plus.jpg', alt: 'Digyved Plus Product' },
  { src: '/images/products/vetvita-plus.jpg', alt: 'Vetvita Plus Product' },
  { src: '/images/products/herbovet-care.jpg', alt: 'Herbovet Care Product' },
  { src: '/images/livestock.jpg', alt: 'Livestock Healthcare' },
  { src: '/images/poultry.jpg', alt: 'Poultry Healthcare' },
  { src: '/images/aqua.jpg', alt: 'Aqua Healthcare' },
  { src: '/images/pets.jpg', alt: 'Pets Healthcare' },
  { src: '/images/swine.jpg', alt: 'Swine Healthcare' },
  { src: '/images/about.jpg', alt: 'About VedVet Team' },
  { src: '/images/about_hero_portrait_1789905073068.jpg', alt: 'VedVet Leadership' },
  { src: '/images/what_we_do_hero_1789905138747.jpg', alt: 'VedVet Laboratory and Testing' },
  { src: '/images/about_journey_1789905102059.jpg', alt: 'VedVet Journey' },
  { src: '/images/hero_poultry_1790180533602.jpg', alt: 'Poultry Farm Operations' },
  { src: '/images/hero_livestock_1790180518211.jpg', alt: 'Livestock Farm Operations' },
];

export default function GalleryPage() {
  const thirdIndex = Math.ceil(galleryImages.length / 3);
  const row1 = galleryImages.slice(0, thirdIndex);
  const row2 = galleryImages.slice(thirdIndex, thirdIndex * 2);
  const row3 = galleryImages.slice(thirdIndex * 2);

  return (
    <>
      <Head>
        <title>Gallery | VEDVET</title>
        <meta name="description" content="Explore the VedVet gallery featuring our state-of-the-art facilities, product range, and commitment to animal healthcare." />
      </Head>

      <Header />

      <PageHeader
        title="Our Gallery"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Gallery' }
        ]}
        bgImage="/images/hero_landscape_1790180703293.jpg"
      />

      <main className="gallery-section">
        <div className="container-wide">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
            <span className="section-label" style={{ justifyContent: 'center' }}>Visual Journey</span>
            <h2 className="section-title">Discover VedVet</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Browse through our collection of moments, products, and facilities that define our dedication to superior animal health.
            </p>
          </div>

          <div className="gallery-marquee-container">
            {/* Top Row: Left to Right */}
            <div className="gallery-marquee-row marquee-left-to-right">
              {[...row1, ...row1].map((img, index) => (
                <div 
                  key={`r1-${index}`} 
                  className="marquee-item" 
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>

            {/* Middle Row: Right to Left */}
            <div className="gallery-marquee-row marquee-right-to-left">
              {[...row2, ...row2].map((img, index) => (
                <div 
                  key={`r2-${index}`} 
                  className="marquee-item" 
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>

            {/* Bottom Row: Left to Right */}
            <div className="gallery-marquee-row marquee-left-to-right">
              {[...row3, ...row3].map((img, index) => (
                <div 
                  key={`r3-${index}`} 
                  className="marquee-item" 
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>



      <Footer />
    </>
  );
}
