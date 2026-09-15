"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TextScramble from "./TextScramble";

const featuredProject = {
  name: "Stride",
  status: "Founder & CTO · Open beta",
  description: [
    "Sports facility booking platform — web, mobile, and an operator console for the staff who run the courts. Multi-tenant from the database up, with real-time availability and payment at booking.",
    "I architected and built most of it, and lead the engineering side: multi-tenant data isolation, a scheduling engine that will not let bookings overlap, Stripe payments, and a deploy pipeline gated on end-to-end tests.",
  ],
  stack: ["React", "React Native", "TypeScript", "Supabase", "Stripe"],
  link: { label: "strideapp.ca", href: "https://strideapp.ca" },
};

const projects = [
  {
    name: "Transfer CLI",
    description:
      "Go CLI tool using Cobra, SSH, and Git for syncing and transferring repositories over Wi-Fi.",
    stack: ["Go", "Cobra", "SSH", "Git"],
  },
  {
    name: "IoT LED Controller",
    description:
      "Centralized home lighting control system with RGB color management, REST API, and Docker deployment on Raspberry Pi.",
    stack: ["Rust", "Python", "FastAPI", "Docker"],
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
        <TextScramble text="Projects" className="section-kicker" />
      </p>

      {/* Featured project */}
      <div
        className="project-card-anim motion-reveal"
        style={{
          borderLeft: "4px solid var(--accent-navy)",
          backgroundColor: "var(--bg-accent-soft)",
          padding: "32px",
          marginBottom: "32px",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
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
      </div>

      {/* Standard cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
        }}
        className="projects-grid"
      >
        {projects.map((project) => (
          <article
            key={project.name}
            className="project-card-anim motion-reveal"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
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
                color: "var(--text-tertiary)",
              }}
            >
              Public link pending
            </span>
          </article>
        ))}
      </div>

    </section>
  );
}
