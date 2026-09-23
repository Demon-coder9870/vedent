import { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/contact-info.css';
import '../styles/process-card.css';
import '../styles/certifications.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
