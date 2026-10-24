import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Error | VEDVET</title>
        <meta name="description" content="An internal server error occurred. Our technical team has been notified." />
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
            fontSize: '7.5rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            marginBottom: '20px',
            letterSpacing: '-0.05em',
          }}
        >
          500
        </div>

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '14px',
            letterSpacing: '-0.02em',
          }}
        >
          Internal Server Error
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
          We are experiencing an unexpected server issue. Please try refreshing the page or return to the home page.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
            style={{
              background: 'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)',
              color: '#1a3a00',
              fontWeight: 700,
              padding: '14px 30px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem',
              boxShadow: '0 8px 24px rgba(132,204,22,0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            type="button"
          >
            <i className="bi bi-arrow-clockwise" /> Reload Page
          </button>

          <Link
            href="/"
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
            }}
          >
            ← Back to Home
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
