"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LetterExplosionProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

export default function LetterExplosion({
  text,
  className = "",
  onComplete,
}: LetterExplosionProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLSpanElement>(".char");

    gsap.set(chars, {
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-45, 45),
      opacity: 0,
    });

    gsap.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.04,
      delay: 0.1,
      onComplete: onComplete,
    });
  }, [onComplete]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char"
          aria-hidden="true"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
