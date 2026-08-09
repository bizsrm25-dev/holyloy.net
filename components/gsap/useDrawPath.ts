"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useDrawPath() {
  const ref = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = ref.current;
    if (!path) return;

    gsap.registerPlugin(ScrollTrigger);

    const length = path.getTotalLength();
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduced) {
          gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
          return;
        }

        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: path,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );
      },
    );

    return () => mm.revert();
  }, []);

  return ref;
}
