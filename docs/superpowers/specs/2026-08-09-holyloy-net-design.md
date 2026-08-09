# holyloy.net — Design Spec

Date: 2026-08-09
Status: approved for planning
Scope: homepage + projects section (index and 12 detail pages). Nothing else.

## 1. What this is

`holyloy.net` is the marketing site for **HolyLoy**, a loyalty and rewards ecosystem
that connects consumers, businesses and communities, and which is also developing a
portfolio of twelve ventures in Saudi Arabia.

The site has exactly two surfaces:

1. **Homepage** — explains the ecosystem and drives one primary action: join HolyLoy.
2. **Projects** — an index of the twelve ventures plus one detail page each.

There is no About page, no Contact page, no blog. Secondary information lives in the
footer or as a homepage section anchor.

### Relationship to sibling projects

`holyloydevelopmentsldt` (in the same parent directory) is a different HolyLoy entity —
a real-estate investment firm in Dhaka. This site borrows its **engineering conventions**
(stack, file layout, token discipline) but deliberately **not** its visual voice. That
site uses Playfair Display and an editorial-restraint language appropriate to a
real-estate investment house. This one is a loyalty technology platform and reads
differently.

### Source material

Provided under the project root, treated as input only, never shipped:

- `Logo and Icon/Logo.svg`, `Icon.svg` — the HolyLoy wordmark and twin-leaf mark,
  single-colour `#DC0000` on transparent. These are the sole source of the palette.
- `Homepage/*.jpeg` — two full-page mockups (Home, About) of a green-and-gold
  HolyLoy loyalty site. **Content source for the homepage. Not a layout reference.**
- `Projects/*.jpeg` — twelve full-page mockups, one per venture. **Content source
  for the project pages. Not a layout reference.**

**Critical constraint:** the mockups were themselves AI-generated and carry the
standard tells — an uppercase eyebrow above every section, rows of five identical
cards, and long spec tables with a hairline under every row. Copy and figures are
mined from them. Layouts are rebuilt from scratch per section 5.

## 2. Decisions already settled

| Question | Decision |
|---|---|
| Site purpose | Loyalty ecosystem site, with the 12 ventures as its Projects section |
| Palette | Single accent: `#DC0000` from the logo, on charcoal ink and warm off-white |
| Projects depth | Index page plus 12 individual detail pages at `/projects/[slug]` |
| Detail page architecture | Typed block system, not a fixed template |
| Stack | Next.js App Router, TypeScript strict, CSS Modules, `tokens.css`, GSAP |
| Figures in copy | Mockup figures used as approved copy, isolated in `lib/` for easy correction |
| Imagery | AI-generated, art-directed to the palette, via a written prompt manifest |

### Design read and dials

Reading this as: a landing page plus projects section for a loyalty and rewards
ecosystem, addressed to consumers, partner businesses and investors, with a confident
single-accent editorial-tech language, leaning toward native CSS Modules with a token
layer and GSAP.

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 6`
- `VISUAL_DENSITY: 4` on the homepage, `6` on project detail pages

### Deliberate divergences from the taste skill

Both were chosen before the skill was invoked and are kept for consistency with the
sibling project:

- **CSS Modules** rather than the skill's Tailwind v4 default.
- **GSAP** rather than Motion. The skill's scroll-pin and horizontal-pan skeletons are
  GSAP already, so only its reveal-stagger guidance is replaced (by a `useReveal` hook
  built on GSAP plus ScrollTrigger).

Every other rule in the skill applies, including the mechanical ones in section 8.

## 3. Visual language

### Palette

All values live in `styles/tokens.css` as the single source of truth. No component
declares a raw hex.

Light mode:

| Token | Value | Role |
|---|---|---|
| `--c-red` | `#DC0000` | The only accent. CTA fills, eyebrows, one accent word per major heading, the `+` on figures |
| `--c-red-press` | `#A80000` | Active and pressed states |
| `--c-red-wash` | `#FFF0F0` | Tinted surfaces. Always carries charcoal text, never red text |
| `--c-ink` | `#121212` | Primary text |
| `--c-graphite` | `#3F3F3F` | Body text |
| `--c-muted` | `#767676` | Labels, captions |
| `--c-hairline` | `#E5E1DD` | Borders |
| `--c-canvas` | `#FAF8F6` | Page background |
| `--c-card` | `#FFFFFF` | Raised surfaces |
| `--c-night` | `#101010` | Dark bands |

