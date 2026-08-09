# holyloy.net Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the holyloy.net marketing site — a homepage plus a projects section with twelve venture detail pages — for the HolyLoy loyalty and rewards ecosystem.

**Architecture:** Next.js App Router, Server Components by default with four client islands (GSAP provider, sector filter, mobile menu, animating blocks). Project detail pages are composed from a discriminated-union block library, so each of the twelve pages is a typed data file rather than hand-built markup. Design tokens live in one CSS file and are the sole source of colour and type values.

**Tech Stack:** Next.js 15.5.20, React 19, TypeScript 5.7 strict, CSS Modules, GSAP 3.13 with `@gsap/react`, `@phosphor-icons/react`, vitest 2.1.8.

**Spec:** `docs/superpowers/specs/2026-08-09-holyloy-net-design.md`. Read it before starting. Where this plan and the spec disagree, the spec wins and the plan is wrong.

## Global Constraints

Every task's requirements implicitly include this section.

- **Zero em-dashes (`—`) and zero en-dashes (`–`) in any user-visible string.** Headlines, eyebrows, body copy, button labels, alt text, captions, metadata. Use the hyphen `-`. This is enforced by a test in Task 16.
- **One accent colour: `#DC0000`.** It appears in exactly four roles: CTA fills, eyebrows, one accent word per major heading, and the `+` on figures. No red body text. No second hue anywhere on the site.
- **No component declares a raw hex value.** All colour comes from `var(--c-*)` tokens in `styles/tokens.css`.
- **Fonts:** Archivo (display), Geist (body), Geist Mono (labels). All via `next/font/google`. Inter is banned. No serif anywhere.
- **Radius scale:** `--r-control: 8px` for buttons and inputs, `--r-card: 16px` for cards and image containers, `0` for full-bleed bands. No other values.
- **Icons** come from `@phosphor-icons/react` only, one stroke weight globally (`weight="regular"`). No hand-drawn SVG icon paths. The logo and twin-leaf mark are brand assets and exempt.
- **Full-height sections** use `min-height: 100dvh`, never `100vh`.
- **No `window.addEventListener("scroll")`.** ScrollTrigger and IntersectionObserver only. Animate only `transform` and `opacity`.
- **Every animation collapses to a static end state** under `prefers-reduced-motion: reduce`, via `gsap.matchMedia()`.
- **Eyebrow budget:** at most `ceil(n / 3)` eyebrows per page, where `n` is the section count on the homepage and the block count on a project page.
- **CTA labels are three words or fewer** and must not wrap at desktop. One label per intent: the primary CTA is "Join HolyLoy" everywhere it appears.
- **There are no forms on this site.** Every call to action is a link.
- **Dark mode is mandatory and page-level.** No section inverts against the page theme.

## File Structure

```
app/
  layout.tsx                  fonts, metadata, GSAPProvider, Header, Footer
  page.tsx                    homepage
  icon.svg                    favicon
  opengraph-image.tsx         branded OG card
  not-found.tsx
  projects/page.tsx           index
  projects/[slug]/page.tsx    detail
components/
  layout/Header.tsx           one-line desktop nav, 68px
  layout/MobileMenu.tsx       client island
  layout/Footer.tsx
  layout/SectionHead.tsx      eyebrow + heading pair
  home/Hero.tsx               section 1
  home/Pillars.tsx            section 2
  home/Audiences.tsx          section 3, client island (scroll-snap)
  home/HowItWorks.tsx         section 4, client island (drawn path)
  home/Traction.tsx           section 5, client island (count-up)
  home/AppMoment.tsx          section 6
  home/Ventures.tsx           section 7, client island (horizontal pan)
  home/JoinBand.tsx           section 8
  projects/ProjectCard.tsx
  projects/SectorFilter.tsx   client island
  blocks/BlockRenderer.tsx    exhaustive switch on block.type
  blocks/*.tsx                the ten block components
  ui/Button.tsx               link-only, two variants
  ui/Eyebrow.tsx
  ui/FigureDisplay.tsx
  ui/CountUp.tsx              client island
  ui/Disclosure.tsx           client island
  ui/Reveal.tsx               client island
  ui/ImageSlot.tsx            placeholder-or-image
  gsap/GSAPProvider.tsx       registers ScrollTrigger once
  gsap/useReveal.ts
  gsap/useCountUp.ts
  gsap/useDrawPath.ts
  gsap/useHorizontalPan.ts
lib/
  types.ts                    Project, Block union, Figure, supporting shapes
  sectors.ts                  SECTORS, isSector, sectorLabel
  parseFigure.ts              splits "USD 5.6B" into prefix, number, suffix
  contentRules.ts             wordCount, findBannedDash, eyebrowBudget
  projects/index.ts           PROJECTS array, getProject, getProjectSlugs
  projects/<slug>.ts          one per venture, twelve files
  home.ts                     homepage copy as typed data
styles/
  tokens.css                  design tokens ONLY
  base.css                    reset, typography atoms
scripts/
  generate-images.ts          Gemini image generation driver
tests/
  parseFigure.test.ts
  contentRules.test.ts
  sectors.test.ts
  tokens.test.ts
  content-conformance.test.ts
docs/
  image-manifest.md
public/
  images/                     generated assets
  logo.svg, icon.svg
```

Every component pairs with its own CSS Module (`Header.tsx` + `Header.module.css`). There is no global `sections.css`.

---

### Task 1: Scaffold the application and lock the token layer

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `.eslintrc.json`, `vitest.config.ts`, `next-env.d.ts`
- Create: `styles/tokens.css`, `styles/base.css`
- Create: `app/layout.tsx`, `app/page.tsx`
- Create: `public/logo.svg`, `public/icon.svg`, `app/icon.svg`
- Test: `tests/tokens.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the token names listed in `tokens.css`, consumed by every later task via `var(--c-ink)` and friends. The font CSS variables `--font-archivo`, `--font-geist`, `--font-geist-mono` are set on `<html>` by `app/layout.tsx`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "holyloy-net",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "15.5.20",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "gsap": "3.13.0",
    "@gsap/react": "2.1.2",
    "@phosphor-icons/react": "2.1.7"
  },
  "devDependencies": {
    "typescript": "5.7.2",
    "@types/node": "22.10.2",
    "@types/react": "19.0.2",
    "@types/react-dom": "19.0.2",
    "eslint": "9.17.0",
    "eslint-config-next": "15.5.20",
    "vitest": "2.1.8"
  }
}
```

- [ ] **Step 2: Create the remaining config files**

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
export default nextConfig;
```

`.eslintrc.json`:

```json
{ "extends": "next/core-web-vitals" }
```

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
```

`next-env.d.ts`:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: completes without `ERR!`. A peer-dependency warning from `@gsap/react` about React 19 is acceptable.

- [ ] **Step 4: Write the failing token test**

Create `tests/tokens.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../styles/tokens.css", import.meta.url), "utf8");

const REQUIRED = [
  "--c-red", "--c-red-press", "--c-red-wash",
  "--c-ink", "--c-graphite", "--c-muted",
  "--c-hairline", "--c-canvas", "--c-card", "--c-night",
  "--r-control", "--r-card",
  "--f-display", "--f-body", "--f-mono",
];

describe("tokens.css", () => {
  it("defines every required token", () => {
    for (const token of REQUIRED) {
      expect(css, `missing ${token}`).toContain(`${token}:`);
    }
  });

  it("redefines every colour token in the dark-mode block", () => {
    const dark = css.slice(css.indexOf("prefers-color-scheme: dark"));
    expect(dark.length).toBeGreaterThan(0);
    for (const token of REQUIRED.filter((t) => t.startsWith("--c-"))) {
      expect(dark, `dark mode missing ${token}`).toContain(`${token}:`);
    }
  });

  it("keeps the brand red identical in both modes", () => {
    const matches = [...css.matchAll(/--c-red:\s*([^;]+);/g)].map((m) => m[1].trim());
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe(matches[1]);
  });
});
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npm test -- tests/tokens.test.ts`
Expected: FAIL with `ENOENT` — `styles/tokens.css` does not exist yet.

- [ ] **Step 6: Write `styles/tokens.css`**

```css
:root {
  --c-red: #DC0000;
  --c-red-press: #A80000;
  --c-red-wash: #FFF0F0;
  --c-ink: #121212;
  --c-graphite: #3F3F3F;
  --c-muted: #767676;
  --c-hairline: #E5E1DD;
  --c-canvas: #FAF8F6;
  --c-card: #FFFFFF;
  --c-night: #101010;

  --r-control: 8px;
  --r-card: 16px;

  --f-display: var(--font-archivo), "Helvetica Neue", Arial, sans-serif;
  --f-body: var(--font-geist), system-ui, -apple-system, sans-serif;
  --f-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;

  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
  --step-3: clamp(2rem, 1.4rem + 2.8vw, 3.5rem);
  --step-4: clamp(2.75rem, 1.6rem + 5vw, 5.5rem);

  --gutter: clamp(1.25rem, 4vw, 4rem);
  --band: clamp(4rem, 8vw, 8rem);
  --shell: 1400px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --c-red: #DC0000;
    --c-red-press: #A80000;
    --c-red-wash: #2A0F0F;
    --c-ink: #F4F2F0;
    --c-graphite: #B8B4B0;
    --c-muted: #8A8683;
    --c-hairline: #2A2A2A;
    --c-canvas: #0E0E0E;
    --c-card: #181818;
    --c-night: #101010;
  }
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npm test -- tests/tokens.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 8: Write `styles/base.css`**

```css
*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--c-canvas);
  color: var(--c-graphite);
  font-family: var(--f-body);
  font-size: var(--step-0);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  margin: 0;
  font-family: var(--f-display);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--c-ink);
  text-wrap: balance;
}

p { margin: 0; max-width: 65ch; }

a { color: inherit; text-decoration: none; }

img, svg { display: block; max-width: 100%; height: auto; }

ul { margin: 0; padding: 0; list-style: none; }

:focus-visible {
  outline: 2px solid var(--c-red);
  outline-offset: 3px;
}

