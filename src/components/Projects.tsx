"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "@carbon/icons-react";

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
    link: { label: "Live", href: "#" },
  },
  {
    name: "OpenClaw",
    description:
      "Self-hosted Raspberry Pi personal assistant. Claude API + Telegram interface with Strava, calendar, and task management integrations. Privacy-first: no persistent sensitive data.",
    stack: ["Node.js", "Claude API", "Raspberry Pi", "Telegram Bot API"],
    link: { label: "GitHub", href: "#" },
  },
  {
    name: "Transfer CLI",
    description:
      "Go CLI tool using Cobra, SSH, and Git for syncing and transferring repositories over Wi-Fi.",
    stack: ["Go", "Cobra", "SSH", "Git"],
    link: { label: "GitHub", href: "#" },
  },
  {
    name: "IoT LED Controller",
    description:
      "Centralized home lighting control system with RGB color management, REST API, and Docker deployment on Raspberry Pi.",
    stack: ["Rust", "Python", "FastAPI", "Docker"],
    link: { label: "GitHub", href: "#" },
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
        { opacity: 0, y: 16 },
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
          padding: "32px",
          marginBottom: "32px",
          display: "grid",
          gridTemplateColumns: "1fr 200px",
          gap: "48px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
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
                padding: "4px 10px",
                borderRadius: "0px",
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
                marginBottom: i < featuredProject.description.length - 1 ? "16px" : "24px",
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
              marginBottom: "24px",
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
                  padding: "4px 8px",
                  borderRadius: "0px",
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

        {/* Decorative Abstract Graph */}
        <div className="hidden-mobile" style={{ width: "200px", height: "200px", position: "relative" }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            {/* Edges */}
            <line x1="20" y1="50" x2="50" y2="20" stroke="rgba(28,28,26,0.15)" strokeWidth="1" />
            <line x1="50" y1="20" x2="80" y2="40" stroke="rgba(28,28,26,0.15)" strokeWidth="1" />
            <line x1="80" y1="40" x2="60" y2="80" stroke="rgba(28,28,26,0.15)" strokeWidth="1" />
            <line x1="60" y1="80" x2="30" y2="70" stroke="rgba(28,28,26,0.15)" strokeWidth="1" />
            <line x1="30" y1="70" x2="20" y2="50" stroke="rgba(28,28,26,0.15)" strokeWidth="1" />
            <line x1="50" y1="20" x2="60" y2="80" stroke="rgba(28,28,26,0.15)" strokeWidth="1" />
            <line x1="20" y1="50" x2="80" y2="40" stroke="rgba(28,28,26,0.15)" strokeWidth="1" />
            {/* Nodes */}
            <circle cx="20" cy="50" r="4" fill="var(--carbon-chart-cyan)" />
            <circle cx="50" cy="20" r="6" fill="var(--carbon-chart-magenta)" />
            <circle cx="80" cy="40" r="3" fill="var(--carbon-chart-cyan)" />
            <circle cx="60" cy="80" r="5" fill="var(--carbon-chart-cyan)" />
            <circle cx="30" cy="70" r="3.5" fill="var(--carbon-chart-magenta)" />
          </svg>
        </div>
      </div>

      {/* Standard cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
        className="projects-grid"
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="carbon-card project-card-anim"
            style={{
              opacity: 0,
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              cursor: "pointer",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
            onClick={() => window.open(project.link.href, "_blank")}
          >
            <div
              className="card-icon"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                opacity: 0,
                color: "var(--text-primary)",
                transition: "opacity 0.2s ease",
              }}
            >
              <ArrowUpRight size={20} />
            </div>

            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "8px",
                paddingRight: "32px",
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
                marginBottom: "24px",
                flex: 1,
              }}
            >
              {project.description}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {project.stack.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    border: "1px solid var(--border-subtle)",
                    padding: "4px 8px",
                    borderRadius: "0px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--accent-navy)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {project.link.label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
