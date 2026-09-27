# HANDOFF — Woodflex SEO/GEO Rebuild (Phase 1)

_Last updated: 2026-09-27 · Session 1 (review & planning only)_

## 1. What was done
- Read through the whole existing website code to understand how it works today.
- Confirmed why Google and AI search can't see the site: every page is drawn in the visitor's browser, so search bots only see a blank page. There is no sitemap or robots file, every page has the same title, and there are no page descriptions.
- Wrote a plan for rebuilding the six Phase 1 pages (Home, About, Products, Our Work, Materials, Contact) so each one is delivered as complete, readable HTML.
- **Nothing has been built yet.** This session was planning only, as requested.

## 2. What changed in the repo
- Branch: `claude/keen-darwin-fn2i7c` (main is untouched)
- Only file added: `HANDOFF.md` (this file)
- Commit: the commit that adds this HANDOFF.md

## 3. Needs your decision before building
1. **Phase 2 links on Home:** the "Who are you?" section links to Architect, House Owner and Café pages, which are not part of Phase 1. Should I remove those cards for now, or point them to Contact? (Plan: send the old Phase 2 addresses to Home so nobody lands on an error page.)
2. **Main domain:** `woodflexdesigns.com` or `www.woodflexdesigns.com`?
3. **Workshop address:** is there a full street address in Surat to show to Google? Right now I only have "Surat, India".
4. **Images:** the product images take up 1.2 GB. Can I convert them to smaller WebP files (same pictures, much lighter)? This makes pages faster and avoids hosting size limits.
5. **Product list source:** build from the product list stored in the code (recommended, simplest and fully static), or also pull from the Supabase database?
6. **"Enter your details" pop-up:** OK to leave it out of Phase 1? The WhatsApp contact form stays.

Also worth knowing:
- There's a Netlify guide in the repo. Please confirm the live site is moving to Vercel.
- Product names are generic ("WFC Dining 01"). Better names would help search, but that's content for you to supply later and not a blocker.

## 4. Planned build (after your go-ahead)
1. Replace the current app with Next.js on this branch, keeping the same look and fonts.
2. Build the six pages as ready-made HTML. Each gets its own title, description, one main heading and social-sharing tags.
3. Add structured data: business details (Surat, phone, email, Instagram), breadcrumbs, the product list, the project gallery and the contact page.
4. Add `sitemap.xml` and `robots.txt`. robots.txt allows Google, Bing and AI crawlers such as ChatGPT, Claude and Perplexity.
5. Keep the Google Analytics tag and the Google Search Console verification file.
6. Leave out Phase 2 (Architect Studio, House Owner Experience, Café/Retail Concepts).

## 5. Exact next step
Reply with answers to the six questions in section 3 (or "go with your recommendations"). The next session then starts step 1 of the planned build.
