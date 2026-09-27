#!/usr/bin/env node
// Convert a source photo to web-ready WebP files and print the JSON to paste into data/*.json.
//
// Usage:
//   npm run optimize-image -- <input-file> <output-base> [widths]
//
// Examples:
//   npm run optimize-image -- ~/Downloads/S-39.png images/products/sofas/s-39 640,1400
//   npm run optimize-image -- ~/Downloads/SD-39.png images/products/sofas/s-39-drawing 1600
//   npm run optimize-image -- ~/Downloads/new-sofa.jpg images/work/sofas/s-44 800,1600
//
// Defaults: product photos 640,1400 · drawings 1600 · Our Work photos 800,1600 · materials 1200.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const [input, outBase, widthsArg = '640,1400'] = process.argv.slice(2);
if (!input || !outBase) {
  console.error('Usage: npm run optimize-image -- <input-file> <output-base> [widths]');
  process.exit(1);
}

const meta = await sharp(input).rotate().metadata();
const swap = meta.orientation && meta.orientation >= 5;
const srcW = swap ? meta.height : meta.width;
const srcH = swap ? meta.width : meta.height;
const widths = [...new Set(widthsArg.split(',').map((w) => Math.min(Number(w), srcW)))].sort((a, b) => a - b);

const outputs = [];
for (const w of widths) {
  const rel = `${outBase.replace(/^\/+/, '')}-${w}.webp`;
  const abs = path.join('public', rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  await sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, effort: 5, alphaQuality: 90 }).toFile(abs);
  outputs.push({ w, url: `/${rel}` });
}

const largest = outputs[outputs.length - 1];
const asset = {
  src: largest.url,
  ...(outputs.length > 1 ? { srcSet: outputs.map((o) => `${o.url} ${o.w}w`).join(', ') } : {}),
  width: largest.w,
  height: Math.round((srcH / srcW) * largest.w),
};
console.log(JSON.stringify(asset, null, 2));
