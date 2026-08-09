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