Dark mode (`@media (prefers-color-scheme: dark)`, page-level, locked): canvas becomes
`#0E0E0E`, cards `#181818`, ink `#F4F2F0`, graphite `#B8B4B0`, muted `#8A8683`,
hairline `#2A2A2A`. The red stays `#DC0000` — the brand colour is not desaturated for
dark mode. `--c-red-wash` inverts to `#2A0F0F`.

**Red discipline.** The red appears in exactly four roles listed above and nowhere
else. No red body text, no red panels, no red on red. This is what keeps `#DC0000`
reading as an accent on section nine rather than as a background.

**Colour consistency lock.** One accent for the whole site. No section introduces a
second hue. Sector tags on project cards are differentiated by label, not by colour.

### Typography

Loaded via `next/font/google`, never a `<link>` tag.

- **Display:** Archivo, weights 500 and 700, `letter-spacing: -0.025em`, `line-height: 1.08`.
  Chosen because its flat-cut squared terminals echo the logo's letterforms, so
  headings read as drawn from the same hand as the wordmark.
- **Body:** Geist, weights 400 and 500, `line-height: 1.7`, `max-width: 65ch`.
- **Labels and numerals:** Geist Mono, uppercase, `letter-spacing: 0.14em`, for
  eyebrows and figure labels.

Inter is explicitly not used, per the taste skill's default-avoidance rule. No serif
appears anywhere on this site.

Emphasis inside a headline is achieved with the red accent colour or Archivo's heavier
weight. Never by switching font family mid-headline.

### Shape and materiality

One radius scale, applied everywhere: `--r-control: 8px` for buttons and inputs,
`--r-card: 16px` for cards and image containers, `0` for full-bleed bands. No mixed
systems.

Cards are used only where elevation carries real hierarchy. Elsewhere, grouping is by
negative space or a single hairline. Shadows, where used at all, are tinted toward the
canvas hue, never pure black.

## 4. Architecture

```
app/
  layout.tsx              root layout: fonts, metadata, GSAPProvider, Header, Footer
  icon.svg                favicon, from Icon.svg
  opengraph-image.tsx     branded OG card
  page.tsx                homepage
  projects/page.tsx       index
  projects/[slug]/page.tsx  detail, generateStaticParams over all 12
  not-found.tsx
components/
  layout/                 Header, Footer, MobileMenu, SectionHead
  home/                   one component + CSS Module per homepage section
  projects/               ProjectCard, SectorFilter, ProjectHero
  blocks/                 the ten block components + BlockRenderer
  ui/                     Button, Figure, Eyebrow, CountUp, Reveal, Disclosure
  gsap/                   GSAPProvider + hooks: useReveal, useCountUp, useDrawPath,
                          useHorizontalPan
lib/
  projects/               index.ts + one file per venture
  types.ts                Project, Block discriminated union, Figure, Step
  sectors.ts
styles/
  tokens.css              design tokens ONLY, single source of truth
  base.css                reset, typography, atoms
public/
  images/                 generated assets
  logo.svg, icon.svg      optimised from the supplied SVGs
docs/
  image-manifest.md       one prompt per generated asset
```

Each section and block component pairs with its own CSS Module. There is no global
`sections.css`.

Server Components by default. Only four things are client islands: `GSAPProvider`,
the sector filter, the mobile menu, and any block that animates.

## 5. Homepage

Eight sections, each a different layout family, so no two sections read the same.

