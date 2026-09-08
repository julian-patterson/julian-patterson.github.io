"use client";

import { useEffect, useRef } from "react";
import { initScrollReveal } from "@/lib/animations";

const metadata = [
  { label: "STATUS", value: "Final year, McGill University" },
  { label: "ROLE", value: "Founder & CTO · Stride" },
  { label: "LOCATION", value: "Montréal, QC" },
  { label: "LANGUAGES", value: "English · French" },
  { label: "INTERESTS", value: "Marathon running · Logistics · Home automation" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    initScrollReveal(".about-reveal", sectionRef.current);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left */}
        <div className="about-reveal motion-reveal">
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
            About
          </p>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            <p style={{ marginBottom: "24px" }}>
              Software engineer with a statistics minor. Most of my work has been
              internal tooling and data platforms — pricing logic, parsers,
              dashboards, and the pipelines that keep them fed. I&apos;m drawn to
              machine learning, network science, and operational systems, and I
              have a soft spot for logistics: it is where messy real-world data
              and hard scheduling problems meet.
            </p>
            <p>
              Fluent in English and French. Based in Montréal, open to relocating.
            </p>
          </div>
        </div>

        {/* Right — metadata card */}
        <div
          className="about-reveal motion-reveal"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "0px",
            padding: "24px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {metadata.map(({ label, value }) => (
                <tr key={label}>
                  <td
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-tertiary)",
                      letterSpacing: "0.08em",
                      paddingBottom: "16px",
                      paddingRight: "24px",
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
                      paddingBottom: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
