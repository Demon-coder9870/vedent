import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { getCanonicalUrl } from '@/data/seoConfig';

// Array of images for the gallery - converted to high-performance WebP
const highlightsImages = [
  { src: '/images/highlights/05.webp', alt: 'Gallery Image 5' },
  { src: '/images/highlights/06.webp', alt: 'Gallery Image 6' },
  { src: '/images/highlights/07.webp', alt: 'Gallery Image 7' },
  { src: '/images/highlights/08.webp', alt: 'Gallery Image 8' },
  { src: '/images/highlights/09.webp', alt: 'Gallery Image 9' },
  { src: '/images/highlights/10.webp', alt: 'Gallery Image 10' },
  { src: '/images/highlights/11.webp', alt: 'Gallery Image 11' },
  { src: '/images/highlights/12.webp', alt: 'Gallery Image 12' },
  { src: '/images/highlights/13.webp?v=2', alt: 'Gallery Image 13' },
  { src: '/images/highlights/14.webp?v=2', alt: 'Gallery Image 14' },
  { src: '/images/highlights/15.webp', alt: 'Gallery Image 15' },
  { src: '/images/highlights/16.webp?v=2', alt: 'Gallery Image 16' },
  { src: '/images/highlights/17.webp?v=2', alt: 'Gallery Image 17' },
  { src: '/images/highlights/18.webp?v=2', alt: 'Gallery Image 18' },
  { src: '/images/highlights/19.webp', alt: 'Gallery Image 19' },
  { src: '/images/highlights/20.webp', alt: 'Gallery Image 20' },
  { src: '/images/highlights/21.webp', alt: 'Gallery Image 21' },
  { src: '/images/highlights/22.webp', alt: 'Gallery Image 22' },
  { src: '/images/highlights/23.webp', alt: 'Gallery Image 23' },
  { src: '/images/highlights/24.webp?v=2', alt: 'Gallery Image 24' },
  { src: '/images/highlights/25.webp?v=2', alt: 'Gallery Image 25' },
  { src: '/images/highlights/26.webp', alt: 'Gallery Image 26' },
  { src: '/images/highlights/27.webp', alt: 'Gallery Image 27' },
  { src: '/images/highlights/28.webp', alt: 'Gallery Image 28' },
  { src: '/images/highlights/29.webp?v=2', alt: 'Gallery Image 29' },
  { src: '/images/highlights/30.webp?v=2', alt: 'Gallery Image 30' },
  { src: '/images/highlights/31.webp', alt: 'Gallery Image 31' },
  { src: '/images/highlights/32.webp', alt: 'Gallery Image 32' },
  { src: '/images/highlights/33.webp', alt: 'Gallery Image 33' },
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
        <link rel="canonical" href={getCanonicalUrl('/highlights')} key="canonical" />
      </Head>

      <Header />

      <PageHeader
        title="Event Highlights"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Highlights' },
        ]}
      />

      <main className="highlights-page-section">
        <div className="container-wide">
          <div className="highlights-header" data-aos="fade-up">
            <span className="section-label">Moments &amp; Milestones</span>
            <h2 className="section-title">A Visual Journey Through Our Work</h2>
            <div className="title-underline" style={{ margin: '0 auto' }}></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Witness our state-of-the-art manufacturing facilities, laboratory operations, high-grade packaging lines, and dedicated healthcare professionals making a difference every day.
            </p>
          </div>

          <div className="highlights-marquee-container">
            {/* Top Row: Left to Right */}
            <div className="highlights-marquee-row marquee-left-to-right">
              {[...row1, ...row1].map((img, index) => (
                <div key={`r1-${index}`} className="marquee-item">
                  <img src={img.src} alt={img.alt} width={240} height={180} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>

            {/* Middle Row: Right to Left */}
            <div className="highlights-marquee-row marquee-right-to-left">
              {[...row2, ...row2].map((img, index) => (
                <div key={`r2-${index}`} className="marquee-item">
                  <img src={img.src} alt={img.alt} width={240} height={180} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>

            {/* Bottom Row: Left to Right */}
            <div className="highlights-marquee-row marquee-left-to-right">
              {[...row3, ...row3].map((img, index) => (
                <div key={`r3-${index}`} className="marquee-item">
                  <img src={img.src} alt={img.alt} width={240} height={180} loading="lazy" decoding="async" />
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
