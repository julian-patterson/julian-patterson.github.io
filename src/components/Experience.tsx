"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "@carbon/icons-react";
import TextScramble from "./TextScramble";

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
    date: "2026",
    role: "AI Hub Intern",
    company: "Hapag-Lloyd",
    location: "Hamburg, Germany",
    tags: ["Artificial Intelligence", "Logistics"],
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
      "Collaborated with four developers, business teams, and clients to gather requirements, resolve issues, and test releases in development and production",
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
      "Built booking workflows for facility data, court availability, and reservation processing with React and Supabase",
      "Implemented CI/CD pipelines via GitHub Actions for automated deployment",
      "Led backend architecture decisions and established the platform's multi-tenant infrastructure",
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
        { opacity: 0, y: 16 },
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
      { opacity: 0, y: 16 },
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
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <p
        className="exp-label motion-reveal"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "48px",
        }}
      >
        <TextScramble text="Experience" className="section-kicker" />
      </p>

      {/* Entries container — the continuous line lives here */}
      <div className="experience-timeline">

        {/* Single continuous vertical line */}
        <div
          ref={lineRef}
          className="timeline-line"
          aria-hidden="true"
        />

        {entries.map((entry, i) => (
          <div
            key={i}
            className="timeline-entry motion-reveal"
          >
            {/* Date column */}
            <div
              className="timeline-date"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-tertiary)",
                paddingTop: "4px",
                letterSpacing: "0.04em",
              }}
            >
              {entry.date}
            </div>

            {/* Marker and line share the same dedicated grid column. */}
            <div
              className="timeline-node"
              aria-hidden="true"
              style={{
                backgroundColor:
                  i === 0 ? "var(--accent-brass)" : "var(--accent-navy)",
              }}
            />

            {/* Content — sits to the right of the line */}
            <div className="timeline-content">
              {/* Company / role header */}
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                {entry.role}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "16px",
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
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-tertiary)",
                        border: "1px solid var(--border-subtle)",
                        backgroundColor: "var(--bg-surface)",
                        padding: "4px 8px",
                        borderRadius: "0px",
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
                        marginBottom: "8px",
                        paddingLeft: "24px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "4px",
                          color: "var(--accent-navy)",
                        }}
                      >
                        <ArrowRight size={12} />
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

    </section>
  );
}
