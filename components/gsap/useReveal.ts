"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useReveal<T extends HTMLElement>(options?: { stagger?: number }) {
  const ref = useRef<T>(null);
  const stagger = options?.stagger ?? 0.08;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const targets = el.querySelectorAll("[data-reveal]");
        if (targets.length === 0) return;

        if (context.conditions?.reduced) {
          gsap.set(targets, { opacity: 1, y: 0 });
          return;
        }

        // immediateRender:false is a safety property, not a preference. With the
        // default, GSAP writes opacity:0 the moment the tween is built, so if the
        // ticker never runs (a backgrounded tab, a stalled rAF, a JS error later
        // in the page) the content stays permanently invisible. Deferring the
        // from-state means the worst case is content that is simply not animated.
        gsap.fromTo(
          targets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      },
    );

    return () => mm.revert();
  }, [stagger]);

  return ref;
}
