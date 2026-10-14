# HANDOFF — Woodflex

_Last updated: 2026-10-14 · Session 12 (content update merged to main — now live)_

## 1. What was done
**The content update is approved and merged into main.** Vercel deploys main to woodflexdesigns.com automatically.

**What went live in this release (Phase 1 pages only; Phase 2 not touched):**
- **Experience:** "50 years of furniture-making experience behind us." sits next to "Est. 2024" on Home and in the About introduction. The 2024 founding date is unchanged.
- **Delivery:** "Made in Surat, delivered across India." appears with the list (Surat, Pune, Mumbai, Hyderabad, Bengaluru, Chennai, Nagpur, Rajasthan) on Home, About and Contact, and in the business details Google reads.
- **New `/faq` page:**
  - 13 questions, with FAQ data for Google; it's in the sitemap and the footer.
  - Home shows six of them, plus a "See all questions" button.
- **About:** new "How we build" section (kiln-dried wood, joinery, foam and lining, 3-year warranty).
- **Materials:**
  - New "What's inside" section.
  - Wood cards: Teak (Ghana, Valsad, Burma Border), Acacia and White Ash. The Walnut card is hidden until there's a photo.
- **Foam:** Sleepeeze and Century, at least 2 inches at a minimum of 40 density, Recron in every seat, latex optional, and the 500–600 GSM Majarpat lining. The wording is identical in the FAQ, About and Materials.
- **Woods:** Ghana, Valsad and Burma Border teak, walnut, acacia and white ash. No sheesham, mango, oak or "fabrics" anywhere.
- **Home "Material clarity":** "No mystery materials. Before we build, we tell you exactly which wood, foam and lining go into your piece."
- **Contact details:**
  - Three numbers, primary first: +91 94290 04803, +91 97254 08989, +91 94281 50511. All are tap-to-call, with no names.
  - Email: woodflexdesigns@gmail.com.
- **No WhatsApp redirects:**
  - The contact form is replaced by a contact card (call, email, workshop address with map link).
  - Product pop-ups say "Call us about this design" and show the product code.
- **Checks before merging:**
  - The build passes, and every page is static HTML.
  - Automatic content checks all pass.
  - robots.txt is unchanged, and the sitemap has 7 pages.
  - You reviewed and approved the Vercel preview.

## 2. What changed in the repo
- **main** now includes everything from branch `claude/keen-darwin-fn2i7c` through the merge commit "Merge content update into main".
- **Commits in this release:**
  - `05d4b53`: content update (experience, delivery, FAQ, build details)
  - `3bbe26c`: foam brands and wood list
  - `b898485`: walnut card hidden, Material clarity text
  - `6f2cf93`: three numbers, new email
  - `c6ae471`: WhatsApp removed, contact details only
  - plus this HANDOFF update
- The branch also carries the Phase 2 plan commit (`f306761`). It only changed HANDOFF.md, so it adds no Phase 2 code.
- **Main files touched in this release:**
  - New: `lib/faq.ts`, `app/faq/page.tsx`
  - Changed: `lib/site.ts`, `lib/seo.ts`, `lib/catalog.ts`, `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/materials/page.tsx`, `app/faq/page.tsx`, `app/sitemap.ts`, `components/Footer.tsx`, `components/ProductBrowser.tsx`, `data/material-images.json`
  - Deleted: `components/ContactForm.tsx`, plus the sheesham and mango images

## 3. Anything broken, blocked, or needing your decision
Nothing is broken. Open items for later:
1. **Small wording:** "fabric" (singular) in the Sofas description, and "jhulas" on Home. Keep or remove?
2. **Walnut card:** send a walnut photo and a one-line description to show it.
3. **Online enquiry form:** there isn't one now; clients call or email. It can be added safely later.
4. **Phase 2 (Architect Studio, House Owner, Café/Retail):**
   - The plan is waiting on your answers. It's in the version of this file from commit `f306761`.
   - The Supabase security check on the `leads` and `interactions` tables still needs doing before any lead form returns.
5. **Search Console:** once the deploy is live, use "URL inspection" → "Request indexing" on `/faq` and the Home page so Google picks up the new content sooner.

## 4. Exact next step
1. In Vercel, confirm the **production** deploy of `main` succeeded.
2. Open woodflexdesigns.com and spot-check the Home footer, `/contact` and `/faq`.
3. In Google Search Console, request indexing for `https://woodflexdesigns.com/faq`.
