import React, { useState } from 'react';

const faqs = [
  {
    q: 'What quality certifications does VEDVET hold?',
    a: 'VEDVET holds HALAL, GMO, ISO 9001, ISO 22000, FAMI-QS, GMP, and HACCP certifications, reflecting our commitment to quality, safety, and international regulatory standards across our product range.',
  },
  {
    q: 'Which countries does VEDVET currently export to?',
    a: 'VEDVET currently exports to 20 countries worldwide, including Taiwan, the Philippines, Nepal, Bangladesh, Sri Lanka, Myanmar, Jordan, Iraq, Algeria, Iran, Brazil, Russia, Serbia, Hungary, Italy, Romania, Egypt, Vietnam, the Netherlands, and the UAE.',
  },
  {
    q: 'Which animal health segments and species does VEDVET serve?',
    a: 'We serve the poultry, swine, livestock, aquaculture, and pet (companion animal) segments, offering a portfolio tailored to the specific health needs of each category.',
  },
  {
    q: 'Can we request samples before placing a commercial order?',
    a: 'We regularly participate in international trade exhibitions, where prospective buyers are welcome to view our products firsthand and discuss requirements directly with our team in person.',
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const header = document.querySelector('.site-header') as HTMLElement;
      const offset = header ? header.offsetHeight : 80;
      window.scrollTo({ top: el.offsetTop - offset + 4, behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container-wide">
        <div className="faq-grid">
          {/* Left col */}
          <div className="faq-sticky" data-aos="fade-up">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Questions?<br />We've Got<br />Answers.</h2>
            <p className="section-subtitle" style={{ marginBottom: 32 }}>
              Everything you need to know about VEDVET's products and services.
            </p>
            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="btn-dark">
              Contact Support <i className="bi bi-arrow-right" />
            </a>
          </div>

          {/* FAQ items */}
          <div className="faq-list" data-aos="fade-up">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? ' open' : ''}`}
              >
                <div
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <span className="faq-icon">
                    <i className="bi bi-plus-lg" />
                  </span>
                </div>
                <div className="faq-answer">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
