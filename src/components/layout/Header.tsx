import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import EventWidget from './EventWidget';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    dropdown: [
      { label: 'Who We Are', href: '/about/who-we-are' },
      { label: 'What We Do', href: '/about/what-we-do' },
    ],
  },
  { label: 'Products', href: '/products' },
  { label: 'Highlights', href: '/highlights' },
  { label: 'Accreditations', href: '/accreditations' },
];

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      if (router.pathname !== '/') return;

      const sections = ['hero', 'about', 'services', 'innovation', 'faq', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      if (current) setActiveSection(current);
    };

    const onScroll = () => { handleScroll(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
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

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.href === '/') {
      return router.pathname === '/' && activeSection === 'hero';
    }
    if (item.href?.startsWith('/#')) {
      return router.pathname === '/' && activeSection === item.href.replace('/#', '');
    }
    if (item.href === '/products') {
      return router.pathname.startsWith('/products');
    }
    if (item.dropdown) {
      return item.dropdown.some(
        (sub) => router.asPath === sub.href || (sub.href !== '/products' && router.asPath.startsWith(sub.href))
      );
    }
    if (item.href) {
      return router.pathname === item.href || router.asPath === item.href;
    }
    return false;
  };

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────── */}
      <header className={`site-header${scrolled || router.pathname !== '/' ? ' scrolled' : ''}`}>
        {/* Main Nav */}
        <div className="nav-wrapper">
          <div className="container-wide">
            <nav className="main-nav">

              {/* Brand */}
              <Link
                href="/"
                onClick={(e) => {
                  setMobileOpen(false);
                  if (router.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="nav-brand"
              >
                <Image
                  src="/images/vedvet-logo.png"
                  alt="VedVet Logo"
                  width={210}
                  height={72}
                  style={{ objectFit: 'contain', height: 'clamp(40px, 8vw, 72px)', width: 'auto' }}
                />
              </Link>

              {/* Desktop Links */}
              <ul className="nav-links">
                {navItems.map((item, i) => (
                  <li
                    key={i}
                    className="nav-item"
                    onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                    onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                  >
                    {item.dropdown ? (
                      <div className={`nav-link${isItemActive(item) ? ' active' : ''}`} style={{ cursor: 'pointer' }}>
                        <Link
                          href={item.href || item.dropdown[0].href}
                          onClick={(e) => handleLinkClick(e, item.href || item.dropdown![0].href)}
                          style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: '5px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <span>{item.label}</span>
                          <i className="bi bi-chevron-down" style={{ fontSize: '0.75em', marginTop: '1px' }} />
                        </Link>
                        <span className="nav-link-bar" />

                        {/* Dropdown Menu */}
                        <div className={`nav-dropdown ${openDropdown === item.label ? 'open' : ''}`}>
                          {item.dropdown.map((subItem, j) => (
                            <Link 
                              key={j} 
                              href={subItem.href} 
                              onClick={(e) => handleLinkClick(e, subItem.href)}
                              className={`dropdown-link${router.asPath === subItem.href ? ' active' : ''}`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={(e) => handleLinkClick(e, item.href!)}
                        className={`nav-link${isItemActive(item) ? ' active' : ''}`}
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

      {/* ── FLOATING EVENT WIDGET ──────────────────────── */}
      <EventWidget />

      {/* ── MOBILE DRAWER ──────────────────────────────── */}
      <div
        className={`mobile-backdrop${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        {/* Drawer Header */}
        <div className="drawer-header">
          <Link
            href="/"
            onClick={(e) => {
              setMobileOpen(false);
              if (router.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="nav-brand"
          >
            <Image
              src="/images/vedvet-logo.png"
              alt="VedVet Logo"
              width={120}
              height={40}
              style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
            />
          </Link>
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
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === item.label ? null : item.label)}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        cursor: 'pointer', 
                        padding: '15px 26px', 
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: isItemActive(item) ? 'var(--lime-dark)' : 'var(--charcoal)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span className="drawer-link-num">0{i + 1}</span>
                        {item.label}
                      </div>
                      <i className={`bi bi-chevron-${openMobileDropdown === item.label ? 'up' : 'down'}`} style={{ color: 'var(--lime-dark)' }} />
                    </div>
                    {openMobileDropdown === item.label && (
                      <div className="drawer-dropdown-list" style={{ paddingLeft: '26px', background: 'rgba(0,0,0,0.02)' }}>
                        {item.dropdown.map((subItem, j) => (
                          <Link
                            key={j}
                            href={subItem.href}
                            onClick={() => setMobileOpen(false)}
                            style={{ 
                              display: 'block', 
                              padding: '15px 26px', 
                              color: router.asPath === subItem.href ? 'var(--lime-dark)' : 'var(--charcoal)', 
                              textDecoration: 'none', 
                              borderBottom: j === item.dropdown!.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)',
                              fontSize: '1rem',
                              fontWeight: router.asPath === subItem.href ? '700' : '600'
                            }}
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
                    className={isItemActive(item) ? 'active' : ''}
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
