import productsJson from '@/data/products.json';
import showcaseJson from '@/data/showcase.json';
import imagesJson from '@/data/material-images.json';

export interface ImageAsset {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  style?: string;
  seatOptions?: { label: string; size: string }[];
  dimensions?: { width: string; depth: string; height: string };
  image: ImageAsset;
  drawing?: ImageAsset;
}

export interface ProductCategory {
  id: string;
  slug: string;
  label: string;
  singular: string;
  intro: string;
  categories: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'SOFA',
    slug: 'sofas',
    label: 'Sofas',
    singular: 'sofa',
    intro:
      'Three-seaters, L-shapes and sectionals built on solid wood frames. Every sofa can be resized to your wall and upholstered in the fabric or leather you choose.',
    categories: ['SOFA'],
  },
  {
    id: 'DINING_TABLE',
    slug: 'dining-tables',
    label: 'Dining Tables',
    singular: 'dining table',
    intro:
      'Solid wood dining tables in 4, 6 and 8-seater sizes, with tops and bases that can be matched to your room and the chairs you pair them with.',
    categories: ['DINING_TABLE'],
  },
  {
    id: 'LOUNGE_CHAIR',
    slug: 'lounge-chairs',
    label: 'Lounge Chairs',
    singular: 'lounge chair',
    intro:
      'Accent and lounge chairs for living rooms, bedrooms and hotel lobbies, made in the wood, finish and upholstery of your choice.',
    categories: ['LOUNGE_CHAIR'],
  },
  {
    id: 'DINING_CHAIR',
    slug: 'dining-chairs',
    label: 'Dining Chairs',
    singular: 'dining chair',
    intro:
      'Dining chairs with proper joinery, built in sets for homes or in larger runs for restaurants and projects.',
    categories: ['DINING_CHAIR'],
  },
  {
    id: 'TABLES',
    slug: 'center-and-side-tables',
    label: 'Center & Side Tables',
    singular: 'table',
    intro:
      'Coffee tables, centre tables and side tables in solid wood, sized to sit correctly with your sofa and seating.',
    categories: ['CENTER_TABLE', 'SIDE_TABLE'],
  },
  {
    id: 'PLANTER_STAND',
    slug: 'planter-stands',
    label: 'Planter Stands',
    singular: 'planter stand',
    intro: 'Wooden planter stands for balconies, verandas and indoor corners.',
    categories: ['PLANTER_STAND'],
  },
  {
    id: 'RETAIL_SEATING',
    slug: 'retail-seating',
    label: 'Café & Retail Seating',
    singular: 'café chair',
    intro:
      'Hard-wearing chairs for cafés, restaurants and retail spaces, built for daily commercial use and made in bulk quantities.',
    categories: ['RETAIL_SEATING'],
  },
];

const byNaturalId = (a: { id: string }, b: { id: string }) =>
  a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });

export const products: Product[] = [...(productsJson as Product[])].sort(byNaturalId);

export function productsIn(category: ProductCategory): Product[] {
  return products.filter((p) => category.categories.includes(p.category));
}

export function categoryOf(product: Product): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.categories.includes(product.category));
}

export function productAlt(product: Product): string {
  const cat = categoryOf(product);
  return `${product.title} — custom ${cat?.singular ?? 'furniture'} made to order by Woodflex Designs, Surat`;
}

// ---------- Our Work ----------

export type FurnitureType = 'chair' | 'sofa' | 'bed' | 'dining';

export interface ShowcaseItem {
  id: string;
  type: FurnitureType;
  context: 'home' | 'studio';
  image: ImageAsset;
}

export const showcaseItems = showcaseJson as ShowcaseItem[];

export const WORK_TYPES: { value: FurnitureType; label: string; singular: string }[] = [
  { value: 'chair', label: 'Chairs', singular: 'chair' },
  { value: 'sofa', label: 'Sofas', singular: 'sofa' },
  { value: 'bed', label: 'Bed Frames', singular: 'bed frame' },
];

export function showcaseAlt(item: ShowcaseItem): string {
  const type = WORK_TYPES.find((t) => t.value === item.type)?.singular ?? 'furniture piece';
  return item.context === 'studio'
    ? `Custom ${type} built by Woodflex Designs, photographed in our Surat workshop`
    : `Custom ${type} made by Woodflex Designs, photographed in a client's home`;
}

// ---------- Materials ----------

const images = imagesJson as Record<string, ImageAsset>;
export const heroImage = images.hero;

export interface Material {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: ImageAsset;
}

export const WOOD_TYPES: Material[] = [
  {
    id: 'teak',
    name: 'Teak Wood',
    description:
      'Dense, durable hardwood with warm honey tones. Ideal for heavy-use furniture and outdoor pieces.',
    tags: ['High durability', 'Warm tone', 'Moisture resistant'],
    image: images.teak,
  },
  {
    id: 'sheesham',
    name: 'Sheesham (Indian Rosewood)',
    description:
      'Rich grain patterns and deep browns. Works well for statement dining tables and consoles.',
    tags: ['Bold grain', 'Indian hardwood', 'Premium look'],
    image: images.sheesham,
  },
  {
    id: 'mango',
    name: 'Mango Wood',
    description:
      'Sustainable hardwood with a soft, varied grain. Great for modern, budget-friendly furniture.',
    tags: ['Sustainable', 'Modern look', 'Light–medium tone'],
    image: images.mango,
  },
  {
    id: 'acacia',
    name: 'Acacia Wood',
    description: 'Hard, scratch-resistant surface with dramatic grain movement.',
    tags: ['Scratch resistant', 'Strong grain', 'Dining & tops'],
    image: images.acacia,
  },
  {
    id: 'white-ash',
    name: 'White Ash',
    description:
      'Light, clean base tone that takes stain very well. Perfect for Scandinavian-style pieces.',
    tags: ['Light tone', 'Takes stain well', 'Scandi style'],
    image: images['white-ash'],
  },
];

export const WOOD_FINISHES: Material[] = [
  {
    id: 'dark-brown',
    name: 'Dark Brown Polish',
    description:
      'Deep coffee-brown tone that highlights grain and gives a warm, premium feel.',
    tags: ['Rich tone', 'Premium', 'Highlight grain'],
    image: images['dark-brown'],
  },
  {
    id: 'light-brown',
    name: 'Natural / Light Brown Polish',
    description:
      'Natural, mid-brown finish that keeps the wood looking close to raw but protected.',
    tags: ['Natural look', 'Versatile', 'Low visual weight'],
    image: images['light-brown'],
  },
  {
    id: 'matte-black',
    name: 'Matte Black Finish',
    description:
      'Non-reflective black finish that softens reflections while keeping texture visible.',
    tags: ['Matte', 'Modern', 'Accent pieces'],
    image: images['matte-black'],
  },
  {
    id: 'wire-brushed',
    name: 'Wire-Brushed Finish',
    description:
      'Lightly wire-brushed surface for a tactile, rustic feel with stronger grain expression.',
    tags: ['Textured', 'Rustic', 'High grain'],
    image: images['wire-brushed'],
  },
];