| # | Section | Layout family | Content |
|---|---|---|---|
| 1 | Hero | Asymmetric split | Headline "Loyalty is royalty", subtext under 20 words, two CTAs, generated hero image |
| 2 | The five pillars | Bento, exactly 5 cells, mixed sizes | Loyalty, rewards, digital commerce, data and intelligence, sustainability |
| 3 | Who it serves | Horizontal scroll-snap panels | Consumers, businesses, communities, sustainability |
| 4 | How it works | Drawn scroll path | Shop, earn, engage, redeem, return |
| 5 | Traction | Full-bleed dark band, count-up | 100K+ consumers, 3K+ partner businesses, 2M+ rewards redeemed, 500+ tons recycled |
| 6 | The app | Split editorial | Product visual plus the "it's a relationship" message |
| 7 | Ventures | GSAP horizontal pan | The twelve, panning into `/projects` |
| 8 | Join the ecosystem | Full-bleed dark closing | Single CTA |

### Rules applied to the homepage

- **Hero discipline.** Maximum four text elements: headline (2 lines max), subtext
  (20 words max), one primary CTA, one secondary CTA. No eyebrow, no tagline under the
  CTAs, no trust strip, no scroll cue. Top padding capped at 6rem on desktop.
- **Eyebrow budget.** Eight sections permits at most three eyebrows. The mockups use
  eight. Sections 2, 4 and 7 get one; the rest go without.
- **No numbered step labels.** The mockups label the cycle `01 Shop`, `02 Earn`. The
  numbers are dropped; the verb is the label.
- **No three-equal-cards row** anywhere. Section 2 is a bento with genuine size
  variation and at least two cells carrying real imagery rather than text on white.
- **Zigzag cap.** Only sections 1 and 6 are image-and-text splits, and they are not
  adjacent.
- **Navigation** renders on one line at desktop, height 68px: wordmark, four links,
  one primary CTA. Below 768px it collapses to a hamburger. Link targets:

  | Label | Target |
  |---|---|
  | Ecosystem | `/#ecosystem`, homepage section 2 |
  | Who it serves | `/#audiences`, homepage section 3 |
  | How it works | `/#how-it-works`, homepage section 4 |
  | Projects | `/projects` |

  The mockups carry eight nav items, which cannot fit one line. `About` and `Contact`
  move to the footer, `For Consumers` and `For Businesses` merge into the
  `#audiences` anchor, and `Sustainability` is covered as a pillar in section 2
  rather than earning its own nav slot.

## 6. Projects

### Index — `/projects`

Headline states the count. A short intro paragraph stacked beneath it, not floated in
a right-hand column. Sector filter as a client island over six sectors. Then a grid of
twelve cards, each carrying a generated image, the sector, a one-line thesis and two
headline figures. Captions sit below images; nothing is overlaid on a photograph.

The filter has a real empty state. Filtering is client-side over already-rendered data,
so there is no loading state to design.

### The twelve ventures

| Slug | Name | Sector |
|---|---|---|
| `lithium-battery` | Lithium-Ion Battery Manufacturing | Energy |
| `solar-energy` | Renewable Energy and Solar Power | Energy |
| `cement-plant` | Cement Manufacturing Plant | Industry |
| `civil-engineering` | Civil Engineering and Construction | Industry |
| `safety-footwear` | Safety Shoes Distribution | Industry |
| `food-trade` | Food Grain and Consumable Products Trading | Trade |
| `general-trading` | General Trading and Import-Export | Trade |
| `pharma-manufacturing` | Pharmaceutical Manufacturing Plant | Health |
| `healthcare-development` | Vision 2030 Healthcare Development | Health |
| `smart-taxi` | Smart Taxi | Mobility |
| `manpower-sourcing` | Mega Manpower Sourcing | Services |
| `digital-advertising` | Digital Advertising and Electronic Media | Services |

All twelve are Saudi Arabia focused. Each detail page's content is transcribed from its
corresponding mockup in `Projects/`.

### Detail — `/projects/[slug]`

Composed from the block library. Each project's data file declares an ordered `blocks`
array; the renderer switches on `block.type`.