.shell {
  width: 100%;
  max-width: var(--shell);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 9: Copy the brand assets**

```bash
cp "Logo and Icon/Logo.svg" public/logo.svg
cp "Logo and Icon/Icon.svg" public/icon.svg
cp "Logo and Icon/Icon.svg" app/icon.svg
```

- [ ] **Step 10: Write `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/base.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://holyloy.net"),
  title: {
    default: "HolyLoy - Loyalty is royalty",
    template: "%s | HolyLoy",
  },
  description:
    "A loyalty and rewards ecosystem connecting consumers, businesses and communities, and a portfolio of twelve ventures across Saudi Arabia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 11: Write a temporary `app/page.tsx`**

```tsx
export default function HomePage() {
  return <main className="shell">HolyLoy</main>;
}
```

- [ ] **Step 12: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`, with `/` listed as a static route.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js app with locked token layer"
```

---

### Task 2: Domain types and the sector vocabulary

**Files:**
- Create: `lib/types.ts`, `lib/sectors.ts`
- Test: `tests/sectors.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Sector = "energy" | "industry" | "trade" | "health" | "mobility" | "services"`
  - `SECTORS: readonly Sector[]`
  - `isSector(value: string): value is Sector`
  - `sectorLabel(sector: Sector): string`
  - `Figure`, `Step`, `Pillar`, `Category`, `Cluster`, `DetailRow`, `Phase`, `Block`, `Project`

- [ ] **Step 1: Write the failing test**

Create `tests/sectors.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { SECTORS, isSector, sectorLabel } from "../lib/sectors";

describe("sectors", () => {
  it("exposes exactly the six sectors from the spec", () => {
    expect([...SECTORS]).toEqual([
      "energy", "industry", "trade", "health", "mobility", "services",
    ]);
  });

  it("accepts a known sector", () => {
    expect(isSector("mobility")).toBe(true);
  });

  it("rejects an unknown sector", () => {
    expect(isSector("logistics")).toBe(false);
  });

  it("gives every sector a capitalised display label", () => {
    for (const sector of SECTORS) {
      const label = sectorLabel(sector);
      expect(label.length).toBeGreaterThan(0);
      expect(label[0]).toBe(label[0].toUpperCase());
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/sectors.test.ts`
Expected: FAIL — cannot resolve `../lib/sectors`.

- [ ] **Step 3: Write `lib/sectors.ts`**

```ts
export const SECTORS = [
  "energy", "industry", "trade", "health", "mobility", "services",
] as const;

export type Sector = (typeof SECTORS)[number];

const LABELS: Record<Sector, string> = {
  energy: "Energy",
  industry: "Industry",
  trade: "Trade",
  health: "Health",
  mobility: "Mobility",
  services: "Services",
};

export function isSector(value: string): value is Sector {
  return (SECTORS as readonly string[]).includes(value);
}

export function sectorLabel(sector: Sector): string {
  return LABELS[sector];
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/sectors.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Write `lib/types.ts`**

```ts
import type { Sector } from "./sectors";

export type Figure = { value: string; label: string; note?: string };
export type Step = { label: string; body: string };
export type Pillar = { title: string; body: string; icon: string; image?: string };
export type Category = { title: string; image: string; items: string[] };
export type Cluster = { title: string; rows: DetailRow[] };
export type DetailRow = { label: string; value: string };
export type Phase = { title: string; body: string; horizon: string };

export type HeroBlock = {
  type: "hero";
  tagline: string;
  thesis: string;
  facts: Figure[];
  image: string;
};

export type FigureBandBlock = {
  type: "figureBand";
  tone: "dark" | "light";
  figures: Figure[];
};

export type PillarsBlock = {
  type: "pillars";
  eyebrow?: string;
  heading: string;
  items: Pillar[];
};

export type PortfolioBlock = {
  type: "portfolio";
  eyebrow?: string;
  heading: string;
  categories: Category[];
};

export type FlowBlock = {
  type: "flow";
  eyebrow?: string;
  heading: string;
  steps: Step[];
};

export type ComparisonBlock = {
  type: "comparison";
  eyebrow?: string;
  heading: string;
  clusters: Cluster[];
};

export type EconomicsBlock = {
  type: "economics";
  eyebrow?: string;
  heading: string;
  headline: Figure[];
  detail: DetailRow[];
};

export type NarrativeBlock = {
  type: "narrative";
  heading: string;
  body: string;
  image?: string;
  pull?: Figure;
};

export type TimelineBlock = {
  type: "timeline";
  eyebrow?: string;
  heading: string;
  phases: Phase[];
};

export type ClosingBlock = {
  type: "closing";
  heading: string;
  points: string[];
};

export type Block =
  | HeroBlock
  | FigureBandBlock
  | PillarsBlock
  | PortfolioBlock
  | FlowBlock
  | ComparisonBlock
  | EconomicsBlock
  | NarrativeBlock
  | TimelineBlock
  | ClosingBlock;

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  thesis: string;
  cardImage: string;
  cardFigures: [Figure, Figure];
  blocks: Block[];
};
```

- [ ] **Step 6: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 7: Commit**

```bash
git add lib/types.ts lib/sectors.ts tests/sectors.test.ts
git commit -m "feat: add domain types and sector vocabulary"
```

---

### Task 3: Figure value parser

Figure values are authored as strings so `"USD 5.6B"` and `"53.8-57.4 kg"` render exactly as written. The count-up animation needs to animate only the numeric portion and leave prefix and suffix static.

**Files:**
- Create: `lib/parseFigure.ts`
- Test: `tests/parseFigure.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `parseFigure(value: string): ParsedFigure` where
  `type ParsedFigure = { prefix: string; number: number | null; suffix: string }`.
  `number` is `null` when the string has no animatable numeric portion, in which case
  consumers render the raw string without animation.

- [ ] **Step 1: Write the failing test**

Create `tests/parseFigure.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { parseFigure } from "../lib/parseFigure";

describe("parseFigure", () => {
  it("splits a currency prefix from the number and its unit suffix", () => {
    expect(parseFigure("USD 5.6B")).toEqual({
      prefix: "USD ", number: 5.6, suffix: "B",
    });
  });

  it("handles a bare integer with a plus suffix", () => {
    expect(parseFigure("100K+")).toEqual({
      prefix: "", number: 100, suffix: "K+",
    });
  });

  it("handles a percentage", () => {
    expect(parseFigure("7.1%")).toEqual({
      prefix: "", number: 7.1, suffix: "%",
    });
  });

  it("animates only the first number in a range", () => {
    expect(parseFigure("53.8-57.4 kg")).toEqual({
      prefix: "", number: 53.8, suffix: "-57.4 kg",
    });
  });

  it("returns a null number for a string with no digits", () => {
    expect(parseFigure("Multi-Sector")).toEqual({
      prefix: "", number: null, suffix: "Multi-Sector",
    });
  });

  it("handles a thousands separator", () => {
    expect(parseFigure("10,500+")).toEqual({
      prefix: "", number: 10500, suffix: "+",
    });
  });

  it("treats an empty string as unanimatable", () => {
    expect(parseFigure("")).toEqual({ prefix: "", number: null, suffix: "" });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/parseFigure.test.ts`
Expected: FAIL — cannot resolve `../lib/parseFigure`.

- [ ] **Step 3: Write `lib/parseFigure.ts`**

```ts
export type ParsedFigure = {
  prefix: string;
  number: number | null;
  suffix: string;
};

const NUMBER = /\d[\d,]*(\.\d+)?/;

export function parseFigure(value: string): ParsedFigure {
  const match = NUMBER.exec(value);
  if (!match) return { prefix: "", number: null, suffix: value };

  const start = match.index;
  const end = start + match[0].length;
  const parsed = Number(match[0].replace(/,/g, ""));

  if (Number.isNaN(parsed)) {
    return { prefix: "", number: null, suffix: value };
  }

  return {
    prefix: value.slice(0, start),
    number: parsed,
    suffix: value.slice(end),
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/parseFigure.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/parseFigure.ts tests/parseFigure.test.ts
git commit -m "feat: add figure value parser for count-up animation"
```

---

### Task 4: Content rule helpers

These back the conformance suite in Task 16. They are pure functions so the rules are testable independently of the content.

**Files:**
- Create: `lib/contentRules.ts`
- Test: `tests/contentRules.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `wordCount(text: string): number`
  - `findBannedDash(text: string): string | null` — returns the offending character or `null`
  - `eyebrowBudget(sectionCount: number): number`
  - `collectStrings(value: unknown): string[]` — deep-walks any data structure and returns every string in it

- [ ] **Step 1: Write the failing test**

Create `tests/contentRules.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  collectStrings, eyebrowBudget, findBannedDash, wordCount,
} from "../lib/contentRules";

describe("wordCount", () => {
  it("counts words separated by single spaces", () => {
    expect(wordCount("Loyalty is royalty")).toBe(3);
  });

  it("ignores leading, trailing and repeated whitespace", () => {
    expect(wordCount("  a   b  ")).toBe(2);
  });

  it("counts an empty string as zero", () => {
    expect(wordCount("   ")).toBe(0);
  });

  it("treats a hyphenated compound as one word", () => {
    expect(wordCount("end-to-end delivery")).toBe(2);
  });
});

describe("findBannedDash", () => {
  it("finds an em-dash", () => {
    expect(findBannedDash("Loyalty — royalty")).toBe("—");
  });

  it("finds an en-dash", () => {
    expect(findBannedDash("2021–2026")).toBe("–");
  });

  it("allows a plain hyphen", () => {
    expect(findBannedDash("end-to-end, 2021-2026")).toBeNull();
  });

  it("allows a minus sign in context", () => {
    expect(findBannedDash("-5 degrees")).toBeNull();
  });
});

describe("eyebrowBudget", () => {
  it("allows three eyebrows across eight sections", () => {
    expect(eyebrowBudget(8)).toBe(3);
  });

  it("allows one eyebrow across three sections", () => {
    expect(eyebrowBudget(3)).toBe(1);
  });

  it("allows one eyebrow for a single section", () => {
    expect(eyebrowBudget(1)).toBe(1);
  });

  it("allows none for zero sections", () => {
    expect(eyebrowBudget(0)).toBe(0);
  });
});

describe("collectStrings", () => {
  it("walks nested objects and arrays", () => {
    const data = { a: "one", b: [{ c: "two" }, "three"], d: 4, e: null };
    expect(collectStrings(data).sort()).toEqual(["one", "three", "two"]);
  });

  it("returns a bare string as a single entry", () => {
    expect(collectStrings("solo")).toEqual(["solo"]);
  });

  it("returns nothing for a structure with no strings", () => {
    expect(collectStrings({ a: 1, b: [2, 3] })).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/contentRules.test.ts`
Expected: FAIL — cannot resolve `../lib/contentRules`.

- [ ] **Step 3: Write `lib/contentRules.ts`**

```ts
const BANNED_DASHES = ["—", "–"];

export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

export function findBannedDash(text: string): string | null {
  for (const dash of BANNED_DASHES) {
    if (text.includes(dash)) return dash;
  }
  return null;
}

export function eyebrowBudget(sectionCount: number): number {
  return Math.ceil(sectionCount / 3);
}

export function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value !== null && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(collectStrings);
  }
  return [];
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/contentRules.test.ts`
Expected: PASS, 15 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/contentRules.ts tests/contentRules.test.ts
git commit -m "feat: add content rule helpers for the conformance suite"
```

---

### Task 5: GSAP provider and motion hooks

**Files:**
- Create: `components/gsap/GSAPProvider.tsx`, `components/gsap/useReveal.ts`, `components/gsap/useCountUp.ts`, `components/gsap/useDrawPath.ts`, `components/gsap/useHorizontalPan.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: token layer from Task 1.
- Produces:
  - `useReveal<T extends HTMLElement>(options?: { stagger?: number }): RefObject<T>` — attach to a container; direct children with `data-reveal` fade and rise in on entry.
  - `useCountUp(target: number, duration?: number): { ref: RefObject<HTMLSpanElement> }`
  - `useDrawPath(): RefObject<SVGPathElement>`
  - `useHorizontalPan(): { wrap: RefObject<HTMLElement>; track: RefObject<HTMLDivElement> }`

Every hook is a no-op returning the element in its final state under `prefers-reduced-motion: reduce`.

- [ ] **Step 1: Write `components/gsap/GSAPProvider.tsx`**

```tsx
"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Write `components/gsap/useReveal.ts`**

```ts
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useReveal<T extends HTMLElement>(options?: { stagger?: number }) {
  const ref = useRef<T>(null);
  const stagger = options?.stagger ?? 0.08;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const targets = el.querySelectorAll("[data-reveal]");
        if (targets.length === 0) return;

        if (context.conditions?.reduced) {
          gsap.set(targets, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          targets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          },
        );
      },
    );

    return () => mm.revert();
  }, [stagger]);

  return ref;
}
```

- [ ] **Step 3: Write `components/gsap/useCountUp.ts`**

```ts
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function format(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function useCountUp(target: number, duration = 1.4) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const decimals = (String(target).split(".")[1] ?? "").length;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduced) {
          el.textContent = format(target, decimals);
          return;
        }

        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(counter.value, decimals);
          },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      },
    );

    return () => mm.revert();
  }, [target, duration]);

  return { ref };
}
```

- [ ] **Step 4: Write `components/gsap/useDrawPath.ts`**

```ts
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useDrawPath() {
  const ref = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = ref.current;
    if (!path) return;

    const length = path.getTotalLength();
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduced) {
          gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
          return;
        }

        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: path,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );
      },
    );

    return () => mm.revert();
  }, []);

  return ref;
}
```

- [ ] **Step 5: Write `components/gsap/useHorizontalPan.ts`**

Follows the canonical skeleton: pin at `top top`, scroll length equal to horizontal travel, `scrub: 1`.

```ts
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHorizontalPan() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        pan: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        stacked: "(prefers-reduced-motion: reduce), (max-width: 767px)",
      },
      (context) => {
        if (!context.conditions?.pan) return;

        const distance = () => trackEl.scrollWidth - wrapEl.clientWidth;
        if (distance() <= 0) return;

        gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapEl,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return { wrap, track };
}
```

Below 768px the track is a native horizontal scroll container, styled in the consuming component's CSS Module with `overflow-x: auto; scroll-snap-type: x mandatory;`.

- [ ] **Step 6: Wire the provider into `app/layout.tsx`**

Replace the `<body>` line with:

```tsx
      <body>
        <GSAPProvider>{children}</GSAPProvider>
      </body>
