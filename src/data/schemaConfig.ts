import { SITE_URL, getCanonicalUrl } from './seoConfig';
import { formatCategoryLabel, getProductPrimaryCategory } from './categoryHelpers';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'VEDVET Animal Health Private Limited',
  alternateName: ['VEDVET', 'Vedvet Animal Health', 'VedVet Healthcare'],
  legalName: 'VEDVET Animal Health Private Limited',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/images/vedvet-logo.png`,
    caption: 'VEDVET Animal Health Logo',
  },
  image: `${SITE_URL}/images/vedvet-logo.png`,
  description:
    'Global manufacturer and exporter of premium herbal animal nutrition supplements, veterinary feed additives, premixes, and natural livestock healthcare formulations.',
  foundingDate: '2021',
  address: {
    '@type': 'PostalAddress',
    streetAddress: "2nd floor, Applaud Tower, St. Jude's Chowk, Behind Super Star Electricals, GMS Road",
    addressLocality: 'Dehradun',
    postalCode: '248001',
    addressRegion: 'Uttarakhand',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91 999 77 148 00',
      contactType: 'customer support',
      email: 'info@vedvet.com',
      availableLanguage: ['en', 'hi'],
      areaServed: 'Worldwide',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91 999 77 148 00',
      contactType: 'export sales',
      email: 'info@vedvet.com',
      availableLanguage: ['en', 'de', 'tr', 'ar'],
      areaServed: ['TR', 'IR', 'JO', 'EG', 'TW', 'DE', 'TH', 'AE', 'Asia', 'Worldwide'],
    },
  ],
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Worldwide',
    },
    // Current Active Export Markets
    { '@type': 'Country', name: 'Turkey', identifier: 'TR' },
    { '@type': 'Country', name: 'Iran', identifier: 'IR' },
    { '@type': 'Country', name: 'Jordan', identifier: 'JO' },
    { '@type': 'Country', name: 'Egypt', identifier: 'EG' },
    { '@type': 'Country', name: 'Taiwan', identifier: 'TW' },
    // Target Strategic Expansion Markets
    { '@type': 'Country', name: 'Germany', identifier: 'DE' },
    { '@type': 'Country', name: 'Thailand', identifier: 'TH', alternateName: 'Bangkok, Thailand' },
    { '@type': 'Country', name: 'United Arab Emirates', identifier: 'AE', alternateName: 'Dubai, UAE' },
    { '@type': 'Continent', name: 'Asia' },
  ],
  knowsAbout: [
    'Veterinary Healthcare',
    'Natural Animal Feed Additives',
    'Poultry Feed Supplements',
    'Swine Feed Additives',
    'Organic Pig Feed Additives',
    'Phytogenic Feed Additives',
    'Herbal Animal Nutrition',
    'Livestock Gut Health Formulations',
    'Aquaculture Nutrition',
    'Companion Animal Veterinary Tonics',
    'Natural Growth Promoters (NGP)',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'VEDVET Veterinary Healthcare & Feed Supplements Portfolio',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Poultry Feed Supplements and Natural Additives',
        url: `${SITE_URL}/products/poultry`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Swine Feed Supplements and Organic Additives',
        url: `${SITE_URL}/products/swine`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Livestock Health and Ruminant Nutrition Supplements',
        url: `${SITE_URL}/products/livestock`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Aquaculture Health and Pond Conditioners',
        url: `${SITE_URL}/products/aqua`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Pets and Companion Animal Formulations',
        url: `${SITE_URL}/products/pets`,
      },
    ],
  },
  sameAs: [
    'https://www.facebook.com/p/Vedvet-Animal-Health-Private-Limited-100070798733935/',
    'https://x.com/ved_vet',
    'https://www.linkedin.com/in/ved-vet-604050422/',
    'https://www.instagram.com/ved_vet/',
  ],
};

export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'VEDVET Animal Health',
  description: 'Herbal Animal Nutrition Supplements & Natural Feed Additives Worldwide',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
};

export function getBreadcrumbListSchema(crumbs: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb`,
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.label,
      item: crumb.href ? getCanonicalUrl(crumb.href) : undefined,
    })),
  };
}

