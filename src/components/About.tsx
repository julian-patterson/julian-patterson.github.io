"use client";

import { useEffect, useRef } from "react";
import { initScrollReveal } from "@/lib/animations";

const metadata = [
  { label: "STATUS", value: "Final year, McGill University" },
  { label: "ROLE", value: "CTO · AnyTime Technologies" },
  { label: "NEXT", value: "AI & Analytics Intern · Hapag-Lloyd" },
  { label: "LOCATION", value: "Montréal → Hamburg (May 2026)" },
  { label: "LANGUAGES", value: "English · French" },
  { label: "INTERESTS", value: "Marathon running · Freight intelligence · Home automation" },
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
        <div className="about-reveal" style={{ opacity: 0 }}>
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
              Software engineer with a statistics minor and an obsession with freight.
              Two internships inside freight forwarding offices taught me where the real
              data problems live. I&apos;m drawn to the intersection of machine learning,
              network science, and global logistics — building tools that make complex
              systems legible.
            </p>
            <p>
              Fluent in English and French. Currently in Montréal, moving to Hamburg
              in May 2026 for an AI &amp; Analytics role at Hapag-Lloyd.
            </p>
          </div>
        </div>

        {/* Right — metadata card */}
        <div
          className="about-reveal"
          style={{
            opacity: 0,
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

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
