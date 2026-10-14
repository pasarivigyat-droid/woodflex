# HANDOFF — Woodflex content update (Phase 1 pages)

_Last updated: 2026-10-14 · Session 11 (WhatsApp removed, contact details only — awaiting your preview review, NOT merged)_

## 1. What was done
**This session: nothing on the site sends visitors straight into WhatsApp any more.** Clients see the contact details and choose which number to call or email.
- **Contact page:**
  - The "Send via WhatsApp" form is removed. In its place is a white card with:
    - **Call us:** all three numbers, large, primary first, tap-to-call on phones
    - **Email:** woodflexdesigns@gmail.com
    - **Workshop:** the address and an "Open in Google Maps" link
  - Delivery and Instagram stay on the left. The intro now says "Call us or email us…".
- **Product pop-ups (Products page):** the "Enquire on WhatsApp" button is replaced by **"Call us about this design · quote code S-01"** (each product shows its own code) with the three numbers as call buttons.
- **FAQ page:** the "Ask us on WhatsApp" button is removed. One "Contact us" button remains.
- **FAQ "How do I get a quote?"** now reads: _"Call us on +91 94290 04803, +91 97254 08989 or +91 94281 50511, or email your drawings, photos or sizes to woodflexdesigns@gmail.com. We reply with feasibility, rough costing and timelines."_ (It used to point to WhatsApp, so it had to change. Please check the wording.)
- **Contact page description (shown in Google results):** "Call +91 94290 04803 or email woodflexdesigns@gmail.com for feasibility, rough costing and timelines, or visit our workshop in Surat, Gujarat."
- **Home "Who are you?" cards** now link to the Contact page without pre-picking a role, since the role only mattered for the old form.
- **Checks run:**
  - The site builds, and every page is still static HTML.
  - No page contains "WhatsApp" or any WhatsApp link, including the 404 page.
  - The Contact page has no form, three call links, the email and the address.
  - The product pop-up's call buttons can be reached on mobile.
  - All earlier content checks still pass, with no script errors or sideways scrolling.

## 2. What changed in the repo
**Branch:** `claude/keen-darwin-fn2i7c`.
- **Not merged.** main, the live site, is untouched. This session's commit is "Remove WhatsApp links; contact details only".

**Files changed this session:**
| File | Change |
| --- | --- |
| `app/contact/page.tsx` | Form replaced by the contact-details card (call, email, workshop); new intro and page description |
| `components/ContactForm.tsx` | **Deleted** (the WhatsApp form) |
| `components/ProductBrowser.tsx` | "Enquire on WhatsApp" replaced by "Call us about this design" with three call buttons |
| `app/faq/page.tsx` | "Ask us on WhatsApp" button removed |
| `lib/faq.ts` | "How do I get a quote?" answer now lists the three numbers and the email |
| `lib/site.ts` | WhatsApp link helper and WhatsApp number setting removed |
| `app/page.tsx` | "Who are you?" cards link to `/contact` |
| `HANDOFF.md` | This file |

## 3. Anything broken, blocked, or needing your decision
Nothing is broken. To check:
1. **The new wording of "How do I get a quote?"** (above).
2. **No online enquiry form:** the site can't collect messages by itself. Clients now call or email. A proper form that sends you an email or saves leads securely can be added later as part of Phase 2.
3. **Still open from before:** "fabric" (singular) in the Sofas description, and "jhulas" on Home. Keep or remove?

## 4. Exact next step
**Review the updated Vercel preview of branch `claude/keen-darwin-fn2i7c`**, especially:
- `/contact`
- the product pop-up on `/products` (tap any product)
- `/faq`

When you're happy, tell me to merge into main. Nothing goes live until you approve.
