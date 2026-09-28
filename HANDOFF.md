# HANDOFF — Woodflex SEO/GEO Rebuild (Phase 1)

_Last updated: 2026-09-28 · Session 3 (address + domain confirmed)_

## 1. What was done
**This session:**
- **Workshop address updated** to the confirmed version: _Shop No. 554–557, 2nd Floor, above Pradeep Plastic, RJD Integrated Textile Park, Surat, Gujarat 394510_. It appears on the Contact page, in the footer, in the Google Maps link and in the business details Google reads.
- **Main domain confirmed** as `woodflexdesigns.com`, matching Search Console. The site already used this, so nothing changed apart from a code note. `www.woodflexdesigns.com` still redirects to it.
- **Not merged to main**, as you asked. The branch is waiting for your Vercel preview review.

**Earlier sessions (for context):**
- Rebuilt the six Phase 1 pages (Home, About, Products, Our Work, Materials, Contact) on Next.js. Search engines and AI assistants now get complete pages instead of a blank one.
- Each page has its own title, description and main heading, plus business and product details for Google.
- Added `sitemap.xml` and `robots.txt`.
- Images shrunk from 1.2 GB to 43 MB (WebP).
- The Phase 2 addresses redirect to Home. The pop-up is removed, and the WhatsApp form is kept.

## 2. What changed in the repo
- **Branch:** `claude/keen-darwin-fn2i7c`. main is untouched and still holds the old site and the Phase 2 code.
- **This session's commit:** "Update workshop address; confirm canonical domain".
  - `lib/site.ts`: address updated, domain note updated.
  - `HANDOFF.md`: this file.
- **Previous commit:** "Rebuild Phase 1 site on Next.js for SEO" (`33851f1`), which contains the full rebuild.

## 3. Needs your decision / known issues
Resolved this session: the address and the www vs non-www question.

Still open, none of which blocks launch:
1. **Jhulas / swings are left out.** The two Jhula products only had placeholder images. Send real photos and I'll add them back.
2. **Product names are generic** ("Woodflex Designs Sofa 01", "WFC Dining 01"), and the side tables are titled "Center Table NN". Real names and a line about each piece would help search. Some data also conflicts: S-01 lists a width of 2100 mm, but its drawing says 340 cm.
3. **Material photos are small** (225–813 px wide), so some look soft on large screens. Higher-resolution photos would fix this.
4. **The "Testing One" section on Home was removed.** It only had a placeholder. It can come back once there's a real video or photo.
5. **Please review the Home FAQ wording.** It uses only facts from your existing copy.
6. **No prices:** Google only shows rich product results (price, stock) when prices are listed.

## 4. Exact next step
**You're reviewing the Vercel preview of branch `claude/keen-darwin-fn2i7c`.** When you're happy with it:
1. Tell me to merge (or merge it yourself) into main.
2. In Vercel → Project → Settings → Domains, add `woodflexdesigns.com` as the main domain and `www.woodflexdesigns.com` as a redirect to it.
3. Once it's live, submit `https://woodflexdesigns.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and run a few pages through Google's Rich Results Test.

If the preview shows anything you want changed, send it over and I'll fix it on this branch first.
