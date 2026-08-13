# holyloy.net

Marketing site for **HolyLoy**, a loyalty and rewards ecosystem connecting
consumers, businesses and communities, and the home of a portfolio of twelve
ventures across Saudi Arabia.

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

The site references 81 images under `public/images/` that have not been generated
yet. `.env` ships `NEXT_PUBLIC_HOLYLOY_IMAGES_PENDING=1`, which makes `ImageSlot`
render a sized, labelled placeholder holding the correct aspect ratio, so layout
does not shift when real assets land.

Set it to `0` once the images exist. The conformance suite will then fail listing
every file still missing, which is the remaining checklist.

## Documentation

`docs/superpowers/specs/` holds the design spec and `docs/superpowers/plans/` the
implementation plan, including the reasoning behind the palette, the block
architecture, and the deviations made during the build.
