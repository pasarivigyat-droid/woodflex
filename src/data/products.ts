import { supabase } from '../lib/supabase';
import { cdn } from '../utils/cdn';

export type RoomCategory =
    | "sofa"
    | "lounge_chair"
    | "center_table"
    | "planter"
    | "dining_table"
    | "dining_chair"
    | "jhula"; // Added jhula as it's in the data

export interface Product {
    id: string;
    title: string;
    name?: string;
    category: RoomCategory | string; // Allow string for backward compatibility during transition
    type: string;
    imagePath: string;
    technicalDrawing?: string;
    sceneCategory?: 'living' | 'dining' | 'outdoor' | 'bedroom' | 'office';
    seatOptions?: { label: string; size: string }[];
    collectionName?: string;
    style?: 'Modern' | 'Minimalist' | 'Industrial' | 'Luxury' | 'Boho';
    dimensions?: { width: string; depth: string; height: string };
}

export const CATEGORY_LABELS: Record<string, string> = {
    'sofa': 'Sofas',
    'lounge_chair': 'Lounges',
    'center_table': 'Center Tables',
    'planter': 'Planter Stands',
    'dining_table': 'Dining Tables',
    'dining_chair': 'Dining Chairs',
    'jhula': 'Jhulas'
};

// Utility to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const products: Product[] = [
    // --- CHAIRS (WFC-01 to WFC-11) ---
    { id: "LC-01", title: "WFC Dining 01", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-01.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-01.png"), sceneCategory: 'dining', style: 'Modern' },
    { id: "LC-02", title: "WFC Dining 02", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-02.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-02.png"), sceneCategory: 'dining', style: 'Minimalist' },
    { id: "LC-03", title: "WFC Dining 03", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-03.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-03.png"), sceneCategory: 'dining', style: 'Industrial' },
    { id: "LC-04", title: "WFC Dining 04", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-04.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-04.png"), sceneCategory: 'dining', style: 'Luxury' },
    { id: "LC-05", title: "WFC Dining 05", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-05.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-05.png"), sceneCategory: 'dining', style: 'Boho' },
    { id: "LC-06", title: "WFC Dining 06", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-06.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-06.png"), sceneCategory: 'dining', style: 'Modern' },
    { id: "LC-07", title: "WFC Dining 07", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-07.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-07.png"), sceneCategory: 'dining' },
    { id: "LC-08", title: "WFC Dining 08", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-08.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-08.png"), sceneCategory: 'dining' },
    { id: "LC-09", title: "WFC Dining 09", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-09.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-09.png"), sceneCategory: 'dining' },
    { id: "LC-10", title: "WFC Dining 10", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-10.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-10.png"), sceneCategory: 'dining' },
    { id: "LC-11", title: "WFC Dining 11", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-11.png"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-11.png"), sceneCategory: 'dining' },
    { id: "LC-12", title: "WFC Dining 12", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-12.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-12.png"), sceneCategory: 'dining' },
    { id: "LC-13", title: "WFC Dining 13", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-13.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-13.png"), sceneCategory: 'dining' },
    { id: "LC-14", title: "WFC Dining 14", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-14.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-14.png"), sceneCategory: 'dining' },
    { id: "LC-15", title: "WFC Dining 15", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-15.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-15.png"), sceneCategory: 'dining' },
    { id: "LC-16", title: "WFC Dining 16", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-16.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-16.png"), sceneCategory: 'dining' },
    { id: "LC-17", title: "WFC Dining 17", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-17.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-17.png"), sceneCategory: 'dining' },
    { id: "LC-18", title: "WFC Dining 18", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-18.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-18.png"), sceneCategory: 'dining' },
    { id: "LC-19", title: "WFC Dining 19", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-19.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-19.png"), sceneCategory: 'dining' },
    { id: "LC-20", title: "WFC Dining 20", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-20.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-20.png"), sceneCategory: 'dining' },
    { id: "LC-21", title: "WFC Dining 21", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-21.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-21.png"), sceneCategory: 'dining' },
    { id: "LC-22", title: "WFC Dining 22", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-22.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-22.png"), sceneCategory: 'dining' },
    { id: "LC-23", title: "WFC Dining 23", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-23.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-23.png"), sceneCategory: 'dining' },
    { id: "LC-24", title: "WFC Dining 24", category: "DINING_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Chairs/WFC-24.jpg"), technicalDrawing: cdn("Catalouge/Chairs%20Drawing/WFCD-24.png"), sceneCategory: 'dining' },

    // --- DINING TABLES (DT-01 to DT-12) ---
    {
        id: "DT-01",
        title: "Dining Table 01",
        category: "DINING_TABLE",
        type: "Table",
        imagePath: cdn("Catalouge/Dinning%20tables/DT-01.jpg"),
        technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-01.png"),
        sceneCategory: 'dining',
        style: 'Minimalist',
        seatOptions: [
            { label: "4-seater", size: "1500 × 900 mm" },
            { label: "6-seater", size: "1800 × 900 mm" },
            { label: "8-seater", size: "2200 × 1000 mm" },
        ]
    },
    {
        id: "DT-02",
        title: "Dining Table 02",
        category: "DINING_TABLE",
        type: "Table",
        imagePath: cdn("Catalouge/Dinning%20tables/DT-02.jpg"),
        technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-02.png"),
        sceneCategory: 'dining',
        style: 'Modern',
        seatOptions: [
            { label: "4-seater", size: "1500 × 900 mm" },
            { label: "6-seater", size: "1800 × 900 mm" },
            { label: "8-seater", size: "2200 × 1000 mm" },
        ]
    },
    {
        id: "DT-03",
        title: "Dining Table 03",
        category: "DINING_TABLE",
        type: "Table",
        imagePath: cdn("Catalouge/Dinning%20tables/DT-03.png"),
        technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-03.png"),
        sceneCategory: 'dining',
        seatOptions: [
            { label: "4-seater", size: "1500 × 900 mm" },
            { label: "6-seater", size: "1800 × 900 mm" },
            { label: "8-seater", size: "2200 × 1000 mm" },
        ]
    },
    {
        id: "DT-04",
        title: "Dining Table 04",
        category: "DINING_TABLE",
        type: "Table",
        imagePath: cdn("Catalouge/Dinning%20tables/DT-04.png"),
        technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-04.png"),
        sceneCategory: 'dining',
        seatOptions: [
            { label: "6-seater", size: "1800 × 900 mm" },
            { label: "8-seater", size: "2200 × 1000 mm" },
        ]
    },
    { id: "DT-05", title: "Dining Table 05", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-05.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-05.png"), sceneCategory: 'dining', seatOptions: [{ label: "4-seater", size: "1500 × 900 mm" }, { label: "6-seater", size: "1800 × 900 mm" }] },
    { id: "DT-06", title: "Dining Table 06", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-06.png"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-06.png",), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-07", title: "Dining Table 07", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-07.png"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-07.png"), sceneCategory: 'dining', seatOptions: [{ label: "4-seater", size: "1500 × 900 mm" }, { label: "6-seater", size: "1800 × 900 mm" }] },
    { id: "DT-08", title: "Dining Table 08", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-08.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-08.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }] },
    { id: "DT-09", title: "Dining Table 09", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-09.png"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-09.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2400 × 1100 mm" }] },
    { id: "DT-10", title: "Dining Table 10", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-10.png"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-10.png"), sceneCategory: 'dining', seatOptions: [{ label: "4-seater", size: "1500 × 900 mm" }, { label: "6-seater", size: "1800 × 900 mm" }] },
    { id: "DT-11", title: "Dining Table 11", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-11.png"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-11.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-12", title: "Dining Table 12", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-12.png"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-12.png"), sceneCategory: 'dining', seatOptions: [{ label: "4-seater", size: "1500 × 900 mm" }, { label: "6-seater", size: "1800 × 900 mm" }] },
    { id: "DT-13", title: "Dining Table 13", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-13.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-13.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-14", title: "Dining Table 14", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-14.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-14.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-15", title: "Dining Table 15", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-15.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-15.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-16", title: "Dining Table 16", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-16.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-16.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }] },
    { id: "DT-17", title: "Dining Table 17", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-17.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-17.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2400 × 1100 mm" }] },
    { id: "DT-18", title: "Dining Table 18", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-18.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-18.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-19", title: "Dining Table 19", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-19.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-19.png"), sceneCategory: 'dining', seatOptions: [{ label: "4-seater", size: "1500 × 900 mm" }, { label: "6-seater", size: "1800 × 900 mm" }] },
    { id: "DT-20", title: "Dining Table 20", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-20.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-20.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-21", title: "Dining Table 21", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-21.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-21.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-22", title: "Dining Table 22", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-22.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-22.png"), sceneCategory: 'dining', seatOptions: [{ label: "6-seater", size: "1800 × 900 mm" }, { label: "8-seater", size: "2200 × 1000 mm" }] },
    { id: "DT-23", title: "Dining Table 23", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-23.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-23.png"), sceneCategory: 'dining' },
    { id: "DT-24", title: "Dining Table 24", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-24.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-24.png"), sceneCategory: 'dining' },
    { id: "DT-25", title: "Dining Table 25", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-25.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-25.png"), sceneCategory: 'dining' },
    { id: "DT-26", title: "Dining Table 26", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-26.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-26.png"), sceneCategory: 'dining' },
    { id: "DT-27", title: "Dining Table 27", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-27.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-27.png"), sceneCategory: 'dining' },
    { id: "DT-28", title: "Dining Table 28", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-28.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-28.png"), sceneCategory: 'dining' },
    { id: "DT-29", title: "Dining Table 29", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-29.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-29.png"), sceneCategory: 'dining' },
    { id: "DT-30", title: "Dining Table 30", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-30.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-30.png"), sceneCategory: 'dining' },
    { id: "DT-31", title: "Dining Table 31", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-31.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-31.png"), sceneCategory: 'dining' },
    { id: "DT-32", title: "Dining Table 32", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-32.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-32.png"), sceneCategory: 'dining' },
    { id: "DT-33", title: "Dining Table 33", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-33.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-33.png"), sceneCategory: 'dining' },
    { id: "DT-34", title: "Dining Table 34", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-34.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-34.jpg"), sceneCategory: 'dining' },
    { id: "DT-35", title: "Dining Table 35", category: "DINING_TABLE", type: "Table", imagePath: cdn("Catalouge/Dinning%20tables/DT-35.jpg"), technicalDrawing: cdn("Catalouge/Dinning%20table%20drawing/DTD-35.png"), sceneCategory: 'dining' },

    // --- CENTER TABLES (Previously Side Tables) ---
    { id: "ST-01", title: "Center Table 01", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-01.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-01.png"), sceneCategory: 'living', style: 'Luxury' },
    { id: "ST-02", title: "Center Table 02", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-02.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-02.png"), sceneCategory: 'living', style: 'Industrial' },
    { id: "ST-03", title: "Center Table 03", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-03.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-03.png"), sceneCategory: 'living', style: 'Minimalist' },
    { id: "ST-04", title: "Center Table 04", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-04.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-04.png"), sceneCategory: 'living' },
    { id: "ST-05", title: "Center Table 05", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-05.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-05.png"), sceneCategory: 'living' },
    { id: "ST-06", title: "Center Table 06", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-06.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-06.png"), sceneCategory: 'living', style: 'Boho' },
    { id: "ST-07", title: "Center Table 07", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-07.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-07.png"), sceneCategory: 'living', style: 'Modern' },
    { id: "ST-08", title: "Center Table 08", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-08.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-08.png"), sceneCategory: 'living', style: 'Industrial' },
    { id: "ST-09", title: "Center Table 09", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-09.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-09.png"), sceneCategory: 'living', style: 'Luxury' },
    { id: "ST-10", title: "Center Table 10", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-10.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-10.png"), sceneCategory: 'living', style: 'Minimalist' },
    { id: "ST-11", title: "Center Table 11", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-11.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-11.png"), sceneCategory: 'living' },
    { id: "ST-12", title: "Center Table 12", category: "CENTER_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-12.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-12.png"), sceneCategory: 'living' },
    { id: "ST-13", title: "Center Table 13", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-13.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-13.png"), sceneCategory: 'living' },
    { id: "ST-14", title: "Center Table 14", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-14.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-14.png"), sceneCategory: 'living' },
    { id: "ST-15", title: "Center Table 15", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-15.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-15.png"), sceneCategory: 'living' },
    { id: "ST-16", title: "Center Table 16", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-16.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-16.png"), sceneCategory: 'living' },
    { id: "ST-17", title: "Center Table 17", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-17.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-17.png"), sceneCategory: 'living' },
    { id: "ST-18", title: "Center Table 18", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-18.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-18.png"), sceneCategory: 'living' },
    { id: "ST-19", title: "Center Table 19", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-19.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-19.png"), sceneCategory: 'living' },
    { id: "ST-20", title: "Center Table 20", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-20.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-20.png"), sceneCategory: 'living' },
    { id: "ST-21", title: "Center Table 21", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-21.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-21.png"), sceneCategory: 'living' },
    { id: "ST-22", title: "Center Table 22", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-22.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-22.png"), sceneCategory: 'living' },
    { id: "ST-23", title: "Center Table 23", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-23.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-23.png"), sceneCategory: 'living' },
    { id: "ST-24", title: "Center Table 24", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-24.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-24.png"), sceneCategory: 'living' },
    { id: "ST-25", title: "Center Table 25", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-25.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-25.png"), sceneCategory: 'living' },
    { id: "ST-26", title: "Center Table 26", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-26.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-26.png"), sceneCategory: 'living' },
    { id: "ST-27", title: "Center Table 27", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-27.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-27.png"), sceneCategory: 'living' },
    { id: "ST-28", title: "Center Table 28", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-28.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-28.png"), sceneCategory: 'living' },
    { id: "ST-29", title: "Center Table 29", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-29.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-29.png"), sceneCategory: 'living' },
    { id: "ST-30", title: "Center Table 30", category: "SIDE_TABLE", type: "Table", imagePath: cdn("Catalouge/Side%20tables/ST-30.jpg"), technicalDrawing: cdn("Catalouge/Side%20table%20drawings/STD-30.png"), sceneCategory: 'living' },

    // --- LOUNGES (Previously Lounge Chairs) ---
    { id: "LRC-01", title: "Lounge 01", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-01.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-01.png"), sceneCategory: 'living', style: 'Modern' },
    { id: "LRC-02", title: "Lounge 02", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-02.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-02.png"), sceneCategory: 'living', style: 'Boho' },
    { id: "LRC-03", title: "Lounge 03", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-03.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-03.png"), sceneCategory: 'living', style: 'Industrial' },
    { id: "LRC-04", title: "Lounge 04", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-04.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-04.png"), sceneCategory: 'living', style: 'Luxury' },
    { id: "LRC-05", title: "Lounge 05", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-05.png"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-05.png"), sceneCategory: 'living', style: 'Minimalist' },
    { id: "LRC-06", title: "Lounge 06", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-06.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-06.png"), sceneCategory: 'living' },
    { id: "LRC-07", title: "Lounge 07", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-07.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-07.png"), sceneCategory: 'living' },
    { id: "LRC-08", title: "Lounge 08", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-08.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-08.png"), sceneCategory: 'living' },
    { id: "LRC-09", title: "Lounge 09", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-09.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-09.png"), sceneCategory: 'living' },
    { id: "LRC-10", title: "Lounge 10", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-10.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-10.png"), sceneCategory: 'living' },
    { id: "LRC-11", title: "Lounge 11", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-11.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-11.png"), sceneCategory: 'living' },
    { id: "LRC-12", title: "Lounge 12", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-12.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-12.png"), sceneCategory: 'living' },
    { id: "LRC-13", title: "Lounge 13", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-13.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-13.png"), sceneCategory: 'living' },
    { id: "LRC-14", title: "Lounge 14", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-14.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-14.png"), sceneCategory: 'living' },
    { id: "LRC-15", title: "Lounge 15", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-15.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-15.png"), sceneCategory: 'living' },
    { id: "LRC-16", title: "Lounge 16", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-16.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-16.png"), sceneCategory: 'living' },
    { id: "LRC-17", title: "Lounge 17", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-17.png"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-17.png"), sceneCategory: 'living' },
    { id: "LRC-18", title: "Lounge 18", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-18.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-18.png"), sceneCategory: 'living' },
    { id: "LRC-19", title: "Lounge 19", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-19.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-19.png"), sceneCategory: 'living' },
    { id: "LRC-20", title: "Lounge 20", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-20.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-20.png"), sceneCategory: 'living' },
    { id: "LRC-21", title: "Lounge 21", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-21.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-21.png"), sceneCategory: 'living' },
    { id: "LRC-23", title: "Lounge 23", category: "LOUNGE_CHAIR", type: "Seating", imagePath: cdn("Catalouge/Livingroom%20Chairs/LC-23.jpg"), technicalDrawing: cdn("Catalouge/living%20room%20chair%20drawing/LCD-23.png"), sceneCategory: 'living' },

    // --- SOFAS (S-01 to S-09) ---
    // --- SOFAS (S-01 to S-09) ---
    { id: "S-01", title: "Woodflex Designs Sofa 01", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-01.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-01.png"), sceneCategory: 'living', style: 'Luxury', dimensions: { width: "2100 mm", depth: "900 mm", height: "850 mm" } },
    { id: "S-02", title: "Woodflex Designs Sofa 02", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-02.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-02.png"), sceneCategory: 'living', style: 'Modern' },
    { id: "S-03", title: "Woodflex Designs Sofa 03", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-03.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-03.png"), sceneCategory: 'living', style: 'Boho' },
    { id: "S-04", title: "Woodflex Designs Sofa 04", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-04.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-04.png"), sceneCategory: 'living', style: 'Industrial' },
    { id: "S-05", title: "Woodflex Designs Sofa 05", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-05.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-05.png"), sceneCategory: 'living', style: 'Minimalist' },
    { id: "S-06", title: "Woodflex Designs Sofa 06", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-06.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-06.png"), sceneCategory: 'living', style: 'Modern' },
    { id: "S-07", title: "Woodflex Designs Sofa 07", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-07.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-07.png"), sceneCategory: 'living' },
    { id: "S-08", title: "Woodflex Designs Sofa 08", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-08.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-08.png"), sceneCategory: 'living' },
    { id: "S-09", title: "Woodflex Designs Sofa 09", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-09.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-09.png"), sceneCategory: 'living' },
    { id: "S-10", title: "Woodflex Designs Sofa 10", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-10.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-10.png"), sceneCategory: 'living' },
    { id: "S-11", title: "Woodflex Designs Sofa 11", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-11.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-11.png"), sceneCategory: 'living' },
    { id: "S-12", title: "Woodflex Designs Sofa 12", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-12.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-12.png"), sceneCategory: 'living' },
    { id: "S-13", title: "Woodflex Designs Sofa 13", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-13.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-13.png"), sceneCategory: 'living' },
    { id: "S-14", title: "Woodflex Designs Sofa 14", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-14.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-14.png"), sceneCategory: 'living' },
    { id: "S-15", title: "Woodflex Designs Sofa 15", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-15.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-15.png"), sceneCategory: 'living' },
    { id: "S-16", title: "Woodflex Designs Sofa 16", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-16.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-16.png"), sceneCategory: 'living' },
    { id: "S-17", title: "Woodflex Designs Sofa 17", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-17.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-17.png"), sceneCategory: 'living' },
    { id: "S-18", title: "Woodflex Designs Sofa 18", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-18.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-18.png"), sceneCategory: 'living' },
    { id: "S-19", title: "Woodflex Designs Sofa 19", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-19.png"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-19.png"), sceneCategory: 'living' },
    { id: "S-20", title: "Woodflex Designs Sofa 20", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-20.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-20.png"), sceneCategory: 'living' },
    { id: "S-21", title: "Woodflex Designs Sofa 21", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-21.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-21.png"), sceneCategory: 'living' },
    { id: "S-22", title: "Woodflex Designs Sofa 22", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-22.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-22.png"), sceneCategory: 'living' },
    { id: "S-23", title: "Woodflex Designs Sofa 23", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-23.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-23.png"), sceneCategory: 'living' },
    { id: "S-24", title: "Woodflex Designs Sofa 24", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-24.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-24.png"), sceneCategory: 'living' },
    { id: "S-25", title: "Woodflex Designs Sofa 25", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-25.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-25.png"), sceneCategory: 'living' },
    { id: "S-26", title: "Woodflex Designs Sofa 26", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-26.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-26.png"), sceneCategory: 'living' },
    { id: "S-27", title: "Woodflex Designs Sofa 27", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-27.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-27.png"), sceneCategory: 'living' },
    { id: "S-28", title: "Woodflex Designs Sofa 28", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-28.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-28.png"), sceneCategory: 'living' },
    { id: "S-29", title: "Woodflex Designs Sofa 29", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-29.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-29.png"), sceneCategory: 'living' },
    { id: "S-30", title: "Woodflex Designs Sofa 30", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-30.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-30.png"), sceneCategory: 'living' },
    { id: "S-31", title: "Woodflex Designs Sofa 31", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-31.jpeg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-31.png"), sceneCategory: 'living' },
    { id: "S-32", title: "Woodflex Designs Sofa 32", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-32.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-32.png"), sceneCategory: 'living' },
    { id: "S-33", title: "Woodflex Designs Sofa 33", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-33.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-33.png"), sceneCategory: 'living' },
    { id: "S-34", title: "Woodflex Designs Sofa 34", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-34.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-34.png"), sceneCategory: 'living' },
    { id: "S-35", title: "Woodflex Designs Sofa 35", category: "SOFA", type: "Seating", imagePath: cdn("Catalouge/Sofa/S-35.jpg"), technicalDrawing: cdn("Catalouge/Sofa%20Drawing/SD-35.png"), sceneCategory: 'living' },

    // --- RETAIL SEATING (JC-01 to JC-19) ---
    { id: "JC-01", title: "Retail Chair 01", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-01.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-01.png"), sceneCategory: 'office', style: 'Modern' },
    { id: "JC-02", title: "Retail Chair 02", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-02.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-02.png"), sceneCategory: 'office', style: 'Industrial' },
    { id: "JC-03", title: "Retail Chair 03", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-03.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-03.png"), sceneCategory: 'office', style: 'Minimalist' },
    { id: "JC-04", title: "Retail Chair 04", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-04.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-04.png"), sceneCategory: 'office', style: 'Luxury' },
    { id: "JC-05", title: "Retail Chair 05", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-05.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-05.png"), sceneCategory: 'office', style: 'Boho' },
    { id: "JC-06", title: "Retail Chair 06", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-06.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-06.png"), sceneCategory: 'office' },
    { id: "JC-07", title: "Retail Chair 07", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-07.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-07.png"), sceneCategory: 'office' },
    { id: "JC-08", title: "Retail Chair 08", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-08.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-08.png"), sceneCategory: 'office' },
    { id: "JC-09", title: "Retail Chair 09", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-09.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-09.png"), sceneCategory: 'office' },
    { id: "JC-10", title: "Retail Chair 10", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-10.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-10.png"), sceneCategory: 'office' },
    { id: "JC-11", title: "Retail Chair 11", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-11.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-11.png"), sceneCategory: 'office' },
    { id: "JC-12", title: "Retail Chair 12", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-12.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-12.png"), sceneCategory: 'office' },
    { id: "JC-13", title: "Retail Chair 13", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-13.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-13.png"), sceneCategory: 'office' },
    { id: "JC-14", title: "Retail Chair 14", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-14.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-14.png"), sceneCategory: 'office' },
    { id: "JC-15", title: "Retail Chair 15", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-15.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-15.png"), sceneCategory: 'office' },
    { id: "JC-16", title: "Retail Chair 16", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-16.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-16.png"), sceneCategory: 'office' },
    { id: "JC-17", title: "Retail Chair 17", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-17.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-17.png"), sceneCategory: 'office' },
    { id: "JC-18", title: "Retail Chair 18", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-18.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-18.png"), sceneCategory: 'office' },
    { id: "JC-19", title: "Retail Chair 19", category: "RETAIL_SEATING", type: "Seating", imagePath: cdn("Catalouge/Retail%20Seating/JC-19.jpg"), technicalDrawing: cdn("Catalouge/Retail%20Seating%20Drawing/JCD-19.png"), sceneCategory: 'office' },

    // --- PLANTER STANDS ---
    { id: "PS-01", title: "Plant Stand 01", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-01.jpg"), sceneCategory: 'living', style: 'Boho' },
    { id: "PS-02", title: "Plant Stand 02", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-02.jpg"), sceneCategory: 'living', style: 'Modern' },
    { id: "PS-03", title: "Plant Stand 03", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-03.jpg"), sceneCategory: 'living', style: 'Minimalist' },
    { id: "PS-04", title: "Plant Stand 04", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-04.jpg"), sceneCategory: 'living', style: 'Industrial' },
    { id: "PS-05", title: "Plant Stand 05", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-05.jpg"), sceneCategory: 'living', style: 'Luxury' },
    { id: "PS-06", title: "Plant Stand 06", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-06.jpg"), sceneCategory: 'living' },
    { id: "PS-07", title: "Plant Stand 07", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-07.jpg"), sceneCategory: 'living' },
    { id: "PS-08", title: "Plant Stand 08", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-08.jpg"), sceneCategory: 'living' },
    { id: "PS-09", title: "Plant Stand 09", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-09.jpg"), sceneCategory: 'living' },
    { id: "PS-11", title: "Plant Stand 11", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-11.jpg"), sceneCategory: 'living' },
    { id: "PS-12", title: "Plant Stand 12", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-12.jpg"), sceneCategory: 'living' },
    { id: "PS-13", title: "Plant Stand 13", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-13.jpg"), sceneCategory: 'living' },
    { id: "PS-14", title: "Plant Stand 14", category: "PLANTER_STAND", type: "Decor", imagePath: cdn("Catalouge/Plant%20stands/PS-14.jpg"), sceneCategory: 'living' },

    // --- OTHER / OUTDOOR ---
    { id: "JHULA-01", title: "Wicker Swing Chair", category: "JHULA", type: "Outdoor", imagePath: "https://placehold.co/400x500/81C784/FFF?text=Jhula+01", sceneCategory: 'outdoor' },
    { id: "JHULA-02", title: "Macrame Swing", category: "JHULA", type: "Outdoor", imagePath: "https://placehold.co/400x500/81C784/FFF?text=Jhula+02", sceneCategory: 'outdoor' },
];

/**
 * Fetches products from Supabase back-end.
 * Falls back to local products if there's an error.
 */
export async function getRemoteProducts(): Promise<Product[]> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        if (!data || data.length === 0) return products;

        return data.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category,
            type: p.type,
            imagePath: cdn(p.image_path),
            technicalDrawing: cdn(p.technical_drawing),
            sceneCategory: p.scene_category,
            style: p.style,
            ...p.metadata
        }));
    } catch (err) {
        console.error('Supabase fetch error, using local fallback:', err);
        return products;
    }
}
