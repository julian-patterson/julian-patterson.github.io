"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

// Config variable for departure date
const DEPARTURE_DATE = new Date("2026-05-04");
const START_OF_YEAR = new Date("2026-01-01");

export default function Now() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate countdown
    const now = new Date();
    const diff = DEPARTURE_DATE.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setTimeLeft({ days: Math.max(0, days) });

    // Calculate progress bar
    const total = DEPARTURE_DATE.getTime() - START_OF_YEAR.getTime();
    const current = now.getTime() - START_OF_YEAR.getTime();
    const p = (current / total) * 100;
    setProgress(Math.min(100, Math.max(0, p)));

    if (!sectionRef.current || !cardRef.current) return;

    // Entrance animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="now"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "12px",
          marginBottom: "48px",
        }}
      >
        Now
      </p>

      <div
        ref={cardRef}
        style={{
          opacity: 0,
          backgroundColor: "var(--bg-surface)",
          borderLeft: "4px solid var(--accent-navy)",
          borderTop: "1px solid var(--border)",
          borderRight: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "36px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-tertiary)",
            marginBottom: "32px",
          }}
        >
          last updated · April 2026
        </p>

        <div
          className="now-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left Column — Status */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "LOCATION", value: `Montréal, QC — leaving for Hamburg in ${Math.floor(timeLeft.days / 7)} weeks` },
              { label: "WORKING ON", value: "Freight Network Intelligence (GNN prototype) · Final semester coursework at McGill" },
              { label: "LEARNING", value: "German (A2 → B1) · PyTorch Geometric" },
              { label: "READING", value: "Inductive Representation Learning on Large Graphs (Hamilton et al.)" },
              { label: "TRAINING", value: "Marathon prep — 45 km/week base building" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  paddingBottom: "12px",
                  borderBottom: i < 4 ? "0.5px solid var(--border)" : "none",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-tertiary)" }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.4 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Right Column — Countdown */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
              <span style={{ fontSize: "64px", fontWeight: 500, display: "block", lineHeight: 1 }}>
                {timeLeft.days}
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "8px", display: "block" }}>
                days until Hamburg
              </span>
            </div>

            <div style={{ width: "100%", marginTop: "32px" }}>
              <div
                style={{
                  height: "3px",
                  width: "100%",
                  backgroundColor: "rgba(28,28,26,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "var(--accent-navy)",
                    transition: "width 1.5s ease-out",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
