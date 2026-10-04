# HANDOFF — Woodflex content update (Phase 1 pages)

_Last updated: 2026-10-04 · Session 7 (content update — awaiting your preview review, NOT merged)_

## 1. What was done
- **Experience line.** "50 years of furniture-making experience behind us." now sits next to "Est. 2024" on Home and in the About introduction.
  - "Est. 2024" and the 2024 founding date Google reads are unchanged.
  - Nowhere does the site say Woodflex Designs itself is 50 years old. I checked every page automatically.
- **Delivery area.**
  - The list (Surat, Pune, Mumbai, Hyderabad, Bengaluru, Chennai, Nagpur, Rajasthan) and the line "Made in Surat, delivered across India." now appear on Home, About and Contact.
  - The same list is in the business details Google reads ("areaServed"), with "India" as a whole kept as well.
- **New FAQ page at `/faq`.**
  - It has all 13 questions: your 8 new ones, word for word, plus the 5 existing ones you asked to keep.
  - Each question is a heading, and each answer is plain visible text.
  - It has its own title, description and FAQ data for Google, and it's added to the sitemap and the footer.
- **Home FAQ.** It now shows six questions and a "See all questions" button that goes to `/faq`. Google's FAQ data was removed from Home, so it now lives only on `/faq`.
- **About page.** New "How we build" section with four points: kiln-dried wood, mortise-and-tenon joinery (99% adhesive-based), foam and lining (Sleepzee Century foam), and the 3-year warranty.
- **Materials page.** New "What's inside" section. It says all our wood is kiln-dried, names Sleepzee Century foam with its layers, and gives the lining spec.
- **One source for every fact.** The FAQ, About and Materials all pull these facts from one shared file, so the wording and numbers can't drift apart.
- **Checks run:**
  - The site builds, and every page, including the new `/faq`, is still delivered as ready-made (static) HTML.
  - An automatic check compared each FAQ answer character by character with the text you sent: all match.
  - robots.txt is unchanged.
  - The sitemap now lists 7 pages (the 6 before plus `/faq`).
  - No page has sideways scrolling or script errors on desktop or mobile.
  - The design is unchanged apart from the new sections, which use the existing styles.
- **Phase 2 not touched.** None of the Phase 2 tools are in this update.

## 2. What changed in the repo
**Branch:** `claude/keen-darwin-fn2i7c`, built on top of `main`. Before this update it differed from main only by the Phase 2 plan in this file.
- **Not merged.** main, the live site, is untouched. The commit is "Content update: experience line, delivery area, FAQ page, build details".

**Files changed:**
| File | Change |
| --- | --- |
| `lib/site.ts` | Added the experience line, the delivery list, the "Made in Surat, delivered across India." line, and footer links (adds FAQ) |
| `lib/faq.ts` (**new**) | All 13 FAQ questions and answers, the six chosen for Home, and the shared build facts (wood, joinery, foam, warranty) |
| `app/faq/page.tsx` (**new**) | The new `/faq` page, with Google's FAQ data |
| `app/page.tsx` | Home: experience line, delivery line and list, six FAQs plus a "See all questions" link; Google's FAQ data removed |
| `app/about/page.tsx` | Experience line and delivery in the intro; new "How we build" section |
| `app/contact/page.tsx` | New "Delivery" block next to the address |
| `app/materials/page.tsx` | New "What's inside" section |
| `lib/seo.ts` | areaServed now lists the delivery cities and state, plus India |
| `app/sitemap.ts` | Added `/faq` |
| `components/Footer.tsx` | Footer now links to FAQ |
| `HANDOFF.md` | This file |

## 3. Anything broken, blocked, or needing your decision
Nothing is broken. A few things to look at in the preview:
1. **Warranty wording on About.** The FAQ answer is "Yes. Our furniture carries a 3-year warranty." On About I used the same sentence without "Yes.", since there's no question there to answer. Everything else on About matches the FAQ word for word.
2. **The Home FAQ shows these six:** where we're based and deliver, how long we've been making furniture, what wood we use, warranty, samples, and how to get a quote. Tell me if you'd like a different six.
3. **Order of the foam layers.** You gave the materials but not the order they're stacked in. The Materials page lists them as a spec (foam, latex, Recron, full-size sheets, lining) without claiming which layer sits on top.
4. **"India" in areaServed.** I kept "India" alongside your list, because the site says "delivered across India". Say if you want only the eight listed places.
5. **Phase 2 is still waiting.** The Phase 2 plan from the last session is waiting on your answers. It's in this file's previous version (commit `f306761`).

## 4. Exact next step
**Review the Vercel preview of branch `claude/keen-darwin-fn2i7c`.** Vercel builds it automatically from this push. Check in particular:
- Home: the hero (the right-hand column under "Est. 2024") and the FAQ section
- `/faq`
- About: "How we build"
- Materials: "What's inside"
- Contact: "Delivery"

When you're happy, tell me to merge it into main. Nothing goes live until you approve.
