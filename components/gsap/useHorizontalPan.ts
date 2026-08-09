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

    gsap.registerPlugin(ScrollTrigger);
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
