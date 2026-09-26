import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/who-we-are' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && router.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        const header = document.querySelector('.site-header') as HTMLElement;
        const offset = header ? header.offsetHeight : 80;
        window.scrollTo({ top: el.offsetTop - offset + 4, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand" style={{ marginBottom: '20px' }}>
              <Image
                src="/images/vedvet-logo.png"
                alt="VedVet Logo"
                width={140}
                height={48}
                style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
              />
            </div>
            <p className="footer-desc">
              World-class veterinary healthcare solutions for modern animal care — trusted by veterinarians and farmers in 15+ countries.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/p/Vedvet-Animal-Health-Private-Limited-100070798733935/" aria-label="facebook" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook" /></a>
              <a href="https://x.com/ved_vet" aria-label="twitter-x" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter-x" /></a>
              <a href="https://www.linkedin.com/in/ved-vet-604050422/" aria-label="linkedin" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" /></a>
              <a href="https://www.instagram.com/ved_vet/" aria-label="instagram" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="footer-col-title">Quick Links</h5>
            <ul className="footer-links">
              {navItems.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} onClick={(e) => handleLinkClick(e, href)}>
                    <i className="bi bi-chevron-right" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Animal Healthcare */}
          <div>
            <h5 className="footer-col-title">Animal Healthcare</h5>
            <ul className="footer-links">
              {['Swine', 'Livestock', 'Poultry', 'Aqua', 'Pets'].map((s) => (
                <li key={s}>
                  <Link href="/#sectors" onClick={(e) => handleLinkClick(e, '/#sectors')}>
                    <i className="bi bi-chevron-right" /> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="footer-col-title">Contact</h5>
            <div className="footer-contact-item">
              <i className="bi bi-geo-alt" />
              <span>2nd Floor, Maya Plaza, Court Road, Saharanpur, Uttar Pradesh, INDIA</span>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-telephone" />
              <span>+91 999 77 148 00</span>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-envelope" />
              <span style={{ lineHeight: '1.6' }}>
                Business: <a href="mailto:info@vedvet.com" style={{ color: 'inherit' }}>info@vedvet.com</a><br />
                Marketing: <a href="mailto:amit@vedvet.com" style={{ color: 'inherit' }}>amit@vedvet.com</a>
              </span>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-clock" />
              <span>Mon – Sat: 9am – 6pm</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>VEDVET</span>. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              Designed by <a href="https://applaudwebmedia.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime-light)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--lime)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--lime-light)'}>Applaud Web Media Pvt Ltd</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
