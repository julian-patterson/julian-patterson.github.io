"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Replace with your real numbers ──────────────────────────────────────────
const stats = [
  { label: "TOTAL_KM",    value: "1,284 km",    note: "this year" },
  { label: "LONGEST_RUN", value: "42.2 km",     note: "marathon distance" },
  { label: "AVG_PACE",    value: "5:08 /km",    note: "moving average" },
  { label: "ELEVATION",   value: "12,400 m",    note: "cumulative gain" },
  { label: "STREAK",      value: "6 days",      note: "current" },
  { label: "FAVE_ROUTE",  value: "Mont Royal",  note: "Montréal loop" },
];

// Monthly distance data (km) — update with real Strava/Garmin export
const monthly = [
  { month: "Jan", km: 142 },
  { month: "Feb", km: 168 },
  { month: "Mar", km: 195 },
  { month: "Apr", km: 210 },
  { month: "May", km: 228 },
  { month: "Jun", km: 245 },
  { month: "Jul", km: 232 },
  { month: "Aug", km: 238 },
  { month: "Sep", km: 255 },
  { month: "Oct", km: 220 },
  { month: "Nov", km: 0 },   // fill in
  { month: "Dec", km: 0 },   // fill in
];

const CHART_W = 420;
const CHART_H = 160;
const BAR_GAP = 4;
const maxKm = Math.max(...monthly.map(m => m.km), 1);

export default function Marathon() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(SVGRectElement | null)[]>([]);
  const triggered = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".mara-reveal"),
      { opacity: 0, y: 18 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        barRefs.current.forEach((el, i) => {
          if (!el) return;
          const targetH = monthly[i].km === 0 ? 0 : (monthly[i].km / maxKm) * (CHART_H - 24);
          const targetY = (CHART_H - 24) - targetH;
          gsap.fromTo(
            el,
            { attr: { height: 0, y: CHART_H - 24 } },
            { attr: { height: targetH, y: targetY }, duration: 0.8, ease: "power3.out", delay: i * 0.06 }
          );
        });
      },
    });
  }, []);

  const barW = (CHART_W / monthly.length) - BAR_GAP;

  return (
    <section
      id="marathon"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p
        className="mara-reveal"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "12px",
          opacity: 0,
        }}
      >
        Outside the terminal
      </p>

      <h2
        className="mara-reveal"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          color: "var(--text-primary)",
          lineHeight: 1.15,
          marginBottom: "8px",
          opacity: 0,
        }}
      >
        I also run.
      </h2>
      <p
        className="mara-reveal"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          color: "var(--text-secondary)",
          marginBottom: "48px",
          opacity: 0,
        }}
      >
        Same obsession with data. Different dataset.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px",
          alignItems: "start",
        }}
        className="mara-grid"
      >
        {/* Left — terminal stats card */}
        <div
          className="mara-reveal"
          style={{
            opacity: 0,
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            padding: "28px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-tertiary)",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "12px",
            }}
          >
            $ strava export --year 2025 --format terminal
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {stats.map(({ label, value, note }) => (
                <tr key={label}>
                  <td
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "var(--text-tertiary)",
                      letterSpacing: "0.06em",
                      paddingBottom: "14px",
                      paddingRight: "16px",
                      verticalAlign: "top",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </td>
                  <td
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--text-primary)",
                      paddingBottom: "14px",
                    }}
                  >
                    {value}
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      # {note}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right — monthly distance bar chart */}
        <div className="mara-reveal" style={{ opacity: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-tertiary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Monthly distance (km) — 2025
          </p>
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            style={{ width: "100%", display: "block", overflow: "visible" }}
          >
            {/* Y-axis reference lines */}
            {[0.25, 0.5, 0.75, 1].map((frac) => {
              const y = (CHART_H - 24) * (1 - frac);
              return (
                <g key={frac}>
                  <line
                    x1={0}
                    y1={y}
                    x2={CHART_W}
                    y2={y}
                    stroke="var(--border)"
                    strokeWidth={0.8}
                    strokeDasharray="3 3"
                  />
                  <text
                    x={-4}
                    y={y + 4}
                    textAnchor="end"
                    fontFamily="var(--font-mono)"
                    fontSize="8"
                    fill="var(--text-tertiary)"
                  >
                    {Math.round(maxKm * frac)}
                  </text>
                </g>
              );
            })}

            {/* Bars */}
            {monthly.map((m, i) => {
              const x = i * (CHART_W / monthly.length) + BAR_GAP / 2;
              return (
                <g key={m.month}>
                  <rect
                    ref={(el) => { barRefs.current[i] = el; }}
                    x={x}
                    y={CHART_H - 24}
                    width={barW}
                    height={0}
                    fill={m.km === 0 ? "var(--border)" : "var(--accent-navy)"}
                    opacity={m.km === 0 ? 0.3 : 0.7}
                  />
                  <text
                    x={x + barW / 2}
                    y={CHART_H - 6}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="7.5"
                    fill="var(--text-tertiary)"
                  >
                    {m.month}
                  </text>
                </g>
              );
            })}
          </svg>

          <p
            style={{
              marginTop: "16px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-tertiary)",
              fontStyle: "italic",
            }}
          >
            Nov–Dec TBD · data via Strava export
          </p>
        </div>
      </div>

    </section>
  );
}
