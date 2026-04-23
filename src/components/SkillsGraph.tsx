"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Types ─────────────────────────────────────────────────────────────────

type CategoryId = "languages" | "ml" | "infra" | "frontend" | "domain";

interface NodeDatum extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  category: CategoryId;
  weight: 1 | 2 | 3;
}

interface EdgeDatum extends d3.SimulationLinkDatum<NodeDatum> {
  strength: 1 | 2 | 3;
}

// ── Design tokens ─────────────────────────────────────────────────────────

const CAT_COLORS: Record<CategoryId, string> = {
  languages: "#1B3A5C",
  ml: "#2D6A4F",
  infra: "#5C4A1B",
  frontend: "#4A1B5C",
  domain: "#C17D3C",
};

const CAT_LABELS: Record<CategoryId, string> = {
  languages: "Languages",
  ml: "Data & ML",
  infra: "Infrastructure",
  frontend: "Frontend",
  domain: "Domain",
};

function nodeRadius(w: 1 | 2 | 3) {
  return w === 3 ? 10 : w === 2 ? 7 : 5;
}

// ── Graph data ─────────────────────────────────────────────────────────────

const RAW_NODES: Omit<NodeDatum, keyof d3.SimulationNodeDatum>[] = [
  // Languages
  { id: "python", label: "Python", category: "languages", weight: 3 },
  { id: "typescript", label: "TypeScript", category: "languages", weight: 3 },
  { id: "javascript", label: "JavaScript", category: "languages", weight: 3 },
  { id: "sql", label: "SQL", category: "languages", weight: 2 },
  { id: "go", label: "Go", category: "languages", weight: 2 },
  { id: "rust", label: "Rust", category: "languages", weight: 1 },

  // Data & ML
  { id: "pytorch", label: "PyTorch", category: "ml", weight: 2 },
  { id: "pyg", label: "PyTorch Geometric", category: "ml", weight: 2 },
  { id: "sklearn", label: "scikit-learn", category: "ml", weight: 2 },
  { id: "pandas", label: "Pandas / NumPy", category: "ml", weight: 2 },
  { id: "nlp", label: "NLP", category: "ml", weight: 2 },
  { id: "gnn", label: "Graph Neural Nets", category: "ml", weight: 2 },
  { id: "ais", label: "AIS Data", category: "ml", weight: 1 },
  { id: "scfi", label: "SCFI Index", category: "ml", weight: 1 },

  // Infrastructure
  { id: "docker", label: "Docker", category: "infra", weight: 3 },
  { id: "aws", label: "AWS", category: "infra", weight: 2 },
  { id: "github", label: "GitHub Actions", category: "infra", weight: 2 },
  { id: "supabase", label: "Supabase", category: "infra", weight: 2 },
  { id: "linux", label: "Linux / Bash", category: "infra", weight: 2 },
  { id: "rest", label: "REST APIs", category: "infra", weight: 2 },

  // Frontend
  { id: "react", label: "React", category: "frontend", weight: 3 },
  { id: "nextjs", label: "Next.js", category: "frontend", weight: 3 },
  { id: "tailwind", label: "Tailwind CSS", category: "frontend", weight: 2 },
  { id: "gsap", label: "GSAP", category: "frontend", weight: 2 },
  { id: "reactnative", label: "React Native", category: "frontend", weight: 2 },

  // Domain
  { id: "freight", label: "Freight Forwarding", category: "domain", weight: 3 },
  { id: "contracts", label: "Carrier Contracts", category: "domain", weight: 2 },
  { id: "logistics", label: "Container Logistics", category: "domain", weight: 2 },
  { id: "payment", label: "Payment Processing", category: "domain", weight: 1 },
];

