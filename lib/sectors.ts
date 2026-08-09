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
