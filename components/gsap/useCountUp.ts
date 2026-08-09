"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function decimalsOf(value: number): number {
  return (String(value).split(".")[1] ?? "").length;
}

export function format(value: number, decimals: number): string {
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

    gsap.registerPlugin(ScrollTrigger);

    const decimals = decimalsOf(target);
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

        // The element already renders the correct final figure. Only overwrite it
        // once the tween is genuinely progressing, otherwise the render at
        // progress 0 stamps a misleading "0" over a correct value and leaves it
        // there if the ticker never advances.
        const tween = gsap.to(counter, {
          value: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (tween.progress() > 0) {
              el.textContent = format(counter.value, decimals);
            }
          },
          onComplete: () => {
            el.textContent = format(target, decimals);
          },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      },
    );

    return () => mm.revert();
  }, [target, duration]);

  return { ref };
}
