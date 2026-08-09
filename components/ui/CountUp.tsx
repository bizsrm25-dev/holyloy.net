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
