# holyloy.net

Marketing site for **HolyLoy**, a loyalty and rewards ecosystem connecting
consumers, businesses and communities, and the home of a portfolio of twelve
ventures across Saudi Arabia.

Live at **https://holyloynet.vercel.app**

Two surfaces only: a homepage, and a projects section with an index and twelve
detail pages. There is no CMS and there are no forms; every call to action is a
link, and all content is typed data in the repository.

## Stack

Next.js 16 (App Router), React 19, TypeScript strict, CSS Modules, GSAP with
ScrollTrigger, Phosphor icons, vitest.

Server Components by default. Four client islands: the GSAP provider, the sector
filter, the mobile menu, and the blocks that animate.

## Getting started

```bash
npm install
npm run dev
```

| Command | Does |
|---|---|
| `npm run dev` | Local dev server on port 3000 |
| `npm run build` | Production build, also type-checks |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npm test` | vitest |

## How the project pages work

Each of the twelve ventures is one typed data file in `lib/projects/`, exporting
an ordered array of blocks. `components/blocks/BlockRenderer.tsx` switches on
`block.type` with a `never` fallthrough, so adding a block variant without a
matching renderer is a compile error rather than a silently blank section.

The ten block types are `hero`, `figureBand`, `pillars`, `portfolio`, `flow`,
`comparison`, `economics`, `narrative`, `timeline` and `closing`. Adding a
thirteenth venture is a data file, not a build.

## Design tokens

`styles/tokens.css` is the single source of colour, type and spacing values. No
component declares a raw hex. The palette derives entirely from the logo: one
accent, `#DC0000`, on charcoal ink and warm off-white, with a full dark-mode
counterpart.

Red used as *text* has its own token. On dark grounds `#DC0000` only reaches
3.72:1, below AA, so `--c-red-text` lifts to `#FF3B30` there while every red
*fill* stays exactly `#DC0000`.

## Tests

Beyond unit tests for the pure logic in `lib/`, two suites enforce things that
otherwise rot as content gets edited:

- `tests/content-conformance.test.ts` asserts no em-dashes or en-dashes in any
  visible string, thesis and hero-subtext word limits, the per-page eyebrow
  budget, unique slugs matching their filenames, known sectors, and that every
  referenced image exists.
- `tests/contrast.test.ts` asserts every foreground and background pairing clears
  WCAG AA in both light and dark mode.

## Imagery

All 81 images are in place under `public/images/`, generated to the briefs in
`docs/image-manifest.md`. They follow two treatments, location documentary and
product still life, sharing one rule: **red is an object in the frame, never a
colour filter.** That is what ties the photography to the logo without tinting
anything.

Source files are 2000px JPEGs at quality 82. Next.js resizes and converts to WebP
on delivery, so do not pre-optimise replacements beyond that.

`ImageSlot` still supports a placeholder mode. Setting
`NEXT_PUBLIC_HOLYLOY_IMAGES_PENDING=1` in `.env` swaps every image for a sized,
labelled box holding the correct aspect ratio, which is useful when adding new
slots before their assets exist. It ships as `0`.

To replace or add images, drop files into a folder named either by their target
filename or by their manifest index, then run:

```bash
node scripts/place-images.mjs <folder>
```

The script reports anything unmatched and lists what is still missing. The asset
assertion in `tests/content-conformance.test.ts` then fails loudly for any
reference that does not resolve.

## Documentation

`docs/superpowers/specs/` holds the design spec and `docs/superpowers/plans/` the
implementation plan, including the reasoning behind the palette, the block
architecture, and the deviations made during the build.
