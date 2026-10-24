import { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../components/common/ErrorBoundary';
import '../styles/globals.css';
import '../styles/contact-info.css';
import '../styles/process-card.css';
import '../styles/certifications.css';
import '../styles/accreditations.css';
import '../styles/products.css';
import '../styles/ProductDetail.css';
import '../styles/highlights.css';
import '../styles/counter.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
