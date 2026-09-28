# HANDOFF — Woodflex Phase 2 (interactive tools)

_Last updated: 2026-09-28 · Session 6 (Phase 2 review & plan only — nothing built yet)_

## 1. What was done
- Started Phase 2 on a fresh branch taken from `main`. main, the live site, is untouched.
- Reviewed the old code for the three tools, taken from git history at commit `ed2551b`. Findings:
  - **Architect Studio** (about 750 lines) is the most complete tool. It lets you browse the catalogue by category with a search box, and open a product's technical drawing and download it. You add products to a "Project Spec List", then send it on WhatsApp or print it as a PDF. Printing was locked behind the old "enter your details" pop-up. It uses no AI and doesn't need the database, apart from optional activity tracking.
  - **House Owner Experience** (about 600 lines) lets the visitor pick Living or Dining, then swipe like/skip on products one category at a time. That builds a shortlist, which they send on WhatsApp, download as a text file or print. **It saves the visitor's name, phone, city and shortlist into the Supabase `leads` table straight from the browser.** It uses no AI.
  - **Café / Retail Concepts** (about 115 lines) was a **"Coming Soon" placeholder**. Its style filters ("Luxury / Rustic / Minimalist") look for product names that no longer exist, so two of the three filters show nothing. There's no real tool to bring back, so it has to be designed properly.
  - **AI (Gemini):** none of the three tools uses AI. The only Gemini code was an unused "Design Lab" screen (upload a room photo, get an AI edit) that was never on any page. It put the API key into browser code, the exact problem you want to avoid. Because it was never shown on a page, there's no sign the key reached visitors' browsers. If a Gemini key was ever set in the old Netlify/Vercel settings, replacing it with a new one is cheap insurance.
- **Security check on `leads` and `interactions`: not yet confirmed.** This work session's network settings block the Supabase address, so I couldn't test it. See section 3.
  - **Warning sign in the old code:** the old lead-review page (`/lead/123`) read full lead records (names, phone numbers, shortlists) and their activity **straight from the browser, using the public key**. That only works if those tables allow public reading. If that page ever worked, **anyone who knows the public key (it's in every visitor's browser) could read every lead.** Treat this as likely until checked.

## 2. What changed in the repo
- Branch: `claude/keen-darwin-fn2i7c`, restarted from `main` (this work session can only push to this branch name). Nothing from Phase 1 is changed.
- Only file changed: `HANDOFF.md` (this file). No code yet.

## 3. Needs your decision
1. **Supabase security check.** Pick one:
   - **(a)** Allow `zuzeuuzdyzybfdsahqxn.supabase.co` in this work session's network settings, and I'll test it myself. I'll only count rows, never read them.
   - **(b)** In Supabase → SQL Editor, run these two read-only queries and paste me the results:
     ```sql
     select relname, relrowsecurity from pg_class
     where relnamespace = 'public'::regnamespace and relname in ('leads','interactions','products');

     select tablename, policyname, cmd, roles, qual, with_check from pg_policies
     where schemaname = 'public' and tablename in ('leads','interactions');
     ```
     "Safe" means `relrowsecurity = true` on both tables, and no `SELECT` policy that allows the `anon` or `public` role.
2. **Planned fix for lead storage (I recommend it either way):**
   - Visitors' browsers stop talking to `leads` and `interactions` directly.
   - A small server route on the site (`/api/leads`) saves them instead, using a secret Supabase key stored only in Vercel Environment Variables.
   - Row Level Security on both tables is set to allow **no** public reading or writing.
   - The old `/lead/123` review page stays off. You view leads in the Supabase dashboard (or a password-protected admin page later).
3. **Which tool first?** I recommend **Architect Studio** (see section 4).
4. **Architect Studio's print/PDF lock:** should it ask for contact details before printing? Recommendation: no lock at first. Architects can print freely, and the WhatsApp button is the enquiry path. That means Architect Studio needs **no lead form and no database** to launch. We can add the lock after the lead storage is secured.
5. **Design Lab (AI room edit):** leave it out for now (recommended), or rebuild it later with a server-side route and the key kept only in Vercel?
6. **Café / Retail:** OK to design it as a new tool later (for example curated café seating sets from the Retail Seating range, with a WhatsApp quote), instead of restoring the placeholder?

## 4. Plan (one tool at a time, each on its own review cycle)
**Recommended order: Architect Studio → House Owner Experience → Café / Retail.**
- **Why Architect Studio first:**
  - It's the most complete and valuable tool (architects bring repeat, multi-piece orders).
  - It reuses the product data and technical drawings already on the live site.
  - It needs no AI, no API keys and no database writes, so it can ship safely before the Supabase question is settled.
- **Why House Owner second:** it depends on saving leads, so it should wait until the database is locked down and the server route exists.
- **Why Café last:** there's nothing real to restore yet. It needs a short content and design decision from you first.

**Tool 1: Architect Studio at `/architect`**
1. Rebuild it as a Next.js page using the Phase 1 product data, images and drawings (the old version fetched products from Supabase at runtime).
2. Keep category browsing, search, the product detail view with drawing download, the Spec List, WhatsApp export and print.
3. Keep the look close to the old version, but work on mobile and desktop from one layout.
4. Remove the temporary redirect from `/architect` to Home, add the page to the sitemap, and point the Home "Architects" card to it. All other Phase 1 pages, the sitemap and robots.txt stay exactly as they are.
5. Check: a clean build, the Phase 1 pages unchanged, desktop and mobile screenshots. Then you review the Vercel preview before any merge.

**Tool 2: House Owner Experience at `/house-owner`**
- Build it only after the security check.
- It includes the `/api/leads` server route.

**Tool 3: Café / Retail at `/cafe-owner`**
- Build it after your content decision.

**Any AI features:** only through a server route, with the key in Vercel Environment Variables.

## 5. Exact next step
Reply with:
- your go-ahead on the order (Architect Studio first);
- your choice for question 1 (a or b);
- answers to questions 4–6.

Then I'll build Architect Studio on this branch and push it for a Vercel preview. Nothing goes to main without your approval.
