# Woodflex Designs — woodflexdesigns.com

Marketing site for Woodflex Designs, a custom furniture manufacturer in Surat.
Built with **Next.js (App Router)**. Every page is pre-rendered to static HTML so Google, Bing and AI
assistants can read it. Deployed on **Vercel**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages static)
npm run lint       # type-check
```

Requires Node.js 20.9 or newer.

## Where things live

| What | Where |
| --- | --- |
| Pages (Home, About, Products, Our Work, Materials, Contact) | `app/**/page.tsx` |
| Business details (address, phone, email, domain) | `lib/site.ts` |
| Page titles, descriptions & structured data helpers | `lib/seo.ts` |
| Product catalogue | `data/products.json` (+ category text in `lib/catalog.ts`) |
| Our Work gallery | `data/showcase.json` |
| Woods & finishes text | `lib/catalog.ts` |
| Images (WebP) | `public/images/…` |
| sitemap.xml / robots.txt | `app/sitemap.ts`, `app/robots.ts` |
| Redirects (www → apex, old Phase 2 URLs → Home) | `next.config.ts` |

## Adding a product

1. Convert the photo (and drawing, if any) to WebP:
   ```bash
   npm run optimize-image -- path/to/S-39.png images/products/sofas/s-39 640,1400
   npm run optimize-image -- path/to/SD-39.png images/products/sofas/s-39-drawing 1600
   ```
2. Add an entry to `data/products.json`, pasting the printed JSON as `image` and `drawing`.
3. Commit and push — Vercel rebuilds automatically, and the sitemap updates itself.

See `HANDOFF.md` for current status and open decisions.
