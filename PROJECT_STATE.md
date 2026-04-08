# Woodflex Designs Project State - January 11, 2026

## 🚀 Core Vision
Woodflex Designs is a premium furniture manufacturing platform that bridges the gap between design and production. It focuses on three main personas: **Architects**, **House Owners**, and **Cafe Owners**. The goal is a highly interactive, "wow-factor" website that showcases craftsmanship through immersive 3D-like UI components.

## 🛠️ Technology Stack
- **Frontend**: React (TSX), Vite, TypeScript.
- **Styling**: Tailwind CSS & Vanilla CSS (Fluid layouts).
- **Animations**: GSAP (category transitions), ScrollTrigger, CSS 3D Transforms.
- **Experience**: Lenis (Smooth Scrolling), Lucide React (Icons).

## 📍 Current Project Status

### 1. General Fixes (Applied)
- **Image Routing**: Configured `publicDir: 'Public'` in `vite.config.ts` to ensure assets load correctly from the `/Public` directory.
- **Performance**: Optimized Lenis smooth scroll and GSAP timelines to reduce lag and improve frame rates.
- **Asset Paths**: Verified and corrected paths in `products.ts` to match folder structures (e.g., `/Catalouge/Chairs/WFC-01.png`).
- **Inventory Expansion**: Added 9 Sofas (S-series) and 19 Retail Chairs (JC-series) with their respective technical drawings.

### 2. Architect View Dashboard
- **Category Wheel**: Implemented a semi-circle landing view for categories (Seating, Tables, Retail Seating, etc.).
- **Lowered HUD**: Adjusted coordinates to ensure categories and product rings are positioned lower on the screen for better visibility/readability.
- **Product Rings**: Rotating 3D cubes for products that appear when a category is selected. Now includes Retail Seating collection.
- **Interactive**: Scroll-to-rotate interaction for the product rings.

### 3. House Owner Experience (Moodboard Builder)
- **Room Selection**: Interactive view for Living, Dining, and Outdoor spaces.
- **Hotspot System**: User can tap points in a room (Sofa, Chair, Planter) to swap products dynamically.
- **Request Flow**: Integrated a WhatsApp lead generation system that sends the curated selection directly to the team.

### 4. Material Library
- **Dual Mode**: Switchable interface between "Wood Types" and "Finishes".
- **Visuals**: Full-screen material viewer with descriptions and technical tags.

---

## 📝 Important Memory Notes (For Future Steps)
- **Public Assets**: Always refer to the `Public` folder (capital P). Vite is now mapped to this.
- **Animations**: Use `group-hover:animation-pause` on 3D cubes for better accessibility.
- **Responsiveness**: The interactive wheels are sensitive to screen height; keep the `bottom` and `translate-y` offsets in mind.
- **Brand Identity**: "Manufacturers, not a design studio." The UI should feel precise, minimalist, and "blueprint-industrial".

---
**This document serves as the project checkpoint for current architectural and design decisions.**
