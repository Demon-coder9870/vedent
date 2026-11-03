/**
 * Core product types extracted from lib/products.ts into a dedicated types layer.
 * Import these from @/types/product instead of re-declaring inline.
 */

import type rawProducts from '@/data/products.json';

/** Full product shape as stored in products.json */
export type Product = (typeof rawProducts)[0];

/** Lightweight summary used in catalog listing views */
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

/** SEO metadata for a category listing page */
export interface CategorySEOInfo {
  title: string;
  description: string;
  pageTitle?: string;
  tagline?: string;
}
