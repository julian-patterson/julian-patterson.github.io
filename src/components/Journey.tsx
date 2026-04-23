"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

const stops = [
  {
    year: "2003",
    city: "Montréal",
    country: "CA",
    description: "Born and raised",
    type: "personal",
  },
  {
    year: "2023",
    city: "McGill University",
    country: "CA",
    description: "B.Sc. Software Engineering & Statistics",
    type: "academic",
  },
  {
    year: "2024",
    city: "Prime Freight",
    country: "CA",
    description: "Software Developer — first freight internship",
    type: "professional",
  },
  {
    year: "2025",
    city: "Montréal",
    country: "CA",
    description: "CTO, AnyTime Technologies. Final year at McGill.",
    type: "professional",
    current: true,
  },
  {
    year: "May 2026",
    city: "Hamburg",
    country: "DE",
    description: "AI & Analytics Intern — Hapag-Lloyd",
    type: "upcoming",
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isMobile = window.innerWidth < 768;

    // Line drawing animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // Stops reveal
    stopRefs.current.forEach((stop, i) => {
      if (!stop) return;
      gsap.fromTo(
        stop,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stop,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="journey"
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
          marginBottom: "64px",
        }}
      >
        Journey
      </p>

      {/* Desktop Timeline */}
      <div className="hidden-mobile" style={{ position: "relative", padding: "40px 0" }}>
        <svg
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "2px",
            transform: "translateY(-50%)",
            overflow: "visible",
          }}
        >
          <line
            ref={lineRef}
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="var(--border-strong)"
            strokeWidth="0.5"
          />
        </svg>

        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          {stops.map((stop, i) => (
            <div
              key={i}
              ref={(el) => { stopRefs.current[i] = el; }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "120px",
                opacity: 0,
              }}
            >
              {/* Dot */}
              <div style={{ height: "40px", display: "flex", alignItems: "center", marginBottom: "12px" }}>
                {stop.type === "personal" && (
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1px solid var(--text-tertiary)", backgroundColor: "white" }} />
                )}
                {stop.type === "academic" && (
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1px solid var(--accent-navy)", backgroundColor: "white" }} />
                )}
                {stop.type === "professional" && !stop.current && (
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--accent-navy)" }} />
                )}
                {stop.current && (
                  <div style={{ position: "relative" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent-navy)", zIndex: 2, position: "relative" }} />
                    <div className="pulse-dot" style={{ position: "absolute", top: "-4px", left: "-4px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--accent-navy)", opacity: 0.2 }} />
                  </div>
                )}
                {stop.type === "upcoming" && (
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.5px dashed var(--accent-brass)", backgroundColor: "white" }} />
                )}
              </div>

              {/* Text */}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: stop.type === "upcoming" ? "var(--accent-brass)" : "var(--text-tertiary)", marginBottom: "4px" }}>
                {stop.year}
              </span>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px" }}>
                {stop.type === "upcoming" ? `→ ${stop.city}` : stop.city}
              </h4>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: stop.type === "upcoming" ? "var(--accent-brass)" : "var(--text-secondary)", opacity: stop.type === "upcoming" ? 0.8 : 1, lineHeight: 1.4 }}>
                {stop.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="show-mobile" style={{ position: "relative", paddingLeft: "32px" }}>
        <div
          style={{
            position: "absolute",
            left: "11px",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "var(--border-strong)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {stops.map((stop, i) => (
            <div
              key={i}
              ref={(el) => { if (window.innerWidth < 768) stopRefs.current[i] = el; }}
              style={{ position: "relative", opacity: 0 }}
            >
              {/* Dot */}
              <div style={{ position: "absolute", left: "-26px", top: "4px", zIndex: 2 }}>
                {stop.type === "personal" && (
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1px solid var(--text-tertiary)", backgroundColor: "white" }} />
                )}
                {stop.type === "academic" && (
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1px solid var(--accent-navy)", backgroundColor: "white" }} />
                )}
                {stop.type === "professional" && !stop.current && (
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--accent-navy)" }} />
                )}
                {stop.current && (
                  <div style={{ position: "relative" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent-navy)", zIndex: 2, position: "relative" }} />
                    <div className="pulse-dot" style={{ position: "absolute", top: "-4px", left: "-4px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--accent-navy)", opacity: 0.2 }} />
                  </div>
                )}
                {stop.type === "upcoming" && (
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.5px dashed var(--accent-brass)", backgroundColor: "white" }} />
                )}
              </div>

              {/* Text */}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: stop.type === "upcoming" ? "var(--accent-brass)" : "var(--text-tertiary)", display: "block", marginBottom: "4px" }}>
                {stop.year}
              </span>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "4px" }}>
                {stop.type === "upcoming" ? `→ ${stop.city}` : stop.city}
              </h4>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: stop.type === "upcoming" ? "var(--accent-brass)" : "var(--text-secondary)", opacity: stop.type === "upcoming" ? 0.8 : 1, lineHeight: 1.4 }}>
                {stop.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .pulse-dot {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: block !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
