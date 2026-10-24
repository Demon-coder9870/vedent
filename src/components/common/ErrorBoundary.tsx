import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '60px 20px',
            textAlign: 'center',
            fontFamily: "'Jost', sans-serif",
            backgroundColor: '#f8fafc',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              color: '#ef4444',
              fontSize: '2.5rem',
            }}
          >
            <i className="bi bi-exclamation-triangle" aria-hidden="true" />
          </div>

          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '12px',
              letterSpacing: '-0.02em',
            }}
          >
            Something went wrong
          </h2>

          <p
            style={{
              color: '#64748b',
              maxWidth: '480px',
              lineHeight: 1.6,
              marginBottom: '32px',
              fontSize: '1rem',
            }}
          >
            We encountered an unexpected issue while rendering this section. You can try refreshing or return to the home page.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReset}
              style={{
                backgroundColor: 'var(--lime-dark, #65a30d)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(101, 163, 13, 0.35)',
                transition: 'all 0.2s ease',
              }}
              type="button"
            >
              <i className="bi bi-arrow-clockwise" style={{ marginRight: '8px' }} />
              Try Again
            </button>

            <Link
              href="/"
              style={{
                backgroundColor: '#ffffff',
                color: '#1e293b',
                border: '1px solid #cbd5e1',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
