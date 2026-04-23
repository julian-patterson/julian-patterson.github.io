"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

const featuredProject = {
  name: "Freight Network Intelligence",
  status: "Research · In Progress",
  description: [
    "Graph-based freight rate forecasting system. Models global shipping lanes as a network where news sentiment and geopolitical events propagate as dynamic edge features — predicting rate impacts on specific lanes before they materialize in market data.",
    "The core insight: a conflict in the Red Sea doesn't only affect Suez Canal routes. It propagates outward with diminishing effect across connected lanes. A graph structure captures this naturally in a way that isolated time-series models cannot.",
  ],
  stack: ["PyTorch Geometric", "AIS Data", "SCFI", "NLP", "Python"],
  link: { label: "GitHub ↗", href: "#" },
};

const projects = [
  {
    name: "AnyTime Technologies",
    description:
      "Full-stack sports facility booking platform. Multi-tenant architecture, court scheduling, and payment processing.",
    stack: ["React", "Supabase", "GitHub Actions", "Docker"],
    link: { label: "Live ↗", href: "#" },
  },
  {
    name: "OpenClaw",
    description:
      "Self-hosted Raspberry Pi personal assistant. Claude API + Telegram interface with Strava, calendar, and task management integrations. Privacy-first: no persistent sensitive data.",
    stack: ["Node.js", "Claude API", "Raspberry Pi", "Telegram Bot API"],
    link: { label: "GitHub ↗", href: "#" },
  },
  {
    name: "Transfer CLI",
    description:
      "Go CLI tool using Cobra, SSH, and Git for syncing and transferring repositories over Wi-Fi.",
    stack: ["Go", "Cobra", "SSH", "Git"],
    link: { label: "GitHub ↗", href: "#" },
  },
  {
    name: "IoT LED Controller",
    description:
      "Centralized home lighting control system with RGB color management, REST API, and Docker deployment on Raspberry Pi.",
    stack: ["Rust", "Python", "FastAPI", "Docker"],
    link: { label: "GitHub ↗", href: "#" },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".project-card-anim");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "48px",
        }}
      >
        Projects
      </p>

      {/* Featured project */}
      <div
        className="project-card-anim"
        style={{
          opacity: 0,
          borderLeft: "4px solid var(--accent-navy)",
          backgroundColor: "var(--bg-accent-soft)",
          padding: "36px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              color: "var(--text-primary)",
            }}
          >
            {featuredProject.name}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--accent-navy)",
              backgroundColor: "var(--bg-accent-soft)",
              border: "1px solid rgba(27,58,92,0.2)",
              padding: "3px 10px",
              borderRadius: "2px",
            }}
          >
            {featuredProject.status}
          </span>
        </div>

        {featuredProject.description.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: i < featuredProject.description.length - 1 ? "14px" : "20px",
            }}
          >
            {p}
          </p>
        ))}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          {featuredProject.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--accent-navy)",
                border: "1px solid rgba(27,58,92,0.2)",
                padding: "3px 8px",
                borderRadius: "2px",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <a
          href={featuredProject.link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--accent-navy)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {featuredProject.link.label}
        </a>
      </div>

      {/* Standard cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
        className="projects-grid"
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="project-card project-card-anim"
            style={{
              opacity: 0,
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "10px",
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "16px",
                flex: 1,
              }}
            >
              {project.description}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              {project.stack.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    border: "1px solid var(--border)",
                    padding: "2px 7px",
                    borderRadius: "2px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--accent-navy)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {project.link.label}
            </a>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
