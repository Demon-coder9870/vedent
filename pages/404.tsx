export default function Custom404() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: "'Jost', sans-serif",
      background: 'linear-gradient(135deg, #0b0d14 0%, #13161f 100%)',
      color: '#fff',
      textAlign: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        fontSize: '8rem',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #84cc16 0%, #4ade80 50%, #10b981 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: '20px',
        letterSpacing: '-0.05em',
      }}>
        404
      </div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px', letterSpacing: '-0.02em' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '40px', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.75 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a
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
        }}
      >
        ← Back to Home
      </a>
    </div>
  );
}
