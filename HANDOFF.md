# HANDOFF — Woodflex SEO/GEO Rebuild (Phase 1)

_Last updated: 2026-09-28 · Session 5 (merged to main)_

## 1. What was done
**This session:**
- **Phase 1 is merged into main.** You approved the Vercel preview, so the branch `claude/keen-darwin-fn2i7c` has been merged into `main` and pushed. main now holds the new Next.js site.
- Vercel will build and deploy main automatically. If your production domain is already connected to this Vercel project, the new site goes live with that deploy.

**Phase 1 as a whole:**
- **Pages:** Home, About, Products, Our Work, Materials and Contact are complete pages that Google, Bing and AI assistants (ChatGPT, Claude, Perplexity) can read.
- **Search details on every page:** its own title, description and main heading, plus business details (name, address, phone, email, Instagram), breadcrumbs, the product list, the project gallery and a Home FAQ.
- **`sitemap.xml` and `robots.txt`** are in place.
- **Images:** converted to WebP, 1.2 GB → 43 MB.
- **Fonts:** now stored inside the project, so the build never depends on Google Fonts.
- **Redirects:** `www` goes to `woodflexdesigns.com`, and the old Phase 2 addresses go to Home.
- **Kept:** the WhatsApp contact form, the Google Analytics tag and the Search Console verification file.

## 2. What changed in the repo
- **main:** now contains the full Phase 1 rebuild, plus the merge commit "Merge Phase 1 SEO rebuild (Next.js) into main".
- **Branch:** `claude/keen-darwin-fn2i7c` is kept as-is for reference. It's safe to delete later.
- **Commits in this release:**
  - `33851f1`: the rebuild
  - `8330d07`: address and domain
  - `3594a99`: self-hosted fonts
  - the HANDOFF update and the merge commit
- **Removed from main:** the old Vite app, including the Phase 2 code (Architect Studio, House Owner Experience, Café/Retail Concepts). It isn't lost. It lives in the git history at commit `ed2551b`, the last commit of the old main, and can be brought back for Phase 2.

## 3. Needs your decision / known issues
Nothing is blocking. The content items still open:
1. **Jhulas / swings are left out.** They only had placeholder images. Send real photos to add them back.
2. **Product names are generic** ("Sofa 01", "WFC Dining 01"). Side tables are titled "Center Table", and S-01 has a size conflict (2100 mm in the data vs 340 cm in its drawing).
3. **Material photos are small**, so some look soft on large screens.
4. **The "Testing One" placeholder section on Home was removed.**
5. **Please review the Home FAQ wording.**
6. **No prices**, so Google won't show price or stock in product results.

## 4. Exact next step
**Put the site live and tell search engines about it:**
1. In Vercel, confirm the production deploy of `main` succeeded.
2. In Vercel → Project → Settings → Domains, make sure `woodflexdesigns.com` is the main domain and `www.woodflexdesigns.com` redirects to it. Then update your domain's DNS records if Vercel asks you to.
3. Once `https://woodflexdesigns.com` shows the new site, go to Google Search Console → Sitemaps and submit `https://woodflexdesigns.com/sitemap.xml`. Do the same in Bing Webmaster Tools.
4. In Search Console, use "URL inspection" → "Request indexing" on the Home and Products pages to speed things up.
5. Run a couple of pages through Google's Rich Results Test to confirm the business details are picked up.

After that, Phase 2 (Architect Studio, House Owner Experience, Café/Retail Concepts) can start on a new branch.
