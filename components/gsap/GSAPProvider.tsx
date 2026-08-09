"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // Do NOT kill every ScrollTrigger on cleanup: each hook reverts its own
    // gsap.matchMedia context, and a global kill races with child effects under
    // StrictMode, destroying triggers the children have just re-created.
    //
    // Triggers are created by child effects before this parent effect runs, so
    // their start and end positions are measured against a layout that fonts
    // have not landed in yet. Web fonts swap in afterwards and shift everything
    // down, leaving pinned sections with stale ranges. Refresh once the fonts
    // are ready, and again on full load for late-arriving images.
    ScrollTrigger.refresh();

    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <>{children}</>;
}
