import { Product, shuffleArray } from './products';

export interface CategoryDef {
    id: string;
    label: string;
    sublabel: string;
    filter: (p: Product) => boolean;
}

const BASE_CATEGORIES: CategoryDef[] = [
    { id: 'sofas', label: 'Sofas', sublabel: 'Living', filter: (p) => p.category === 'SOFA' },
    { id: 'dining', label: 'Dining Tables', sublabel: 'Furniture', filter: (p) => p.category === 'DINING_TABLE' },
    { id: 'tables', label: 'Center & Side Tables', sublabel: 'Living', filter: (p) => p.category === 'CENTER_TABLE' || p.category === 'SIDE_TABLE' },
    { id: 'lounge_chairs', label: 'Lounges', sublabel: 'Seating', filter: (p) => p.category === 'LOUNGE_CHAIR' },
    { id: 'dining_chairs', label: 'Dining Chairs', sublabel: 'Furniture', filter: (p) => p.category === 'DINING_CHAIR' },
    { id: 'planters', label: 'Planter Stands', sublabel: 'Decor', filter: (p) => p.category === 'PLANTER_STAND' },
    { id: 'retail', label: 'Retail Seating', sublabel: 'Commercial', filter: (p) => p.category === 'RETAIL_SEATING' }
];

export const CATEGORIES: CategoryDef[] = BASE_CATEGORIES;
