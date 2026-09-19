import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// ─── DATA ────────────────────────────────────────────────────────────────────

const heroSlides = [
  {
    bg: '/images/hero.jpg',
    badge: 'Premium Pet Wellness',
    title: (
      <>Ingredients by Nature,<br />Formulations by <span className="accent">Vedvet</span>.</>
    ),
    sub: 'Care without limits - for every companion',
  },
  {
    bg: '/images/pets.jpg',
    badge: 'Compassionate Care',
    title: (
      <>Smarter Solutions<br />for <span className="accent">Modern</span><br />Pet Healthcare.</>
    ),
    sub: 'Cutting-edge, sustainable solutions for veterinarians and pet owners designed to deliver real-world results.',
  },
  {
    bg: '/images/livestock.jpg',
    badge: 'From Pups to Seniors',
    title: (
      <>Care Without<br />Limits —<br /><span className="accent">For Every</span> Companion.</>
    ),
    sub: 'Comprehensive quality products designed for diverse pet care needs worldwide.',
  },
];

const heroSectors = ['SWINE', 'LIVESTOCK', 'POULTRY', 'AQUA', 'PETS'];

const stats = [
  { number: '15+', suffix: '', label: 'Years of Excellence' },
  { number: '200', suffix: '+', label: 'Products Portfolio' },
  { number: '50', suffix: '+', label: 'Countries Served' },
  { number: '10K', suffix: '+', label: 'Happy Clients' },
];

const services = [
  { icon: 'bi-heart-pulse', title: 'Wellness Exams', desc: 'Comprehensive health checks designed for diverse pet healthcare needs — from routine checkups to diagnosis.', num: '01' },
  { icon: 'bi-basket2', title: 'Pet Nutrition', desc: 'Quality-focused supplements and premium diets supporting optimal pet nutrition and lifelong wellbeing.', num: '02' },
  { icon: 'bi-scissors', title: 'Grooming Services', desc: 'Professional grooming solutions aligned with breed-specific requirements and skin care standards.', num: '03' },
  { icon: 'bi-bandaid', title: 'Surgical Care', desc: 'State-of-the-art surgical expertise focused on safety, precision, and quick recovery for your furry friends.', num: '04' },
  { icon: 'bi-people', title: 'Behavioral Training', desc: 'Working closely with pet parents to understand and address practical behavioral requirements.', num: '05' },
  { icon: 'bi-house-heart', title: 'Boarding & Daycare', desc: 'Developing safe, fun, and enriching environments with a focus on long-term happiness and socialization.', num: '06' },
];

const sectors = [
  { bg: '/images/swine.jpg', tag: 'Canine Care', title: 'Dogs', sub: 'Complete health management solutions for your loyal companions' },
  { bg: '/images/livestock.jpg', tag: 'Feline Care', title: 'Cats', sub: 'Targeted wellness and nutrition for cats of all ages' },
  { bg: '/images/poultry.jpg', tag: 'Avian Care', title: 'Birds', sub: 'Specialized healthcare for parrots, canaries and companions' },
  { bg: '/images/aqua.jpg', tag: 'Small Mammals', title: 'Small Pets', sub: 'Rabbits, guinea pigs & hamster health management' },
  { bg: '/images/pets.jpg', tag: 'Exotics', title: 'Reptiles', sub: 'Premium care for turtles, lizards & exotic companions' },
];

const steps = [
  {
    icon: 'bi-binoculars',
    num: '01',
    title: '— Understand',
    desc: 'Working closely with pet parents and veterinarians across the country to deeply understand practical requirements and real-world challenges in pet healthcare.',
  },
  {
    icon: 'bi-lightbulb',
    num: '02',
    title: '— Innovate',
    desc: 'Developing cutting-edge, innovative and sustainable treatments that can safely and reliably cure various pet ailments and significantly improve quality of life.',
  },
  {
    icon: 'bi-box-seam',
    num: '03',
    title: '— Deliver',
    desc: 'Providing high-quality veterinary medicines and wellness supplements, ensuring a practical and comprehensive range of products across global markets.',
  },
];

