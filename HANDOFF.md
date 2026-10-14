# HANDOFF — Woodflex content update (Phase 1 pages)

_Last updated: 2026-10-14 · Session 10 (contact details — awaiting your preview review, NOT merged)_

## 1. What was done
**This session:**
- **Three contact numbers, primary first, no names:**
  1. +91 94290 04803 (primary)
  2. +91 97254 08989
  3. +91 94281 50511
- **The "WhatsApp:" label is gone from the footer.** Each number is now a plain tap-to-call link on phones.
- **On the Contact page**, the "Phone / WhatsApp" heading is now "Phone", with all three numbers listed, primary first. The icon changed from a chat bubble to a phone.
- **Email changed** to **woodflexdesigns@gmail.com** everywhere: footer, Contact page, and the business details Google reads. The old email no longer appears on any page.
- **Google's business details:** the main phone stays +91 94290 04803, and all three numbers are listed as sales contacts.
- **WhatsApp** (the contact form, the "Enquire on WhatsApp" buttons and the FAQ answer) still goes to the primary number, +91 94290 04803.
- **Checks run:**
  - The site builds, and every page is still static HTML.
  - On every page, including the 404 page: the footer shows the three numbers in the right order, there's no "WhatsApp:" label, no names, and the new email (never the old one).
  - All earlier content checks still pass.

## 2. What changed in the repo
**Branch:** `claude/keen-darwin-fn2i7c`.
- **Not merged.** main, the live site, is untouched. This session's commit is "Contact details: three numbers, new email".

**Files changed this session:**
| File | Change |
| --- | --- |
| `lib/site.ts` | New email; new list of three numbers (primary first) |
| `components/Footer.tsx` | "WhatsApp:" label removed; three tap-to-call numbers |
| `app/contact/page.tsx` | "Phone" heading with all three numbers; phone icon |
| `lib/seo.ts` | Google's business details: one contact entry per number |
| `HANDOFF.md` | This file |

## 3. Anything broken, blocked, or needing your decision
Nothing is broken. Still open from the last round:
1. **"fabric" (singular)** is still in the Products page sofa description. Keep it or remove it?
2. **"jhulas"** is still mentioned on Home, though the Jhula products are hidden. Keep it or remove it?

## 4. Exact next step
**Review the updated Vercel preview of branch `claude/keen-darwin-fn2i7c`**, especially the footer on any page and the Contact page. When you're happy, tell me to merge into main. Nothing goes live until you approve.