```

and add the import:

```tsx
import GSAPProvider from "@/components/gsap/GSAPProvider";
```

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 8: Commit**

```bash
git add components/gsap app/layout.tsx
git commit -m "feat: add GSAP provider and reduced-motion-aware hooks"
```

---

### Task 6: UI atoms

**Files:**
- Create: `components/ui/Button.tsx` + `Button.module.css`
- Create: `components/ui/Eyebrow.tsx` + `Eyebrow.module.css`
- Create: `components/ui/FigureDisplay.tsx` + `FigureDisplay.module.css`
- Create: `components/ui/CountUp.tsx`
- Create: `components/ui/Reveal.tsx`
- Create: `components/ui/Disclosure.tsx` + `Disclosure.module.css`
- Create: `components/ui/ImageSlot.tsx` + `ImageSlot.module.css`

**Interfaces:**
- Consumes: `parseFigure` (Task 3), `useCountUp` and `useReveal` (Task 5), tokens (Task 1).
- Produces:
  - `<Button href variant="primary" | "secondary">` — renders an `<a>`. There is no `<button>` variant because the site has no forms.
  - `<Eyebrow>` — mono, uppercase, `--c-red`.
  - `<FigureDisplay figure={Figure} tone="dark" | "light" animate={boolean} />`
  - `<CountUp value={string} />` — client island wrapping `parseFigure` and `useCountUp`.
  - `<Reveal>` — client island applying `useReveal` to its children container.
  - `<Disclosure summary={string}>` — client island, native `<details>` styling.
  - `<ImageSlot src alt ratio priority />` — renders `next/image` when `src` resolves, otherwise a labelled placeholder box. This is what lets layout proceed before generated assets land.

- [ ] **Step 1: Write `components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import styles from "./Button.module.css";

type Props = {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export default function Button({ href, variant = "primary", children }: Props) {
  return (
    <Link href={href} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
```

`Button.module.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0.85rem 1.5rem;
  border-radius: var(--r-control);
  font-family: var(--f-body);
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1;
  transition: background-color 0.2s, color 0.2s, transform 0.1s;
}

.button:active { transform: scale(0.98); }

.primary { background: var(--c-red); color: #FFFFFF; }
.primary:hover { background: var(--c-red-press); }

.secondary {
  border: 1px solid var(--c-ink);
  color: var(--c-ink);
}
.secondary:hover { background: var(--c-ink); color: var(--c-canvas); }
```

`white-space: nowrap` is what enforces the no-wrap CTA rule structurally rather than by hope.

- [ ] **Step 2: Write `components/ui/Eyebrow.tsx`**

```tsx
import styles from "./Eyebrow.module.css";

export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}
```

`Eyebrow.module.css`:

```css
.eyebrow {
  margin: 0 0 0.875rem;
  font-family: var(--f-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-red);
}
```

- [ ] **Step 3: Write `components/ui/CountUp.tsx`**

```tsx
"use client";

import { parseFigure } from "@/lib/parseFigure";
import { useCountUp } from "@/components/gsap/useCountUp";

export default function CountUp({ value }: { value: string }) {
  const parsed = parseFigure(value);
  const { ref } = useCountUp(parsed.number ?? 0);

  if (parsed.number === null) return <>{value}</>;

  return (
    <>
      {parsed.prefix}
      <span ref={ref}>0</span>
      {parsed.suffix}
    </>
  );
}
```

- [ ] **Step 4: Write `components/ui/FigureDisplay.tsx`**

```tsx
import type { Figure } from "@/lib/types";
import CountUp from "./CountUp";
import styles from "./FigureDisplay.module.css";

type Props = { figure: Figure; tone?: "dark" | "light"; animate?: boolean };

export default function FigureDisplay({
  figure, tone = "light", animate = false,
}: Props) {
  return (
    <div className={`${styles.figure} ${styles[tone]}`}>
      <p className={styles.value}>
        {animate ? <CountUp value={figure.value} /> : figure.value}
      </p>
      <p className={styles.label}>{figure.label}</p>
      {figure.note ? <p className={styles.note}>{figure.note}</p> : null}
    </div>
  );
}
```

`FigureDisplay.module.css`:

```css
.figure { display: flex; flex-direction: column; gap: 0.375rem; }

.value {
  font-family: var(--f-display);
  font-weight: 700;
  font-size: var(--step-2);
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--c-ink);
}

.label {
  font-family: var(--f-body);
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--c-muted);
}

.note { font-size: 0.75rem; color: var(--c-muted); }

