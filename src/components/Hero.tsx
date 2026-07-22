"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import LetterExplosion from "./LetterExplosion";
import { ArrowRight } from "@carbon/icons-react";

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
  const [nameComplete, setNameComplete] = useState(false);

  const handleNameComplete = useCallback(() => {
    setNameComplete(true);
  }, []);

  useEffect(() => {
    if (!nameComplete || !subtitleRef.current) return;
    const els = subtitleRef.current.querySelectorAll(".reveal-item");
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
      }
    );
  }, [nameComplete]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
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
          gridTemplateColumns: "1fr auto",
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
            Software Engineer · Data Scientist
          </p>

          {/* Hero name */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 8vw, 96px)",
              lineHeight: 1.0,
              color: "var(--text-primary)",
              marginBottom: "32px",
              overflow: "visible",
            }}
          >
            <span style={{ display: "block" }}>
              <LetterExplosion text="Julian" />
            </span>
            <span style={{ display: "block" }}>
              <LetterExplosion
                text="Patterson"
                onComplete={handleNameComplete}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(64px, 8vw, 96px)",
                  color: "var(--accent-navy)",
                  display: "inline-block",
                }}
                className="char"
              >
                .
              </span>
            </span>
          </h1>

          {/* Subtitle & tags — hidden until name assembles */}
          <div ref={subtitleRef}>
            <p
              className="reveal-item"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(17px, 1.5vw, 20px)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: "520px",
                marginBottom: "32px",
                opacity: 0,
              }}
            >
              Building at the intersection of freight intelligence and machine
              learning.
              <br />
              McGill University → Hapag-Lloyd Hamburg.
            </p>

            {/* Tags */}
            <div
              className="reveal-item"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "40px",
                opacity: 0,
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
                Montréal, QC → Hamburg, DE · <LiveClock />
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
                Native EN · FR
              </span>
            </div>

            {/* CTAs */}
            <div
              className="reveal-item"
              style={{ display: "flex", gap: "32px", opacity: 0 }}
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
                }}
              >
                <span style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>View my work</span>
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
                }}
              >
                <span style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>Get in touch</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right column — atmospheric coordinates */}
        <div
          className="hero-coords"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            lineHeight: 2,
            color: "var(--text-tertiary)",
            opacity: 0.4,
            letterSpacing: "0.08em",
            userSelect: "none",
            whiteSpace: "pre",
            textAlign: "center",
          }}
          aria-hidden="true"
        >
          {`YUL  →  HAM  →  SHA\n45.5°N  53.5°N  31.2°N\n73.6°W  10.0°E 121.5°E`}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-coords {
            display: none !important;
          }
        }
        .carbon-link:hover span {
          text-decoration: none;
        }
      `}</style>
    </section>
  );
}
