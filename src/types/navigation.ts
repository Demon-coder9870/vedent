/**
 * Shared navigation types used by Header, Footer, and mobile drawer.
 */

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavSubItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}