const RAW_EDGES: { source: string; target: string; strength: 1 | 2 | 3 }[] = [
  // Language → framework dependencies
  { source: "python", target: "pytorch", strength: 3 },
  { source: "python", target: "pandas", strength: 3 },
  { source: "python", target: "sklearn", strength: 3 },
  { source: "python", target: "nlp", strength: 2 },
  { source: "python", target: "rest", strength: 2 },
  { source: "typescript", target: "react", strength: 3 },
  { source: "typescript", target: "nextjs", strength: 3 },
  { source: "javascript", target: "react", strength: 3 },
  { source: "javascript", target: "nextjs", strength: 2 },
  { source: "rust", target: "docker", strength: 1 },
  { source: "go", target: "rest", strength: 2 },
  { source: "sql", target: "supabase", strength: 3 },

  // ML internal connections
  { source: "pytorch", target: "pyg", strength: 3 },
  { source: "pytorch", target: "gnn", strength: 3 },
  { source: "pyg", target: "gnn", strength: 3 },
  { source: "pandas", target: "sklearn", strength: 2 },
  { source: "nlp", target: "gnn", strength: 2 },
  { source: "ais", target: "gnn", strength: 2 },
  { source: "scfi", target: "gnn", strength: 2 },
  { source: "ais", target: "freight", strength: 3 },
  { source: "scfi", target: "freight", strength: 3 },

  // Infrastructure connections
  { source: "docker", target: "aws", strength: 2 },
  { source: "docker", target: "github", strength: 2 },
  { source: "docker", target: "linux", strength: 2 },
  { source: "supabase", target: "react", strength: 2 },
  { source: "github", target: "nextjs", strength: 2 },
  { source: "aws", target: "python", strength: 1 },
  { source: "rest", target: "react", strength: 2 },

  // Frontend connections
  { source: "react", target: "nextjs", strength: 3 },
  { source: "react", target: "reactnative", strength: 3 },
  { source: "react", target: "tailwind", strength: 2 },
  { source: "nextjs", target: "tailwind", strength: 2 },
  { source: "nextjs", target: "gsap", strength: 2 },

  // Domain bridges (connects domain knowledge to technical stack)
  { source: "freight", target: "logistics", strength: 3 },
  { source: "freight", target: "contracts", strength: 3 },
  { source: "logistics", target: "python", strength: 1 },
  { source: "logistics", target: "sql", strength: 1 },
  { source: "contracts", target: "nlp", strength: 2 },
  { source: "payment", target: "supabase", strength: 2 },
  { source: "payment", target: "react", strength: 1 },
];

// Build adjacency map from raw edge IDs
const ADJACENCY = new Map<string, Set<string>>();
RAW_NODES.forEach((n) => ADJACENCY.set(n.id, new Set()));
RAW_EDGES.forEach((e) => {
  ADJACENCY.get(e.source)?.add(e.target);
  ADJACENCY.get(e.target)?.add(e.source);
});

// ── Component ─────────────────────────────────────────────────────────────

