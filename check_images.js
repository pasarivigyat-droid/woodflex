const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'Public');
const productsFile = path.join(__dirname, 'src/data/products.ts');

const content = fs.readFileSync(productsFile, 'utf8');

// match lines that contain an imagePath: cdn("...")
const lines = content.split('\n');
let missingCount = 0;
let updatedLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/imagePath:\s*(?:cdn\(['"](.*?)['"]\)|['"](.*?)['"])/);
    
    if (match) {
        const imagePathStr = match[1] || match[2];
        if (imagePathStr && !imagePathStr.startsWith('http')) {
            // Check if it exists
            const decodedRegex = decodeURIComponent(imagePathStr);
            const fullPath = path.join(publicDir, decodedRegex);
            
            if (!fs.existsSync(fullPath)) {
                missingCount++;
                console.log('Missing:', decodedRegex);
                // Comment out the line
                updatedLines.push('// MISSING IMAGE: ' + line);
                continue;
            }
        }
    }
    updatedLines.push(line);
}

fs.writeFileSync(productsFile, updatedLines.join('\n'));
console.log('Total Missing Images Commented Out:', missingCount);
