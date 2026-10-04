# HANDOFF — Woodflex content update (Phase 1 pages)

_Last updated: 2026-10-04 · Session 8 (corrections to the content update — awaiting your preview review, NOT merged)_

## 1. What was done
**This session (corrections):**
- **Foam: two brands, not one.**
  - The foam answer is now exactly your new text: Sleepeeze and Century, at least 2 inches of foam at a minimum of 40 density, Recron in every seat, latex optional depending on budget, full-size sheets and the 500–600 GSM Majarpat lining.
  - It appears identically in the FAQ, About ("How we build") and Materials ("What's inside").
  - The Materials spec list now matches your five lines.
  - "Sleepzee Century", "40–50 density" and "2-inch latex" no longer appear anywhere on the site.
- **Woods: no sheesham or mango.**
  - The two FAQ answers ("What wood do you use?" and "Which woods and finishes can I choose from?") are now exactly your text.
  - "Sheesham", "rosewood" and "mango" are removed everywhere: page text, page descriptions, the business description, and the details Google reads.
  - In those details, "Sheesham wood" became "Walnut wood".
- **Materials page wood cards:**
  - The sheesham and mango cards and their photos are removed.
  - There's now one **Teak** card using the existing teak photo, naming Ghana teak, Valsad teak and Burma Border teak, and keeping the existing teak description.
  - **Walnut** is listed by **name only**, with no photo and no description, as you asked, so nothing is invented.
  - Acacia and white ash are unchanged.
- **Checks run:**
  - The site builds, and every page is still static HTML.
  - An automatic check confirmed the three new answers and the five spec lines match your text exactly.
  - None of the removed terms appear in any page, the hidden structured data or the sitemap.
  - No sideways scrolling or script errors on desktop or mobile.
  - robots.txt and the sitemap are unchanged (still 7 pages).

**Earlier in this update (still in place):** the experience line, the delivery area, the new `/faq` page, About "How we build" and Materials "What's inside".

## 2. What changed in the repo
**Branch:** `claude/keen-darwin-fn2i7c`.
- **Not merged.** main, the live site, is untouched. This session's commit is "Content corrections: two foam brands, updated wood list".

**Files changed this session:**
| File | Change |
| --- | --- |
| `lib/faq.ts` | New foam answer; new "What wood do you use?" and "Which woods and finishes" answers |
| `lib/catalog.ts` | Wood cards: Teak (with three types) and Walnut (name only); sheesham and mango removed; photo and description now optional on a card |
| `app/materials/page.tsx` | New spec list; "Foam & lining" heading; wood-card display for the types and name-only cards; new page description |
| `app/page.tsx` | Home "Material clarity": "(solid mango/acacia)" became "(solid acacia)" |
| `lib/site.ts` | Business description: "teak, walnut, acacia and white ash" |
| `lib/seo.ts` | knowsAbout: "Sheesham wood" became "Walnut wood" |
| `app/sitemap.ts` | Only lists material photos that exist (walnut has none) |
| `data/material-images.json` | Removed the sheesham and mango photo entries |
| `public/images/materials/sheesham-400.webp`, `mango-225.webp` | Deleted |
| `HANDOFF.md` | This file |

## 3. Anything broken, blocked, or needing your decision
1. **Your message was cut off** after "list walnut". I listed walnut by name only, with no photo or description. If there were more instructions after that (for example about walnut, or further numbered items), please resend them.
2. **Home "Material clarity" section.** It used to say "Essentials (solid mango/acacia)". I removed mango, so it now reads "Essentials (solid acacia)". The same section also says "Plus (teak/oak)". **Oak isn't on your wood list.** Should oak be removed or replaced (for example "Plus (teak/walnut)")? I haven't changed it without your say.
3. **Walnut card.** With no photo or text, it shows as a tall, mostly empty card next to the others. If you send a walnut photo and a one-line description, I'll fill it in.
4. **The teak card keeps its existing description** ("Dense, durable hardwood with warm honey tones…"). It's general teak text that was already on the site, not specific to the three types.

## 4. Exact next step
**Review the updated Vercel preview of branch `claude/keen-darwin-fn2i7c`**, especially:
- `/materials` (wood cards and "What's inside")
- `/faq`
- About: "How we build"

Reply with the rest of your cut-off message (if any) and the oak decision (item 2). When you're happy, tell me to merge. Nothing goes live until you approve.
