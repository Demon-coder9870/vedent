import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import CtaSection from '../../components/ctaSection/CtaSection';

const principles = [
  { title: 'Partnership', icon: 'bi-handshake', desc: 'Our customers, suppliers, and employees are our partners. We build long-term, trustful, and therefore productive relationships with all of them.', img: '/images/hero.jpg' },
  { title: 'Quality', icon: 'bi-award', desc: "Maintaining the high quality of our products and services is every employee's responsibility.", img: '/images/about.jpg' },
  { title: 'Innovation', icon: 'bi-lightbulb', desc: 'Continuous improvement and innovation are central to our goals, driving the economic success of both our customers and our company.', img: '/images/about_hero_portrait_1789905073068.jpg' },
  { title: 'Respect & Teamwork', icon: 'bi-people', desc: 'We champion international, process-oriented teamwork and respect cultural differences across our worldwide operations. We treat every human being with dignity and respect.', img: '/images/about_journey_1789905102059.jpg' },
  { title: 'Compliance', icon: 'bi-shield-check', desc: 'We adhere to all relevant legal rules, regulations, and requirements, ensuring the highest safety standards for our products and services.', img: '/images/about_beginning_1789905087984.jpg' },
  { title: 'Ethics', icon: 'bi-heart', desc: 'We hold ourselves to strong ethical principles in every dealing, acting with appropriate and good conduct in all situations.', img: '/images/livestock.jpg' },
  { title: 'Confidentiality', icon: 'bi-lock', desc: 'We protect our know-how, business practices, and trade secrets.', img: '/images/swine.jpg' },
  { title: 'Resource Stewardship', icon: 'bi-recycle', desc: 'We are committed to managing economic, environmental, and social resources carefully and efficiently.', img: '/images/aqua.jpg' },
  { title: 'Environmental Responsibility', icon: 'bi-tree', desc: 'We voluntarily commit to reducing our contribution to global warming and its associated threats.', img: '/images/poultry.jpg' },
  { title: 'Code of Conduct', icon: 'bi-journal-check', desc: "We uphold and commit ourselves to the principles outlined in our company's code of conduct.", img: '/images/pets.jpg' },
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
        <title>What We Do | VEDVET</title>
        <meta name="description" content="VEDVET develops and produces premium-quality feed additives and premixes to improve animal performance." />
      </Head>

      <Header />

      <PageHeader
        title="What We Do"
        breadcrumbs={breadcrumbs}
        bgImage="/images/what_we_do_hero_1789905138747.jpg"
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
                  <div className="wwd-stat"><span className="wwd-stat-num">10+</span><span className="wwd-stat-label">Years Experience</span></div>
                  <div className="wwd-stat"><span className="wwd-stat-num">20</span><span className="wwd-stat-label">Countries Served</span></div>
                  <div className="wwd-stat"><span className="wwd-stat-num">8+</span><span className="wwd-stat-label">Certifications</span></div>
                </div>
              </div>
              <div className="wwd-intro-image" data-aos="fade-left">
                <img src="/images/what_we_do_hero_1789905138747.jpg" alt="What We Do" />
                <div className="wwd-intro-image-badge">
                  <i className="bi bi-patch-check-fill" />
                  <span>WHO Certified</span>
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
