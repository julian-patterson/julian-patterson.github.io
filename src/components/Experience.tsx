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
    date: "May – Aug 2026",
    role: "AI Hub Intern",
    company: "Hapag-Lloyd",
    location: "Hamburg, Germany",
    tags: ["Agentic AI", "AI Governance", "Risk Modelling", "MCP", "Facilitation"],
    bullets: [
      "AI enablement at enterprise scale — designing intake and risk-assessment processes for agentic AI, and assessing platforms against real use cases",
      "Turning cross-functional working-group discussions into workflows people can actually follow, then carrying them through security, data-protection, and architecture review",
      "Working where the requirements are still forming, and presenting a technical position to senior stakeholders without losing the detail underneath it",
    ],
  },
  {
    date: "May 2025 – Present",
    role: "Founder & Chief Technology Officer",
    company: "Stride",
    location: "Montréal, QC",
    tags: ["React", "React Native", "TypeScript", "Supabase", "Stripe"],
    bullets: [
      "Architected and built most of a multi-tenant booking platform — web app, React Native mobile app, and backend",
      "Technical leadership: owning architecture and roadmap, reviewing code, and mentoring a team of three developers",
      "Depth in multi-tenant data isolation, concurrency-safe scheduling, payments, and a CI/CD pipeline where a failing end-to-end test stops the deploy",
      "Co-created the product's component library in Figma and implemented it, which taught me how much design decisions constrain engineering ones",
    ],
  },
  {
    date: "May 2024 – Mar 2026",
    role: "Software Developer",
    company: "Prime Freight Logistics",
    location: "Montréal, QC",
    tags: ["Node.js", "React", "Google Cloud", "Terraform", "Docker"],
    bullets: [
      "Backend and data engineering on internal tooling — pricing logic, document parsing, and automated reporting pipelines",
      "Serverless architecture on Google Cloud: a public API and an internal batch worker running from a single container image, decoupled by a task queue, with infrastructure defined in Terraform",
      "Learned to build parsers that adapt to messy, inconsistent input instead of breaking on it, and to make failures findable through logging and notifications",
    ],
    note: "Full-time summers 2024 and 2025; part-time through the 2025–26 academic year.",
  },
  {
    date: "2023 – Dec 2026",
    role: "B.Sc. Software Engineering, Minor in Statistics",
    company: "McGill University",
    location: "Montréal, QC",
    tags: [],
    type: "education",
    note:
      "Expected December 2026. Relevant coursework: Applied Machine Learning, Intro to Robotics, Data Structures, Probability & Statistics, Software Design, Discrete Mathematics. Technical Project Manager, McGill AI Society.",
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
