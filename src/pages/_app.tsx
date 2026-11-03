import { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Jost, Playfair_Display } from 'next/font/google';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import '@/styles/globals.css';
import '@/styles/contact-info.css';
import '@/styles/process-card.css';
import '@/styles/certifications.css';
import '@/styles/accreditations.css';
import '@/styles/products.css';
import '@/styles/ProductDetail.css';
import '@/styles/highlights.css';
import '@/styles/counter.css';
import '@/styles/bootstrap-icons-custom.css';
import 'aos/dist/aos.css';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jost',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-playfair',
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initAos = async () => {
      try {
        const AOS = (await import('aos')).default;
        AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-out-cubic',
          offset: 50,
        });
      } catch (e) {
        // Fallback gracefully if AOS fails to load
      }
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(initAos, { timeout: 1500 });
      } else {
        setTimeout(initAos, 300);
      }
    }
  }, []);

  return (
    <div className={`${jost.variable} ${playfair.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </div>
  );
}

export default MyApp;
