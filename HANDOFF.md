# HANDOFF — Woodflex: new dining chairs

_Last updated: 2026-10-22 · Session 15 (LC-34 drawing + LC-37 — awaiting your preview review, NOT merged)_

## 1. What was done
**Earlier today (already live):** LC-34, LC-35, LC-36 and LC-38 went live when you merged pull request #1 (main at `da6d092`).

**This session, fixing the two problems you spotted:**
- **Why they were missing:** both files have a **space after the dash** in their Cloudflare names: `Chairs Drawing/WFCD- 34.png` and `Chairs/WFC- 37.jpeg`. I had searched for `WFCD-34` and `WFC-37` without the space, so I didn't find them. Your screenshots showed the exact names.
- **LC-34 now has its technical drawing** (`WFCD- 34.png`).
- **LC-37 "WFC Dining 37" is added,** with photo (`WFC- 37.jpeg`) and drawing (`WFCD-37.png`). It sits between LC-36 and LC-38.
- **Checks run:**
  - The site builds, and every page is still static HTML.
  - Dining Chairs now shows **37**, with LC-33 through LC-38 in order; there are **204** products in total.
  - The LC-34 and LC-37 pop-ups show both their photo and drawing.
  - The new images are in the sitemap.
  - No script errors.
  - Only the WebP versions are in the project; the originals weren't committed.

## 2. What changed in the repo
**Branch:** `claude/keen-darwin-fn2i7c`, built on main.
- **Not merged.** The live site still shows the version from pull request #1.
- **Commit:** "Add LC-34 drawing and LC-37 dining chair".
- **Files:**
  - `data/products.json`: drawing added to LC-34; new LC-37 entry
  - `public/images/products/dining-chairs/`: `lc-34-drawing-1600.webp`, `lc-37-640.webp`, `lc-37-681.webp`, `lc-37-drawing-1600.webp`
  - `HANDOFF.md`: this file

## 3. Anything broken, blocked, or needing your decision
1. **File names with spaces:** consider renaming `WFC- 37.jpeg` → `WFC-37.jpeg` and `WFCD- 34.png` → `WFCD-34.png` in Cloudflare. It isn't required (the site uses its own copies), but it keeps names consistent for next time.
2. **The WFC-37 photo is small** (681 px wide), so it may look slightly soft in the large pop-up. A bigger original would fix that.
3. **No dimensions were given**, so none are shown as text. The sizes are on each drawing.
4. **LC-34's photo** is still the wide workshop shot of the whole dining set. Keep it or replace it?
5. **Phase 2:** still waiting on your answers (plan in commit `f306761`).

## 4. Exact next step
**Check the Vercel preview** of branch `claude/keen-darwin-fn2i7c` at `/products#dining-chairs`: open LC-34 (drawing now shows) and LC-37 (new). To make it live, either tell me "merge it", or on GitHub go to Pull requests → New pull request → base `main`, compare `claude/keen-darwin-fn2i7c` → Create → Merge.
