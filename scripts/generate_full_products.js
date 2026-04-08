const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const catalogDir = path.join(publicDir, 'Catalouge');
const outputFile = path.join(process.cwd(), 'src', 'data', 'products.ts');

const categoryMap = {
    'Center  tables': { category: 'Center Tables', type: 'Table' },
    'Chairs': { category: 'Chairs', type: 'Seating' },
    'Dinning tables': { category: 'Dining Tables', type: 'Table' },
    'Jewellery Chair': { category: 'Jewelry Chair', type: 'Seating' },
    'Livingroom Chairs': { category: 'Living Room Chairs', type: 'Seating' },
    'Side tables': { category: 'Side Tables', type: 'Table' }
};

const products = [];
let idCounter = 1;

try {
    console.log(`Scanning catalog: ${catalogDir}`);
    if (!fs.existsSync(catalogDir)) {
        console.error("Catalog directory does not exist!");
        process.exit(1);
    }

    const items = fs.readdirSync(catalogDir);

    items.forEach(dirName => {
        const fullPath = path.join(catalogDir, dirName);
        if (fs.statSync(fullPath).isDirectory()) {

            // Skip drawing folders generally
            if (!dirName.toLowerCase().includes('drawing')) {
                const config = categoryMap[dirName] || { category: dirName, type: 'Furniture' };
                console.log(`Processing category: ${dirName}`);

                const files = fs.readdirSync(fullPath);
                files.forEach(file => {
                    if (file.match(/\.(jpg|jpeg|png)$/i)) {
                        const relativePath = `/Catalouge/${dirName}/${file}`;

                        // Determine ID
                        let id = `SKU-${idCounter++}`;

                        // Specific Logic for Side Tables mapping (ST-xx -> STD-xx)
                        let drawingPath = undefined;
                        if (dirName === 'Side tables') {
                            // File is like ST-01.jpg
                            const basename = path.basename(file, path.extname(file)); // ST-01
                            if (basename.startsWith('ST-')) {
                                const numberPart = basename.replace('ST-', '');
                                // Drawing is in "Side table drawings/STD-xx.png"
                                // Verify if it exists? Or just assume. Let's assume for now, logic matches user request.
                                drawingPath = `/Catalouge/Side table drawings/STD-${numberPart}.png`;
                                id = basename; // Use ST-01 as ID
                            }
                        }

                        products.push({
                            id: id,
                            title: `${config.category} ${id}`,
                            category: config.category,
                            type: config.type,
                            imagePath: relativePath,
                            drawingPath: drawingPath
                        });
                    }
                });
            }
        }
    });

} catch (e) {
    console.error("Error reading catalog:", e);
}

const fileContent = `export interface Product {
    id: string;
    title: string;
    category: string;
    type: string;
    imagePath: string;
    drawingPath?: string;
    settingPath?: string;
    dimensions?: string;
}

export const products: Product[] = ${JSON.stringify(products, null, 4)};
`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Generated products.ts with ${products.length} items.`);