const testimonials = [
  {
    text: '"Their innovative joint supplements have fundamentally improved our senior dog\'s mobility. Remarkable results within just a few weeks."',
    name: 'Rajesh Sharma',
    role: 'Golden Retriever Parent, Maharashtra',
    init: 'RS',
  },
  {
    text: '"A trustworthy partner in veterinary healthcare. The quality of their care is consistent, reliable and always meets our clinic\'s stringent requirements."',
    name: 'Dr. Priya Nair',
    role: 'Veterinary Practitioner, Kerala',
    init: 'PN',
  },
  {
    text: '"VEDVET understands the real-world challenges of raising a high-energy breed. Their practical range of nutritional products is unmatched in quality."',
    name: 'Sunil Verma',
    role: 'German Shepherd Parent, Punjab',
    init: 'SV',
  },
  {
    text: '"Exceptional veterinary expertise and a genuinely compassionate approach to feline care. We\'ve been bringing our cats here for over 7 years now."',
    name: 'Anil Mathew',
    role: 'Cat Rescuer, Andhra',
    init: 'AM',
  },
  {
    text: '"The team at VEDVET is constantly ahead of the curve. Their innovations in herbal pet medicines have been a game changer for our sensitive pup."',
    name: 'Meena Gupta',
    role: 'Pet Parent, Delhi NCR',
    init: 'MG',
  },
];

