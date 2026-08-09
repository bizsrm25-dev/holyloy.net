"use client";

import { parseFigure } from "@/lib/parseFigure";
import { useCountUp, decimalsOf, format } from "@/components/gsap/useCountUp";

export default function CountUp({ value }: { value: string }) {
  const parsed = parseFigure(value);
  const target = parsed.number ?? 0;
  const { ref } = useCountUp(target);

  if (parsed.number === null) return <>{value}</>;

  // Render the real figure, not a zero placeholder. The animation counts up
  // from zero once the ticker runs; if it never runs the correct number is
  // already on screen. A stalled animation must never leave a wrong value.
  return (
    <>
      {parsed.prefix}
      <span ref={ref}>{format(target, decimalsOf(target))}</span>
      {parsed.suffix}
    </>
  );
}
