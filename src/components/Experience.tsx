"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

interface ExperienceEntry {
  date: string;
  role: string;
  company: string;
  location: string;
  tags: string[];
  bullets?: string[];
  note?: string;
  type?: "work" | "education";
}

const entries: ExperienceEntry[] = [
  {
    date: "May 2026",
    role: "AI & Analytics Intern",
    company: "Hapag-Lloyd",
    location: "Hamburg, Germany",
    tags: ["Demand Forecasting", "NLP", "AWS", "Recommendation Systems"],
    note:
      "Upcoming — joining one of the world's largest container shipping companies to work on ML-driven analytics and document automation.",
  },
  {
    date: "2024 – Present",
    role: "Software Developer",
    company: "Prime Freight Logistics",
    location: "Montréal, QC",
    tags: ["React", "Docker", "JavaScript", "Logistics"],
    bullets: [
      "Engineered a pricing algorithm handling FAK/NAC contract structures across 40+ routes and 100+ clients",
      "Built automated Excel parsers processing 2,000+ container rates/month with 100% accuracy — increased rate coverage from 10% to 100%, eliminating 500+ minutes of manual data entry per rate sheet",
      "Architected a React PO management system handling 1,000+ records, cutting booking approval time by 50%",
      "Built a centralized orchestrator with error handling that reduced bug investigation time by 83% (30 min → 5 min)",
    ],
  },
  {
    date: "2024 – Present",
    role: "CTO & Technical Lead",
    company: "AnyTime Technologies",
    location: "Montréal, QC",
    tags: ["React", "Supabase", "CI/CD", "Payment Processing"],
    bullets: [
      "Founding technical lead for a sports facility booking platform",
      "Designed database schemas for court management, scheduling, and multi-location payment processing",
      "Implemented CI/CD pipelines via GitHub Actions for automated deployment",
    ],
  },
  {
    date: "2023 – 2026",
    role: "B.Sc. Software Engineering, Minor in Statistics",
    company: "McGill University",
    location: "Montréal, QC",
    tags: [],
    type: "education",
    note:
      "Relevant coursework: Applied Machine Learning, Data Structures, Probability & Statistics, Software Design, Discrete Mathematics. Activities: McGill AI Society, McGill AI Alignment",
  },
];

// Date column width + gap = the x-offset where the continuous line lives
const DATE_COL = 120;
const GAP = 32;
const LINE_X = DATE_COL + GAP; // 152px from left edge of the entry grid

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate the vertical line drawing down
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Stagger each entry in
    const items = sectionRef.current.querySelectorAll<HTMLElement>(".timeline-entry");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Label
    gsap.fromTo(
      sectionRef.current.querySelector(".exp-label"),
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p
        className="exp-label"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "48px",
          opacity: 0,
        }}
      >
        Experience
      </p>

      {/* Entries container — the continuous line lives here */}
      <div style={{ position: "relative" }}>

        {/* Single continuous vertical line */}
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            left: `${LINE_X}px`,
            top: "6px",
            bottom: 0,
            width: "1px",
            backgroundColor: "var(--border-strong)",
          }}
        />

        {entries.map((entry, i) => (
          <div
            key={i}
            className="timeline-entry"
            style={{
              display: "grid",
              gridTemplateColumns: `${DATE_COL}px 1fr`,
              gap: `${GAP}px`,
              marginBottom: i < entries.length - 1 ? "52px" : 0,
              opacity: 0,
              position: "relative",
            }}
          >
            {/* Date column */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-tertiary)",
                paddingTop: "5px",
                textAlign: "right",
                letterSpacing: "0.04em",
              }}
            >
              {entry.date}
            </div>

            {/* Content — sits to the right of the line */}
            <div style={{ paddingLeft: "24px", position: "relative" }}>
              {/* Dot on the line */}
              <div
                style={{
                  position: "absolute",
                  left: "-28px",     // pulls back to sit on the line (24px padding + 4px offset)
                  top: "5px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    i === 0 ? "var(--accent-brass)" : "var(--accent-navy)",
                  border: "2px solid var(--bg-primary)",
                  zIndex: 2,
                  boxShadow: i === 0 ? "0 0 0 3px rgba(193,125,60,0.18)" : "none",
                }}
              />

              {/* Company / role header */}
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "2px",
                }}
              >
                {entry.role}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "12px",
                  letterSpacing: "0.03em",
                }}
              >
                {entry.company} · {entry.location}
              </p>

              {/* Tags */}
              {entry.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "14px",
                  }}
                >
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-tertiary)",
                        border: "1px solid var(--border)",
                        padding: "2px 8px",
                        borderRadius: "2px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bullets */}
              {entry.bullets && (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {entry.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        marginBottom: "7px",
                        paddingLeft: "14px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--accent-brass)",
                          fontWeight: 400,
                        }}
                      >
                        —
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* Note */}
              {entry.note && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                  }}
                >
                  {entry.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-entry {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
          .timeline-entry > div:first-child {
            text-align: left !important;
            padding-bottom: 4px;
          }
        }
      `}</style>
    </section>
  );
}