## 7. Block library

Ten blocks. Each is a deliberate translation of a mockup pattern into a form that
survives the taste rules.

| Block | Purpose | Replaces |
|---|---|---|
| `hero` | Project title, tagline, thesis, four meta facts, image | The mockup hero |
| `figureBand` | Four to six headline figures with count-up, dark or light | "Market at a glance" stat rows |
| `pillars` | Two to five items, bento rhythm with mixed cell sizes | Rows of five identical cards |
| `portfolio` | Image-led category grid, captions below | Product and application-segment grids |
| `flow` | Ordered steps, scroll-snap on mobile, drawn path on desktop | Eight-icon process chains |
| `comparison` | Grouped columns, chunked into clusters | City and sourcing-country tables |
| `economics` | Three to four hero figures as display tiles, remainder behind a disclosure | Investment and financial spec tables |
| `narrative` | Split editorial with one supporting visual or pull figure | Long prose blocks |
| `timeline` | Phases on an SVG line drawn by scroll | Roadmap strips |
| `closing` | Dark band, supporting points, the single CTA | "Why partner with us" footers |

### Type contract

```ts
export type Figure = { value: string; label: string; note?: string };
export type Step   = { label: string; body: string };

export type Block =
  | { type: "hero"; tagline: string; thesis: string; facts: Figure[]; image: string }
  | { type: "figureBand"; tone: "dark" | "light"; figures: Figure[] }
  | { type: "pillars"; eyebrow?: string; heading: string; items: Pillar[] }
  | { type: "portfolio"; heading: string; categories: Category[] }
  | { type: "flow"; heading: string; steps: Step[] }
  | { type: "comparison"; heading: string; clusters: Cluster[] }
  | { type: "economics"; heading: string; headline: Figure[]; detail: DetailRow[] }
  | { type: "narrative"; heading: string; body: string; image?: string; pull?: Figure }
  | { type: "timeline"; heading: string; phases: Phase[] }
  | { type: "closing"; heading: string; points: string[] };

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  thesis: string;        // 25 words maximum, used on the index card
  cardImage: string;
  cardFigures: [Figure, Figure];
  blocks: Block[];
};
```

The supporting shapes referenced above (`Pillar`, `Category`, `Cluster`, `DetailRow`,
`Phase`, `Sector`) are defined alongside these in `lib/types.ts`.

`BlockRenderer` switches on `block.type` with a `never` fallthrough in the default arm,
so adding an eleventh variant without a matching renderer is a compile error rather
than a silently blank section.

Figure values are strings, not numbers, so `"USD 5.6B"` and `"53.8-57.4 kg"` render
exactly as authored. `CountUp` parses the leading numeric portion and animates it,
leaving prefix and suffix static.

### Content rules enforced by the block layer

- No block renders a table with a border on every row. `economics` and `comparison`
  group rows into clusters with sparse dividers.
- `portfolio` requires an image per category. A category without one is a type error.
- Any block accepting an `eyebrow` treats it as optional, and the count is capped by
  the test in section 8.

## 8. Testing

`vitest`, matching the sibling project's setup.

**Unit tests** for `lib/` logic: the `CountUp` value parser (prefix, numeric portion,
suffix, and non-numeric passthrough), the sector filter predicate, and slug resolution.

**Content conformance spec** — the significant one. It walks all twelve project files
plus the homepage content module and asserts:

1. No em-dash or en-dash in any user-visible string.
2. Every `thesis` is 25 words or fewer.
3. Hero subtext is 20 words or fewer.
4. Eyebrow count per page is at most `ceil(n / 3)`, where `n` is the block count on a
   project page and the section count on the homepage.
5. Slugs are unique and match their filename.
6. Every image path referenced in data exists under `public/`.
7. Every `sector` is a member of the sector union.

These are exactly the rules that rot as content gets edited over time. Encoding them as
tests makes them permanent rather than aspirational.

**Not tested:** visual regression. Out of scope for this build.

## 9. Imagery

