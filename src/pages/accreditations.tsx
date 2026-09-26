import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';

export default function Accreditations() {
  const certifications = [
    {
      title: 'HALAL Certified',
      desc: 'Our animal supplements are Halal Certified, demonstrating that the ingredients, manufacturing processes, and handling practices covered by our certification comply with applicable Halal requirements. For our customers and distribution partners, this provides an additional level of assurance, transparency, and confidence when sourcing animal-health products for Halal-sensitive markets.',
      meaningTitle: 'What Does Halal Certification Mean?',
      meaningDesc: 'Halal certification verifies that the certified products and relevant production processes meet established Halal requirements. Depending on the product, this can include the assessment of ingredients, raw materials, processing, handling, storage, and prevention of contamination with non-Halal materials.',
      icon: 'bi-star-fill',
      image: '/images/accreditations/Halal.png'
    },
    {
      title: 'GMO Certified',
      desc: 'Our animal supplements are GMO Certified, providing assurance that the certified products meet the applicable requirements for GMO status established by the relevant certification standard. For our customers and distribution partners, this certification provides greater transparency and confidence in the sourcing and composition of our certified animal supplements.',
      meaningTitle: 'What Does GMO Certification Mean?',
      meaningDesc: 'GMO certification verifies that products, ingredients, and relevant production processes covered by the certification meet defined requirements concerning the use and presence of genetically modified organisms (GMOs).',
      icon: 'bi-flower1',
      image: '/images/accreditations/GMO.png'
    },
    {
      title: 'ISO 9001 Certified',
      desc: 'Our organization is ISO 9001 Certified, demonstrating that our Quality Management System meets the requirements of the internationally recognized ISO 9001 standard. For our customers and distribution partners, this reflects our commitment to consistent processes, quality management, customer satisfaction, traceability, and continual improvement across the activities covered by our certification.',
      meaningTitle: 'What Does ISO 9001 Certification Mean?',
      meaningDesc: 'ISO 9001 is an internationally recognized standard for Quality Management Systems (QMS). Certification involves the assessment of an organization\'s quality management processes against the requirements of the standard.',
      icon: 'bi-patch-check-fill',
      image: '/images/accreditations/ISO 9001 2015.png'
    },
    {
      title: 'ISO 22000 Certified',
      desc: 'Our organization is ISO 22000 Certified, demonstrating that our Food Safety Management System meets the requirements of the internationally recognized ISO 22000 standard within the scope of our certification. For our customers and distribution partners, this reflects our commitment to systematic safety management, hazard control, traceability, and continual improvement across the processes covered by our certification.',
      meaningTitle: 'What Does ISO 22000 Certification Mean?',
      meaningDesc: 'ISO 22000 is an internationally recognized standard for Food Safety Management Systems (FSMS). It provides a structured framework for identifying, evaluating, controlling, and monitoring food-safety hazards throughout the relevant supply chain. Depending on the certified scope, this can include controls related to raw materials, production processes, hygiene, storage, handling, traceability, monitoring, and corrective actions.',
      icon: 'bi-shield-check',
      image: '/images/accreditations/ISO 22000.png'
    },
    {
      title: 'FAMI-QS Certified',
      desc: 'Our organization is FAMI-QS Certified, demonstrating that the applicable processes and products within our certified scope are managed according to the FAMI-QS Feed Safety and Quality System requirements. For our customers and distribution partners, this provides additional confidence in our approach to feed safety, quality management, traceability, risk control, and regulatory compliance across the activities covered by our certification.',
      meaningTitle: 'What Does FAMI-QS Certification Mean?',
      meaningDesc: 'FAMI-QS is a recognized certification system specifically developed for the specialty feed ingredients and their mixtures industry. The system provides a structured framework for managing risks associated with the production and supply of products used in animal nutrition.',
      icon: 'bi-diagram-3-fill',
      image: '/images/accreditations/FAMI-QS.png'
    },
    {
      title: 'GMP Certified',
      desc: 'Our manufacturing operations follow Good Manufacturing Practices (GMP), reflecting our commitment to maintaining controlled, consistent, and quality-focused manufacturing processes within the applicable scope of our certification. For our customers and distribution partners, GMP provides additional confidence that products are manufactured through defined procedures, controlled processes, appropriate hygiene practices, quality checks, and documented systems.',
      meaningTitle: 'What Does GMP Certification Mean?',
      meaningDesc: 'Good Manufacturing Practices (GMP) provide a structured framework for ensuring that products are consistently manufactured and controlled according to established quality requirements. GMP covers key areas of manufacturing such as personnel, premises, equipment, sanitation, raw materials, production processes, quality control, documentation, storage, and handling, as applicable to the relevant product category and certification scope.',
      icon: 'bi-building-check',
      image: '/images/accreditations/GMP.png'
    },
    {
      title: 'HACCP Certified',
      desc: 'Our operations follow a HACCP-based food and feed safety system, reflecting our commitment to proactively identifying, controlling, and monitoring potential hazards throughout the processes covered by our certification. For our customers and distribution partners, HACCP provides additional confidence that relevant safety risks are addressed through a structured, preventive, and documented approach.',
      meaningTitle: 'What Does HACCP Certification Mean?',
      meaningDesc: 'HACCP (Hazard Analysis and Critical Control Points) is a systematic, preventive approach to identifying, evaluating, and controlling hazards that may affect product safety. Rather than relying solely on testing the finished product, HACCP focuses on identifying potential hazards throughout relevant processes and establishing appropriate Critical Control Points (CCPs) and control measures.',
      icon: 'bi-shield-lock-fill',
      image: '/images/accreditations/HACCP.png'
    }
  ];

  return (
    <>
      <Head>
        <title>Accreditations | VEDVET Quality Standards</title>
        <meta name="description" content="Explore our industry-leading accreditations, certifications, and our commitment to premium veterinary healthcare standards." />
      </Head>

      <Header />

      <main>
        <PageHeader
          title="Accreditations"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Accreditations' }
          ]}
          bgImage="/images/hero.jpg"
        />

        <section className="section-pad bg-pattern-dots" style={{ backgroundColor: '#fdfdfd' }}>
          <div className="container-wide">

            <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px auto' }} data-aos="fade-up">
              <span className="section-label" style={{ justifyContent: 'center' }}>Global Standards</span>
              <h2 className="section-title">Commitment to Uncompromised Quality</h2>
              <div className="title-underline" style={{ margin: '0 auto' }}></div>
              <p className="section-subtitle" style={{ margin: '24px auto 0 auto' }}>
                At VEDVET, quality is never compromised. Our world-class facilities and strict adherence to global standards ensure that every product we deliver meets the highest level of safety and efficacy.
              </p>
            </div>

            <div className="acc-container">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`acc-row ${index % 2 === 1 ? 'reverse' : ''}`}
                  data-aos="fade-up"
                >
                  <div className="acc-visual">
                    <div className="acc-icon-box" style={{ background: 'transparent', boxShadow: 'none' }}>
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        width={120}
                        height={120}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <h3 className="acc-title">{cert.title}</h3>
                  </div>

                  <div className="acc-content">
                    <p className="acc-desc">
                      {cert.desc}
                    </p>
                    <div className="acc-meaning-box">
                      <h4 className="acc-meaning-title">
                        {cert.meaningTitle}
                      </h4>
                      <p className="acc-meaning-text">
                        {cert.meaningDesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
