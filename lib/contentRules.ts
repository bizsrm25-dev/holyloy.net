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
