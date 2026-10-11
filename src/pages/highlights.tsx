import React from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';

// Array of images for the gallery
const highlightsImages = [
  { src: '/images/highlights/05.jpeg', alt: 'Gallery Image 5' },
  { src: '/images/highlights/06.jpeg', alt: 'Gallery Image 6' },
  { src: '/images/highlights/07.jpeg', alt: 'Gallery Image 7' },
  { src: '/images/highlights/08.jpeg', alt: 'Gallery Image 8' },
  { src: '/images/highlights/09.jpeg', alt: 'Gallery Image 9' },
  { src: '/images/highlights/10.jpeg', alt: 'Gallery Image 10' },
  { src: '/images/highlights/11.jpeg', alt: 'Gallery Image 11' },
  { src: '/images/highlights/12.jpeg', alt: 'Gallery Image 12' },
  { src: '/images/highlights/13.jpg', alt: 'Gallery Image 13' },
  { src: '/images/highlights/14.jpg', alt: 'Gallery Image 14' },
  { src: '/images/highlights/15.jpg', alt: 'Gallery Image 15' },
  { src: '/images/highlights/16.jpg', alt: 'Gallery Image 16' },
  { src: '/images/highlights/17.jpg', alt: 'Gallery Image 17' },
  { src: '/images/highlights/18.jpg', alt: 'Gallery Image 18' },
  { src: '/images/highlights/19.jpg', alt: 'Gallery Image 19' },
  { src: '/images/highlights/20.jpg', alt: 'Gallery Image 20' },
  { src: '/images/highlights/21.jpg', alt: 'Gallery Image 21' },
  { src: '/images/highlights/22.jpg', alt: 'Gallery Image 22' },
  { src: '/images/highlights/23.jpg', alt: 'Gallery Image 23' },
  { src: '/images/highlights/24.jpg', alt: 'Gallery Image 24' },
  { src: '/images/highlights/25.jpg', alt: 'Gallery Image 25' },
  { src: '/images/highlights/26.jpg', alt: 'Gallery Image 26' },
  { src: '/images/highlights/27.jpg', alt: 'Gallery Image 27' },
  { src: '/images/highlights/28.jpg', alt: 'Gallery Image 28' },
  { src: '/images/highlights/29.jpg', alt: 'Gallery Image 29' },
  { src: '/images/highlights/30.jpg', alt: 'Gallery Image 30' },
  { src: '/images/highlights/31.jpg', alt: 'Gallery Image 31' },
  { src: '/images/highlights/32.jpg', alt: 'Gallery Image 32' },
  { src: '/images/highlights/33.jpg', alt: 'Gallery Image 33' },
];

export default function HighlightsPage() {
  const thirdIndex = Math.ceil(highlightsImages.length / 3);
  const row1 = highlightsImages.slice(0, thirdIndex);
  const row2 = highlightsImages.slice(thirdIndex, thirdIndex * 2);
  const row3 = highlightsImages.slice(thirdIndex * 2);

  return (
    <>
      <Head>
        <title>Event Highlights | VEDVET</title>
        <meta name="description" content="Explore the VedVet gallery featuring our state-of-the-art facilities, product range, and commitment to animal healthcare." />
      </Head>

      <Header />

      <PageHeader
        title="Event Highlights"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Highlights' }
        ]}
        bgImage="/images/our-identity.jpg"
      />

      <main className="highlights-section">
        <div className="container-wide">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
            <span className="section-label" style={{ justifyContent: 'center' }}>Visual Journey</span>
            <h2 className="section-title">Discover VedVet</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Browse through our collection of moments, products, and facilities that define our dedication to superior animal health.
            </p>
          </div>

          <div className="highlights-marquee-container">
            {/* Top Row: Left to Right */}
            <div className="highlights-marquee-row marquee-left-to-right">
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
            <div className="highlights-marquee-row marquee-right-to-left">
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
            <div className="highlights-marquee-row marquee-left-to-right">
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
