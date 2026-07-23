"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

export default function FreightExplainer() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Entrance animation
    gsap.fromTo(
      sectionRef.current.querySelector(".reveal"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for the diagram
    const svg = svgRef.current;
    if (svg) {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 80%",
        onEnter: () => {
          // SUEZ pulse animation is handled via CSS keyframes
          // Traveling dots animation
          const dots = svg.querySelectorAll(".travel-dot");
          dots.forEach((dot) => {
             gsap.to(dot, {
               motionPath: {
                 path: dot.getAttribute("data-path")!,
                 align: dot.getAttribute("data-path")!,
                 autoRotate: true,
               },
               duration: 3,
               repeat: -1,
               ease: "none",
             });
          });
        }
      });
    }
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "12px",
          marginBottom: "48px",
        }}
      >
        How It Works
      </p>

      <div
        className="reveal motion-reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "64px",
          alignItems: "start",
        }}
      >
        {/* Left Column */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              color: "var(--text-primary)",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            The network knows first.
          </h2>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "40px",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              A conflict near Suez doesn&apos;t only affect that route. The disruption
              propagates through the shipping network — rerouting vessels, shifting
              capacity, cascading into rate changes on lanes you wouldn&apos;t expect.
            </p>
            <p>
              Standard time-series models treat each lane in isolation. A graph
              structure captures the contagion.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
            {[
              "An event hits a node — a port or chokepoint — in the network",
              "The signal propagates to connected lanes with diminishing strength",
              "The model surfaces rate impact before it appears in market indices",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-navy)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["PyTorch Geometric", "Graph Neural Networks", "AIS Data", "SCFI Index", "NLP"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--accent-navy)",
                  border: "1px solid rgba(27,58,92,0.2)",
                  padding: "3px 8px",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column — SVG Diagram */}
        <div style={{ width: "100%" }}>
          <svg
            ref={svgRef}
            viewBox="0 0 340 340"
            style={{ width: "100%", height: "auto", overflow: "visible" }}
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Edges */}
            <g>
              {/* YUL -> HAM */}
              <line x1="40" y1="60" x2="170" y2="40" stroke="var(--accent-navy)" strokeWidth="1.5" />
              {/* HAM -> SHA */}
              <line x1="170" y1="40" x2="300" y2="60" stroke="var(--accent-navy)" strokeWidth="1.5" />
              {/* SHA -> SGP */}
              <line x1="300" y1="60" x2="320" y2="220" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
              {/* SUEZ -> HAM */}
              <path id="path-suez-ham" d="M170,170 L170,40" fill="none" stroke="var(--accent-brass)" strokeWidth="1.2" />
              {/* SUEZ -> DXB */}
              <path id="path-suez-dxb" d="M170,170 L280,240" fill="none" stroke="var(--accent-brass)" strokeWidth="1.2" />
              {/* SUEZ -> SHA */}
              <line x1="170" y1="170" x2="300" y2="60" stroke="var(--accent-brass)" strokeWidth="1.2" strokeDasharray="4 3" />
              {/* DXB -> SGP */}
              <line x1="280" y1="240" x2="320" y2="220" stroke="var(--accent-brass)" strokeWidth="1" opacity="0.6" />
              {/* NYC -> HAM */}
              <line x1="60" y1="220" x2="170" y2="40" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
              {/* LAX -> SHA */}
              <line x1="30" y1="140" x2="300" y2="60" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
              {/* YUL -> NYC */}
              <line x1="40" y1="60" x2="60" y2="220" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
            </g>

            {/* Traveling dots */}
            <circle className="travel-dot" r="2.5" fill="var(--accent-brass)" style={{ offsetPath: 'path("M170,170 L170,40")', animation: 'travel 3s linear infinite' }} />
            <circle className="travel-dot" r="2.5" fill="var(--accent-brass)" style={{ offsetPath: 'path("M170,170 L280,240")', animation: 'travel 3s linear infinite 1.5s' }} />

            {/* Nodes */}
            <g>
              {/* LAX */}
              <circle cx="30" cy="140" r="4" fill="var(--bg-primary)" stroke="var(--text-tertiary)" strokeWidth="1" />
              <text x="30" y="130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-tertiary)">LAX</text>

              {/* YUL */}
              <circle cx="40" cy="60" r="5" fill="var(--accent-navy)" />
              <text x="40" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">YUL</text>

              {/* NYC */}
              <circle cx="60" cy="220" r="4" fill="var(--bg-primary)" stroke="var(--accent-brass)" strokeWidth="1" opacity="0.6" />
              <text x="60" y="235" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-tertiary)">NYC</text>

              {/* HAM */}
              <circle cx="170" cy="40" r="5" fill="var(--accent-navy)" />
              <text x="170" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">HAM</text>

              {/* SUEZ */}
              <g className="node-event">
                <circle cx="170" cy="170" r="12" fill="var(--accent-brass)" opacity="0.2" className="pulse-ring" />
                <circle cx="170" cy="170" r="6" fill="var(--accent-brass)" />
                <text x="170" y="190" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent-brass)" fontWeight="bold">SUEZ</text>
              </g>

              {/* SHA */}
              <circle cx="300" cy="60" r="4" fill="var(--bg-primary)" stroke="var(--text-tertiary)" strokeWidth="1" />
              <text x="300" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-tertiary)">SHA</text>

              {/* DXB */}
              <circle cx="280" cy="240" r="5" fill="var(--bg-primary)" stroke="var(--accent-brass)" strokeWidth="1.5" className="affected-pulse" />
              <text x="280" y="255" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">DXB</text>

              {/* SGP */}
              <circle cx="320" cy="220" r="4" fill="var(--bg-primary)" stroke="var(--accent-brass)" strokeWidth="1" opacity="0.6" />
              <text x="320" y="235" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-tertiary)">SGP</text>
            </g>
          </svg>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "24px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-tertiary)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-navy)" }}></span>
              active lane
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-brass)" }}></span>
              event propagation
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", border: "1px solid var(--text-tertiary)" }}></span>
              monitoring
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
