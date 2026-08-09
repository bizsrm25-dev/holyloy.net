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