Roughly thirty generated assets: one homepage hero, four pillar and panel images, one
product visual, twelve project card images, twelve project hero images.

`docs/image-manifest.md` holds one entry per asset: filename, aspect ratio, subject
description, and a shared treatment clause appended to every prompt so all thirty read
as a single commission rather than thirty unrelated stock photos.

**Art direction.** Desaturated base with the red present as a real object in the frame —
signage, a jacket, a tail light, a painted wall — rather than a colour filter laid over
the top. Wide, calm compositions with room for text overlay where a section needs it.

**Generation route.** Two viable paths, to be settled before implementation begins:

- A Gemini API key from Google AI Studio stored in the environment as `GEMINI_API_KEY`,
  driven by a script committed at `scripts/generate-images.ts`. A consumer Gemini Pro
  subscription does not grant API access and cannot be used for this.
- The Higgsfield MCP already connected to the session, which exposes Google's
  `nano_banana`, `nano_banana_2` and `nano_banana_pro`. Requires credits on that
  account.

**Blocking behaviour.** Image generation does not block layout work. Every image slot
renders a sized, labelled placeholder until its asset lands, so the site is buildable
and reviewable throughout. The content conformance test's image-existence assertion is
skipped while `HOLYLOY_IMAGES_PENDING=1` is set, and that escape hatch is removed once
generation completes.

## 10. Motion

GSAP with ScrollTrigger, registered once in `GSAPProvider`. Every animating component
is a `'use client'` leaf using `gsap.context()` with a `revert()` cleanup.

Four motivated uses, and no others:

| Use | Justification |
|---|---|
| Staggered reveal on section entry | Establishes hierarchy and reading order |
| Count-up on figure bands | Gives the numbers weight; they are the argument |
| Drawn path in `flow` and `timeline` | Communicates sequence, which is the content |
| Horizontal pan on the ventures teaser | Conveys breadth of the portfolio in one gesture |

At most one horizontally panning section per page. No marquees. No infinite loops. No
custom cursors. No parallax.

`window.addEventListener("scroll")` is banned; ScrollTrigger and IntersectionObserver
only. Only `transform` and `opacity` are animated.

Everything collapses to a static end state under `prefers-reduced-motion: reduce`,
checked with `gsap.matchMedia()`.

## 11. Accessibility and performance

- WCAG AA on all text. `#DC0000` with white text clears 4.5:1; red-wash surfaces carry
  charcoal text, never red.
- Every CTA label is three words or fewer and does not wrap at desktop. One label per
  intent across the whole site: the primary CTA is "Join HolyLoy" in the nav, hero and
  closing band alike, and it resolves to the single destination in section 13.
- There is no form anywhere on this site. Every call to action is a link. If a join
  form is wanted later it is a scope change, not an omission.
- Icons come from Phosphor only, one stroke weight globally. No hand-drawn SVG icon
  paths. The logo and twin-leaf mark are brand assets and exempt.
- `min-h-[100dvh]` on full-height sections, never `h-screen`.
- Hero image carries `priority`. All other images are lazy with explicit dimensions to
  hold CLS under 0.1. LCP target under 2.5s, INP under 200ms.

## 12. Out of scope

Stated so it is not silently assumed:

- Any page beyond the homepage and the projects section.
- A CMS. All content is typed data in the repository.
- Authentication, the actual loyalty product, or any application behaviour.
- Multi-language or right-to-left support, despite the Saudi Arabia focus.
- Any form, and therefore any form backend. All calls to action are links.
- Analytics and deployment configuration.

## 13. Open items

Two, both non-blocking:

1. **Image generation route** (section 9) — needs either a `GEMINI_API_KEY` in the
   environment or credits on the Higgsfield account. Layout work proceeds against
   placeholders either way.
2. **CTA destination** — "Join HolyLoy" needs one target, used identically in the nav,
   hero and closing band. Until one is supplied it resolves to a `mailto:` on the
   footer address. If the intended destination is an app store listing, a signup URL
   or an external portal, that decision changes nothing structurally.
