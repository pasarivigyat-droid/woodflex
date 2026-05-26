const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'src/data/products.ts');
let content = fs.readFileSync(productsFile, 'utf8');

// Replace "// MISSING IMAGE: " with ""
content = content.replace(/\/\/ MISSING IMAGE: /g, '');

fs.writeFileSync(productsFile, content);
console.log('Uncommented missing images!');
