"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRight } from "@carbon/icons-react";
import gsap from "gsap";
import TextScramble from "./TextScramble";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const mtl = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setTime(mtl);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time} MTL</span>;
}

export default function Hero() {
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subtitle = subtitleRef.current;
    if (!subtitle || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const els = subtitle.querySelectorAll(".reveal-item");
      gsap.fromTo(
        els,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.1,
        },
      );
    }, subtitle);

    return () => context.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "96px 32px 64px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "64px",
          alignItems: "center",
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-tertiary)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            <TextScramble text="Software Engineer" className="section-kicker" />
          </p>

          {/* Hero name */}
          <h1
            aria-label="Julian Patterson."
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 520,
              letterSpacing: "-0.025em",
              lineHeight: 0.94,
              color: "var(--text-primary)",
              marginBottom: "32px",
              overflow: "visible",
            }}
          >
            <span aria-hidden="true" style={{ display: "block" }}>
              Julian
            </span>
            <span
              aria-hidden="true"
              style={{ display: "block", marginTop: "0.08em" }}
            >
              Patterson
              <span
                style={{
                  color: "var(--accent-navy)",
                }}
              >
                .
              </span>
            </span>
          </h1>

          {/* Subtitle & tags */}
          <div ref={subtitleRef}>
            <p
              className="reveal-item motion-reveal"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(17px, 1.5vw, 20px)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: "520px",
                marginBottom: "32px",
              }}
            >
              Building data-driven software — machine learning, full-stack
              platforms, and the operational systems underneath them.
              <br />
              Final year, McGill University.
            </p>

            {/* Tags */}
            <div
              className="reveal-item motion-reveal"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "40px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "0px",
                  padding: "4px 8px",
                  backgroundColor: "var(--bg-surface)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Montréal, QC · <LiveClock />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "0px",
                  padding: "4px 8px",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                Fluent EN · FR
              </span>
            </div>

            {/* CTAs */}
            <div
              className="reveal-item motion-reveal"
              style={{ display: "flex", gap: "clamp(16px, 4vw, 32px)" }}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="carbon-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  color: "var(--accent-navy)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  }}
                >
                  View my work
                </span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="carbon-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  color: "var(--accent-navy)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  }}
                >
                  Get in touch
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