.dark .value { color: #FFFFFF; }
.dark .label, .dark .note { color: #9A9A9A; }
```

- [ ] **Step 5: Write `components/ui/Reveal.tsx`**

```tsx
"use client";

import { useReveal } from "@/components/gsap/useReveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

export default function Reveal({ children, className, stagger }: Props) {
  const ref = useReveal<HTMLDivElement>({ stagger });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

Children opt in by carrying `data-reveal`.

- [ ] **Step 6: Write `components/ui/Disclosure.tsx`**

```tsx
"use client";

import styles from "./Disclosure.module.css";

type Props = { summary: string; children: React.ReactNode };

export default function Disclosure({ summary, children }: Props) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>{summary}</summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
```

`Disclosure.module.css`:

```css
.details { border-top: 1px solid var(--c-hairline); }

.summary {
  padding: 1rem 0;
  cursor: pointer;
  font-family: var(--f-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-ink);
  list-style: none;
}

.summary::-webkit-details-marker { display: none; }
.summary::after { content: " +"; color: var(--c-red); }
.details[open] .summary::after { content: " -"; }

.body { padding-bottom: 1.5rem; }
```

- [ ] **Step 7: Write `components/ui/ImageSlot.tsx`**

```tsx
import Image from "next/image";
import styles from "./ImageSlot.module.css";

type Props = {
  src: string;
  alt: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ImageSlot({
  src, alt, ratio = "16 / 9", priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: Props) {
  const pending = process.env.HOLYLOY_IMAGES_PENDING === "1";

  return (
    <div className={styles.slot} style={{ aspectRatio: ratio }}>
      {pending ? (
        <span className={styles.placeholder}>{alt}</span>
      ) : (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes}
               className={styles.image} />
      )}
    </div>
  );
}
```

`ImageSlot.module.css`:

```css
.slot {
  position: relative;
  overflow: hidden;
  border-radius: var(--r-card);
  background: var(--c-red-wash);
}

.image { object-fit: cover; }

.placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  text-align: center;
  font-family: var(--f-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-muted);
}
```

- [ ] **Step 8: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 9: Commit**

```bash
git add components/ui
git commit -m "feat: add UI atoms with placeholder-aware image slot"
```

---

### Task 7: Header, mobile menu and footer

**Files:**
- Create: `components/layout/Header.tsx` + `Header.module.css`
- Create: `components/layout/MobileMenu.tsx` + `MobileMenu.module.css`
- Create: `components/layout/Footer.tsx` + `Footer.module.css`
- Create: `components/layout/SectionHead.tsx` + `SectionHead.module.css`
- Create: `lib/nav.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Button`, `Eyebrow` (Task 6).
- Produces: `NAV_LINKS: { label: string; href: string }[]` from `lib/nav.ts`, consumed by both header and footer. `<SectionHead eyebrow? heading />` used by homepage sections and blocks.

- [ ] **Step 1: Write `lib/nav.ts`**

Exactly four links, matching the spec's nav table. Adding a fifth breaks the one-line rule.

```ts
export const NAV_LINKS = [
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Who it serves", href: "/#audiences" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Projects", href: "/projects" },
] as const;

export const PRIMARY_CTA = { label: "Join HolyLoy", href: "mailto:hello@holyloy.net" };
```

`PRIMARY_CTA.href` is the single destination named in spec section 13. Change it in one place when the real target is known.

- [ ] **Step 2: Write `components/layout/Header.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="HolyLoy home">
          <Image src="/logo.svg" alt="HolyLoy" width={146} height={70} priority />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Write `Header.module.css`**

The 68px height and one-line rule are enforced here.

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--c-canvas) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--c-hairline);
}

.inner {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.brand img { height: 28px; width: auto; }

.nav { display: none; gap: 2rem; }

.link {
  font-size: 0.875rem;
  color: var(--c-graphite);
  white-space: nowrap;
  transition: color 0.2s;
}

.link:hover { color: var(--c-red); }

.cta { display: none; }

@media (min-width: 1024px) {
  .nav, .cta { display: flex; }
}
```

- [ ] **Step 4: Write `components/layout/MobileMenu.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
      </button>

      {open ? (
        <div id="mobile-menu" className={styles.panel}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
        </div>
      ) : null}
    </>
  );
}
```

`MobileMenu.module.css`:

```css
.toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: none;
  background: none;
  color: var(--c-ink);
  cursor: pointer;
}

.panel {
  position: absolute;
  left: 0;
  right: 0;
  top: 68px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem var(--gutter) 2rem;
  background: var(--c-canvas);
  border-bottom: 1px solid var(--c-hairline);
}

.link { font-family: var(--f-display); font-size: var(--step-1); color: var(--c-ink); }

@media (min-width: 1024px) { .toggle, .panel { display: none; } }
```

- [ ] **Step 5: Write `components/layout/SectionHead.tsx`**

```tsx
import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./SectionHead.module.css";

type Props = { eyebrow?: string; heading: string; body?: string };

export default function SectionHead({ eyebrow, heading, body }: Props) {
  return (
    <div className={styles.head}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className={styles.heading}>{heading}</h2>
      {body ? <p className={styles.body}>{body}</p> : null}
    </div>
  );
}
```

`SectionHead.module.css` stacks heading and body vertically. The split-header pattern (big heading left, small paragraph floated right) is banned, so there is no two-column variant.

```css
.head { max-width: 46ch; margin-bottom: clamp(2rem, 4vw, 3.5rem); }
.heading { font-size: var(--step-3); }
.body { margin-top: 1rem; color: var(--c-graphite); }
```

- [ ] **Step 6: Write `components/layout/Footer.tsx`**

Carries the links dropped from the nav (About and Contact become plain footer entries) plus the address behind the CTA mailto.

```tsx
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className={styles.wordmark}>HolyLoy</p>

        <nav className={styles.links} aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <a href="mailto:hello@holyloy.net">Contact</a>
        </nav>

        <p className={styles.legal}>
          HolyLoy. Loyalty is royalty.
        </p>
      </div>
    </footer>
  );
}
```

`Footer.module.css`:

```css
.footer {
  border-top: 1px solid var(--c-hairline);
  padding-block: clamp(3rem, 6vw, 5rem);
}

.inner { display: grid; gap: 2rem; }

.wordmark {
  font-family: var(--f-display);
  font-weight: 700;
  font-size: var(--step-2);
  color: var(--c-ink);
}

.links { display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.875rem; }
.links a:hover { color: var(--c-red); }

.legal { font-size: 0.8125rem; color: var(--c-muted); }

@media (min-width: 768px) {
  .inner { grid-template-columns: 1fr auto; align-items: start; }
  .legal { grid-column: 1 / -1; }
}
```

- [ ] **Step 7: Wire header and footer into `app/layout.tsx`**

```tsx
      <body>
        <GSAPProvider>
          <Header />
          {children}
          <Footer />
        </GSAPProvider>
      </body>
```

with imports:

```tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
```

- [ ] **Step 8: Verify the build and the one-line nav rule**

Run: `npm run build`
Expected: `Compiled successfully`.

Then start the dev server and confirm at 1024px and 1440px that the nav sits on one line and the header measures 68px. Below 1024px confirm the hamburger appears and the desktop nav is hidden.

- [ ] **Step 9: Commit**

```bash
git add components/layout lib/nav.ts app/layout.tsx
git commit -m "feat: add header, mobile menu, footer and section head"
```

---

### Task 8: Block library, part one — hero, figureBand, narrative, closing

**Files:**
- Create: `components/blocks/HeroBlock.tsx` + `HeroBlock.module.css`
- Create: `components/blocks/FigureBandBlock.tsx` + `FigureBandBlock.module.css`
- Create: `components/blocks/NarrativeBlock.tsx` + `NarrativeBlock.module.css`
- Create: `components/blocks/ClosingBlock.tsx` + `ClosingBlock.module.css`

**Interfaces:**
- Consumes: `HeroBlock`, `FigureBandBlock`, `NarrativeBlock`, `ClosingBlock` types (Task 2); `FigureDisplay`, `ImageSlot`, `Button`, `Reveal` (Task 6); `SectionHead` (Task 7).
- Produces: four default-exported components, each taking a single prop named `block` typed to its matching union member. Task 11's renderer depends on this exact prop name.

- [ ] **Step 1: Write `components/blocks/HeroBlock.tsx`**

Asymmetric split. Maximum four text elements, per the hero discipline rule.

```tsx
import type { HeroBlock as Block } from "@/lib/types";
import ImageSlot from "@/components/ui/ImageSlot";
import FigureDisplay from "@/components/ui/FigureDisplay";
import styles from "./HeroBlock.module.css";

export default function HeroBlock({ block }: { block: Block }) {
  return (
    <section className={styles.hero}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.tagline}>{block.tagline}</p>
          <p className={styles.thesis}>{block.thesis}</p>
        </div>
        <div className={styles.media}>
          <ImageSlot src={block.image} alt={block.tagline} ratio="4 / 3" priority
                     sizes="(max-width: 767px) 100vw, 55vw" />
        </div>
      </div>
      <div className={`shell ${styles.facts}`}>
        {block.facts.map((fact) => (
          <FigureDisplay key={fact.label} figure={fact} />
        ))}
      </div>
    </section>
  );
}
```

`HeroBlock.module.css`:

```css
.hero { padding-top: clamp(2.5rem, 5vw, 4rem); padding-bottom: var(--band); }

.inner { display: grid; gap: clamp(2rem, 4vw, 3rem); align-items: center; }

.tagline {
  font-family: var(--f-display);
  font-weight: 700;
  font-size: var(--step-4);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--c-ink);
  max-width: none;
}

.thesis { margin-top: 1.25rem; font-size: var(--step-1); color: var(--c-graphite); }

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: clamp(2rem, 4vw, 3rem);
  padding-top: 2rem;
  border-top: 1px solid var(--c-hairline);
}

@media (min-width: 900px) {
  .inner { grid-template-columns: 1fr 1.1fr; }
}
```

- [ ] **Step 2: Write `components/blocks/FigureBandBlock.tsx`**

```tsx
import type { FigureBandBlock as Block } from "@/lib/types";
import FigureDisplay from "@/components/ui/FigureDisplay";
import styles from "./FigureBandBlock.module.css";

export default function FigureBandBlock({ block }: { block: Block }) {
  return (
    <section className={`${styles.band} ${styles[block.tone]}`}>
      <div className={`shell ${styles.grid}`}>
        {block.figures.map((figure) => (
          <FigureDisplay key={figure.label} figure={figure} tone={block.tone} animate />
        ))}
      </div>
    </section>
  );
}
```

`FigureBandBlock.module.css`:

```css
.band { padding-block: var(--band); }
.dark { background: var(--c-night); }
.light { background: var(--c-card); border-block: 1px solid var(--c-hairline); }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
}
```

- [ ] **Step 3: Write `components/blocks/NarrativeBlock.tsx`**

```tsx
import type { NarrativeBlock as Block } from "@/lib/types";
import ImageSlot from "@/components/ui/ImageSlot";
import FigureDisplay from "@/components/ui/FigureDisplay";
import Reveal from "@/components/ui/Reveal";
import styles from "./NarrativeBlock.module.css";

export default function NarrativeBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <Reveal className={`shell ${styles.inner}`}>
        <div data-reveal>
          <h2 className={styles.heading}>{block.heading}</h2>
          <p className={styles.body}>{block.body}</p>
          {block.pull ? (
            <div className={styles.pull}>
              <FigureDisplay figure={block.pull} />
            </div>
          ) : null}
        </div>
        {block.image ? (
          <div data-reveal>
            <ImageSlot src={block.image} alt={block.heading} ratio="3 / 4" />
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
```

`NarrativeBlock.module.css`:

```css
.section { padding-block: var(--band); }
.inner { display: grid; gap: clamp(2rem, 4vw, 3.5rem); align-items: center; }
.heading { font-size: var(--step-3); }
.body { margin-top: 1.25rem; color: var(--c-graphite); }
.pull { margin-top: 2rem; }

@media (min-width: 900px) { .inner { grid-template-columns: 1.15fr 1fr; } }
```

- [ ] **Step 4: Write `components/blocks/ClosingBlock.tsx`**

```tsx
import type { ClosingBlock as Block } from "@/lib/types";
import Button from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/nav";
import styles from "./ClosingBlock.module.css";

export default function ClosingBlock({ block }: { block: Block }) {
  return (
    <section className={styles.band}>
      <div className={`shell ${styles.inner}`}>
        <h2 className={styles.heading}>{block.heading}</h2>
        <ul className={styles.points}>
          {block.points.map((point) => (
            <li key={point} className={styles.point}>{point}</li>
          ))}
        </ul>
        <div className={styles.cta}>
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
        </div>
      </div>
    </section>
  );
}
```

`ClosingBlock.module.css`:

```css
.band { background: var(--c-night); padding-block: var(--band); }

.inner { display: grid; gap: 2rem; }

.heading { color: #FFFFFF; font-size: var(--step-3); max-width: 18ch; }

.points { display: grid; gap: 0.75rem; }

.point {
  padding-left: 1.25rem;
  position: relative;
  color: #B8B4B0;
  font-size: 0.9375rem;
}

.point::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 8px;
  height: 1px;
  background: var(--c-red);
}

@media (min-width: 900px) {
  .inner { grid-template-columns: 1fr 1fr; }
  .cta { grid-column: 1 / -1; }
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 6: Commit**

```bash
git add components/blocks
git commit -m "feat: add hero, figure band, narrative and closing blocks"
```

---

### Task 9: Block library, part two — pillars, portfolio, flow

**Files:**
- Create: `components/blocks/PillarsBlock.tsx` + `PillarsBlock.module.css`
- Create: `components/blocks/PortfolioBlock.tsx` + `PortfolioBlock.module.css`
- Create: `components/blocks/FlowBlock.tsx` + `FlowBlock.module.css`
- Create: `components/ui/Icon.tsx`

**Interfaces:**
- Consumes: types (Task 2), `ImageSlot`, `Reveal` (Task 6), `SectionHead` (Task 7), `useDrawPath` (Task 5).
- Produces: three block components with the `block` prop, plus `<Icon name={string} size?={number} />` which maps a string key from data to a Phosphor component. Data files reference icons by string so `lib/` stays free of JSX.

- [ ] **Step 1: Write `components/ui/Icon.tsx`**

One stroke weight globally. Data files may only use keys present in this map; an unknown key renders nothing rather than crashing the page.

```tsx
import {
  Buildings, ChartLineUp, Cube, Factory, Gauge, Globe, Handshake, Leaf,
  Lightning, Package, ShieldCheck, ShoppingBag, Sparkle, Truck, Users,
} from "@phosphor-icons/react/dist/ssr";

const ICONS = {
  buildings: Buildings,
  chart: ChartLineUp,
  cube: Cube,
  factory: Factory,
  gauge: Gauge,
  globe: Globe,
  handshake: Handshake,
  leaf: Leaf,
  lightning: Lightning,
  package: Package,
  shield: ShieldCheck,
  shopping: ShoppingBag,
  sparkle: Sparkle,
  truck: Truck,
  users: Users,
} as const;

export type IconName = keyof typeof ICONS;

export function isIconName(value: string): value is IconName {
  return value in ICONS;
}

export default function Icon({ name, size = 24 }: { name: string; size?: number }) {
  if (!isIconName(name)) return null;
  const Glyph = ICONS[name];
  return <Glyph size={size} weight="regular" aria-hidden="true" />;
}
```

The `/dist/ssr` import path keeps these as Server Components.

- [ ] **Step 2: Write `components/blocks/PillarsBlock.tsx`**

A bento with genuine size variation. The first cell spans two columns and carries an image; cells four and beyond are compact. Cell count always equals item count, so there is never an empty tile.

```tsx
import type { PillarsBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import ImageSlot from "@/components/ui/ImageSlot";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import styles from "./PillarsBlock.module.css";

export default function PillarsBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <Reveal className={styles.grid}>
          {block.items.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className={`${styles.cell} ${index === 0 ? styles.wide : ""} ${
                item.image ? styles.hasImage : ""
              }`}
            >
              {item.image ? (
                <ImageSlot src={item.image} alt={item.title} ratio="16 / 10"
                           sizes="(max-width: 767px) 100vw, 40vw" />
              ) : (
                <span className={styles.icon}><Icon name={item.icon} size={28} /></span>
              )}
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

`PillarsBlock.module.css`:

```css
.section { padding-block: var(--band); }

.grid { display: grid; gap: 1rem; }

.cell {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--c-hairline);
  border-radius: var(--r-card);
  background: var(--c-card);
}

.hasImage { padding: 1rem; }
.icon { color: var(--c-red); }
.title { font-size: var(--step-1); }
.body { font-size: 0.9375rem; color: var(--c-graphite); }

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(6, 1fr); }
  .cell { grid-column: span 2; }
  .wide { grid-column: span 4; }
}
```

With five items this yields a 4+2 first row and 2+2+2 second row: real rhythm, exact cell count, and at least the lead cell carrying an image.

- [ ] **Step 3: Write `components/blocks/PortfolioBlock.tsx`**

Image-led grid. Captions sit below the image, never overlaid.

```tsx
import type { PortfolioBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import styles from "./PortfolioBlock.module.css";

export default function PortfolioBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <Reveal className={styles.grid} stagger={0.06}>
          {block.categories.map((category) => (
            <article key={category.title} data-reveal className={styles.card}>
              <ImageSlot src={category.image} alt={category.title} ratio="4 / 3"
                         sizes="(max-width: 767px) 100vw, 30vw" />
              <h3 className={styles.title}>{category.title}</h3>
              <ul className={styles.items}>
                {category.items.map((item) => (
                  <li key={item} className={styles.item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

`PortfolioBlock.module.css`:

```css
.section { padding-block: var(--band); }

.grid {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.card { display: flex; flex-direction: column; gap: 0.875rem; }
.title { font-size: var(--step-1); }
.items { display: grid; gap: 0.375rem; }
.item { font-size: 0.875rem; color: var(--c-graphite); }
```

- [ ] **Step 4: Write `components/blocks/FlowBlock.tsx`**

Drawn path on desktop, scroll-snap on mobile. No numeric step prefixes: the verb is the label.

```tsx
"use client";

import type { FlowBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import { useDrawPath } from "@/components/gsap/useDrawPath";
import styles from "./FlowBlock.module.css";

export default function FlowBlock({ block }: { block: Block }) {
  const pathRef = useDrawPath();

  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <svg className={styles.line} viewBox="0 0 1000 2" preserveAspectRatio="none"
             aria-hidden="true">
          <path ref={pathRef} d="M0 1 H1000" stroke="var(--c-red)" strokeWidth="2"
                fill="none" />
        </svg>

        <ol className={styles.steps}>
          {block.steps.map((step) => (
            <li key={step.label} className={styles.step}>
              <h3 className={styles.label}>{step.label}</h3>
              <p className={styles.body}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

`FlowBlock.module.css`:

```css
.section { padding-block: var(--band); }

.line { display: none; width: 100%; height: 2px; margin-bottom: 2rem; }

.steps {
  display: grid;
  gap: 1.5rem;
  grid-auto-flow: column;
  grid-auto-columns: 78%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem;
}

.step { scroll-snap-align: start; }
.label { font-size: var(--step-1); }
.body { margin-top: 0.5rem; font-size: 0.9375rem; color: var(--c-graphite); }

@media (min-width: 768px) {
  .line { display: block; }
  .steps {
    grid-auto-flow: row;
    grid-auto-columns: auto;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    overflow-x: visible;
  }
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 6: Commit**

```bash
git add components/blocks components/ui/Icon.tsx
git commit -m "feat: add pillars, portfolio and flow blocks"
```

---

### Task 10: Block library, part three — comparison, economics, timeline

**Files:**
- Create: `components/blocks/ComparisonBlock.tsx` + `ComparisonBlock.module.css`
- Create: `components/blocks/EconomicsBlock.tsx` + `EconomicsBlock.module.css`
- Create: `components/blocks/TimelineBlock.tsx` + `TimelineBlock.module.css`

**Interfaces:**
- Consumes: types (Task 2), `FigureDisplay`, `Disclosure`, `Reveal` (Task 6), `SectionHead` (Task 7), `useDrawPath` (Task 5).
- Produces: three block components with the `block` prop.

These three replace the mockups' spec tables. The rule they enforce: no block renders a border on every row.

- [ ] **Step 1: Write `components/blocks/ComparisonBlock.tsx`**

Grouped columns, one card per cluster, a single divider between rows inside a cluster rather than a hairline under every row of one long table.

```tsx
import type { ComparisonBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import Reveal from "@/components/ui/Reveal";
import styles from "./ComparisonBlock.module.css";

export default function ComparisonBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <Reveal className={styles.grid} stagger={0.06}>
          {block.clusters.map((cluster) => (
            <article key={cluster.title} data-reveal className={styles.cluster}>
              <h3 className={styles.title}>{cluster.title}</h3>
              <dl className={styles.rows}>
                {cluster.rows.map((row) => (
                  <div key={row.label} className={styles.row}>
                    <dt className={styles.label}>{row.label}</dt>
                    <dd className={styles.value}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

`ComparisonBlock.module.css`:

```css
.section { padding-block: var(--band); }

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.cluster {
  padding: 1.5rem;
  border: 1px solid var(--c-hairline);
  border-radius: var(--r-card);
  background: var(--c-card);
}

.title {
  font-size: var(--step-1);
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--c-hairline);
}

.rows { display: grid; gap: 0.875rem; margin: 1rem 0 0; }
.row { display: flex; justify-content: space-between; gap: 1rem; }
.label { font-size: 0.875rem; color: var(--c-muted); }
.value { margin: 0; font-family: var(--f-mono); font-size: 0.875rem; color: var(--c-ink); }
```

One border, on the cluster title. Rows are separated by space.

- [ ] **Step 2: Write `components/blocks/EconomicsBlock.tsx`**

Three or four headline figures as display tiles; the remainder collapsed behind a disclosure.

```tsx
import type { EconomicsBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import FigureDisplay from "@/components/ui/FigureDisplay";
import Disclosure from "@/components/ui/Disclosure";
import Reveal from "@/components/ui/Reveal";
import styles from "./EconomicsBlock.module.css";

export default function EconomicsBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <Reveal className={styles.tiles}>
          {block.headline.map((figure) => (
            <div key={figure.label} data-reveal className={styles.tile}>
              <FigureDisplay figure={figure} animate />
            </div>
          ))}
        </Reveal>

        {block.detail.length > 0 ? (
          <div className={styles.detail}>
            <Disclosure summary="Full breakdown">
              <dl className={styles.rows}>
                {block.detail.map((row) => (
                  <div key={row.label} className={styles.row}>
                    <dt className={styles.label}>{row.label}</dt>
                    <dd className={styles.value}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Disclosure>
          </div>
        ) : null}
      </div>
    </section>
  );
}
```

`EconomicsBlock.module.css`:

```css
.section { padding-block: var(--band); }

.tiles {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.tile {
  padding: 1.75rem 1.5rem;
  border-radius: var(--r-card);
  background: var(--c-red-wash);
}

.detail { margin-top: 2.5rem; max-width: 640px; }
.rows { display: grid; gap: 0.75rem; margin: 0; }
.row { display: flex; justify-content: space-between; gap: 1rem; }
.label { font-size: 0.875rem; color: var(--c-muted); }
.value { margin: 0; font-family: var(--f-mono); font-size: 0.875rem; color: var(--c-ink); }
```

The tiles sit on `--c-red-wash` with charcoal text, per the red discipline rule: the wash never carries red text.

- [ ] **Step 3: Write `components/blocks/TimelineBlock.tsx`**

```tsx
"use client";

import type { TimelineBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import { useDrawPath } from "@/components/gsap/useDrawPath";
import styles from "./TimelineBlock.module.css";

export default function TimelineBlock({ block }: { block: Block }) {
  const pathRef = useDrawPath();

  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <div className={styles.track}>
          <svg className={styles.line} viewBox="0 0 2 1000" preserveAspectRatio="none"
               aria-hidden="true">
            <path ref={pathRef} d="M1 0 V1000" stroke="var(--c-red)" strokeWidth="2"
                  fill="none" />
          </svg>

          <ol className={styles.phases}>
            {block.phases.map((phase) => (
              <li key={phase.title} className={styles.phase}>
                <p className={styles.horizon}>{phase.horizon}</p>
                <h3 className={styles.title}>{phase.title}</h3>
                <p className={styles.body}>{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
```

`TimelineBlock.module.css`:

```css
.section { padding-block: var(--band); }
.track { position: relative; padding-left: 2rem; }

.line {
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
}

.phases { display: grid; gap: 2.5rem; }

.horizon {
  font-family: var(--f-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-red);
}

.title { margin-top: 0.5rem; font-size: var(--step-1); }
.body { margin-top: 0.5rem; font-size: 0.9375rem; color: var(--c-graphite); }
```

The `horizon` string is a real time marker such as `Months 1-6`, not a `Phase 01` label. Generic step numbering is banned.

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add components/blocks
git commit -m "feat: add comparison, economics and timeline blocks"
```

---

### Task 11: Block renderer with compile-time exhaustiveness

**Files:**
- Create: `components/blocks/BlockRenderer.tsx`

**Interfaces:**
- Consumes: all ten block components (Tasks 8 to 10), `Block` union (Task 2).
- Produces: `<BlockRenderer blocks={Block[]} />`. Adding an eleventh union member without a matching arm becomes a `tsc` error, not a blank section.

- [ ] **Step 1: Write `components/blocks/BlockRenderer.tsx`**

```tsx
import type { Block } from "@/lib/types";
import HeroBlock from "./HeroBlock";
import FigureBandBlock from "./FigureBandBlock";
import PillarsBlock from "./PillarsBlock";
import PortfolioBlock from "./PortfolioBlock";
import FlowBlock from "./FlowBlock";
import ComparisonBlock from "./ComparisonBlock";
import EconomicsBlock from "./EconomicsBlock";
import NarrativeBlock from "./NarrativeBlock";
import TimelineBlock from "./TimelineBlock";
import ClosingBlock from "./ClosingBlock";

function renderBlock(block: Block, key: number) {
  switch (block.type) {
    case "hero":       return <HeroBlock key={key} block={block} />;
    case "figureBand": return <FigureBandBlock key={key} block={block} />;
    case "pillars":    return <PillarsBlock key={key} block={block} />;
    case "portfolio":  return <PortfolioBlock key={key} block={block} />;
    case "flow":       return <FlowBlock key={key} block={block} />;
    case "comparison": return <ComparisonBlock key={key} block={block} />;
    case "economics":  return <EconomicsBlock key={key} block={block} />;
    case "narrative":  return <NarrativeBlock key={key} block={block} />;
    case "timeline":   return <TimelineBlock key={key} block={block} />;
    case "closing":    return <ClosingBlock key={key} block={block} />;
    default: {
      const exhaustive: never = block;
      throw new Error(`Unhandled block: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map(renderBlock)}</>;
}
```

- [ ] **Step 2: Prove the exhaustiveness check works**

Temporarily comment out the `case "closing":` line, then run `npx tsc --noEmit`.
Expected: an error stating that `ClosingBlock` is not assignable to `never`.
Restore the line and re-run; expected: clean.

This step exists because an exhaustiveness guard that has never been observed failing is not known to work.

- [ ] **Step 3: Commit**

```bash
git add components/blocks/BlockRenderer.tsx
git commit -m "feat: add block renderer with compile-time exhaustiveness guard"
```

---

### Task 12: Project data, ventures one to six

Content is transcribed from the matching mockup in `Projects/`. Open each image before writing its file. Figures are copied verbatim from the mockup, since spec section 2 settles them as approved copy.

**Files:**
- Create: `lib/projects/lithium-battery.ts`, `solar-energy.ts`, `cement-plant.ts`, `civil-engineering.ts`, `safety-footwear.ts`, `food-trade.ts`
- Create: `lib/projects/index.ts`

**Interfaces:**
- Consumes: `Project`, `Block` (Task 2).
- Produces: `PROJECTS: Project[]`, `getProject(slug: string): Project | undefined`, `getProjectSlugs(): string[]` from `lib/projects/index.ts`.

Source mapping:

| Slug | Source image |
|---|---|
| `lithium-battery` | `Projects/WhatsApp Image 2026-08-09 at 12.12.55 PM.jpeg` |
| `solar-energy` | `Projects/WhatsApp Image 2026-08-09 at 12.12.56 PM.jpeg` |
| `cement-plant` | `Projects/WhatsApp Image 2026-08-09 at 12.12.56 PM (3).jpeg` |
| `civil-engineering` | `Projects/WhatsApp Image 2026-08-09 at 12.12.57 PM.jpeg` |
| `safety-footwear` | `Projects/WhatsApp Image 2026-08-09 at 12.12.56 PM (1).jpeg` |
| `food-trade` | `Projects/WhatsApp Image 2026-08-09 at 12.12.54 PM.jpeg` |

- [ ] **Step 1: Write `lib/projects/lithium-battery.ts` as the reference implementation**

Every other project file follows this exact shape. Note what is deliberately absent: no eyebrow on more than `ceil(blocks / 3)` blocks, no em-dashes, thesis under 25 words.

```ts
import type { Project } from "@/lib/types";

const project: Project = {
  slug: "lithium-battery",
  name: "Lithium-Ion Battery Manufacturing",
  sector: "energy",
  thesis:
    "Advanced lithium-ion battery manufacturing to drive Saudi Arabia's energy transition, industrial growth and sustainable mobility.",
  cardImage: "/images/projects/lithium-battery-card.jpg",
  cardFigures: [
    { value: "USD 7.27B", label: "Li-ion battery market by 2030" },
    { value: "1.5 GWh", label: "Base case annual capacity" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Powering Saudi Arabia's clean energy future",
      thesis:
        "Advanced lithium-ion battery manufacturing to drive the energy transition, industrial growth and sustainable mobility.",
      image: "/images/projects/lithium-battery-hero.jpg",
      facts: [
        { value: "USD 150M", label: "Estimated initial investment" },
        { value: "1.5 GWh", label: "Base case annual capacity" },
        { value: "25-30%", label: "Projected IRR" },
        { value: "25 Years", label: "Project life" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "15.4%", label: "Market CAGR", note: "2024 to 2030" },
        { value: "5 Million MT", label: "Lithium demand by 2030" },
        { value: "29.1%", label: "Revenue CAGR", note: "2024 to 2030" },
        { value: "27.8%", label: "Residential storage CAGR" },
      ],
    },
    {
      type: "portfolio",
      eyebrow: "Where the cells go",
      heading: "Five application segments carry the demand",
      categories: [
        {
          title: "Energy storage",
          image: "/images/projects/lithium-battery-storage.jpg",
          items: ["Grid-scale storage", "Renewable integration", "Backup power"],
        },
        {
          title: "Automotive",
          image: "/images/projects/lithium-battery-automotive.jpg",
          items: ["Electric vehicles", "EV battery systems", "Mobility solutions"],
        },
        {
          title: "Electronics",
          image: "/images/projects/lithium-battery-electronics.jpg",
          items: ["Consumer electronics", "Portable power", "Smart devices"],
        },
        {
          title: "Healthcare",
          image: "/images/projects/lithium-battery-healthcare.jpg",
          items: ["Medical devices", "Portable equipment", "Backup systems"],
        },
        {
          title: "Power tools",
          image: "/images/projects/lithium-battery-tools.jpg",
          items: ["High performance packs", "Industrial use"],
        },
      ],
    },
    {
      type: "economics",
      heading: "Base case at year three, ninety percent utilisation",
      headline: [
        { value: "USD 162M", label: "Annual revenue" },
        { value: "USD 29.70M", label: "EBITDA" },
        { value: "33.33%", label: "Gross margin" },
        { value: "6-8 Years", label: "Payback period" },
      ],
      detail: [
        { label: "Annual production", value: "1.35M kWh" },
        { label: "Cost of goods sold", value: "USD 108M" },
        { label: "Gross profit", value: "USD 54M" },
        { label: "Net profit", value: "USD 16.16M" },
        { label: "EBITDA margin", value: "13.39%" },
        { label: "Net present value", value: "USD 25-40M" },
        { label: "Profitability index", value: "1.7-1.9" },
        { label: "Broad investment range", value: "USD 50-200M+" },
      ],
    },
    {
      type: "timeline",
      heading: "From site selection to market expansion",
      phases: [
        { horizon: "Year 1, 50% utilisation", title: "Site selection and approvals",
          body: "Location assessment, permitting and regulatory clearance." },
        { horizon: "Year 1", title: "Plant design and engineering",
          body: "Process design, layout and equipment specification." },
        { horizon: "Year 2, 75% utilisation", title: "Equipment installation",
          body: "Automated production lines and PLC control systems." },
        { horizon: "Year 2", title: "Trial production and testing",
          body: "Commissioning, quality validation and yield tuning." },
        { horizon: "Year 3, 90% utilisation", title: "Commercial production",
          body: "Ramp to base case utilisation and market expansion." },
      ],
    },
    {
      type: "closing",
      heading: "Built for the energy transition",
      points: [
        "Strategic location in Saudi Arabia",
        "Strong government support for local manufacturing",
        "Access to global raw materials",
        "Growing EV and renewable energy demand",
        "Competitive returns and long-term value",
      ],
    },
  ],
};

export default project;
```

Six blocks permits two eyebrows; this file uses one.

Note the `horizon` values carry real time markers taken from the mockup's utilisation ramp, not `Phase 01` labels. Generic step numbering is banned by the global constraints. When a source mockup gives no durations, use the concrete milestone as the horizon instead of inventing a stage number.

- [ ] **Step 2: Write the remaining five files in this batch**

Open each source image listed in the mapping table above and transcribe it into the same structure. Rules for every file:

- Choose blocks that fit the content. Not every project needs all ten. A typical page runs five to seven blocks.
- `thesis` is 25 words or fewer.
- Every `image` path follows `/images/projects/<slug>-<purpose>.jpg`.
- Every `portfolio` category needs an image path, which the type enforces.
- Figures keep the mockup's units and formatting exactly, including `USD`, `SAR`, `%` and `+`.
- Replace any en-dash in a numeric range with a hyphen while transcribing.
- Eyebrows: at most `ceil(blockCount / 3)` per file.

- [ ] **Step 3: Write `lib/projects/index.ts`**

Twelve imports, six of which land in Task 13. Write all twelve import lines now and comment out the six that do not yet exist, uncommenting them in Task 13.

```ts
import type { Project } from "@/lib/types";

import lithiumBattery from "./lithium-battery";
import solarEnergy from "./solar-energy";
import cementPlant from "./cement-plant";
import civilEngineering from "./civil-engineering";
import safetyFootwear from "./safety-footwear";
import foodTrade from "./food-trade";

export const PROJECTS: Project[] = [
  lithiumBattery,
  solarEnergy,
  cementPlant,
  civilEngineering,
  safetyFootwear,
  foodTrade,
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
```

- [ ] **Step 4: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 5: Commit**

```bash
git add lib/projects
git commit -m "feat: add project data for the first six ventures"
```

---

### Task 13: Project data, ventures seven to twelve

**Files:**
- Create: `lib/projects/general-trading.ts`, `pharma-manufacturing.ts`, `healthcare-development.ts`, `smart-taxi.ts`, `manpower-sourcing.ts`, `digital-advertising.ts`
- Modify: `lib/projects/index.ts`

**Interfaces:**
- Consumes: `Project` (Task 2), the file shape established in Task 12.
- Produces: a `PROJECTS` array of exactly twelve entries.

Source mapping:

| Slug | Source image |
|---|---|
| `general-trading` | `Projects/WhatsApp Image 2026-08-09 at 12.12.54 PM (1).jpeg` |
| `pharma-manufacturing` | `Projects/WhatsApp Image 2026-08-09 at 12.12.55 PM (2).jpeg` |
| `healthcare-development` | `Projects/WhatsApp Image 2026-08-09 at 12.12.54 PM (2).jpeg` |
| `smart-taxi` | `Projects/WhatsApp Image 2026-08-09 at 12.12.56 PM (2).jpeg` |
| `manpower-sourcing` | `Projects/WhatsApp Image 2026-08-09 at 12.12.55 PM (1).jpeg` |
| `digital-advertising` | `Projects/WhatsApp Image 2026-08-09 at 12.12.53 PM.jpeg` |

- [ ] **Step 1: Transcribe the six remaining ventures**

Same structure and same rules as Task 12 step 2. Two of these have content that maps naturally onto the `comparison` block, which the first batch did not exercise:

- `smart-taxi` has a four-city market table (Riyadh, Jeddah, Dammam, Mecca) with population, daily trips, market size and growth per city. That is a `comparison` block with one cluster per city.
- `manpower-sourcing` has a seven-country sourcing network and a five-year projection. Group the countries into one `comparison` block and put the projection into `economics`.

- [ ] **Step 2: Extend `lib/projects/index.ts`**

Add the six imports and array entries so `PROJECTS` holds twelve, ordered by sector to match the spec's table: energy, industry, trade, health, mobility, services.

```ts
import generalTrading from "./general-trading";
import pharmaManufacturing from "./pharma-manufacturing";
import healthcareDevelopment from "./healthcare-development";
import smartTaxi from "./smart-taxi";
import manpowerSourcing from "./manpower-sourcing";
import digitalAdvertising from "./digital-advertising";
```

and the array becomes:

```ts
export const PROJECTS: Project[] = [
  lithiumBattery,
  solarEnergy,
  cementPlant,
  civilEngineering,
  safetyFootwear,
  foodTrade,
  generalTrading,
  pharmaManufacturing,
  healthcareDevelopment,
  smartTaxi,
  manpowerSourcing,
  digitalAdvertising,
];
```

- [ ] **Step 3: Add the sector filter predicate**

Spec section 8 requires this to be unit tested, so it lives in `lib/` rather than inline in the component. Append to `lib/projects/index.ts`:

```ts
import type { Sector } from "@/lib/sectors";

export function filterProjects(
  projects: Project[],
  sector: Sector | "all",
): Project[] {
  return sector === "all"
    ? projects
    : projects.filter((project) => project.sector === sector);
}
```

- [ ] **Step 4: Write the failing catalogue test**

Create `tests/projects.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { PROJECTS, filterProjects, getProject, getProjectSlugs } from "@/lib/projects";

describe("getProject", () => {
  it("resolves a known slug", () => {
    expect(getProject("smart-taxi")?.name).toBe("Smart Taxi");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProject("not-a-venture")).toBeUndefined();
  });
});

describe("getProjectSlugs", () => {
  it("returns one slug per project", () => {
    expect(getProjectSlugs()).toHaveLength(PROJECTS.length);
  });
});

describe("filterProjects", () => {
  it("returns everything for 'all'", () => {
    expect(filterProjects(PROJECTS, "all")).toHaveLength(PROJECTS.length);
  });

  it("narrows to a single sector", () => {
    const energy = filterProjects(PROJECTS, "energy");
    expect(energy.length).toBeGreaterThan(0);
    expect(energy.every((project) => project.sector === "energy")).toBe(true);
  });

  it("returns an empty array when no project matches", () => {
    const only = filterProjects([PROJECTS[0]], PROJECTS[0].sector === "energy" ? "mobility" : "energy");
    expect(only).toEqual([]);
  });
});
```

This test imports through the `@/` alias, so it needs the vitest resolver change from Task 16 step 1. Apply that config change now rather than waiting.

- [ ] **Step 5: Run the test**

Run: `npm test -- tests/projects.test.ts`
Expected: PASS, 6 tests. A failure on `getProject("smart-taxi")` means the slug or `name` in that data file does not match the spec's venture table.

- [ ] **Step 6: Point the grid at the shared predicate**

In `components/projects/ProjectGrid.tsx` (Task 14), replace the inline filter with the tested one:

```tsx
import { filterProjects } from "@/lib/projects";

  const visible = useMemo(() => filterProjects(projects, active), [projects, active]);
```

If Task 14 has not been done yet, apply this when writing that file.

- [ ] **Step 7: Verify types compile**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add lib/projects tests/projects.test.ts vitest.config.ts
git commit -m "feat: add project data for the remaining six ventures"
```

---

### Task 14: Projects index and detail routes

**Files:**
- Create: `app/projects/page.tsx` + `app/projects/projects.module.css`
- Create: `app/projects/[slug]/page.tsx`
- Create: `components/projects/ProjectCard.tsx` + `ProjectCard.module.css`
- Create: `components/projects/SectorFilter.tsx` + `SectorFilter.module.css`
- Create: `components/projects/ProjectGrid.tsx` + `ProjectGrid.module.css`
- Create: `app/not-found.tsx`

**Interfaces:**
- Consumes: `PROJECTS`, `getProject`, `getProjectSlugs` (Tasks 12 to 13), `SECTORS`, `sectorLabel` (Task 2), `BlockRenderer` (Task 11), `ImageSlot` (Task 6).
- Produces: routes `/projects` and `/projects/[slug]`, statically generated for all twelve slugs.

- [ ] **Step 1: Write `components/projects/ProjectCard.tsx`**

Caption below the image, nothing overlaid on the photograph.

```tsx
import Link from "next/link";
import type { Project } from "@/lib/types";
import { sectorLabel } from "@/lib/sectors";
import ImageSlot from "@/components/ui/ImageSlot";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <Link href={`/projects/${project.slug}`} className={styles.link}>
        <ImageSlot src={project.cardImage} alt={project.name} ratio="4 / 3"
                   sizes="(max-width: 767px) 100vw, 33vw" />
        <p className={styles.sector}>{sectorLabel(project.sector)}</p>
        <h2 className={styles.name}>{project.name}</h2>
        <p className={styles.thesis}>{project.thesis}</p>
        <dl className={styles.figures}>
          {project.cardFigures.map((figure) => (
            <div key={figure.label}>
              <dt className={styles.value}>{figure.value}</dt>
              <dd className={styles.label}>{figure.label}</dd>
            </div>
          ))}
        </dl>
      </Link>
    </article>
  );
}
```

`ProjectCard.module.css`:

```css
.card { height: 100%; }
.link { display: flex; flex-direction: column; gap: 0.75rem; height: 100%; }

.sector {
  margin-top: 0.5rem;
  font-family: var(--f-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-red);
}

.name { font-size: var(--step-1); }
.thesis { font-size: 0.9375rem; color: var(--c-graphite); }

.figures {
  display: flex;
  gap: 2rem;
  margin: auto 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--c-hairline);
}

.value { font-family: var(--f-display); font-weight: 700; font-size: 1.125rem; color: var(--c-ink); }
.label { margin: 0.25rem 0 0; font-size: 0.75rem; color: var(--c-muted); }

.link:hover .name { color: var(--c-red); }
```

- [ ] **Step 2: Write `components/projects/SectorFilter.tsx` and `ProjectGrid.tsx`**

The filter owns the state, so `ProjectGrid` is the client island holding both.

`ProjectGrid.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import type { Sector } from "@/lib/sectors";
import ProjectCard from "./ProjectCard";
import SectorFilter from "./SectorFilter";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Sector | "all">("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.sector === active)),
    [projects, active],
  );

  return (
    <>
      <SectorFilter active={active} onChange={setActive} projects={projects} />

      {visible.length === 0 ? (
        <p className={styles.empty}>
          No ventures in this sector yet. Choose another sector to keep looking.
        </p>
      ) : (
        <div className={styles.grid}>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
```

`ProjectGrid.module.css`:

```css
.grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.empty { color: var(--c-muted); padding-block: 3rem; }
```

`SectorFilter.tsx`:

```tsx
"use client";

import type { Project } from "@/lib/types";
import { SECTORS, sectorLabel, type Sector } from "@/lib/sectors";
import styles from "./SectorFilter.module.css";

type Props = {
  active: Sector | "all";
  onChange: (value: Sector | "all") => void;
  projects: Project[];
};

export default function SectorFilter({ active, onChange, projects }: Props) {
  const available = SECTORS.filter((sector) =>
    projects.some((project) => project.sector === sector),
  );

  return (
    <div className={styles.bar} role="group" aria-label="Filter ventures by sector">
      <button type="button" onClick={() => onChange("all")}
              aria-pressed={active === "all"}
              className={`${styles.chip} ${active === "all" ? styles.on : ""}`}>
        All
      </button>
      {available.map((sector) => (
        <button key={sector} type="button" onClick={() => onChange(sector)}
                aria-pressed={active === sector}
                className={`${styles.chip} ${active === sector ? styles.on : ""}`}>
          {sectorLabel(sector)}
        </button>
      ))}
    </div>
  );
}
```

`SectorFilter.module.css`:

```css
.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.chip {
  padding: 0.5rem 1rem;
  border: 1px solid var(--c-hairline);
  border-radius: var(--r-control);
  background: none;
  font-family: var(--f-body);
  font-size: 0.8125rem;
  color: var(--c-graphite);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.chip:hover { border-color: var(--c-ink); color: var(--c-ink); }
.on { background: var(--c-red); border-color: var(--c-red); color: #FFFFFF; }
```

The active chip uses the brand red with white text, which clears AA. No second hue is introduced for the sector categories.

- [ ] **Step 3: Write `app/projects/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import ProjectGrid from "@/components/projects/ProjectGrid";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Twelve ventures across energy, industry, trade, health, mobility and services in Saudi Arabia.",
};

export default function ProjectsPage() {
  return (
    <main className={`shell ${styles.page}`}>
      <header className={styles.head}>
        <h1 className={styles.title}>Twelve ventures.</h1>
        <p className={styles.intro}>
          A portfolio spanning energy, industry, trade, health, mobility and services,
          each built around a specific opening in the Saudi market.
        </p>
      </header>

      <ProjectGrid projects={PROJECTS} />
    </main>
  );
}
```

The heading and intro are stacked vertically. The split-header pattern is banned.

`projects.module.css`:

```css
.page { padding-block: clamp(3rem, 6vw, 5rem); }
.head { max-width: 46ch; margin-bottom: clamp(2.5rem, 5vw, 4rem); }
.title { font-size: var(--step-4); }
.intro { margin-top: 1.25rem; font-size: var(--step-1); color: var(--c-graphite); }
```

- [ ] **Step 4: Write `app/projects/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs } from "@/lib/projects";
import BlockRenderer from "@/components/blocks/BlockRenderer";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.thesis };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <BlockRenderer blocks={project.blocks} />
    </main>
  );
}
```

- [ ] **Step 5: Write `app/not-found.tsx`**

```tsx
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="shell" style={{ paddingBlock: "6rem", display: "grid", gap: "1.5rem" }}>
      <h1>That page does not exist.</h1>
      <p>The link may be out of date, or the venture may have been renamed.</p>
      <div><Button href="/projects" variant="secondary">See all ventures</Button></div>
    </main>
  );
}
```

- [ ] **Step 6: Verify static generation**

Run: `npm run build`
Expected: `Compiled successfully`, and the route list shows `/projects` plus twelve entries under `/projects/[slug]`.

- [ ] **Step 7: Verify the filter in a browser**

Start the dev server, open `/projects`, and confirm: all twelve cards render, each sector chip narrows the grid correctly, `All` restores the full set, and chips are reachable and operable by keyboard with a visible focus ring.

- [ ] **Step 8: Commit**

```bash
git add app/projects app/not-found.tsx components/projects
git commit -m "feat: add projects index and detail routes"
```

---

### Task 15: Homepage

**Files:**
- Create: `lib/home.ts`
- Create: `components/home/Hero.tsx`, `Pillars.tsx`, `Audiences.tsx`, `HowItWorks.tsx`, `Traction.tsx`, `AppMoment.tsx`, `Ventures.tsx`, `JoinBand.tsx`, each with its CSS Module
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: UI atoms (Task 6), `SectionHead` (Task 7), `useHorizontalPan` and `useDrawPath` (Task 5), `PROJECTS` (Tasks 12 to 13), `PRIMARY_CTA` (Task 7).
- Produces: the homepage at `/` with anchors `#ecosystem`, `#audiences`, `#how-it-works` matching `lib/nav.ts`.

Copy is transcribed from `Homepage/WhatsApp Image 2026-08-09 at 6.26.46 PM.jpeg`. The layout is not.

- [ ] **Step 1: Write `lib/home.ts`**

All homepage copy as typed data, so Task 16's conformance suite can walk it.

```ts
import type { Figure, Pillar, Step } from "@/lib/types";

export const HERO = {
  headline: "Loyalty is royalty.",
  accent: "royalty.",
  subtext:
    "A smarter loyalty ecosystem that turns everyday spending into meaningful rewards.",
  image: "/images/home/hero.jpg",
};

export const PILLARS: { eyebrow: string; heading: string; items: Pillar[] } = {
  eyebrow: "What is HolyLoy",
  heading: "More than a loyalty program. A value ecosystem.",
  items: [
    { title: "Loyalty", icon: "sparkle", image: "/images/home/pillar-loyalty.jpg",
      body: "Build lasting relationships between businesses and customers." },
    { title: "Rewards", icon: "package",
      body: "Turn customer engagement into valuable and tangible benefits." },
    { title: "Digital commerce", icon: "shopping",
      body: "Connect loyalty with modern shopping and digital experiences." },
    { title: "Data and intelligence", icon: "chart",
      body: "Use technology to deliver personalised experiences and smarter decisions." },
    { title: "Sustainability", icon: "leaf", image: "/images/home/pillar-sustainability.jpg",
      body: "Reward responsible actions and support a circular economy." },
  ],
};

export const AUDIENCES = [
  { title: "For consumers", image: "/images/home/audience-consumers.jpg",
    body: "Earn rewards from everyday activities and enjoy exclusive benefits." },
  { title: "For businesses", image: "/images/home/audience-businesses.jpg",
    body: "Build stronger relationships, increase retention and grow your business." },
  { title: "For communities", image: "/images/home/audience-communities.jpg",
    body: "Create shared value and strengthen local participation together." },
  { title: "For sustainability", image: "/images/home/audience-sustainability.jpg",
    body: "Connect loyalty with environmental responsibility and a better impact." },
];

export const HOW_IT_WORKS: { heading: string; steps: Step[] } = {
  heading: "A simple cycle of value",
  steps: [
    { label: "Shop", body: "Shop at participating businesses and services." },
    { label: "Earn", body: "Earn loyalty points or rewards for eligible transactions." },
    { label: "Engage", body: "Stay engaged with offers, activities and personalised experiences." },
    { label: "Redeem", body: "Redeem your rewards for benefits and opportunities." },
    { label: "Return", body: "Enjoy more value and come back for even better experiences." },
  ],
};

export const TRACTION: Figure[] = [
  { value: "100K+", label: "Happy consumers" },
  { value: "3K+", label: "Partner businesses" },
  { value: "2M+", label: "Rewards redeemed" },
  { value: "500+ Ton", label: "Waste recycled" },
];

export const APP_MOMENT = {
  heading: "It is a relationship. It is a better future.",
  body:
    "Join HolyLoy and be part of a smarter, more rewarding and more sustainable ecosystem.",
  image: "/images/home/app.jpg",
};

export const JOIN = {
  heading: "One ecosystem. Shared value.",
  body: "Loyalty that works for consumers, for businesses and for the places they share.",
};
```

Note `TRACTION` figures are exactly the mockup's, per spec section 2.

- [ ] **Step 2: Write the eight section components**

Each is a distinct layout family. Build them in order, checking each in the browser before moving on.

**`Hero.tsx`** — asymmetric split. Four text elements maximum: headline, subtext, two CTAs. No eyebrow, no tagline under the CTAs, no scroll cue. Top padding capped at 6rem. The accent word is wrapped in a span carrying `color: var(--c-red)`.

```tsx
import Button from "@/components/ui/Button";
import ImageSlot from "@/components/ui/ImageSlot";
import { HERO } from "@/lib/home";
import { PRIMARY_CTA } from "@/lib/nav";
import styles from "./Hero.module.css";

export default function Hero() {
  const [lead, accent] = HERO.headline.split(HERO.accent);

  return (
    <section className={styles.hero}>
      <div className={`shell ${styles.inner}`}>
        <div>
          <h1 className={styles.headline}>
            {lead}
            <span className={styles.accent}>{HERO.accent}</span>
            {accent}
          </h1>
          <p className={styles.subtext}>{HERO.subtext}</p>
          <div className={styles.actions}>
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
            <Button href="/#how-it-works" variant="secondary">How it works</Button>
          </div>
        </div>
        <ImageSlot src={HERO.image} alt="The HolyLoy ecosystem" ratio="4 / 3" priority
                   sizes="(max-width: 899px) 100vw, 50vw" />
      </div>
    </section>
  );
}
```

`Hero.module.css` sets `padding-top: clamp(2rem, 5vw, 6rem)`, `grid-template-columns: 1fr 1fr` above 900px, `.headline { font-size: var(--step-4); }`, and `.actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }`.

**`Pillars.tsx`** — reuses the `PillarsBlock` layout logic. Rather than duplicating it, import `PillarsBlock` from `components/blocks` and feed it `PILLARS` shaped as a `PillarsBlock` object. Wrap it in `<section id="ecosystem">`.

**`Audiences.tsx`** — scroll-snap panels, one per audience, each with an image and a caption below it. No JavaScript needed; CSS scroll-snap carries it, so this stays a Server Component.

```tsx
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHead from "@/components/layout/SectionHead";
import { AUDIENCES } from "@/lib/home";
import styles from "./Audiences.module.css";

export default function Audiences() {
  return (
    <section id="audiences" className={styles.section}>
      <div className="shell">
        <SectionHead heading="One ecosystem, four ways to gain from it." />
      </div>
      <div className={`shell ${styles.track}`}>
        {AUDIENCES.map((audience) => (
          <article key={audience.title} className={styles.panel}>
            <ImageSlot src={audience.image} alt={audience.title} ratio="3 / 4"
                       sizes="(max-width: 899px) 82vw, 24vw" />
            <h3 className={styles.title}>{audience.title}</h3>
            <p className={styles.body}>{audience.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

`Audiences.module.css`:

```css
.section { padding-block: var(--band); }

.track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 82%;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem;
}

.panel { scroll-snap-align: start; display: flex; flex-direction: column; gap: 0.75rem; }
.title { font-size: var(--step-1); }
.body { font-size: 0.9375rem; color: var(--c-graphite); }

@media (min-width: 900px) {
  .track {
    grid-auto-flow: row;
    grid-template-columns: repeat(4, 1fr);
    overflow-x: visible;
  }
}
```

**`HowItWorks.tsx`** — reuses `FlowBlock` with `HOW_IT_WORKS` shaped as a `FlowBlock` object, with no `eyebrow`. Wrap in `<section id="how-it-works">`.

**`Traction.tsx`** — reuses `FigureBandBlock` with `tone: "dark"` and the `TRACTION` figures.

**`AppMoment.tsx`** — reuses `NarrativeBlock` with `APP_MOMENT`.

**`Ventures.tsx`** — client island using `useHorizontalPan`. The track holds twelve cards, one per project, each a link to its detail page showing the image, sector and name. Below 768px the track is a native horizontal scroll container. Ends with a `Button href="/projects" variant="secondary"` labelled `All ventures`.

```tsx
"use client";

import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { sectorLabel } from "@/lib/sectors";
import ImageSlot from "@/components/ui/ImageSlot";
import { useHorizontalPan } from "@/components/gsap/useHorizontalPan";
import styles from "./Ventures.module.css";

export default function Ventures() {
  const { wrap, track } = useHorizontalPan();

  return (
    <section ref={wrap} className={styles.section}>
      <div ref={track} className={styles.track}>
        {PROJECTS.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}
                className={styles.card}>
            <ImageSlot src={project.cardImage} alt={project.name} ratio="3 / 4"
                       sizes="320px" />
            <p className={styles.sector}>{sectorLabel(project.sector)}</p>
            <h3 className={styles.name}>{project.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

**`JoinBand.tsx`** — reuses `ClosingBlock` with the `JOIN` copy and a short points list.

- [ ] **Step 3: Assemble `app/page.tsx`**

```tsx
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import Audiences from "@/components/home/Audiences";
import HowItWorks from "@/components/home/HowItWorks";
import Traction from "@/components/home/Traction";
import AppMoment from "@/components/home/AppMoment";
import Ventures from "@/components/home/Ventures";
import JoinBand from "@/components/home/JoinBand";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Audiences />
      <HowItWorks />
      <Traction />
      <AppMoment />
      <Ventures />
      <JoinBand />
    </main>
  );
}
```

Eight sections, eight distinct layout families. Eyebrow budget is three; only `Pillars` uses one, leaving headroom.

- [ ] **Step 4: Verify in the browser**

Start the dev server and check, at 375px, 768px and 1440px:

- The hero headline holds two lines or fewer and both CTAs are visible without scrolling.
- The nav sits on one line at 1440px and collapses to a hamburger at 375px.
- The horizontal pan pins at the top of the viewport and releases cleanly at the end.
- Every anchor link scrolls to the right section.

Then set the operating system to reduced motion and reload. Expected: no pinning, no count-up animation, all content visible in its end state.

- [ ] **Step 5: Commit**

```bash
git add lib/home.ts components/home app/page.tsx
git commit -m "feat: add homepage with eight distinct section layouts"
```

---

### Task 16: Content conformance suite

This is the task that makes the taste rules permanent instead of aspirational.

**Files:**
- Create: `tests/content-conformance.test.ts`
- Modify: `vitest.config.ts`

**Interfaces:**
- Consumes: `PROJECTS` (Tasks 12 to 13), `lib/home.ts` (Task 15), `contentRules` (Task 4), `SECTORS` (Task 2).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Confirm vitest resolves the `@/` alias**

This change is applied in Task 13 step 4. If that task has already run, verify the file matches what follows and move on. Otherwise write it now. Replace `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
```

- [ ] **Step 2: Write the conformance suite**

```ts
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/lib/projects";
import { SECTORS } from "@/lib/sectors";
import {
  collectStrings, eyebrowBudget, findBannedDash, wordCount,
} from "@/lib/contentRules";
import * as home from "@/lib/home";

const publicDir = fileURLToPath(new URL("../public", import.meta.url));

function imagePaths(value: unknown): string[] {
  return collectStrings(value).filter((s) => s.startsWith("/images/"));
}

describe("project catalogue", () => {
  it("holds exactly twelve ventures", () => {
    expect(PROJECTS).toHaveLength(12);
  });

  it("has unique slugs", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("names every data file after its slug", () => {
    const dir = fileURLToPath(new URL("../lib/projects", import.meta.url));
    const files = readdirSync(dir)
      .filter((name) => name.endsWith(".ts") && name !== "index.ts")
      .map((name) => name.replace(/\.ts$/, ""))
      .sort();
    expect(files).toEqual(PROJECTS.map((p) => p.slug).sort());
  });

  it("uses only known sectors", () => {
    for (const project of PROJECTS) {
      expect(SECTORS).toContain(project.sector);
    }
  });

  it("opens every project with a hero block", () => {
    for (const project of PROJECTS) {
      expect(project.blocks[0]?.type, project.slug).toBe("hero");
    }
  });
});

describe("copy rules", () => {
  it("contains no em-dash or en-dash anywhere in project data", () => {
    for (const project of PROJECTS) {
      for (const text of collectStrings(project)) {
        expect(findBannedDash(text), `${project.slug}: ${text}`).toBeNull();
      }
    }
  });

  it("contains no em-dash or en-dash anywhere in homepage data", () => {
    for (const text of collectStrings(home)) {
      expect(findBannedDash(text), text).toBeNull();
    }
  });

  it("keeps every thesis to 25 words or fewer", () => {
    for (const project of PROJECTS) {
      expect(wordCount(project.thesis), project.slug).toBeLessThanOrEqual(25);
    }
  });

  it("keeps the hero subtext to 20 words or fewer", () => {
    expect(wordCount(home.HERO.subtext)).toBeLessThanOrEqual(20);
  });

  it("stays within the eyebrow budget on every project page", () => {
    for (const project of PROJECTS) {
      const used = project.blocks.filter(
        (block) => "eyebrow" in block && Boolean(block.eyebrow),
      ).length;
      expect(used, project.slug).toBeLessThanOrEqual(
        eyebrowBudget(project.blocks.length),
      );
    }
  });

  it("stays within the eyebrow budget on the homepage", () => {
    const HOMEPAGE_SECTIONS = 8;
    const used = [home.PILLARS.eyebrow].filter(Boolean).length;
    expect(used).toBeLessThanOrEqual(eyebrowBudget(HOMEPAGE_SECTIONS));
  });
});

describe("assets", () => {
  const pending = process.env.HOLYLOY_IMAGES_PENDING === "1";

  it.skipIf(pending)("resolves every referenced image", () => {
    const referenced = new Set([
      ...PROJECTS.flatMap(imagePaths),
      ...imagePaths(home),
    ]);
    for (const path of referenced) {
      expect(existsSync(`${publicDir}${path}`), `missing ${path}`).toBe(true);
    }
  });
});
```

- [ ] **Step 3: Run the suite**

Run: `HOLYLOY_IMAGES_PENDING=1 npm test`
Expected: every test passes, with the image-resolution test reported as skipped.

If a copy test fails, fix the offending content in `lib/`, not the test. That is the entire point of this suite.

- [ ] **Step 4: Run the whole suite once more without the escape hatch**

Run: `npm test`
Expected: the image test now fails, listing every missing asset. This is the correct state until Task 17 generates them, and it is the checklist for that task.

- [ ] **Step 5: Commit**

```bash
git add tests/content-conformance.test.ts vitest.config.ts
git commit -m "test: add content conformance suite enforcing copy and asset rules"
```

---

### Task 17: Image manifest and generation

**Files:**
- Create: `docs/image-manifest.md`
- Create: `scripts/generate-images.ts`
- Create: `public/images/**` (generated output)

**Interfaces:**
- Consumes: image paths referenced in `lib/` (Tasks 12, 13, 15), surfaced by the failing test from Task 16 step 4.
- Produces: every asset that test demands.

**Blocking note:** this task needs either `GEMINI_API_KEY` in the environment or credits on the Higgsfield MCP account. Spec section 13 records this as open. Everything before this task works against placeholders, so this is the only task that can stall.

- [ ] **Step 1: Enumerate the required assets**

Run: `npm test -- tests/content-conformance.test.ts`
The failure output lists every missing path. That list is the manifest's contents, not a guess.

- [ ] **Step 2: Write `docs/image-manifest.md`**

One entry per asset. Every prompt ends with the shared treatment clause, which is what makes thirty images read as one commission:

> Shared treatment clause: desaturated documentary photography, natural light, wide calm composition with negative space for text, muted neutral palette, with a single saturated red object present naturally in the frame such as signage, a jacket, a vehicle light or painted metal. No text, no logos, no watermarks, no people looking at camera.

Table columns: `path`, `aspect ratio`, `subject`, `priority`. Aspect ratios follow the `ImageSlot` `ratio` prop at each call site: `4 / 3` for hero and card images, `3 / 4` for narrative and venture cards, `16 / 10` for pillar cells.

- [ ] **Step 3: Write `scripts/generate-images.ts`**

Reads the manifest, calls the Gemini image endpoint once per row, writes to `public/images/`, and skips any path that already exists so the script is resumable.

```ts
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname } from "node:path";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const TREATMENT =
  "Desaturated documentary photography, natural light, wide calm composition with " +
  "negative space for text, muted neutral palette, with a single saturated red object " +
  "present naturally in the frame. No text, no logos, no watermarks.";

type Asset = { path: string; ratio: string; subject: string };

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generate(asset: Asset): Promise<void> {
  const target = `public${asset.path}`;
  if (await exists(target)) {
    console.log(`skip ${asset.path}`);
    return;
  }

  const response = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${asset.subject}. ${TREATMENT}` }] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });

  if (!response.ok) {
    throw new Error(`${asset.path}: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const part = payload.candidates?.[0]?.content?.parts?.find(
    (p: { inlineData?: { data: string } }) => p.inlineData,
  );

  if (!part?.inlineData?.data) {
    throw new Error(`${asset.path}: response carried no image data`);
  }

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(part.inlineData.data, "base64"));
  console.log(`wrote ${asset.path}`);
}

async function main(): Promise<void> {
  if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set. See docs/image-manifest.md.");
    process.exit(1);
  }

  const { ASSETS }: { ASSETS: Asset[] } = await import("./assets.js");
  for (const asset of ASSETS) {
    await generate(asset);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

Create `scripts/assets.ts` exporting `ASSETS`, transcribed from the manifest table. Keeping the data separate from the driver means a prompt can be revised and one image regenerated by deleting its file and re-running.

The response shape above should be checked against current Gemini API documentation before the first run; if it has changed, fix the extraction and note the correction in the manifest.

- [ ] **Step 4: Generate the assets**

Run: `npx tsx scripts/generate-images.ts`
Expected: one `wrote` line per asset. Re-running prints `skip` for everything.

- [ ] **Step 5: Review every generated image**

Open `public/images/` and check each one against the treatment clause. Regenerate any image where the red reads as a filter rather than an object, or where text or a watermark appears. Delete the file and re-run the script to regenerate just that one.

- [ ] **Step 6: Confirm the conformance suite now passes clean**

Run: `npm test`
Expected: every test passes, nothing skipped.

- [ ] **Step 7: Commit**

```bash
git add docs/image-manifest.md scripts public/images
git commit -m "feat: add image manifest, generation script and generated assets"
```

---

### Task 18: Metadata, accessibility and performance pass

**Files:**
- Create: `app/opengraph-image.tsx`
- Modify: any component failing a check below

**Interfaces:**
- Consumes: everything.
- Produces: a shippable site.

- [ ] **Step 1: Write `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "HolyLoy. Loyalty is royalty.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#FAF8F6",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 700, color: "#121212", lineHeight: 1 }}>
          Loyalty is
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, color: "#DC0000", lineHeight: 1 }}>
          royalty.
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Audit contrast**

Check with a contrast tool, in both light and dark mode:

- White on `#DC0000` for the primary CTA. Expected at or above 4.5:1.
- `--c-muted` on `--c-canvas` for figure labels. Expected at or above 4.5:1.
- Red-wash tiles in `EconomicsBlock`: confirm the text is `--c-ink`, never red.
- The focus ring on chips and links against both backgrounds.

Fix any failure by adjusting the token, not the component.

- [ ] **Step 3: Audit the mechanical taste rules**

Run these greps and confirm each returns nothing:

```bash
grep -rn "—\|–" app components lib --include=*.tsx --include=*.ts
grep -rn "#[0-9a-fA-F]\{6\}" components app --include=*.module.css | grep -v "#FFFFFF"
grep -rn "addEventListener(\"scroll\"" app components
grep -rn "100vh" app components --include=*.module.css
```

The second grep permits `#FFFFFF` only, which appears as button and heading text on dark grounds. Every other literal hex is a token violation.

- [ ] **Step 4: Audit reduced motion**

Enable reduced motion at the OS level, reload the homepage and one project page. Confirm: no pinning, no drawn paths animating, figures showing final values immediately, and all content reachable.

- [ ] **Step 5: Run Lighthouse**

Run a production build and serve it:

```bash
npm run build && npm run start
```

Run Lighthouse against `/` and one project page. Targets: LCP under 2.5s, CLS under 0.1, accessibility score at or above 95.

Fix any CLS failure by confirming every `ImageSlot` has an explicit `ratio`, and any LCP failure by confirming the hero image carries `priority`.

- [ ] **Step 6: Full verification**

```bash
npm test && npm run lint && npm run build
```

Expected: all tests pass, no lint errors, build succeeds with `/`, `/projects` and twelve `/projects/[slug]` routes listed as static.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add OG image and complete accessibility and performance pass"
```

---

## Notes for the implementer

**On the mockups.** `Homepage/` and `Projects/` are content sources. They were AI-generated and carry the tells this plan works to avoid: an eyebrow above every section, rows of identical cards, and spec tables with a hairline under every row. Take the copy and the figures. Leave the layouts.

**On figures.** Every number in `lib/` came from a mockup and is treated as approved copy per spec section 2. They are isolated in data files precisely so they can be corrected in one place. Do not invent a figure that is not in a mockup, and do not round one that is.

**When this plan and the spec disagree,** the spec at `docs/superpowers/specs/2026-08-09-holyloy-net-design.md` wins and the plan is wrong. Say so rather than silently following the plan.
