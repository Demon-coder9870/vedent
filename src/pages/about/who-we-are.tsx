import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import CtaSection from '../../components/ctaSection/CtaSection';

const milestones = [
  {
    year: 'Chapter 01',
    title: 'The Beginning',
    desc: 'Our story began over 12 years ago, when a young entrepreneur with a long-term vision recognized an opportunity in this industry and made the decision to bring about real change. Within a few years, that vision took shape as VEDVET.',
    img: '/images/about_beginning_1789905087984.jpg',
  },
  {
    year: 'Chapter 02',
    title: 'The Journey',
    desc: 'From the outset, growth came through trial and error, with every setback treated not as a failure but as a lesson, and every lesson turned into a step forward. Today, we stand as a company that has spent years building products that help this industry grow and stay resilient.',
    img: '/images/about_journey_1789905102059.jpg',
  },
];

const values = [
  { icon: 'bi-heart-pulse', title: 'Animal Wellbeing', desc: 'Every solution we build starts with the health and wellbeing of the animals our customers care for.' },
  { icon: 'bi-patch-check', title: 'Certified Excellence', desc: 'ISO, GMP+, FAMI QS, HACCP, HALAL certified — our quality is validated at every level.' },
  { icon: 'bi-globe2', title: 'Global Reach', desc: 'Trusted across 20+ countries, building partnerships that span continents.' },
  { icon: 'bi-lightbulb', title: 'Scientific Rigor', desc: 'Combining scientific expertise with hands-on industry knowledge to deliver results.' },
];

