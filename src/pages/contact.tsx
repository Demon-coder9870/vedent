import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import CtaSection from '../components/ctaSection/CtaSection';

const processSteps = [
  {
    num: '1',
    title: 'We Connect',
    desc: "Reach out to us via email, phone, or even social media, whatever works best for you. From there, we'll take the time to understand your needs in detail and figure out the right way forward together."
  },
  {
    num: '2',
    title: 'We Finalize',
    desc: 'Once your needs are understood, we take care of the paperwork and all the formalities — so the fine print never gets in the way of a relationship built to last well beyond this deal.'
  },
  {
    num: '3',
    title: 'We Cook',
    desc: "With our expertise and deep industry knowledge, we fulfill your order precisely as needed, upholding the same uncompromising standards of quality and quantity you've come to expect from us."
  },
  {
    num: '4',
    title: 'We Deliver',
    desc: 'After the entire journey, we make sure your order reaches you safely, securely, and right on time.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const breadcrumbs = [
    { label: 'Home', href: '/#hero' },
    { label: 'Contact Us' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Mailto action as there is no backend mentioned. This opens the user's default email client.
    window.location.href = `mailto:info@vedvet.com?subject=Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
  };

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
        {/* Contact Form & Direct Contact */}
        <section className="about-section-pad" style={{ backgroundColor: '#fdfdfd' }}>
          <div className="container-wide">
            
            <div className="contact-page-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', alignItems: 'start' }}>
              
              {/* Left Column: Form */}
              <div className="contact-form-col" data-aos="fade-right">
                <div style={{ marginBottom: '40px' }}>
                  <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Send us a Message</h2>
                  <p className="section-subtitle" style={{ margin: 0 }}>
                    We'd love to hear from you — reach out with questions, queries, or if you are interested and want to start a conversation.
                  </p>
                </div>
                
                <form className="modern-contact-form" onSubmit={handleSubmit}>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Name *</label>
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', fontFamily: 'var(--font-text)' }}
                    />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>E-Mail *</label>
                    <input 
                      type="email" 
                      placeholder="Your Email Address" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', fontFamily: 'var(--font-text)' }}
                    />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Message *</label>
                    <textarea 
                      rows={6} 
                      placeholder="Write your message here..." 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', resize: 'vertical', fontFamily: 'var(--font-text)' }}
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message <i className="bi bi-send" />
                  </button>
                </form>
              </div>
              
              {/* Right Column: Direct Contact */}
              <div className="contact-info-col" data-aos="fade-left">
                <div className="direct-contact-card" style={{ background: 'var(--white)', padding: '50px 40px', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '35px', fontFamily: 'var(--font-heading)' }}>Prefer Direct Contact?</h3>
                  
                  <div className="contact-info-item" style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'flex-start' }}>
                    <div className="contact-info-icon" style={{ fontSize: '1.5rem', color: 'var(--lime)', background: 'var(--lime-light)', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}><i className="bi bi-geo-alt-fill" /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Head Office</h4>
                      <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                        2nd Floor, Maya Plaza, Court Road,<br/>Saharanpur, Uttar Pradesh, INDIA
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item" style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'flex-start' }}>
                    <div className="contact-info-icon" style={{ fontSize: '1.5rem', color: 'var(--lime)', background: 'var(--lime-light)', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}><i className="bi bi-envelope-fill" /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Email</h4>
                      <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                        <a href="mailto:info@vedvet.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@vedvet.com</a><br/>
                        <a href="mailto:amit@vedvet.com" style={{ color: 'inherit', textDecoration: 'none' }}>amit@vedvet.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item" style={{ display: 'flex', gap: '20px', marginBottom: '40px', alignItems: 'flex-start' }}>
                    <div className="contact-info-icon" style={{ fontSize: '1.5rem', color: 'var(--lime)', background: 'var(--lime-light)', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}><i className="bi bi-telephone-fill" /></div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Phone</h4>
                      <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>+91 999 77 148 00</p>
                    </div>
                  </div>
                  
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '30px' }}>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Connect With Us</h4>
                    <div className="announce-socials" style={{ gap: '15px', display: 'flex' }}>
                      <a href="https://www.instagram.com/ved_vet/" className="contact-social-link" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }} aria-label="Instagram"><i className="bi bi-instagram" /></a>
                      <a href="https://www.facebook.com/p/Vedvet-Animal-Health-Private-Limited-100070798733935/" className="contact-social-link" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }} aria-label="Facebook"><i className="bi bi-facebook" /></a>
                      <a href="https://www.linkedin.com/in/ved-vet-604050422/" className="contact-social-link" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }} aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
                      <a href="https://x.com/ved_vet" className="contact-social-link" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }} aria-label="X"><i className="bi bi-twitter-x" /></a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* What's next? Section */}
        <section className="bg-pattern-dots" style={{ backgroundColor: '#f8fafc', padding: '100px 0' }}>
          <div className="container-wide">
            <div style={{ textAlign: 'center', marginBottom: '70px' }} data-aos="fade-up">
              <span className="section-label" style={{ justifyContent: 'center' }}>What's Next?</span>
              <h2 className="section-title">How we build together</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {processSteps.map((step, index) => (
                <div key={index} className="process-card" data-aos="fade-up" data-aos-delay={index * 100} style={{
                  background: 'var(--white)',
                  padding: '40px 30px',
                  borderRadius: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  transition: 'var(--transition)',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-10px',
                    fontSize: '140px',
                    fontWeight: 900,
                    color: 'var(--lime-light)',
                    lineHeight: 1,
                    fontFamily: 'var(--font-heading)',
                    zIndex: 0
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '20px', position: 'relative', zIndex: 1, color: 'var(--charcoal)', fontFamily: 'var(--font-heading)' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', position: 'relative', zIndex: 1, fontFamily: 'var(--font-text)' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Map Section */}
      <section className="map-section" style={{ width: '100%', height: '500px', backgroundColor: '#e5e7eb', marginTop: '0', display: 'flex' }}>
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&height=500&hl=en&q=Maya%20Plaza,%20Court%20Road,%20Saharanpur,%20Uttar%20Pradesh,%20India+(VEDVET%20Animal%20Health)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          style={{ border: 0, filter: 'contrast(1.05)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </>
  );
}