export default function SkillsGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<d3.Simulation<NodeDatum, EdgeDatum> | null>(null);
  const nodeElsRef = useRef<d3.Selection<SVGGElement, NodeDatum, SVGGElement, unknown> | null>(null);
  const linkElsRef = useRef<d3.Selection<SVGLineElement, EdgeDatum, SVGGElement, unknown> | null>(null);
  const edgesRevealedRef = useRef(false);
  const startedRef = useRef(false);

  const [activeLegend, setActiveLegend] = useState<CategoryId | null>(null);

  // ── Apply legend highlight via D3 ──────────────────────────────────────
  useEffect(() => {
    const nodeEls = nodeElsRef.current;
    const linkEls = linkElsRef.current;
    if (!nodeEls || !linkEls) return;

    if (activeLegend === null) {
      nodeEls
        .attr("opacity", 1)
        .select("circle")
        .attr("stroke", (d: NodeDatum) => CAT_COLORS[d.category] + "99")
        .attr("stroke-width", 1.5);
      nodeEls.select<SVGTextElement>("text").attr("fill", "#5A5855");
      if (edgesRevealedRef.current) {
        linkEls.attr("opacity", 1).attr("stroke", "rgba(28,28,26,0.12)").attr("stroke-width", 1);
      }
    } else {
      nodeEls
        .attr("opacity", (d: NodeDatum) => (d.category === activeLegend ? 1 : 0.12))
        .select("circle")
        .attr("stroke", (d: NodeDatum) =>
          d.category === activeLegend ? CAT_COLORS[d.category] : CAT_COLORS[d.category] + "99"
        )
        .attr("stroke-width", (d: NodeDatum) => (d.category === activeLegend ? 2 : 1.5));
      nodeEls
        .select<SVGTextElement>("text")
        .attr("fill", (d: NodeDatum) =>
          d.category === activeLegend ? "#1C1C1A" : "rgba(28,28,26,0.2)"
        );
      if (edgesRevealedRef.current) {
        linkEls
          .attr("opacity", (e: EdgeDatum) => {
            const s = (e.source as NodeDatum).category;
            const t = (e.target as NodeDatum).category;
            return s === activeLegend && t === activeLegend ? 1 : 0.05;
          })
          .attr("stroke-width", 1);
      }
    }
  }, [activeLegend]);

  // ── Graph initializer ────────────────────────────────────────────────────
  const initGraph = useCallback(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl || startedRef.current) return;
    startedRef.current = true;

    const isMobile = window.innerWidth < 768;
    const VW = 800;
    const VH = isMobile ? 380 : 520;

    // Filter weight-1 nodes on mobile, and start all at exact center
    const nodes: NodeDatum[] = RAW_NODES
      .filter((n) => !isMobile || n.weight > 1)
      .map((n) => ({
        ...n,
        x: VW / 2,
        y: VH / 2,
      }));

    const nodeIds = new Set(nodes.map((n) => n.id));
    const edges: EdgeDatum[] = RAW_EDGES
      .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map((e) => ({ ...e }));

    // ── SVG setup ──────────────────────────────────────────────────────────
    const svg = d3
      .select(svgEl)
      .attr("viewBox", `0 0 ${VW} ${VH}`)
      .attr("width", "100%")
      .attr("height", VH)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove();
    edgesRevealedRef.current = false;

    // Zoom group
    const g = svg.append("g").attr("class", "zoom-g");

    // ── Zoom / pan ─────────────────────────────────────────────────────────
    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .filter((event) => {
        if (event.type === "mousedown") return false;
        return !event.button;
      })
      .on("zoom", (event) => g.attr("transform", event.transform));

    svg.call(zoomBehavior);
    svg.on("dblclick.zoom", () =>
      svg.transition().duration(350).call(zoomBehavior.transform, d3.zoomIdentity)
    );

    // Hint label
    const hintText = svg
      .append("text")
      .attr("x", VW - 10)
      .attr("y", VH - 8)
      .attr("text-anchor", "end")
      .attr("font-family", "var(--font-mono)")
      .attr("font-size", "10")
      .attr("fill", "var(--text-tertiary)")
      .attr("pointer-events", "none")
      .text("scroll to zoom · drag to pan");

    setTimeout(() => {
      hintText.transition().duration(700).attr("opacity", 0);
    }, 3000);

    // ── Cluster force ──────────────────────────────────────────────────────
    const centroids: Record<CategoryId, { x: number; y: number }> = {
      languages: { x: VW * 0.25, y: VH * 0.28 },
      ml: { x: VW * 0.72, y: VH * 0.28 },
      infra: { x: VW * 0.72, y: VH * 0.72 },
      frontend: { x: VW * 0.25, y: VH * 0.72 },
      domain: { x: VW * 0.5, y: VH * 0.5 },
    };

    const clusterForceFn = Object.assign(
      (alpha: number) => {
        nodes.forEach((node) => {
          const c = centroids[node.category];
          node.vx! += (c.x - node.x!) * alpha * 0.08;
          node.vy! += (c.y - node.y!) * alpha * 0.08;
        });
      },
      { initialize: () => {} }
    ) as d3.Force<NodeDatum, EdgeDatum>;

    // ── Simulation ─────────────────────────────────────────────────────────
    const simulation = d3
      .forceSimulation<NodeDatum, EdgeDatum>(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeDatum, EdgeDatum>(edges)
          .id((d) => d.id)
          .distance((d) => (d.strength === 3 ? 60 : d.strength === 2 ? 90 : 130))
          .strength((d) => (d.strength === 3 ? 0.8 : d.strength === 2 ? 0.4 : 0.15))
      )
      .force("charge", d3.forceManyBody<NodeDatum>().strength(-180))
      .force("center", d3.forceCenter(VW / 2, VH / 2))
      .force(
        "collision",
        d3.forceCollide<NodeDatum>().radius((d) => nodeRadius(d.weight) + 20)
      )
      .force("cluster", clusterForceFn)
      .alphaDecay(0.02);

    simRef.current = simulation;

    // ── Edges ──────────────────────────────────────────────────────────────
    const linkGroup = g.append("g");
    const linkEls = linkGroup
      .selectAll<SVGLineElement, EdgeDatum>("line")
      .data(edges)
      .join("line")
      .attr("stroke", "rgba(28,28,26,0.12)")
      .attr("stroke-width", 1)
      .attr("opacity", 0);

    linkElsRef.current = linkEls;

    // ── Nodes ──────────────────────────────────────────────────────────────
    const nodeGroup = g.append("g");
    const nodeEls = nodeGroup
      .selectAll<SVGGElement, NodeDatum>("g.node")
      .data(nodes)
      .join("g")
      .attr("class", (d) => `node w${d.weight}`)
      .attr("cursor", "pointer")
      .style("transition", "opacity 0.2s ease");

    nodeEls
      .append("circle")
      .attr("r", (d) => nodeRadius(d.weight))
      .attr("fill", "#FFFFFF")
      .attr("stroke", (d) => CAT_COLORS[d.category] + "99")
      .attr("stroke-width", 1.5)
      .style("transition", "stroke 0.2s ease, stroke-width 0.2s ease, transform 0.2s ease");

    nodeEls
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => nodeRadius(d.weight) + 12)
      .attr("font-family", "var(--font-mono)")
      .attr("font-size", (d) => (d.weight === 3 ? "11" : "10"))
      .attr("fill", "#5A5855")
      .attr("pointer-events", "none")
      .style("transition", "fill 0.2s ease")
      .text((d) => d.label);

    nodeElsRef.current = nodeEls;

    // ── Interaction ────────────────────────────────────────────────────────
    nodeEls
      .on("mouseenter", function (_event, d) {
        const neighbors = ADJACENCY.get(d.id) ?? new Set<string>();

        nodeEls.attr("opacity", (n) => (n.id === d.id || neighbors.has(n.id) ? 1 : 0.12));

        nodeEls
          .select<SVGCircleElement>("circle")
          .attr("stroke", (n) =>
            n.id === d.id || neighbors.has(n.id)
              ? CAT_COLORS[n.category]
              : CAT_COLORS[n.category] + "99"
          )
          .attr("stroke-width", (n) => (n.id === d.id ? 2 : 1.5))
          .style("transform", (n) => (n.id === d.id ? "scale(1.15)" : "scale(1)"));

        nodeEls
          .select<SVGTextElement>("text")
          .attr("fill", (n) =>
            n.id === d.id || neighbors.has(n.id) ? "#1C1C1A" : "rgba(28,28,26,0.2)"
          );

        if (edgesRevealedRef.current) {
          linkEls
            .attr("opacity", (e) => {
              const sId = (e.source as NodeDatum).id;
              const tId = (e.target as NodeDatum).id;
              return sId === d.id || tId === d.id ? 1 : 0.05;
            })
            .attr("stroke", (e) => {
              const sId = (e.source as NodeDatum).id;
              const tId = (e.target as NodeDatum).id;
              return sId === d.id || tId === d.id
                ? CAT_COLORS[d.category]
                : "rgba(28,28,26,0.12)";
            })
            .attr("stroke-width", (e) => {
              const sId = (e.source as NodeDatum).id;
              const tId = (e.target as NodeDatum).id;
              return sId === d.id || tId === d.id ? 1.5 : 1;
            });
        }
      })
      .on("mouseleave", function () {
        nodeEls.attr("opacity", 1);
        nodeEls
          .select<SVGCircleElement>("circle")
          .attr("stroke", (n) => CAT_COLORS[n.category] + "99")
          .attr("stroke-width", 1.5)
          .style("transform", "scale(1)");

        nodeEls.select<SVGTextElement>("text").attr("fill", "#5A5855");

        if (edgesRevealedRef.current) {
          linkEls
            .attr("opacity", 1)
            .attr("stroke", "rgba(28,28,26,0.12)")
            .attr("stroke-width", 1);
        }
      });

    // ── Drag behavior ──────────────────────────────────────────────────────
    const dragBehavior = d3
      .drag<SVGGElement, NodeDatum>()
      .on("start", (event, d) => {
        event.sourceEvent.stopPropagation();
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeEls.call(dragBehavior);

    // ── Tick handler ───────────────────────────────────────────────────────
    simulation.on("tick", () => {
      linkEls
        .attr("x1", (d) => (d.source as NodeDatum).x!)
        .attr("y1", (d) => (d.source as NodeDatum).y!)
        .attr("x2", (d) => (d.target as NodeDatum).x!)
        .attr("y2", (d) => (d.target as NodeDatum).y!);

      nodeEls.attr("transform", (d) => `translate(${d.x!},${d.y!})`);

      if (!edgesRevealedRef.current && simulation.alpha() < 0.3) {
        edgesRevealedRef.current = true;
        linkEls.transition().duration(800).attr("opacity", 1);
      }
    });

    simulation.on("end", () => {
      if (!edgesRevealedRef.current) {
        edgesRevealedRef.current = true;
        linkEls.attr("opacity", 1);
      }
    });
  }, []);

  // ── ScrollTrigger ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => initGraph(),
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      simRef.current?.stop();
    };
  }, [initGraph]);

  return (
    <section
      id="skills"
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
          marginBottom: "32px",
        }}
      >
        Skills
      </p>

      <div
        ref={containerRef}
        style={{
          backgroundColor: "transparent",
          border: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          ref={svgRef}
          style={{ display: "block", width: "100%", height: "auto" }}
          aria-label="Interactive force-directed skill graph"
        />
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          marginTop: "24px",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {(Object.keys(CAT_LABELS) as CategoryId[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveLegend((prev) => (prev === cat ? null : cat))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              padding: "4px 0",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: activeLegend === cat ? "var(--text-primary)" : "var(--text-tertiary)",
              transition: "color 0.2s ease",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: CAT_COLORS[cat],
                opacity: activeLegend === null || activeLegend === cat ? 1 : 0.2,
                transition: "opacity 0.2s ease",
              }}
            />
            {CAT_LABELS[cat]}
          </button>
        ))}
        {activeLegend && (
          <button
            onClick={() => setActiveLegend(null)}
            style={{
              background: "none",
              border: "none",
              padding: "4px 0",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-tertiary)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            reset
          </button>
        )}
      </div>
    </section>
  );
}
