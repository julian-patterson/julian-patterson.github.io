"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Key impact metrics
const counters = [
  { value: 2000, suffix: "+", label: "Container rates\nprocessed / month", prefix: "" },
  { value: 100, suffix: "%", label: "Parsing accuracy\nacross all rate sheets", prefix: "" },
  { value: 83, suffix: "%", label: "Reduction in bug\ninvestigation time", prefix: "" },
  { value: 500, suffix: "+", label: "Manual entry minutes\neliminated per sheet", prefix: "" },
  { value: 50, suffix: "%", label: "Faster booking\napproval cycle", prefix: "" },
  { value: 1000, suffix: "+", label: "PO records under\nactive management", prefix: "" },
];

// Before / after chart data (all values normalised to a 0–100 scale for the bar widths)
const chartData = [
  {
    label: "Rate coverage",
    before: { raw: "10%", pct: 10 },
    after: { raw: "100%", pct: 100 },
  },
  {
    label: "Manual entry (min / sheet)",
    before: { raw: "500+", pct: 100 },
    after: { raw: "0", pct: 0 },
  },
  {
    label: "Bug investigation (min)",
    before: { raw: "30 min", pct: 100 },
    after: { raw: "5 min", pct: 17 },
  },
  {
    label: "Booking approval time",
    before: { raw: "baseline", pct: 100 },
    after: { raw: "−50%", pct: 50 },
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs = useRef<{ before: SVGRectElement | null; after: SVGRectElement | null }[]>(
    chartData.map(() => ({ before: null, after: null }))
  );
  const triggered = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Fade-in for the header
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".stats-reveal"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Counter animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        counterRefs.current.forEach((el, i) => {
          if (!el) return;
          const target = counters[i].value;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            delay: i * 0.07,
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString();
            },
          });
        });

        // Bar chart animation
        barRefs.current.forEach(({ before, after }, i) => {
          const bPct = chartData[i].before.pct;
          const aPct = chartData[i].after.pct;
          const maxW = 260; // px

          if (before) {
            gsap.fromTo(
              before,
              { attr: { width: 0 } },
              { attr: { width: (bPct / 100) * maxW }, duration: 1, ease: "power3.out", delay: i * 0.1 + 0.3 }
            );
          }
          if (after) {
            gsap.fromTo(
              after,
              { attr: { width: 0 } },
              { attr: { width: (aPct / 100) * maxW }, duration: 1, ease: "power3.out", delay: i * 0.1 + 0.5 }
            );
          }
        });
      },
    });
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p
        className="stats-reveal motion-reveal"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "48px",
        }}
      >
        Impact
      </p>

      {/* Counter grid */}
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          border: "1px solid var(--border)",
          marginBottom: "64px",
          overflow: "hidden",
        }}
      >
        {counters.map((c, i) => (
          <div
            key={i}
            className="stats-reveal counter-cell motion-reveal"
            style={{
              backgroundColor: "var(--bg-surface)",
              padding: "32px 28px",
              borderRight: (i + 1) % 3 !== 0 ? "1px solid var(--border)" : undefined,
              borderBottom: i < 3 ? "1px solid var(--border)" : undefined,
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--bg-accent-soft)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--bg-surface)")
            }
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "42px",
                color: "var(--accent-navy)",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {c.prefix}
              <span
                ref={(el) => {
                  counterRefs.current[i] = el;
                }}
              >
                0
              </span>
              {c.suffix}
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-tertiary)",
                lineHeight: 1.6,
                whiteSpace: "pre-line",
              }}
            >
              {c.label}
            </p>
          </div>
        ))}
      </div>

      {/* Before / After chart */}
      <div className="stats-reveal motion-reveal">
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-tertiary)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}
        >
          Before → After Automation
        </p>

        {/* Legend */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          {[
            { color: "rgba(28,28,26,0.18)", label: "Before" },
            { color: "var(--accent-navy)", label: "After" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "8px",
                  backgroundColor: color,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-tertiary)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {chartData.map((row, i) => {
            const maxW = 260;
            return (
              <div key={row.label}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    marginBottom: "8px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {row.label}
                </p>
                <svg
                  width="100%"
                  viewBox={`0 0 ${maxW + 80} 40`}
                  style={{ overflow: "visible", maxWidth: "480px", display: "block" }}
                >
                  {/* Before bar */}
                  <rect
                    ref={(el) => {
                      barRefs.current[i].before = el;
                    }}
                    x={0}
                    y={0}
                    width={0}
                    height={14}
                    fill="rgba(28,28,26,0.18)"
                  />
                  <text
                    x={(row.before.pct / 100) * maxW + 6}
                    y={11}
                    fill="var(--text-tertiary)"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                  >
                    {row.before.raw}
                  </text>

                  {/* After bar */}
                  <rect
                    ref={(el) => {
                      barRefs.current[i].after = el;
                    }}
                    x={0}
                    y={22}
                    width={0}
                    height={14}
                    fill="var(--accent-navy)"
                  />
                  <text
                    x={(row.after.pct / 100) * maxW + 6}
                    y={33}
                    fill="var(--accent-navy)"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    fontWeight="500"
                  >
                    {row.after.raw}
                  </text>
                </svg>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
