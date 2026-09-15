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
      if (intervalId !== undefined) clearInterval(intervalId);
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

    let hasInitialSample = false;
    let wasInActivationZone = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInActivationZone = entry.isIntersecting && entry.intersectionRatio >= 0.7;

        if (!hasInitialSample) {
          hasInitialSample = true;
          wasInActivationZone = isInActivationZone;
          return;
        }

        if (isInActivationZone && !wasInActivationZone) {
          play();
        } else if (!isInActivationZone && wasInActivationZone) {
          stop();
        }

        wasInActivationZone = isInActivationZone;
      },
      {
        threshold: [0, 0.7],
        rootMargin: "0px 0px -20% 0px",
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{renderedText}</span>
    </span>
  );
}
