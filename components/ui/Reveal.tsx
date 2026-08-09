"use client";

import { useReveal } from "@/components/gsap/useReveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

export default function Reveal({ children, className, stagger }: Props) {
  const ref = useReveal<HTMLDivElement>({ stagger });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
