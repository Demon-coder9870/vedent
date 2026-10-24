import rawProducts from '../data/products.json';
import { getProductAllCategories, getProductPrimaryCategory, formatCategoryLabel } from '../data/categoryHelpers';

export type Product = (typeof rawProducts)[0];

export interface ProductSummary {
  name: string;
  slug: string;
  category: string;
  presentation: string;
  shortDescription: string;
  image: string;
  featured?: string;
  displayOrder?: Record<string, number>;
}

export interface CategorySEOInfo {
  title: string;
  description: string;
  pageTitle?: string;
  tagline?: string;
}

export const CATEGORY_SEO_CONFIG: Record<string, CategorySEOInfo> = {
  All: {
    title: 'Herbal Animal Nutrition Supplements | feed Additives Products',
    description: 'Boost livestock health with premium herbal animal nutrition supplements. Get natural feed additives for better growth and strong immunity.',
    pageTitle: 'Our Products',
  },
  Poultry: {
    title: 'Natural Poultry Feed Supplements and Additives | Vedvet',
    description: 'Looking for high-quality poultry feed supplements? We manufacture and transport natural herbal Food additives to boost poultry health globally',
    pageTitle: 'Poultry Feed Supplements and Additives',
    tagline: 'Looking for high-quality poultry feed supplements? We manufacture and transport natural herbal Food additives to boost poultry health globally.',
  },
  Swine: {
    title: 'Natural Swine Feed Supplements and Organic Additives',
    description: 'Improve animal health with our natural swine feed supplements. Our organic swine additives and quality pig feed additives ensure steady growth.',
    pageTitle: 'Natural Swine Feed Supplements and Organic Additives',
    tagline: 'Improve animal health with our natural swine feed supplements. Our organic swine additives and quality pig feed additives ensure steady growth.',
  },
  Livestock: {
    title: 'Natural Livestock Feed Supplements & Herbal Additives | VEDVET',
    description: 'Boost ruminant and cattle health with natural livestock feed supplements and organic additives. Clinically tested for growth, digestion, and immunity.',
    pageTitle: 'Livestock Feed Supplements & Healthcare',
    tagline: 'Premium herbal formulations and feed additives designed to optimize livestock nutrition, rumen health, and productivity.',
  },
  Aqua: {
    title: 'Herbal Aquaculture & Fish Feed Supplements | VEDVET',
    description: 'Enhance aquatic species growth and water health with VEDVET natural aquaculture feed additives and herbal supplements for fish and shrimp.',
    pageTitle: 'Aquaculture Healthcare & Feed Additives',
    tagline: 'Specialized herbal formulations for fish and shrimp farming that improve survival rates and feed conversion.',
  },
  Pets: {
    title: 'Natural Pet Healthcare & Nutrition Supplements | VEDVET',
    description: 'Support companion animal vitality and wellbeing with VEDVET natural herbal supplements formulated specifically for dogs, cats, and pets.',
    pageTitle: 'Pet Healthcare & Nutrition Supplements',
    tagline: 'Gentle, effective herbal supplements that promote vitality, immunity, and longevity in companion animals.',
  },
};

export const legacySlugMap: Record<string, string> = {
  'v-choline-90': 'v-choline',
  'o2ved-aq': 'o-two-ved-aq',
  'vedcal-b12': 'vedcal-b-twelve',
};

export function toProductSummary(p: Product): ProductSummary {
  return {
    name: p.name,
    slug: p.slug,
    category: p.category,
    presentation: p.presentation || '',
    shortDescription: p.shortDescription || '',
    image: p.image,
    featured: p.featured,
    displayOrder: (p as unknown as { displayOrder?: Record<string, number> }).displayOrder,
  };
}

export function getAllProducts(): Product[] {
  return rawProducts;
}

export function getAllProductSummaries(): ProductSummary[] {
  return rawProducts.map(toProductSummary);
}

export function getProductSummariesByCategory(categorySlug: string): ProductSummary[] {
  const normCat = categorySlug.toLowerCase();
  if (normCat === 'all') {
    return getAllProductSummaries();
  }
  return rawProducts
    .filter((p) => {
      const validCats = getProductAllCategories(p.category);
      return validCats.includes(normCat) || p.category.toLowerCase().includes(normCat);
    })
    .map(toProductSummary);
}

export function getProductBySlug(slug: string): Product | undefined {
  const cleanSlug = slug.toLowerCase();
  const canonicalSlug = legacySlugMap[cleanSlug] || cleanSlug;
  return rawProducts.find((p) => p.slug === canonicalSlug || p.slug === cleanSlug);
}

export function getRelatedProducts(currentSlug: string, category: string, limit = 4): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return rawProducts.slice(0, limit);

  const sameCategory = rawProducts.filter(
    (p) => p.slug !== current.slug && p.category === current.category
  );
  const otherCategory = rawProducts.filter(
    (p) => p.slug !== current.slug && p.category !== current.category
  );
  return [...sameCategory, ...otherCategory].slice(0, limit);
}

export function getProductDisplayOrder(product: ProductSummary | Product, category: string): number {
  const orderObj = product.displayOrder;
  if (!orderObj) return 9999;

  const catLower = category.toLowerCase();

  if (catLower === 'poultry') {
    return orderObj['Poultry'] ?? 9999;
  }
  if (catLower === 'livestock' || catLower === 'swine') {
    return orderObj['Livestock/Swine'] ?? orderObj['Livestock'] ?? orderObj['Swine'] ?? 9999;
  }
  if (catLower === 'aqua') {
    return orderObj['Aqua'] ?? 9999;
  }
  if (catLower === 'pets') {
    return orderObj['Pets'] ?? 9999;
  }

  // Default when category is 'All':
  if (orderObj['Poultry'] !== undefined) {
    return orderObj['Poultry'];
  }
  if (orderObj['Livestock/Swine'] !== undefined) {
    return 100 + orderObj['Livestock/Swine'];
  }
  if (orderObj['Aqua'] !== undefined) {
    return 200 + orderObj['Aqua'];
  }
  if (orderObj['Pets'] !== undefined) {
    return 300 + orderObj['Pets'];
  }
  return 9999;
}

export function getSortedProductSummaries(
  productsList: ProductSummary[],
  category = 'All'
): ProductSummary[] {
  return [...productsList].sort((a, b) => {
    const orderA = getProductDisplayOrder(a, category);
    const orderB = getProductDisplayOrder(b, category);
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });
}

export function getAllCategorySlugs(): string[] {
  return ['poultry', 'swine', 'livestock', 'aqua', 'pets'];
}

export function getAllProductPaths(): { params: { category: string; slug: string } }[] {
  const paths: { params: { category: string; slug: string } }[] = [];
  for (const product of rawProducts) {
    const validCats = getProductAllCategories(product.category);
    for (const cat of validCats) {
      paths.push({
        params: {
          category: cat.toLowerCase(),
          slug: product.slug.toLowerCase(),
        },
      });
    }
  }
  return paths;
}

export function getCategorySEO(categoryNameOrSlug: string): CategorySEOInfo {
  const label = formatCategoryLabel(categoryNameOrSlug);
  if (CATEGORY_SEO_CONFIG[label]) {
    return CATEGORY_SEO_CONFIG[label];
  }
  return {
    title: `${label} Veterinary Products & Healthcare | VEDVET`,
    description: `Explore VEDVET's premium veterinary healthcare formulations and feed supplements for ${label.toLowerCase()}. Trusted by veterinarians in 18+ countries.`,
    pageTitle: `${label} Products`,
    tagline: undefined,
  };
}
