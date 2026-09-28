import type { MetadataRoute } from 'next';
import { heroImage, PRODUCT_CATEGORIES, productsIn, showcaseItems, WOOD_FINISHES, WOOD_TYPES } from '@/lib/catalog';
import { absoluteUrl } from '@/lib/seo';

// Phase 1 pages only. Add new routes here as they launch.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const productImages = PRODUCT_CATEGORIES.flatMap((c) => productsIn(c).map((p) => absoluteUrl(p.image.src)));

  return [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/products'), lastModified, changeFrequency: 'weekly', priority: 0.9, images: productImages },
    {
      url: absoluteUrl('/work'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [heroImage, ...showcaseItems.map((s) => s.image)].map((i) => absoluteUrl(i.src)),
    },
    {
      url: absoluteUrl('/materials'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [...WOOD_TYPES, ...WOOD_FINISHES].map((m) => absoluteUrl(m.image.src)),
    },
    { url: absoluteUrl('/about'), lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: absoluteUrl('/contact'), lastModified, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
