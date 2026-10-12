import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/layout/PageHeader';
import CtaSection from '../../components/ctaSection/CtaSection';

const principles = [
  { title: 'Partnership', icon: 'bi-handshake', desc: 'Our customers, suppliers, and employees are our partners. We build long-term, trustful, and therefore productive relationships with all of them.', img: '/images/It-Customers.jpg' },
  { title: 'Quality', icon: 'bi-award', desc: "Maintaining the high quality of our products and services is every employee's responsibility.", img: '/images/Premium-Quality.jpg' },
  { title: 'Innovation', icon: 'bi-lightbulb', desc: 'Continuous improvement and innovation are central to our goals, driving the economic success of both our customers and our company.', img: '/images/Innovation.jpg' },
  { title: 'Respect & Teamwork', icon: 'bi-people', desc: 'We champion international, process-oriented teamwork and respect cultural differences across our worldwide operations. We treat every human being with dignity and respect.', img: '/images/Distribution-Network.jpg' },
  { title: 'Compliance', icon: 'bi-shield-check', desc: 'We adhere to all relevant legal rules, regulations, and requirements, ensuring the highest safety standards for our products and services.', img: '/images/the-beginning.jpg' },
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
                <img src="/images/what_we_do_hero_1789905138747.jpg" alt="What We Do" />
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

        {/* ── CORE PILLARS / OPERATIONS SHOWCASE ──────────────── */}
        <section className="about-section-pad" style={{ backgroundColor: '#f9f9fc', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container-wide">
            <div className="wwd-section-header" data-aos="fade-up" style={{ marginBottom: '50px' }}>
              <div>
                <span className="section-label">Core Capabilities</span>
                <h2 className="section-title">What Drives Our Work</h2>
                <div className="title-underline"></div>
              </div>
              <p className="section-subtitle" style={{ maxWidth: '500px', textAlign: 'right' }}>
                From world-class research and premium manufacturing to seamless global distribution and customer trust.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              {/* Card 1: Distribution Network */}
              <div className="wwd-pillar-card" data-aos="fade-up" data-aos-delay="100">
                <div className="wwd-pillar-img-wrap">
                  <img src="/images/Distribution-Network.jpg" alt="Distribution Network" className="wwd-pillar-img" />
                  <div className="wwd-pillar-badge"><i className="bi bi-truck" /> Global Reach</div>
                </div>
                <div className="wwd-pillar-body">
                  <h3>Distribution Network</h3>
                  <p>Seamless international logistics and distribution channels delivering veterinary healthcare products across 18+ countries efficiently.</p>
                </div>
              </div>

              {/* Card 2: Premium Quality */}
              <div className="wwd-pillar-card" data-aos="fade-up" data-aos-delay="200">
                <div className="wwd-pillar-img-wrap">
                  <img src="/images/Premium-Quality.jpg" alt="Premium Quality" className="wwd-pillar-img" />
                  <div className="wwd-pillar-badge"><i className="bi bi-shield-check" /> Certified</div>
                </div>
                <div className="wwd-pillar-body">
                  <h3>Premium Quality</h3>
                  <p>State-of-the-art laboratory testing, GMP manufacturing standards, and stringent quality assurance across every batch.</p>
                </div>
              </div>

              {/* Card 3: Innovation */}
              <div className="wwd-pillar-card" data-aos="fade-up" data-aos-delay="300">
                <div className="wwd-pillar-img-wrap">
                  <img src="/images/Innovation.jpg" alt="Research & Innovation" className="wwd-pillar-img" />
                  <div className="wwd-pillar-badge"><i className="bi bi-lightbulb" /> R&D Driven</div>
                </div>
                <div className="wwd-pillar-body">
                  <h3>Research & Innovation</h3>
                  <p>Continuous scientific research pioneering cutting-edge formulations that integrate herbal extracts with modern animal nutrition.</p>
                </div>
              </div>

              {/* Card 4: Customer Focus */}
              <div className="wwd-pillar-card" data-aos="fade-up" data-aos-delay="400">
                <div className="wwd-pillar-img-wrap">
                  <img src="/images/It-Customers.jpg" alt="Customer Partnership" className="wwd-pillar-img" />
                  <div className="wwd-pillar-badge"><i className="bi bi-people" /> Trusted</div>
                </div>
                <div className="wwd-pillar-body">
                  <h3>Customer & Partner Trust</h3>
                  <p>Dedicated to supporting veterinarians, farmers, and healthcare partners with personalized guidance and reliable animal healthcare solutions.</p>
                </div>
              </div>
            </div>
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
