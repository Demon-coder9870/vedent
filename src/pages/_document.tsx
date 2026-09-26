import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="VEDVET provides world-class solutions in veterinary healthcare with high-quality antibiotics, herbal medicines, supplements and injectables." />
        <meta name="keywords" content="Veterinary Healthcare, Animal Health, Swine, Livestock, Poultry, Aqua, Pets, Feed Supplements" />
        <meta property="og:title" content="VEDVET | Veterinary Healthcare & Animal Health Solutions" />
        <meta property="og:description" content="Premium veterinary healthcare solutions for modern animal care." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
