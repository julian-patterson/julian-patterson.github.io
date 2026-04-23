"use client";

import { useEffect, useRef } from "react";
import { initScrollReveal } from "@/lib/animations";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    initScrollReveal(".contact-reveal", sectionRef.current);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "96px 32px 64px",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p
        className="contact-reveal"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "24px",
          opacity: 0,
        }}
      >
        Contact
      </p>

      <h2
        className="contact-reveal"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 5vw, 64px)",
          color: "var(--text-primary)",
          marginBottom: "24px",
          lineHeight: 1.1,
          opacity: 0,
        }}
      >
        Let&apos;s talk.
      </h2>

      <p
        className="contact-reveal"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          maxWidth: "480px",
          marginBottom: "40px",
          opacity: 0,
        }}
      >
        Open to research collaborations, interesting problems in freight
        analytics, and conversations about ML applied to logistics. Reach out in
        English or French.
      </p>

      <div
        className="contact-reveal"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          opacity: 0,
        }}
      >
        <a
          href="mailto:julian.e.patterson@icloud.com"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--accent-navy)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          julian.e.patterson@icloud.com
        </a>
        <a
          href="https://linkedin.com/in/julian-e-patterson"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--accent-navy)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          LinkedIn ↗
        </a>
        <a
          href="https://julian-patterson.github.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--accent-navy)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          GitHub ↗
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "80px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-tertiary)",
            lineHeight: 1.8,
          }}
        >
          © 2026 Julian Patterson · Montréal → Hamburg
          <br />
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </section>
  );
}
