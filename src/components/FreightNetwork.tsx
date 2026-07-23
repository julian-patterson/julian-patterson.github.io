"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Data -----------------------------------------------------------------

interface Port {
  id: string;
  label: string;
  city: string;
  x: number;
  y: number;
}

interface Route {
  id: string;
  from: string;
  to: string;
  // Quadratic bezier: P0 → CP → P2
  cp: { x: number; y: number };
  durationSec: number;
  highlight?: boolean; // Julian's personal route
}

const W = 760;
const H = 340;

const ports: Port[] = [
  { id: "LAX", label: "LAX", city: "Los Angeles",  x: 42,  y: 168 },
  { id: "YUL", label: "YUL", city: "Montréal",     x: 148, y: 112 },
  { id: "NYC", label: "NYC", city: "New York",      x: 172, y: 140 },
  { id: "HAM", label: "HAM", city: "Hamburg",       x: 408, y: 86  },
  { id: "DXB", label: "DXB", city: "Dubai",         x: 538, y: 204 },
  { id: "SGP", label: "SGP", city: "Singapore",     x: 678, y: 298 },
  { id: "SHA", label: "SHA", city: "Shanghai",      x: 725, y: 176 },
];

const routes: Route[] = [
  // Trans-Pacific
  { id: "lax-sha",  from: "LAX", to: "SHA", cp: { x: 383, y: -18 }, durationSec: 11 },
  // Trans-Atlantic
  { id: "yul-ham",  from: "YUL", to: "HAM", cp: { x: 278, y: 48  }, durationSec: 8,  highlight: true },
  { id: "nyc-ham",  from: "NYC", to: "HAM", cp: { x: 290, y: 76  }, durationSec: 9  },
  // Europe → Middle East (Suez)
  { id: "ham-dxb",  from: "HAM", to: "DXB", cp: { x: 473, y: 145 }, durationSec: 7,  highlight: true },
  // Middle East → Asia
  { id: "dxb-sha",  from: "DXB", to: "SHA", cp: { x: 631, y: 190 }, durationSec: 6,  highlight: true },
  { id: "dxb-sgp",  from: "DXB", to: "SGP", cp: { x: 608, y: 251 }, durationSec: 7  },
  { id: "sgp-sha",  from: "SGP", to: "SHA", cp: { x: 701, y: 237 }, durationSec: 5  },
];

// Quadratic bezier interpolation
function qBez(t: number, p0: {x:number;y:number}, cp: {x:number;y:number}, p2: {x:number;y:number}) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * cp.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * cp.y + t * t * p2.y,
  };
}

function pathD(route: Route) {
  const p0 = ports.find(p => p.id === route.from)!;
  const p2 = ports.find(p => p.id === route.to)!;
  return `M${p0.x},${p0.y} Q${route.cp.x},${route.cp.y} ${p2.x},${p2.y}`;
}

// Rough continent silhouettes (artistic, not cartographic)
const continents = [
  // North America
  "M 0,88 Q 60,60 148,70 L 200,50 L 208,88 L 185,140 L 172,165 L 152,195 L 120,215 L 88,212 L 55,192 L 28,168 L 0,145 Z",
  // South America
  "M 148,215 L 205,210 L 232,248 L 238,315 L 215,338 L 185,338 L 160,310 L 148,268 Z",
  // Europe
  "M 358,32 L 440,28 L 468,58 L 450,88 L 425,98 L 398,92 L 370,82 L 355,60 Z",
  // Africa
  "M 375,100 L 458,95 L 495,112 L 515,165 L 518,255 L 496,312 L 458,332 L 428,320 L 396,288 L 380,242 L 372,172 L 375,118 Z",
  // Asia (Eurasia merged roughly)
  "M 445,28 L 635,18 L 760,32 L 760,92 L 745,152 L 725,195 L 698,290 L 672,298 L 650,272 L 622,238 L 598,220 L 562,245 L 538,215 L 510,165 L 495,112 L 468,88 L 445,28 Z",
];

