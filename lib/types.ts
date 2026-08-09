import type { Sector } from "./sectors";

export type Figure = { value: string; label: string; note?: string };
export type Step = { label: string; body: string };
export type Pillar = { title: string; body: string; icon: string; image?: string };
export type Category = { title: string; image: string; items: string[] };
export type DetailRow = { label: string; value: string };
export type Cluster = { title: string; rows: DetailRow[] };
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
