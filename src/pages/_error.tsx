function Error({ statusCode }) {
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
        fontSize: '6rem',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #84cc16 0%, #4ade80 50%, #10b981 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: '16px',
      }}>
        {statusCode || '404'}
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
        {statusCode === 404 ? 'Page Not Found' : 'Something went wrong'}
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '36px', fontSize: '1rem', lineHeight: 1.7 }}>
        {statusCode === 404
          ? "The page you're looking for doesn't exist."
          : 'An error occurred on the server.'}
      </p>
      <a
        href="/"
        style={{
          background: 'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)',
          color: '#1a3a00',
          fontWeight: 700,
          padding: '13px 28px',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontSize: '0.95rem',
          boxShadow: '0 8px 24px rgba(132,204,22,0.4)',
        }}
      >
        ← Back to Home
      </a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