const faqs = [
  {
    q: 'What petcare services do you provide?',
    a: 'VEDVET provides comprehensive pet healthcare solutions including wellness exams, nutritional supplements, grooming, and specialized surgical care.',
  },
  {
    q: 'Do you cater to exotic pets?',
    a: 'Yes! While we specialize in dogs and cats, our experts provide premium care for birds, small mammals, and reptiles with dedicated, species-specific treatments.',
  },
  {
    q: 'Do you provide nutritional supplements?',
    a: 'Yes, pet nutrition is a core part of our practice. We develop targeted nutritional solutions to improve joint health, coat shine, and overall vitality.',
  },
  {
    q: 'How do I book a wellness exam?',
    a: 'You can book a wellness exam through our online portal, by calling our clinic, or simply dropping by during our regular walk-in hours.',
  },
  {
    q: 'Is your staff certified?',
    a: 'Absolutely. All our veterinarians and groomers are fully licensed, certified, and continuously trained in the latest petcare innovations and safety protocols.',
  },
  {
    q: 'Do you offer emergency care?',
    a: 'Yes, our facilities are equipped to handle urgent care and surgical emergencies, ensuring your furry friends are safe around the clock.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Scroll + Active Section + Reveal
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

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
  }, []);

  // Counter animation
  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt((entry.target as HTMLElement).dataset.count || '0', 10);
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            entry.target.textContent = Math.round(current).toString();
            if (current >= target) clearInterval(timer);
          }, 20);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const header = document.querySelector('.site-header');
      const offset = header ? header.offsetHeight : 80;
      window.scrollTo({ top: el.offsetTop - offset + 4, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Industries', id: 'sectors' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      <Head>
        <title>VEDVET | Veterinary Healthcare & Animal Health Solutions</title>
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>

        {/* Announcement Bar */}
        <div className="announce-bar">
          <div className="container-wide">
            <div className="announce-inner">
              <span className="announce-badge"><i className="bi bi-stars" /> NEW</span>
              <span className="announce-text">Trusted by 10,000+ farmers &amp; veterinarians across 50+ countries</span>
              <div className="announce-right">
                <a href="mailto:info@vedvet.com" className="announce-link"><i className="bi bi-envelope-fill" /> info@vedvet.com</a>
                <span className="announce-divider" />
                <a href="tel:+15551234567" className="announce-link"><i className="bi bi-telephone-fill" /> +1 (555) 123-4567</a>
                <span className="announce-divider" />
                <div className="announce-socials">
                  {['facebook','instagram','linkedin','youtube'].map(s => (
                    <a key={s} href="#" aria-label={s}><i className={`bi bi-${s}`} /></a>
                  ))}
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
              <a href="#hero" onClick={(e) => scrollTo(e, 'hero')} className="nav-brand">
                <span className="brand-icon">
                  <i className="bi bi-leaf-fill" />
                </span>
                <span className="brand-text">VED<span className="brand-accent">VET</span></span>
              </a>

              {/* Desktop Links */}
              <ul className="nav-links">
                {navItems.map(({ label, id }) => (
                  <li key={id} className="nav-item">
                    <a
                      href={`#${id}`}
                      onClick={(e) => scrollTo(e, id)}
                      className={`nav-link${activeSection === id ? ' active' : ''}`}
                    >
                      {label}
                      <span className="nav-link-bar" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right Actions */}
              <div className="nav-actions">
                <a href="tel:+15551234567" className="nav-phone">
                  <span className="nav-phone-icon"><i className="bi bi-telephone-fill" /></span>
                  <span className="nav-phone-text">
                    <span>Call Us</span>
                    <strong>+1 (555) 123-4567</strong>
                  </span>
                </a>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="nav-cta">
                  <i className="bi bi-send-fill" /> Get in Touch
                </a>
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
            <span className="brand-icon"><i className="bi bi-leaf-fill" /></span>
            <span className="brand-text">VED<span className="brand-accent">VET</span></span>
          </span>
          <button className="drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav className="drawer-nav">
          <ul>
            {navItems.map(({ label, id }, i) => (
              <li key={id} style={{ animationDelay: `${i * 0.06}s` }}>
                <a href={`#${id}`} onClick={(e) => scrollTo(e, id)} className={activeSection === id ? 'active' : ''}>
                  <span className="drawer-link-num">0{i + 1}</span>
                  {label}
                  <i className="bi bi-arrow-right drawer-link-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="drawer-cta">
            <i className="bi bi-send-fill" /> Get in Touch
          </a>
          <div className="drawer-contact">
            <a href="mailto:info@vedvet.com"><i className="bi bi-envelope-fill" /> info@vedvet.com</a>
            <a href="tel:+15551234567"><i className="bi bi-telephone-fill" /> +1 (555) 123-4567</a>
          </div>
          <div className="drawer-socials">
            {['facebook','instagram','linkedin','youtube'].map(s => (
              <a key={s} href="#" aria-label={s}><i className={`bi bi-${s}`} /></a>
            ))}
          </div>
        </div>
      </div>

      <main>
        {/* ── HERO ───────────────────────────────────────── */}
        <section id="hero" className="hero-section">
          <Swiper
            className="hero-swiper"
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              prevEl: '.hero-swiper-prev',
              nextEl: '.hero-swiper-next',
            }}
            pagination={{ clickable: true }}
          >
            {heroSlides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="hero-bg" style={{ backgroundImage: `url(${slide.bg})` }} />
                <div className="hero-overlay" />
                <div className="container-wide" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                  <div className="hero-content">
                    <div className="hero-badge">
                      <i className="bi bi-star-fill" style={{ fontSize: '0.7rem' }} />
                      {slide.badge}
                    </div>
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.sub}</p>
                    <div className="hero-pills-inner" style={{ marginTop: '20px' }}>
                      <span className="hero-pills-label">Explore:</span>
                      {heroSectors.map(sector => (
                        <a key={sector} href={`#${sector.toLowerCase()}`} className="pill">
                          {sector}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation */}
            <div className="hero-swiper-prev"><FiChevronLeft /></div>
            <div className="hero-swiper-next"><FiChevronRight /></div>
          </Swiper>




          {/* Scroll indicator */}
          <div className="hero-scroll">
            <div className="mouse-icon" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── STATS BAR ──────────────────────────────────── */}
        <div className="stats-bar">
          <div className="container-wide">
            <div className="stats-grid">
              {stats.map(({ number, suffix, label }, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">
                    <span data-count={parseInt(number)}>{parseInt(number)}</span>
                    <span>{suffix}</span>
                  </div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ABOUT ──────────────────────────────────────── */}
        <section id="about" className="about-section">
          <div className="about-blob" />
          <div className="container-wide">
            <div className="about-grid">
              {/* Content */}
              <div className="about-content" data-aos="fade-up">
                <span className="section-label" style={{ textTransform: 'uppercase' }}>The VEDVET Approach</span>
                <h2 className="section-title">
                  Where Veterinary Science Meets Real-World Animal Care
                </h2>
                <div className="title-underline"></div>
                <p className="section-subtitle" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '20px' }}>
                  VEDVET provides world-class solutions in veterinary healthcare with high-quality antibiotics, herbal medicines, supplements and injectables.
                </p>
                <p className="section-subtitle" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '0' }}>
                  Our strong relationship with veterinarians and farmers across the country is supported by a comprehensive and practical range of products designed to understand and address diverse customer requirements across global markets.
                </p>
              </div>

              {/* Image */}
              <div className="about-image-wrap" data-aos="fade-up">
                <div className="about-image-main">
                  <img src="/images/about.jpg" alt="Veterinary Science at VEDVET" loading="lazy" />
                </div>
                <div className="about-badge">
                  <div className="about-badge-number">15+ Years</div>
                  <div className="about-badge-text">Of Manufacturing Expertise</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ───────────────────────────────────── */}
        <section id="services" className="services-section">
          <div className="container-wide">
            <div className="services-header">
              <div data-aos="fade-up">
                <span className="section-label">What We Do</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  Comprehensive Petcare<br />Solutions
                </h2>
              </div>
              <p className="section-subtitle" style={{ maxWidth: 380 }} data-aos="fade-up">
                Six pillars of animal healthcare excellence, delivering real-world results for veterinarians and farmers globally.
              </p>
            </div>

            <div className="services-grid">
              {services.map(({ icon, title, desc, num }, i) => (
                <div key={i} className="service-card" data-aos="fade-up" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div className="service-card-number">{num}</div>
                  <div className="service-icon"><i className={`bi ${icon}`} /></div>
                  <h3 className="service-title">{title}</h3>
                  <p className="service-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTORS ────────────────────────────────────── */}
        <section id="sectors" className="sectors-section">
          <div className="container-wide">
            <div className="sectors-header" data-aos="fade-up">
              <span className="section-label">Industries We Serve</span>
              <h2 className="section-title">
                Animal Healthcare<br />Across Every Sector
              </h2>
              <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.5)', margin: '0 auto' }}>
                From Swine to Pets — dedicated, specialized solutions for every animal sector.
              </p>
            </div>

            <Swiper
              className="sectors-swiper"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {sectors.map(({ bg, tag, title, sub }, i) => (
                <SwiperSlide key={i}>
                  <a href="#" className="sector-card" onClick={(e) => e.preventDefault()}>
                    <div className="sector-card-bg" style={{ backgroundImage: `url(${bg})` }} />
                    <div className="sector-card-overlay" />
                    <div className="sector-card-content">
                      <span className="sector-card-tag">{tag}</span>
                      <h3 className="sector-card-title">{title}</h3>
                      <p className="sector-card-sub">{sub}</p>
                      <span className="sector-card-btn">
                        Explore <i className="bi bi-arrow-right" />
                      </span>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ── INNOVATION STEPS ───────────────────────────── */}
        <section id="innovation" className="innovation-section">
          <div className="container-wide">
            <div className="innovation-grid">
              <div className="innovation-sticky" data-aos="fade-up">
                <span className="section-label">Our Process</span>
                <h2 className="section-title">
                  Driven by Innovation.<br />Guided by Experience.
                </h2>
                <p className="section-subtitle">
                  We continuously work to meet the ever-changing demands and needs of the animal healthcare industry through a focused three-step approach.
                </p>
                <div style={{ marginTop: 40, padding: '28px', background: 'var(--lime-light)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--lime)' }}>
                  <p style={{ fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8, fontSize: '1rem' }}>
                    <i className="bi bi-award-fill" style={{ color: 'var(--lime-dark)', marginRight: 8 }} />
                    GMP Certified Facilities
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
                    All our products are manufactured in certified facilities following strict international quality standards.
                  </p>
                </div>
              </div>

              <div className="innovation-steps">
                {steps.map(({ icon, num, title, desc }, i) => (
                  <div key={i} className="step-card" data-aos="fade-up" style={{ transitionDelay: `${i * 0.12}s` }}>
                    <span className="step-num">{num}</span>
                    <div className="step-icon"><i className={`bi ${icon}`} /></div>
                    <h3 className="step-title">{title}</h3>
                    <p className="step-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── VEDVET VISION ──────────────────────────────── */}
        <section id="vision" className="vision-section section-pad">
          <div className="container-wide">
            <div style={{ textAlign: 'center', marginBottom: 60 }} data-aos="fade-up">
              <span className="section-label" style={{ justifyContent: 'center' }}>VEDVET Vision</span>
              <h2 className="section-title">Our Vision in Action</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                See how we are transforming animal healthcare and bringing our expertise to the world.
              </p>
            </div>
            <div className="vision-grid">
              <div className="vision-main-video" data-aos="fade-up">
                <iframe 
                  src="https://www.youtube.com/embed/J5xIneVJnwA" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="vision-sub-videos">
                <div className="vision-sub-video" data-aos="fade-up" data-aos-delay="100">
                  <iframe 
                    src="https://www.youtube.com/embed/vWxs4Nl3r0Q?start=68" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="vision-sub-video" data-aos="fade-up" data-aos-delay="200">
                  <iframe 
                    src="https://www.youtube.com/embed/vWxs4Nl3r0Q?start=68" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────────── */}
        <section id="testimonials" className="testimonials-section">
          <div className="container-wide">
            <div style={{ textAlign: 'center', marginBottom: 60 }} data-aos="fade-up">
              <span className="section-label" style={{ justifyContent: 'center' }}>Testimonials</span>
              <h2 className="section-title">Voices from the Field</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                What our clients say about the VEDVET difference.
              </p>
            </div>

            <Swiper
              className="testi-swiper"
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map(({ text, name, role, init }, i) => (
                <SwiperSlide key={i} style={{ height: 'auto' }}>
                  <div className="testi-card">
                    <div className="testi-stars">★★★★★</div>
                    <p className="testi-quote">"</p>
                    <p className="testi-text">{text.replace(/^"|"$/g, '')}</p>
                    <div className="testi-author">
                      <div className="testi-avatar">{init}</div>
                      <div>
                        <div className="testi-name">{name}</div>
                        <div className="testi-role">{role}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────── */}
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

        {/* ── CTA ────────────────────────────────────────── */}
        <section id="contact" className="cta-section">
          <div className="cta-bg-glow" />
          <div className="container-wide">
            <div className="cta-content" data-aos="fade-up">
              <span className="section-label" style={{ justifyContent: 'center', color: 'var(--lime)', marginBottom: 20 }}>
                Get in Touch
              </span>
              <h2 className="cta-title">
                Better Animal Health<br />Starts With <span className="accent">Better Solutions.</span>
              </h2>
              <p className="cta-sub">
                Join thousands of veterinarians and farmers who trust VEDVET for premium animal healthcare solutions.
              </p>
              <div className="cta-actions">
                <a href="mailto:info@vedvet.com" className="btn-lime">
                  <i className="bi bi-envelope-fill" /> Talk to VEDVET
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="container-wide">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand">
                <span className="footer-brand-icon"><i className="bi bi-leaf-fill" /></span>
                VEDVET
              </div>
              <p className="footer-desc">
                World-class veterinary healthcare solutions for modern animal care — trusted by veterinarians and farmers in 50+ countries.
              </p>
              <div className="footer-socials">
                {['facebook', 'twitter-x', 'linkedin', 'instagram', 'youtube'].map((s) => (
                  <a key={s} href="#" aria-label={s}><i className={`bi bi-${s}`} /></a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="footer-col-title">Quick Links</h5>
              <ul className="footer-links">
                {navItems.map(({ label, id }) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={(e) => scrollTo(e, id)}>
                      <i className="bi bi-chevron-right" /> {label}
                    </a>
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
                    <a href="#sectors" onClick={(e) => scrollTo(e, 'sectors')}>
                      <i className="bi bi-chevron-right" /> {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="footer-col-title">Contact</h5>
              {[
                { icon: 'bi-geo-alt', text: '[Company Address]' },
                { icon: 'bi-telephone', text: '+1 (555) 123-4567' },
                { icon: 'bi-envelope', text: 'info@vedvet.com' },
                { icon: 'bi-clock', text: 'Mon – Sat: 9am – 6pm' },
              ].map(({ icon, text }, i) => (
                <div key={i} className="footer-contact-item">
                  <i className={`bi ${icon}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © 2026 <span>VEDVET</span>. All Rights Reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── REVEAL ANIMATION STYLES ────────────────────── */}
      <style jsx global>{`

        .swiper-button-next,
        .swiper-button-prev {
          top: 50% !important;
        }
      `}</style>
    </>
  );
}
