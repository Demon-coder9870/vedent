import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import { getCanonicalUrl } from '@/data/seoConfig';
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, getHomepageFaqSchema } from '@/data/schemaConfig';

// Below-the-fold components dynamically code-split while preserving SSR for SEO & content integrity
const Counter = dynamic(() => import('@/components/home/Counter'));
const About = dynamic(() => import('@/components/home/About'));
const Sectors = dynamic(() => import('@/components/home/Sectors'));
const CoreCapabilities = dynamic(() => import('@/components/home/CoreCapabilities'));
const Vision = dynamic(() => import('@/components/home/Vision'));
const Faq = dynamic(() => import('@/components/home/Faq'));
const Certifications = dynamic(() => import('@/components/home/Certifications'));
const CtaSection = dynamic(() => import('@/components/home/CtaSection'));

export default function Home() {
  return (
    <>
      <Head>
        <title>Best Herbal Animal Feed Additives Exporter In Worldwide | vedvet</title>
        <meta name="description" content="VEDVET offers herbal veterinary solutions and animal feed additives that support gut health, immunity and nutrition in poultry and livestock worldwide." />
        <link rel="canonical" href={getCanonicalUrl('/')} key="canonical" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Mobile & Desktop LCP Discovery: Preload exact device version */}
        <link
          rel="preload"
          as="image"
          href="/images/slider/1-mobile.webp"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/images/slider/1.webp"
          media="(min-width: 769px)"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                ORGANIZATION_SCHEMA,
                WEBSITE_SCHEMA,
                getHomepageFaqSchema(),
              ],
            }),
          }}
        />
      </Head>

      <Header />

      <main>
        <Hero />
        <Counter />
        <About />
        <Sectors />
        <CoreCapabilities />
        <Vision />
        <Faq />
        <Certifications />
        <CtaSection />
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
