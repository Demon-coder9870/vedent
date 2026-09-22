import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import CtaSection from '../components/ctaSection/CtaSection';

const faqs = [
  {
    category: 'Company & Operations',
    items: [
      { q: 'What quality certifications does VEDVET hold?', a: 'VEDVET holds HALAL, GMO, ISO 9001, ISO 22000, FAMI-QS, GMP, HACCP, and WHO certifications, reflecting our commitment to quality, safety, and international regulatory standards across our product range.' },
      { q: 'Which countries does VEDVET currently export to?', a: 'VEDVET currently exports to 20 countries worldwide, including Taiwan, the Philippines, Nepal, Bangladesh, Sri Lanka, Myanmar, Jordan, Iraq, Algeria, Iran, Brazil, Russia, Serbia, Hungary, Italy, Romania, Egypt, Vietnam, the Netherlands, and the UAE.' },
    ]
  },
  {
    category: 'Products & Segments',
    items: [
      { q: 'Which animal health segments and species does VEDVET serve?', a: 'We serve the poultry, swine, livestock, aquaculture, and pet (companion animal) segments, offering a portfolio tailored to the specific health needs of each category.' },
      { q: 'Can we request samples before placing a commercial order?', a: 'We regularly participate in international trade exhibitions, where prospective buyers are welcome to view our products firsthand and discuss requirements directly with our team in person.' },
    ]
  }
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/#hero' },
    { label: 'FAQ' }
  ];

  return (
    <>
      <Head>
        <title>FAQ | VEDVET</title>
        <meta name="description" content="Frequently Asked Questions about VEDVET's services, products, and support." />
      </Head>

      <Header />
      
      <PageHeader 
        title="Frequently Asked Questions" 
        breadcrumbs={breadcrumbs} 
        bgImage="/images/hero.jpg" 
      />

      <main className="faq-page-main">
        <section className="about-section-pad" style={{ backgroundColor: '#fdfdfd' }}>
          <div className="container-wide">
            
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span className="section-label" data-aos="fade-up" style={{ justifyContent: 'center' }}>Support Center</span>
              <h2 className="section-title" data-aos="fade-up">How can we help you?</h2>
              <p className="section-subtitle" style={{ maxWidth: '600px', margin: '20px auto 0' }} data-aos="fade-up">
                Browse through our most frequently asked questions across different categories to find exactly what you're looking for.
              </p>
            </div>

            <div className="faq-page-container">
              {faqs.map((category, cIdx) => (
                <div key={cIdx} className="faq-category-block" data-aos="fade-up" style={{ transitionDelay: `${cIdx * 0.1}s` }}>
                  <h3 className="faq-category-title">{category.category}</h3>
                  <div className="faq-list-clean">
                    {category.items.map(({ q, a }, i) => {
                      const id = `${cIdx}-${i}`;
                      const isOpen = openFaq === id;
                      return (
                        <div key={i} className={`faq-item-clean ${isOpen ? 'open' : ''}`}>
                          <div className="faq-question-clean" onClick={() => toggleFaq(id)}>
                            <span>{q}</span>
                            <span className="faq-icon-clean">
                              <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`} />
                            </span>
                          </div>
                          <div className="faq-answer-clean">
                            <p>{a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <CtaSection />

      <Footer />
    </>
  );
}
