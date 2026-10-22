export const categories = ['All', 'Poultry', 'Swine', 'Livestock', 'Aqua', 'Pets'] as const;

export function getProductPrimaryCategory(category: string): string {
  const lower = (category || '').toLowerCase();
  if (lower.includes('aqua')) return 'aqua';
  if (lower.includes('pet')) return 'pets';
  if (lower.includes('poultry')) return 'poultry';
  if (lower.includes('livestock')) return 'livestock';
  if (lower.includes('swine')) return 'swine';
  return 'poultry';
}

export function getProductAllCategories(category: string): string[] {
  const lower = (category || '').toLowerCase();
  const list: string[] = [];
  if (lower.includes('poultry')) list.push('poultry');
  if (lower.includes('swine')) list.push('swine');
  if (lower.includes('livestock')) list.push('livestock');
  if (lower.includes('aqua')) list.push('aqua');
  if (lower.includes('pet')) list.push('pets');
  return list.length > 0 ? list : ['poultry'];
}

export function formatCategoryLabel(catSlug: string): string {
  const match = categories.find((c) => c.toLowerCase() === catSlug.toLowerCase());
  if (match) return match;
  return catSlug.charAt(0).toUpperCase() + catSlug.slice(1);
}
