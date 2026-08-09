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

    gsap.registerPlugin(ScrollTrigger);

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
