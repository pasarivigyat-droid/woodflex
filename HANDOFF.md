# HANDOFF — Woodflex: team in footer and About page

_Last updated: 2026-10-27 · Session 17 (team details — approved, MERGED and LIVE)_

## 1. What was done
**Since last time:** you merged pull request #2, so the LC-34 drawing and the new LC-37 chair are live (main at `2a6b235`).

**This session:**
- **Footer, "Talk to us"** (on every page), in this order:
  - Quotes & new projects: Vigyat Pansari · Head of Sales & Operations · +91 94290 04803
  - Production & delivery updates: Ronit Bhayani · Co-Founder, Production & Brand · +91 94281 50511
  - Accounts & partnerships: Amit Bhayani · Founder & Managing Director · +91 97254 08989

  Each number is tap-to-call on phones. The three numbers that used to sit under the Workshop address were moved into this block, so they aren't listed twice. The "Send us your floor plan…" quote moved under the brand text in the first column.
- **About page, "The people behind Woodflex":**
  - A new section after "How we build".
  - It has the intro line, then Amit, Ronit and Vigyat in order of seniority, each with role and description.
  - No phone numbers.
- **Your wording is used exactly as you sent it.** Names, roles and descriptions are kept in one place (`lib/site.ts`), and the phone numbers come from the existing contact list, not retyped.
- **Checks run:**
  - The site builds, and every page is still static HTML.
  - An automatic check confirmed the footer text and order on every page (including the 404 page), the three call links, and the About text and order.
  - No phone numbers appear in the About section.
  - No script errors or sideways scrolling on desktop or mobile.

## 2. What changed in the repo
**Branch:** `claude/keen-darwin-fn2i7c`, updated from main.
- **Merged into main and live.** You approved the preview, so it was merged into `main` (merge commit "Merge team details into main") and Vercel deployed it to production.
- **Commit:** "Add team to footer and About page".
- **Files:**
  - `lib/site.ts`: team names, roles, descriptions, "contact for" labels; footer order and About order
  - `components/Footer.tsx`: new "Talk to us" column; quote moved; phone numbers removed from the Workshop column
  - `app/about/page.tsx`: new "The people behind Woodflex" section
  - `HANDOFF.md`: this file

## 3. Anything broken, blocked, or needing your decision
1. **Elsewhere the numbers are unchanged.** The Contact page, the product pop-ups ("Call us about this design") and the FAQ answer "How do I get a quote?" still list the three numbers without names, in the order +91 94290 04803, +91 97254 08989, +91 94281 50511. Should the Contact page also show the "who to call for what" labels?
2. **Google's business details** don't name the team yet. I can add the founder and team as structured data, which helps when people ask Google or AI tools "who runs Woodflex Designs?". Say if you want it.
3. **Phase 2:** still waiting on your answers (plan in commit `f306761`).

## 4. Exact next step
1. Open woodflexdesigns.com, hard refresh (Cmd+Shift+R), and check the footer's "Talk to us" column and the "The people behind Woodflex" section on /about.
2. Decide on the two optional extras in section 3 (who-to-call labels on the Contact page; team in Google's business details).
