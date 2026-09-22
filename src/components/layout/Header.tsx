import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const navItems = [
  { label: 'Home', href: '/#hero' },
  {
    label: 'About',
    dropdown: [
      { label: 'Who We Are', href: '/about/who-we-are' },
      { label: 'What We Do', href: '/about/what-we-do' },
    ],
  },
  { label: 'Services', href: '/#services' },
  { label: 'Industries', href: '/#sectors' },
  { label: 'FAQ', href: '/faq' },
];

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      if (router.pathname !== '/') return;

      const sections = ['hero', 'about', 'services', 'sectors', 'innovation', 'testimonials', 'faq', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      if (current) setActiveSection(current);
    };

    const onScroll = () => { handleScroll(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [router.pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && router.pathname === '/') {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        const header = document.querySelector('.site-header') as HTMLElement;
        const offset = header ? header.offsetHeight : 80;
        window.scrollTo({ top: el.offsetTop - offset + 4, behavior: 'smooth' });
      }
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────── */}
      <header className={`site-header${scrolled || router.pathname !== '/' ? ' scrolled' : ''}`}>
        {/* Announcement Bar */}
        <div className="announce-bar">
          <div className="container-wide">
            <div className="announce-inner">
              <span className="announce-badge"><i className="bi bi-stars" /> NEW</span>
              <span className="announce-text">Trusted by 10,000+ farmers &amp; veterinarians across 50+ countries</span>
              <div className="announce-right">
                <a href="mailto:info@vedvet.com" className="announce-link"><i className="bi bi-envelope-fill" /> info@vedvet.com</a>
                <span className="announce-divider" />
                <a href="tel:+919997714800" className="announce-link"><i className="bi bi-telephone-fill" /> +91 999 77 148 00</a>
                <span className="announce-divider" />
                <div className="announce-socials">
                  <a href="https://www.facebook.com/p/Vedvet-Animal-Health-Private-Limited-100070798733935/" aria-label="facebook" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook" /></a>
                  <a href="https://x.com/ved_vet" aria-label="twitter-x" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter-x" /></a>
                  <a href="https://www.linkedin.com/in/ved-vet-604050422/" aria-label="linkedin" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" /></a>
                  <a href="https://www.instagram.com/ved_vet/" aria-label="instagram" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="nav-wrapper">
          <div className="container-wide">
            <nav className="main-nav">

              {/* Brand */}
              <Link href="/#hero" onClick={(e) => handleLinkClick(e, '/#hero')} className="nav-brand">
                <Image
                  src="/images/vedvet-logo.png"
                  alt="VedVet Logo"
                  width={140}
                  height={48}
                  style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
                  priority
                />
              </Link>

              {/* Desktop Links */}
              <ul className="nav-links">
                {navItems.map((item, i) => (
                  <li 
                    key={i} 
                    className="nav-item"
                    onMouseEnter={() => item.dropdown && setDropdownOpen(true)}
                    onMouseLeave={() => item.dropdown && setDropdownOpen(false)}
                  >
                    {item.dropdown ? (
                      <div className="nav-link" style={{ cursor: 'pointer' }}>
                        <span style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                          {item.label} <i className="bi bi-chevron-down" style={{ fontSize: '0.8em', marginLeft: 4, marginTop: 2 }} />
                        </span>
                        <span className="nav-link-bar" />
                        
                        {/* Dropdown Menu */}
                        <div className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`}>
                          {item.dropdown.map((subItem, j) => (
                            <Link key={j} href={subItem.href} className="dropdown-link">
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={(e) => handleLinkClick(e, item.href!)}
                        className={`nav-link${(router.pathname === '/' && activeSection === item.href?.replace('/#', '')) ? ' active' : ''}`}
                      >
                        {item.label}
                        <span className="nav-link-bar" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Right Actions */}
              <div className="nav-actions">
                <a href="tel:+919997714800" className="nav-phone">
                  <span className="nav-phone-icon"><i className="bi bi-telephone-fill" /></span>
                  <span className="nav-phone-text">
                    <span>Talk To Us</span>
                    <strong>+91 999 77 148 00</strong>
                  </span>
                </a>
                <Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="nav-cta">
                  <i className="bi bi-send-fill" /> Get in Touch
                </Link>
                <button className="nav-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                  <span /><span /><span />
                </button>
              </div>

            </nav>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────────── */}
      <div
        className={`mobile-backdrop${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        {/* Drawer Header */}
        <div className="drawer-header">
          <span className="nav-brand">
            <Image
              src="/images/vedvet-logo.png"
              alt="VedVet Logo"
              width={120}
              height={40}
              style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
            />
          </span>
          <button className="drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav className="drawer-nav">
          <ul>
            {navItems.map((item, i) => (
              <li key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                {item.dropdown ? (
                  <div className="drawer-dropdown-wrapper">
                    <div 
                      className="drawer-link-container" 
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '15px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
                    >
                      <div>
                        <span className="drawer-link-num">0{i + 1}</span>
                        {item.label}
                      </div>
                      <i className={`bi bi-chevron-${mobileDropdownOpen ? 'up' : 'down'}`} />
                    </div>
                    {mobileDropdownOpen && (
                      <div className="drawer-dropdown-list" style={{ paddingLeft: '40px', background: 'rgba(0,0,0,0.02)' }}>
                        {item.dropdown.map((subItem, j) => (
                          <Link 
                            key={j} 
                            href={subItem.href} 
                            onClick={() => setMobileOpen(false)}
                            style={{ display: 'block', padding: '15px 0', color: 'var(--charcoal)', textDecoration: 'none', borderBottom: j === item.dropdown!.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)' }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href={item.href!} 
                    onClick={(e) => handleLinkClick(e, item.href!)} 
                    className={(router.pathname === '/' && activeSection === item.href?.replace('/#', '')) ? 'active' : ''}
                  >
                    <span className="drawer-link-num">0{i + 1}</span>
                    {item.label}
                    <i className="bi bi-arrow-right drawer-link-arrow" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          <Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="drawer-cta">
            <i className="bi bi-send-fill" /> Get in Touch
          </Link>
          <div className="drawer-contact">
            <a href="mailto:info@vedvet.com"><i className="bi bi-envelope-fill" /> info@vedvet.com</a>
            <a href="tel:+919997714800"><i className="bi bi-telephone-fill" /> +91 999 77 148 00</a>
          </div>
          <div className="drawer-socials">
            <a href="https://www.facebook.com/p/Vedvet-Animal-Health-Private-Limited-100070798733935/" aria-label="facebook" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook" /></a>
            <a href="https://x.com/ved_vet" aria-label="twitter-x" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter-x" /></a>
            <a href="https://www.linkedin.com/in/ved-vet-604050422/" aria-label="linkedin" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" /></a>
            <a href="https://www.instagram.com/ved_vet/" aria-label="instagram" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" /></a>
          </div>
        </div>
      </div>
    </>
  );
}
