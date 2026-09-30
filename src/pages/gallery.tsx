import React, { useState, useEffect, useCallback } from 'react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
  }, []);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev === null ? null : (prev === 0 ? galleryImages.length - 1 : prev - 1)));
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, closeLightbox, nextImage, prevImage]);

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

          <div className="masonry-grid">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className="masonry-item" 
                data-aos="fade-up" 
                data-aos-delay={(index % 3) * 100}
                onClick={() => openLightbox(index)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="masonry-overlay">
                  <i className="bi bi-arrows-fullscreen"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <div 
        className={`lightbox-modal ${selectedImageIndex !== null ? 'open' : ''}`}
        onClick={closeLightbox}
      >
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
            <i className="bi bi-x"></i>
          </button>
          
          <button className="lightbox-nav-btn lightbox-prev" onClick={prevImage} aria-label="Previous Image">
            <i className="bi bi-chevron-left"></i>
          </button>

          {selectedImageIndex !== null && (
            <img 
              src={galleryImages[selectedImageIndex].src} 
              alt={galleryImages[selectedImageIndex].alt} 
            />
          )}

          <button className="lightbox-nav-btn lightbox-next" onClick={nextImage} aria-label="Next Image">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
