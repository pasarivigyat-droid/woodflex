# HANDOFF — Woodflex SEO/GEO Rebuild (Phase 1)

_Last updated: 2026-09-28 · Session 4 (fix Vercel build failure)_

## 1. What was done
**This session:**
- **Fixed the failed Vercel preview build.** The site was downloading its two fonts (Inter and Playfair Display) from Google Fonts during the build, and that download failed on Vercel. The font files now live inside the project, so the build doesn't need to download anything.
- **The look is unchanged.** Same fonts, same weights (Inter 300–600, Playfair Display 400–600, upright and italic), same settings behind the scenes. I compared screenshots before and after the fix, and they match.
- **Checked the way you asked:** a clean `npm ci && npm run build`. I ran the build with internet access switched off, to prove it can't fail this way again. All pages built successfully, and in a browser all three font files loaded correctly.
- **Still not merged to main.** It's waiting for your preview review.

**Earlier sessions (for context):**
- Rebuilt the six Phase 1 pages on Next.js as complete pages that Google and AI tools can read.
- Each page has its own title, description and main heading, plus business and product details for Google.
- Added `sitemap.xml` and `robots.txt`, and converted the images to WebP (1.2 GB → 43 MB).
- Updated the workshop address, and confirmed the domain as `woodflexdesigns.com`.

## 2. What changed in the repo
- **Branch:** `claude/keen-darwin-fn2i7c`. main is untouched.
- **This session's commit:** "Self-host fonts to fix Vercel build".
  - `app/fonts/` (new): three font files, about 125 KB total, plus their free-use licence files (SIL Open Font License).
  - `app/layout.tsx`: loads the fonts from `app/fonts/` instead of Google Fonts.
  - `README.md`: notes where the fonts live.
  - `HANDOFF.md`: this file.
- **Earlier commits:**
  - `8330d07`: address and domain.
  - `33851f1`: the full rebuild.

## 3. Needs your decision / known issues
Nothing is blocking. The same content items as before are still open:
1. **Jhulas / swings are left out.** They only had placeholder images. Send real photos to add them back.
2. **Product names are generic** ("Sofa 01", "WFC Dining 01"). Side tables are titled "Center Table", and S-01 has a size conflict (2100 mm in the data vs 340 cm in its drawing).
3. **Material photos are small**, so some look soft on large screens.
4. **The "Testing One" placeholder section on Home was removed.**
5. **Please review the Home FAQ wording.**
6. **No prices**, so Google won't show price or stock in product results.

## 4. Exact next step
**Check the new Vercel preview.** Vercel rebuilds the branch automatically after this push. Confirm that:
1. The build succeeds.
2. The pages look right.

If anything still fails, send me the build log. When you're happy:
- Merge the branch into main.
- In Vercel → Settings → Domains, set `woodflexdesigns.com` as the main domain and `www` to redirect to it.
- Submit `https://woodflexdesigns.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
