"use client";

import { useEffect, useRef, useState } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
}

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-";

export default function TextScramble({ text, className = "" }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [renderedText, setRenderedText] = useState(text);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const stop = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = undefined;
      setRenderedText(text);
    };

    const play = () => {
      stop();
      frame = 0;
      intervalId = setInterval(() => {
        const settledCharacters = Math.floor(frame / 2);
        setRenderedText(
          text
            .split("")
            .map((character, index) => {
              if (character === " " || index < settledCharacters) return character;
              return glyphs[(frame + index * 7) % glyphs.length];
            })
            .join("")
        );
        frame += 1;
        if (settledCharacters >= text.length) stop();
      }, 42);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else stop();
      },
      { threshold: 0.7 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{renderedText}</span>
    </span>
  );
}
