import React from 'react';

export interface FeaturedBadgeProps {
  featured?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function getFeaturedBadgeConfig(featured?: string | null) {
  if (!featured || typeof featured !== 'string' || !featured.trim()) return null;
  const lower = featured.toLowerCase().trim();

  if (lower.includes('best') || lower.includes('seller') || lower.includes('top')) {
    return {
      variant: 'bestseller',
      icon: 'bi bi-award-fill',
      label: featured,
    };
  }
  if (lower.includes('popular') || lower.includes('trending') || lower.includes('hot')) {
    return {
      variant: 'popular',
      icon: 'bi bi-fire',
    };
  }
  return {
    variant: 'default',
    icon: 'bi bi-stars',
    label: featured,
  };
}

export default function FeaturedBadge({ featured, className = '', size = 'md' }: FeaturedBadgeProps) {
  const config = getFeaturedBadgeConfig(featured);
  if (!config) return null;

  return (
    <span className={`product-featured-badge badge-${config.variant} badge-${size} ${className}`.trim()}>
      <span>{featured}</span>
    </span>
  );
}
