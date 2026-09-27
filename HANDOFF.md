# HANDOFF — Woodflex SEO/GEO Rebuild (Phase 1)

_Last updated: 2026-09-27 · Session 2 (Phase 1 build)_

## 1. What was done
- **Rebuilt the website on Next.js.** All six pages (Home, About, Products, Our Work, Materials, Contact) are now delivered as complete, readable pages. Google, Bing and AI assistants like ChatGPT now see the full text instead of a blank page. I checked this by loading each page with no JavaScript running.
- **Each page now has its own title, description and main heading**, plus link previews for WhatsApp, LinkedIn and similar apps.
- **Added structured data.** This is information in the page code that tells Google who you are: business name, workshop address, phone, email, Instagram, the product list, the project gallery, and breadcrumbs. Home also has a short FAQ that Google and AI tools can quote directly. It's built only from facts already on the site.
- **Added `sitemap.xml`** (the six pages plus about 300 images) and **`robots.txt`**. robots.txt openly allows Google, Bing, ChatGPT, Claude and Perplexity.
- **Images shrunk from 1.2 GB to 43 MB** by converting them to WebP. The pictures are the same; pages just load much faster. I spot-checked photos and technical drawings and they're still sharp.
- **Your answers are all applied:**
  - The Architect / House Owner / Café cards on Home now go to Contact, with the visitor's role already picked in the form.
  - Old Phase 2 addresses (`/architect`, `/house-owner`, `/cafe-owner`, `/lead/...`) redirect to Home. The redirects are marked temporary, so those addresses can be reused when Phase 2 launches.
  - `www.woodflexdesigns.com` redirects to `woodflexdesigns.com`.
  - The workshop address is on the Contact page, in the footer and in the structured data.
  - Products come from the code, not Supabase.
  - The "enter your details" pop-up is gone. The WhatsApp contact form is kept.
- **Kept:** the Google Analytics tag (G-3BDJ3FK4JK), the Google Search Console verification file, and the look, fonts and colours of the site.
- **Small extras:**
  - Each product's detail view has an "Enquire on WhatsApp" button that includes the product code.
  - Materials now shows all woods and finishes at once instead of one at a time.
  - Added a proper "page not found" page.
  - The Contact form has a new "Café / Restaurant / Retail owner" role option.

## 2. What changed in the repo
- **Branch:** `claude/keen-darwin-fn2i7c`. main is untouched and still has the old site, including all the Phase 2 code for later.
- **Commit:** "Rebuild Phase 1 site on Next.js for SEO", pushed with this file.
- **New:**
  - `app/`: the six pages, sitemap, robots and the shared layout.
  - `components/`: header, footer, product browser, gallery and contact form.
  - `lib/site.ts`: all business details in one place.
  - `lib/seo.ts`: titles and structured data.
  - `lib/catalog.ts`: product categories and materials.
  - `data/*.json`: the product and gallery lists.
  - `public/images/`: the WebP images.
  - `scripts/optimize-image.mjs`: for adding new product photos.
  - `README.md`: rewritten with how to run the site and add products.
- **Removed from this branch:**
  - The old Vite app and its giant original images (`Public/`).
  - `vercel.json`: it would have broken the new site.
  - The Netlify guide and old fix/debug notes.

## 3. Needs your decision / known issues
1. **Search Console www vs non-www:** I couldn't access Search Console or the live site from here. I used `woodflexdesigns.com`, as you asked. If Search Console turns out to use `www`, it's a one-line change in `lib/site.ts`, plus swapping the redirect in `next.config.ts`.
2. **Address check:** you wrote "PlasticSurat". I used "Surat, Gujarat 394510" and left out "Plastic". Is "Plastic" part of the address (an area name) or a typo? Also, "SHOP NO" had no number before "2ND FLOOR", so I wrote it as "Shop No. 554–557, 2nd Floor, above Pradeep, RJD Integrated Textile Park". Please confirm.
3. **Jhulas / swings left out:** the two Jhula products only had placeholder images, so I left them out. Send real photos and I'll add them back.
4. **Product names are generic** ("Woodflex Designs Sofa 01", "WFC Dining 01"), and the side tables are titled "Center Table NN". Real names and a line about each piece would help search a lot. Some data also conflicts: S-01 lists a width of 2100 mm, but its drawing says 340 cm. I kept all data exactly as it was.
5. **Material photos are small** (225–800 px wide), so some look soft on big screens. Higher-resolution photos of each wood and finish would fix this.
6. **The "Testing One" section on Home was removed.** It only contained a placeholder ("[ Material Stress Test Visualization ]"). It can come back once there's a real video or photo.
7. **Please review the new Home FAQ wording.** It uses only facts from your existing site copy.
8. **No prices:** Google only shows rich product results (price, stock) if prices are listed. For now the products are marked up as a simple list, which is valid and error-free.

## 4. Exact next step
**Deploy a preview on Vercel and check it:**
1. In Vercel, import the `pasarivigyat-droid/woodflex` repo. It detects Next.js automatically, with no settings needed. Deploy the branch `claude/keen-darwin-fn2i7c` as a preview.
2. Click through the preview. If you're happy, merge the branch into main and point `woodflexdesigns.com` and `www.woodflexdesigns.com` at Vercel under Project → Settings → Domains, with www redirecting to the main domain.
3. After it's live, submit `https://woodflexdesigns.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and run a couple of pages through Google's Rich Results Test.

Also reply to items 1–2 in section 3 (and send real photos or names for items 3–5 when you have them).
