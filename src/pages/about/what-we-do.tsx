import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import CtaSection from '../../components/ctaSection/CtaSection';
import { getCanonicalUrl } from '../../data/seoConfig';
import { getAboutPageSchema } from '../../data/schemaConfig';

const principles = [
  { title: 'Partnership', icon: 'bi-handshake', desc: 'Our customers, suppliers, and employees are our partners. We build long-term, trustful, and therefore productive relationships with all of them.', img: '/images/what-we-do/Partnership.jpg' },
  { title: 'Quality', icon: 'bi-award', desc: "Maintaining the high quality of our products and services is every employee's responsibility.", img: '/images/what-we-do/Quality.jpg' },
  { title: 'Innovation', icon: 'bi-lightbulb', desc: 'Continuous improvement and innovation are central to our goals, driving the economic success of both our customers and our company.', img: '/images/what-we-do/Innovation.jpg' },
  { title: 'Respect & Teamwork', icon: 'bi-people', desc: 'We champion international, process-oriented teamwork and respect cultural differences across our worldwide operations. We treat every human being with dignity and respect.', img: '/images/what-we-do/Teamwork.jpg' },
  { title: 'Compliance', icon: 'bi-shield-check', desc: 'We adhere to all relevant legal rules, regulations, and requirements, ensuring the highest safety standards for our products and services.', img: '/images/what-we-do/Compliance.jpg' },
  { title: 'Ethics', icon: 'bi-heart', desc: 'We hold ourselves to strong ethical principles in every dealing, acting with appropriate and good conduct in all situations.', img: '/images/what-we-do/Ethics.jpg' },
  { title: 'Confidentiality', icon: 'bi-lock', desc: 'We protect our know-how, business practices, and trade secrets.', img: '/images/what-we-do/Confidentiality.jpg' },
  { title: 'Resource Stewardship', icon: 'bi-recycle', desc: 'We are committed to managing economic, environmental, and social resources carefully and efficiently.', img: '/images/what-we-do/Resource Stewardship.jpg' },
  { title: 'Environmental Responsibility', icon: 'bi-tree', desc: 'We voluntarily commit to reducing our contribution to global warming and its associated threats.', img: '/images/what-we-do/Enviromental Responsibilty.jpg' },
  { title: 'Code of Conduct', icon: 'bi-journal-check', desc: "We uphold and commit ourselves to the principles outlined in our company's code of conduct.", img: '/images/what-we-do/Code of Conduct.jpg' },
];

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(0);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/who-we-are' },
    { label: 'What We Do' },
  ];

  return (
    <>
      <Head>
        <title>What We Do | Veterinary Formulations & Operations | VEDVET</title>
        <meta name="description" content="VEDVET develops and manufactures premium veterinary feed additives, premixes, and herbal solutions across 18+ countries with GMP-certified excellence." />
        <link rel="canonical" href={getCanonicalUrl('/about/what-we-do')} key="canonical" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getAboutPageSchema(
                'What We Do | Veterinary Formulations & Operations | VEDVET',
                'VEDVET develops and manufactures premium veterinary feed additives, premixes, and herbal solutions across 18+ countries with GMP-certified excellence.',
                getCanonicalUrl('/about/what-we-do'),
                breadcrumbs
              )
            ),
          }}
        />
      </Head>

      <Header />

      <PageHeader
        title="What We Do"
        breadcrumbs={breadcrumbs}
      />

      <main style={{ backgroundColor: '#f9f9fc' }}>

        {/* ── INTRO BANNER ──────────────────────────────────── */}
        <section className="wwd-intro-banner">
          <div className="container-wide">
            <div className="wwd-intro-grid">
              <div className="wwd-intro-text" data-aos="fade-right">
                <span className="section-label">Our Operations</span>
                <h2 className="section-title">Driving Growth<br />Through <span className="accent">Innovation.</span></h2>
                <p className="wwd-intro-lead">
                  VEDVET develops and produces premium-quality feed additives and premixes to improve animal performance in an economically viable way. Our product range spans the full spectrum of animal health — from time-tested herbal treatment practices to the latest advances in veterinary science.
                </p>
                <div className="wwd-stats-row">
                  <div className="wwd-stat"><span className="wwd-stat-num">12+</span><span className="wwd-stat-label">Years Experience</span></div>
                  <div className="wwd-stat"><span className="wwd-stat-num">18+</span><span className="wwd-stat-label">Countries Served</span></div>
                  <div className="wwd-stat"><span className="wwd-stat-num">6+</span><span className="wwd-stat-label">Certifications</span></div>
                </div>
              </div>
              <div className="wwd-intro-image" data-aos="fade-left">
                <img src="/images/what-we-do/Our Operations.jpg" alt="Our Operations" />
                <div className="wwd-intro-image-badge">
                  <i className="bi bi-patch-check-fill" />
                  <span>GMP Certified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION STATEMENT ─────────────────────────────── */}
        <section className="wwd-mission-strip">
          <div className="container-wide">
            <p className="wwd-mission-text" data-aos="fade-up">
              Our mission is to <strong>fulfill the expectations and requirements</strong> of our partners, customers, employees, shareholders, and suppliers.
            </p>
          </div>
        </section>

        {/* ── INTERACTIVE TABBED PRINCIPLES ─────────────────── */}
        <section className="about-section-pad" style={{ backgroundColor: '#fff' }}>
          <div className="container-wide">
            <div className="wwd-section-header" data-aos="fade-up">
              <div>
                <h2 className="section-title">Our Core Principles</h2>
                <div className="title-underline"></div>
              </div>
              <p className="section-subtitle" style={{ maxWidth: '500px', textAlign: 'right' }}>
                10 guiding principles that define how we work, innovate, and build lasting partnerships.
              </p>
            </div>

            <div className="principles-tab-container" data-aos="fade-up">
              <div className="principles-tab-sidebar">
                {principles.map((p, i) => (
                  <button
                    key={i}
                    className={`principles-tab-btn ${activeTab === i ? 'active' : ''}`}
                    onClick={() => setActiveTab(i)}
                  >
                    <span className="tab-num">{(i + 1).toString().padStart(2, '0')}</span>
                    <i className={`bi ${p.icon} tab-icon`} />
                    <span>{p.title}</span>
                  </button>
                ))}
              </div>
              <div className="principles-tab-content">
                {principles.map((p, i) => (
                  <div key={i} className={`principles-tab-pane ${activeTab === i ? 'active' : ''}`}>
                    <div className="principles-tab-img-wrap">
                      <img src={p.img} alt={p.title} className="principles-tab-img" />
                      <div className="principles-tab-img-overlay" />
                      <div className="principles-tab-img-label">
                        <i className={`bi ${p.icon}`} /> {p.title}
                      </div>
                    </div>
                    <div className="principles-tab-text">
                      <div className="principles-tab-num-large">{(i + 1).toString().padStart(2, '0')}</div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
