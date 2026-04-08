import { cdn } from '../utils/cdn';

export type FurnitureType = 'chair' | 'sofa' | 'bed' | 'dining';
export type ProjectContext = 'home' | 'studio';

export interface ShowcaseItem {
    id: string;
    type: FurnitureType;
    context: ProjectContext;
    image: string;
}

// Helper to generate IDs
const gid = (prefix: string, index: number) => `${prefix}-${index.toString().padStart(2, '0')}`;

// CHAIRS (21 photos found)
const chairImages = [
    'WhatsApp Image 2026-01-24 at 11.48.01 AM.jpg',
    'WhatsApp Image 2026-01-24 at 11.48.02 AM (1).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.04 AM (2).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.04 AM (4).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.04 AM (7).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.05 AM (10).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.05 AM (11).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.05 AM (14).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.05 AM (2).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.05 AM (4).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.05 AM (8).jpg',
    'WhatsApp Image 2026-01-24 at 11.48.05 AM.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.12.jpg',
    'WhatsApp Image 2026-02-06 at 15.36.01 (7).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.01 (8).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.01 (9).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.56 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.59 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.59.jpg',
    'WhatsApp Image 2026-02-06 at 15.37.03.jpg',
    'WhatsApp Image 2026-02-06 at 15.37.16.jpg',
];

// SOFAS (44 photos found)
const sofaImages = [
    'WhatsApp Image 2026-02-06 at 15.35.03 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.03.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.04 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.04 (2).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.04.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.05 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.05.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.06 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.06 (2).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.06.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.07.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.09 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.09 (2).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.10 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.10.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.11 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.11.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.12 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.12 (2).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.13 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.14 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.14 (2).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.14.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.15 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.15.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.16 (2).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.16.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.17 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.17.jpg',
    'WhatsApp Image 2026-02-06 at 15.35.18 (2).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.19 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.35.58.jpg',
    'WhatsApp Image 2026-02-06 at 15.36.00 (1).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.00 (3).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.00 (5).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.00 (6).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.00.jpg',
    'WhatsApp Image 2026-02-06 at 15.36.01 (12).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.01 (3).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.01 (4).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.01 (5).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.02 (7).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.02 (8).jpg',
    'WhatsApp Image 2026-02-06 at 15.36.02.jpg',
];

// BEDS (33 photos + hero found)
const bedImages = [
    'WhatsApp Image 2026-02-06 at 15.36.01 (2).jpg',
    'WhatsApp Image 2026-02-13 at 12.53.02.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.04.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.05.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.07.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.08.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.10.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.11.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.13.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.15.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.16.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.17.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.19.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.21.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.23.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.25.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.27.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.29.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.30.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.32.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.35.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.38.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.40.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.42.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.44.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.46.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.48.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.53.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.55.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.57.jpg',
    'WhatsApp Image 2026-02-13 at 12.53.59.jpg',
    'WhatsApp Image 2026-02-13 at 12.54.01.jpg',
    'WhatsApp Image 2026-02-13 at 12.54.04.jpg',
];

export const showcaseItems: ShowcaseItem[] = [
    ...chairImages.map((img, i) => ({
        id: gid('c', i),
        type: 'chair' as FurnitureType,
        context: (i % 2 === 0 ? 'home' : 'studio') as ProjectContext,
        image: cdn(`Showcase/chair/${img}`)
    })),
    ...sofaImages.map((img, i) => ({
        id: gid('s', i),
        type: 'sofa' as FurnitureType,
        context: (i % 3 === 0 ? 'home' : 'studio') as ProjectContext,
        image: cdn(`Showcase/sofa/${img}`)
    })),
    ...bedImages.map((img, i) => ({
        id: gid('b', i),
        type: 'bed' as FurnitureType,
        context: (i % 4 === 0 ? 'home' : 'studio') as ProjectContext,
        image: cdn(`Showcase/bed frames/${img}`)
    }))
];