export default function FreightNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const vesselRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const pulseRef = useRef<SVGCircleElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    // --- Draw-on animation for each route path ---
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          // Draw paths in
          routes.forEach((route, i) => {
            const el = pathRefs.current.get(route.id);
            if (!el) return;
            const len = el.getTotalLength();
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(el, {
              strokeDashoffset: 0,
              duration: 1.4,
              ease: "power2.inOut",
              delay: i * 0.12,
            });
          });

          // Fade in ports
          gsap.fromTo(
            svgRef.current!.querySelectorAll(".port-group"),
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.07, delay: 0.4 }
          );

          // Start vessels after paths draw in
          gsap.delayedCall(1.8, startVessels);

          // Start propagation pulse loop
          gsap.delayedCall(3.5, triggerPulse);
        },
      });

      // Section text reveal
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".fn-reveal"),
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      tweensRef.current.forEach(t => t.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startVessels() {
    routes.forEach((route) => {
      const el = vesselRefs.current.get(route.id);
      if (!el) return;
      const p0 = ports.find(p => p.id === route.from)!;
      const p2 = ports.find(p => p.id === route.to)!;
      const obj = { t: 0 };
      const tween = gsap.to(obj, {
        t: 1,
        duration: route.durationSec,
        ease: "none",
        repeat: -1,
        repeatDelay: 0.5,
        delay: Math.random() * route.durationSec,
        onUpdate: () => {
          const pos = qBez(obj.t, p0, route.cp, p2);
          el.setAttribute("cx", String(pos.x));
          el.setAttribute("cy", String(pos.y));
          el.setAttribute("opacity", obj.t > 0.02 && obj.t < 0.98 ? "1" : "0");
        },
      });
      tweensRef.current.push(tween);
    });
  }

  function triggerPulse() {
    const el = pulseRef.current;
    if (!el) return;
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 6,
    });
    // Pulse emanates from Suez/Red Sea area
    tl.set(el, { cx: 475, cy: 155, r: 5, opacity: 0.9 });
    tl.to(el, { r: 32, opacity: 0, duration: 1.2, ease: "power2.out" });

    // Flash adjacent routes briefly in brass
    const affectedRoutes = ["ham-dxb", "dxb-sha", "dxb-sgp"];
    affectedRoutes.forEach((id, i) => {
      const pathEl = pathRefs.current.get(id);
      if (!pathEl) return;
      tl.to(pathEl, { stroke: "var(--accent-brass)", duration: 0.3, ease: "none" }, `+=${i * 0.15}`);
      tl.to(pathEl, { stroke: "var(--accent-navy)", duration: 0.8, ease: "power2.out" }, "+=0.4");
    });
  }

  return (
    <section
      id="freight-network"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        backgroundColor: "var(--bg-accent-soft)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "32px",
            alignItems: "end",
            marginBottom: "40px",
          }}
          className="fn-header-grid"
        >
          <div>
            <p
              className="fn-reveal"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-tertiary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
                opacity: 0,
              }}
            >
              Research · Freight Network Intelligence
            </p>
            <h2
              className="fn-reveal"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                color: "var(--text-primary)",
                lineHeight: 1.15,
                marginBottom: "16px",
                opacity: 0,
              }}
            >
              The network knows first.
            </h2>
            <p
              className="fn-reveal"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: "520px",
                opacity: 0,
              }}
            >
              A conflict near Suez doesn&apos;t only affect that route — it propagates
              outward through the network with diminishing effect. Watch the{" "}
              <span style={{ color: "var(--accent-brass)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                amber pulse
              </span>{" "}
              — that&apos;s the event model. Graph structure captures contagion that
              time-series models miss entirely.
            </p>
          </div>

          {/* Legend */}
          <div
            className="fn-reveal"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-tertiary)",
              lineHeight: 2,
              opacity: 0,
            }}
          >
            {[
              { color: "var(--accent-navy)", label: "Active lane", opacity: 1 },
              { color: "var(--accent-navy)", label: "YUL → HAM → SHA", opacity: 0.5, thick: true },
              { color: "var(--accent-brass)", label: "Event propagation", opacity: 1 },
            ].map(({ color, label, thick }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: thick ? "2px" : "1px",
                    backgroundColor: color,
                  }}
                />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* SVG Map */}
        <div
          className="fn-reveal"
          style={{
            opacity: 0,
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: "100%", display: "block" }}
            aria-label="Global freight network visualization"
          >
            {/* Subtle dot grid */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="0.8" fill="var(--text-tertiary)" opacity="0.25" />
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#grid)" />

            {/* Continent fills */}
            {continents.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="var(--text-secondary)"
                fillOpacity={0.055}
                stroke="none"
              />
            ))}

            {/* Route paths */}
            {routes.map((route) => (
              <path
                key={route.id}
                ref={(el) => { if (el) pathRefs.current.set(route.id, el); }}
                d={pathD(route)}
                fill="none"
                stroke="var(--accent-navy)"
                strokeWidth={route.highlight ? 1.5 : 0.8}
                strokeOpacity={route.highlight ? 0.7 : 0.35}
                strokeDasharray="4 0" // will be overridden by GSAP
              />
            ))}

            {/* Propagation pulse */}
            <circle
              ref={pulseRef}
              cx={475}
              cy={155}
              r={5}
              fill="none"
              stroke="var(--accent-brass)"
              strokeWidth={1.5}
              opacity={0}
            />

            {/* Vessels */}
            {routes.map((route) => (
              <circle
                key={`v-${route.id}`}
                ref={(el) => { if (el) vesselRefs.current.set(route.id, el); }}
                cx={ports.find(p => p.id === route.from)!.x}
                cy={ports.find(p => p.id === route.from)!.y}
                r={route.highlight ? 2.5 : 1.8}
                fill={route.highlight ? "var(--accent-navy)" : "var(--accent-brass)"}
                opacity={0}
              />
            ))}

            {/* Port markers */}
            {ports.map((port) => {
              const isHov = hoveredPort === port.id;
              const isJulian = port.id === "YUL" || port.id === "HAM" || port.id === "SHA";
              return (
                <g
                  key={port.id}
                  className="port-group"
                  style={{ cursor: "default", opacity: 0 }}
                  onMouseEnter={() => setHoveredPort(port.id)}
                  onMouseLeave={() => setHoveredPort(null)}
                >
                  {/* Outer ring for Julian's ports */}
                  {isJulian && (
                    <circle
                      cx={port.x}
                      cy={port.y}
                      r={isHov ? 10 : 8}
                      fill="none"
                      stroke="var(--accent-navy)"
                      strokeWidth={0.8}
                      strokeOpacity={0.3}
                      style={{ transition: "r 0.15s ease" }}
                    />
                  )}
                  {/* Main dot */}
                  <circle
                    cx={port.x}
                    cy={port.y}
                    r={isHov ? 5 : isJulian ? 4 : 3}
                    fill={isJulian ? "var(--accent-navy)" : "var(--bg-surface)"}
                    stroke="var(--accent-navy)"
                    strokeWidth={1}
                    style={{ transition: "r 0.15s ease" }}
                  />
                  {/* Label */}
                  <text
                    x={port.x}
                    y={port.y - 10}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    fill={isJulian ? "var(--accent-navy)" : "var(--text-tertiary)"}
                    fontWeight={isJulian ? "500" : "400"}
                  >
                    {port.label}
                  </text>
                  {/* Tooltip on hover */}
                  {isHov && (
                    <text
                      x={port.x}
                      y={port.y + 18}
                      textAnchor="middle"
                      fontFamily="var(--font-mono)"
                      fontSize="8"
                      fill="var(--text-secondary)"
                    >
                      {port.city}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Suez label */}
            <text
              x={475}
              y={148}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="7.5"
              fill="var(--accent-brass)"
              opacity={0.6}
            >
              SUEZ
            </text>
          </svg>
        </div>

        {/* Stack labels */}
        <div
          className="fn-reveal"
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          {["PyTorch Geometric", "AIS Data", "SCFI Index", "NLP", "Graph Neural Networks"].map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--accent-navy)",
                border: "1px solid rgba(27,58,92,0.25)",
                padding: "3px 9px",
                borderRadius: "2px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
