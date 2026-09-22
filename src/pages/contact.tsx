import React from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import CtaSection from '../components/ctaSection/CtaSection';

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/#hero' },
    { label: 'Contact Us' }
  ];

  return (
    <>
      <Head>
        <title>Contact Us | VEDVET</title>
        <meta name="description" content="Get in touch with VEDVET for premium animal healthcare solutions." />
      </Head>

      <Header />
      
      <PageHeader 
        title="Contact Us" 
        breadcrumbs={breadcrumbs} 
        bgImage="/images/hero.jpg" 
      />

      <main>
        <section className="about-section-pad" style={{ backgroundColor: '#fdfdfd' }}>
          <div className="container-wide">
            
            <div className="contact-page-grid">
              
              {/* Left Column: Form */}
              <div className="contact-form-col" data-aos="fade-right">
                <div style={{ marginBottom: '40px' }}>
                  <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Send us a Message</h2>
                  <p className="section-subtitle" style={{ margin: 0 }}>
                    Have questions about our products or want to become a distributor? Fill out the form below and our team will get back to you shortly.
                  </p>
                </div>
                
                <form className="modern-contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input type="text" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="How can we help?" />
                  </div>
                  
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea rows={6} placeholder="Write your message here..." required></textarea>
                  </div>
                  
                  <button type="submit" className="btn-lime" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message <i className="bi bi-send" />
                  </button>
                </form>
              </div>
              
              {/* Right Column: Info */}
              <div className="contact-info-col" data-aos="fade-left">
                <div className="contact-info-card">
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '30px' }}>Contact Information</h3>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><i className="bi bi-geo-alt" /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Head Office</h4>
                      <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>2nd Floor, Maya Plaza, Court Road,<br/>Saharanpur, Uttar Pradesh, INDIA</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><i className="bi bi-envelope" /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Email Us</h4>
                      <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                        Business: <a href="mailto:info@vedvet.com" style={{ color: 'var(--lime-dark)', textDecoration: 'none' }}>info@vedvet.com</a><br/>
                        Marketing: <a href="mailto:amit@vedvet.com" style={{ color: 'var(--lime-dark)', textDecoration: 'none' }}>amit@vedvet.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><i className="bi bi-telephone" /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Call Us</h4>
                      <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>+91 999 77 148 00</p>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px' }}>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Follow Us</h4>
                    <div className="announce-socials" style={{ gap: '15px' }}>
                      <a href="https://www.facebook.com/p/Vedvet-Animal-Health-Private-Limited-100070798733935/" className="contact-social-link"><i className="bi bi-facebook" /></a>
                      <a href="https://x.com/ved_vet" className="contact-social-link"><i className="bi bi-twitter-x" /></a>
                      <a href="https://www.linkedin.com/in/ved-vet-604050422/" className="contact-social-link"><i className="bi bi-linkedin" /></a>
                      <a href="https://www.instagram.com/ved_vet/" className="contact-social-link"><i className="bi bi-instagram" /></a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <CtaSection />

      <Footer />
    </>
  );
}