export function getHomepageFaqSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What quality certifications does VEDVET hold?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'VEDVET holds HALAL, GMO, ISO 9001, ISO 22000, FAMI-QS, GMP, and HACCP certifications, reflecting our commitment to quality, safety, and international regulatory standards across our product range.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I choose the right veterinary feed additive or supplement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start from the specific animal health problem or nutritional requirement, then consult the product datasheet. For example, VEDTOX is an advanced toxin binder for feed-toxin concerns. For personalized technical support, contact our veterinarian team at info@vedvet.com.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which animal health segments and species does VEDVET serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'VEDVET serves poultry, swine, livestock (cattle, sheep, goats), aquaculture (fish, shrimp), and companion animals (pets), offering scientifically developed natural herbal formulations tailored to each species.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we request commercial samples or discuss export distribution?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we regularly participate in international trade exhibitions and welcome commercial buyers, importers, and distributors to request samples and discuss country distribution agreements by reaching out to info@vedvet.com.',
        },
      },
    ],
  };
}

export interface CatalogProductItem {
  name: string;
  slug: string;
  category: string;
  shortDescription?: string;
  image?: string;
}

export function getCollectionPageSchema(
  title: string,
  description: string,
  canonicalUrl: string,
  breadcrumbs: BreadcrumbItem[],
  productsList: CatalogProductItem[] = []
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: title,
        description: description,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#organization`,
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: productsList.length,
          itemListElement: productsList.slice(0, 30).map((prod, index) => {
            const catSlug = getProductPrimaryCategory(prod.category);
            const prodUrl = `${SITE_URL}/products/${catSlug}/${prod.slug}`;
            return {
              '@type': 'ListItem',
              position: index + 1,
              name: prod.name,
              url: prodUrl,
              description: prod.shortDescription,
              image: prod.image ? (prod.image.startsWith('http') ? prod.image : `${SITE_URL}${prod.image}`) : undefined,
            };
          }),
        },
      },
      getBreadcrumbListSchema(breadcrumbs),
    ],
  };
}

export function getEnhancedProductSchema(
  product: {
    name: string;
    slug: string;
    category: string;
    presentation?: string;
    shortDescription?: string;
    fullDescription?: string;
    image?: string;
    tagline?: string;
  },
  canonicalProductUrl: string,
  categorySlug: string
) {
  const catLabel = formatCategoryLabel(categorySlug);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${canonicalProductUrl}#product`,
        name: product.name,
        description: product.shortDescription || product.fullDescription,
        category: product.category,
        image: product.image ? (product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`) : undefined,
        sku: product.slug,
        mpn: product.slug,
        brand: {
          '@type': 'Brand',
          name: 'VEDVET',
          url: SITE_URL,
        },
        manufacturer: {
          '@id': `${SITE_URL}/#organization`,
        },
        countryOfOrigin: {
          '@type': 'Country',
          name: 'India',
        },
        audience: {
          '@type': 'Audience',
          audienceType: 'Veterinarians, Feed Manufacturers, Commercial Livestock and Poultry Farmers',
        },
        offers: {
          '@type': 'Offer',
          url: canonicalProductUrl,
          priceCurrency: 'USD',
          price: '0.00',
          priceValidUntil: '2030-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@id': `${SITE_URL}/#organization`,
          },
          description: 'Commercial B2B pricing, bulk packaging, and export supply available upon inquiry.',
        },
        additionalProperty: [
          ...(product.presentation
            ? [
                {
                  '@type': 'PropertyValue',
                  name: 'Presentation',
                  value: product.presentation,
                },
              ]
            : []),
          {
            '@type': 'PropertyValue',
            name: 'Target Segment',
            value: product.category,
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: `${SITE_URL}/products`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: catLabel,
            item: `${SITE_URL}/products/${categorySlug.toLowerCase()}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: product.name,
            item: canonicalProductUrl,
          },
        ],
      },
    ],
  };
}

export function getContactPageSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${canonicalUrl}#contactpage`,
        url: canonicalUrl,
        name: 'Contact VEDVET | Global Animal Health & Feed Additives Exporter',
        description: 'Get in touch with VEDVET for herbal animal nutrition supplements, distributor inquiries, and global veterinary healthcare exports.',
        mainEntity: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      getBreadcrumbListSchema([
        { label: 'Home', href: '/' },
        { label: 'Contact', href: '/contact' },
      ]),
    ],
  };
}

export function getAboutPageSchema(title: string, description: string, canonicalUrl: string, breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${canonicalUrl}#aboutpage`,
        url: canonicalUrl,
        name: title,
        description: description,
        mainEntity: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      getBreadcrumbListSchema(breadcrumbs),
    ],
  };
}

