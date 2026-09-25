import React from 'react';
import Head from 'next/head';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/homeSection/Hero';
import Counter from '../components/homeSection/Counter';
import About from '../components/aboutSection/About';
import Sectors from '../components/sectorsSection/Sectors';
import Commitment from '../components/homeSection/Commitment';
import Vision from '../components/visionSection/Vision';
import Faq from '../components/faqSection/Faq';
import Certifications from '../components/homeSection/Certifications';
import Contact from '../components/contactSection/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>VEDVET | Veterinary Healthcare & Animal Health Solutions</title>
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Hero />
        <Counter />
        <About />
        <Sectors />
        <Commitment />
        <Vision />
        <Faq />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      {/* ── REVEAL ANIMATION STYLES ────────────────────── */}
      <style jsx global>{`
        /* AOS style simple reveal classes, integrated without external lib */
        [data-aos] {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-aos].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.4);
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 5px;
          background: var(--lime);
        }

        .hero-swiper-next,
        .hero-swiper-prev {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .hero-swiper-prev { left: 40px; }
        .hero-swiper-next { right: 40px; }
        
        .hero-swiper-prev:hover,
        .hero-swiper-next:hover {
          background: var(--lime);
          border-color: var(--lime);
          color: var(--charcoal);
        }

        .swiper-button-next,
        .swiper-button-prev {
          top: 50% !important;
        }

        @media (max-width: 768px) {
          .hero-swiper-prev,
          .hero-swiper-next {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