export default function WhoWeAre() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/who-we-are' },
    { label: 'Who We Are' },
  ];

  return (
    <>
      <Head>
        <title>Who We Are | VEDVET</title>
        <meta name="description" content="Discover VEDVET's journey, beliefs, and our leadership." />
      </Head>

      <Header />

      <PageHeader
        title="Who We Are"
        breadcrumbs={breadcrumbs}
        bgImage="/images/about_hero_portrait_1789905073068.jpg"
      />

      <main style={{ backgroundColor: '#fdfdfd' }}>

        {/* ── INTRO SPLIT ───────────────────────────────────── */}
        <section className="wwa-intro">
          <div className="container-wide">
            <div className="wwa-intro-grid">
              <div className="wwa-intro-image-col" data-aos="fade-right">
                <div className="wwa-intro-img-wrap">
                  <img src="/images/about_hero_portrait_1789905073068.jpg" alt="VEDVET Team" />
                  <div className="wwa-intro-img-badge">
                    <i className="bi bi-stars" />
                    <div>
                      <span className="wwa-badge-num">12+</span>
                      <span className="wwa-badge-label">Years of Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wwa-intro-text-col" data-aos="fade-left">
                <span className="section-label">Our Identity</span>
                <h2 className="section-title">A Specialist in<br /><span className="accent">Premium Animal Health.</span></h2>
                <p className="wwa-intro-lead">
                  VEDVET is a specialist in premium feed additives and veterinary products, backed by 12+ years of rich industry experience. We are dedicated to developing innovative, sustainable solutions that drive our customers' success through consistently high-quality products.
                </p>
                <p className="wwa-intro-body">
                  Our approach begins with a deep understanding of our customers' needs and concerns — this customer-first principle shapes every solution we deliver. By combining scientific rigor with hands-on expertise, we help our partners support animal health, optimize performance, and improve production efficiency, ensuring long-term value at every stage of the process.
                </p>
                <div className="wwa-values-mini-grid">
                  {values.map((v, i) => (
                    <div key={i} className="wwa-value-chip" data-aos="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <i className={`bi ${v.icon}`} />
                      <span>{v.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES STRIP ─────────────────────────────── */}
        <section className="wwa-values-strip">
          <div className="container-wide">
            <div className="wwa-values-row">
              {values.map((v, i) => (
                <div key={i} className="wwa-values-card" data-aos="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="wwa-values-icon"><i className={`bi ${v.icon}`} /></div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STORY TIMELINE ────────────────────────────────── */}
        <section className="about-timeline-section bg-pattern-dots">
          <div className="container-wide">
            <div className="wwd-section-header" data-aos="fade-up" style={{ marginBottom: '70px' }}>
              <div>
                <h2 className="section-title">Our Story</h2>
                <div className="title-underline"></div>
              </div>
              <p className="section-subtitle" style={{ maxWidth: '400px', textAlign: 'right' }}>
                A journey built on passion, persistence, and a relentless pursuit of quality.
              </p>
            </div>

            <div className="timeline-container">
              <div className="timeline-track" />
              {milestones.map((m, i) => (
                <div key={i} className="timeline-node" data-aos="fade-up">
                  <div className="timeline-dot" />
                  {i % 2 === 0 ? (
                    <>
                      <div className="timeline-content left">
                        <span className="timeline-chapter">{m.year}</span>
                        <h3 className="timeline-title">{m.title}</h3>
                        <p className="timeline-desc">{m.desc}</p>
                      </div>
                      <div className="timeline-image right">
                        <img src={m.img} alt={m.title} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="timeline-image left">
                        <img src={m.img} alt={m.title} />
                      </div>
                      <div className="timeline-content right">
                        <span className="timeline-chapter">{m.year}</span>
                        <h3 className="timeline-title">{m.title}</h3>
                        <p className="timeline-desc">{m.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARALLAX QUOTE ────────────────────────────────── */}
        <section className="about-parallax-quote">
          <div className="parallax-overlay" />
          <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
            <div className="quote-content" data-aos="zoom-in">
              <i className="bi bi-quote quote-icon-large" />
              <h2>"People don't care how much you know until they know how much you care."</h2>
              <p>
                VEDVET is not just a veterinary company — it is a place where relationships are built before business deals are signed, and where our customers and the animal industry are valued as much as our own principles.
              </p>
            </div>
          </div>
        </section>

        {/* ── CEO SPOTLIGHT ─────────────────────────────────── */}
        <section className="about-ceo-spotlight bg-pattern-dots">
          <div className="container-wide">
            <div className="wwd-section-header" data-aos="fade-up" style={{ marginBottom: '60px' }}>
              <div>
                <h2 className="section-title">Our Leadership</h2>
                <div className="title-underline"></div>
              </div>
            </div>
            <div className="ceo-card">
              <div className="ceo-image-wrapper" data-aos="fade-right">
                <div className="ceo-image-accent" />
                <img src="/images/about_ceo_1789905115681.jpg" alt="CEO Portrait" className="ceo-image" />
                <div className="ceo-name-tag">
                  <strong>Founder & CEO</strong>
                  <span>VEDVET Animal Health Pvt. Ltd.</span>
                </div>
              </div>
              <div className="ceo-text-wrapper" data-aos="fade-left">
                <span className="section-label">Leadership</span>
                <h3 className="section-title" style={{ marginBottom: '30px', fontSize: '2.2rem' }}>About Our CEO</h3>
                <div className="ceo-text-columns">
                  <p>A young, dynamic and successful businessman, our CEO brings over 22 years of veteran experience to the industry. His passion for understanding the benefits of herbs — for animals as well as humans — led to the creation of VEDVET ANIMAL HEALTH Private Limited.</p>
                  <p>An unwavering "never give up" attitude, paired with a positive outlook in every circumstance, has helped him steer both his life and the company toward sustained success.</p>
                  <p>His all-round expertise across sales, marketing, brand management, alliances and acquisitions has been instrumental in driving organizational growth, helping build VEDVET into one of the leading healthcare companies worldwide.</p>
                  <p>An inspirational leader, he has instilled strong values throughout the organization. He believes that every individual holds potential waiting to be unlocked, and he leads by example, acting as a role model for his team every day.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────── */}
        <CtaSection />

      </main>

      <Footer />
    </>
  );
}
