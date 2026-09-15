"use client";

import { useEffect, useRef } from "react";
import { initScrollReveal } from "@/lib/animations";
import TextScramble from "./TextScramble";

const metadata = [
  { label: "EDUCATION", value: "Software Engineering · McGill University" },
  { label: "ROLE", value: "CTO · AnyTime Technologies" },
  { label: "EXPERIENCE", value: "Hapag-Lloyd · Prime Freight Logistics" },
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
            <TextScramble text="About" className="section-kicker" />
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
              I&apos;m a software engineering student at McGill University, minoring in
              statistics. My work spans internal logistics tools, product infrastructure,
              and applied AI. I like turning complicated operational workflows into
              software that is easier to understand, operate, and improve.
            </p>
            <p>
              At Prime Freight Logistics, I built pricing and operations tools used
              across rate management and booking workflows. At AnyTime Technologies,
              I lead the technical development of a multi-tenant sports-facility booking
              platform. I work in English and French.
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
