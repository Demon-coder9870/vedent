import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | VEDVET</title>
        <meta name="description" content="The page you are looking for does not exist or has been moved." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: "'Jost', sans-serif",
          background: 'linear-gradient(135deg, #0b0d14 0%, #13161f 100%)',
          color: '#ffffff',
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            fontSize: '8rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #84cc16 0%, #4ade80 50%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            marginBottom: '20px',
            letterSpacing: '-0.05em',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '14px',
            letterSpacing: '-0.02em',
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '36px',
            fontSize: '1.05rem',
            maxWidth: '460px',
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist, has been removed, or has had its name changed.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              background: 'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)',
              color: '#1a3a00',
              fontWeight: 700,
              padding: '14px 30px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 8px 24px rgba(132,204,22,0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.2s ease',
            }}
          >
            ← Back to Home
          </Link>

          <Link
            href="/products"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontWeight: 600,
              padding: '14px 28px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s ease',
            }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
