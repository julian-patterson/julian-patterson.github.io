"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CenterToFit } from "@carbon/icons-react";
import * as d3 from "d3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextScramble from "./TextScramble";

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
  languages: "var(--skill-languages)",
  ml: "var(--skill-ml)",
  infra: "var(--skill-infra)",
  frontend: "var(--skill-frontend)",
  domain: "var(--skill-domain)",
};

const CAT_MUTED_COLORS: Record<CategoryId, string> = {
  languages: "var(--skill-languages-muted)",
  ml: "var(--skill-ml-muted)",
  infra: "var(--skill-infra-muted)",
  frontend: "var(--skill-frontend-muted)",
  domain: "var(--skill-domain-muted)",
};

const CAT_LABELS: Record<CategoryId, string> = {
  languages: "Languages",
  ml: "Data & ML",
  infra: "Infrastructure",
  frontend: "Frontend",
  domain: "Domain",
};

const CATEGORY_IDS: CategoryId[] = ["languages", "ml", "infra", "frontend", "domain"];

function nodeRadius(w: 1 | 2 | 3) {
  return w === 3 ? 10 : w === 2 ? 7 : 5;
}

const MAX_LABEL_LINE_LENGTH = 20;
const COMPACT_LABEL_LINE_LENGTH = 14;
const COMPACT_GRAPH_BREAKPOINT = 720;
const COMPACT_MIN_VIEWBOX_WIDTH = 280;

function splitNodeLabel(label: string, maxLineLength = MAX_LABEL_LINE_LENGTH) {
  return label.split(" ").reduce<string[]>((lines, word) => {
    const currentLine = lines.at(-1);

    if (!currentLine || `${currentLine} ${word}`.length > maxLineLength) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${currentLine} ${word}`;
    }

    return lines;
  }, []);
}

function labelCollisionRadius(label: string) {
  const longestLine = Math.max(...splitNodeLabel(label).map((line) => line.length));
  return Math.min(70, Math.max(34, longestLine * 3 + 8));
}

function layoutCompactNodes(nodes: NodeDatum[], width: number) {
  const columns = width < 420 ? 2 : width < 620 ? 3 : 4;
  const labelLineLength = columns === 2 ? COMPACT_LABEL_LINE_LENGTH : columns === 3 ? 16 : 18;
  const lineHeight = 13;
  let cursorY = 32;

  CATEGORY_IDS.forEach((category) => {
    const categoryNodes = nodes.filter((node) => node.category === category);

    for (let index = 0; index < categoryNodes.length; index += columns) {
      const rowNodes = categoryNodes.slice(index, index + columns);
      const maxLineCount = Math.max(
        ...rowNodes.map((node) => splitNodeLabel(node.label, labelLineLength).length)
      );
      const firstColumn = (columns - rowNodes.length) / 2;

      rowNodes.forEach((node, columnIndex) => {
        node.x = (width * (firstColumn + columnIndex + 0.5)) / columns;
        node.y = cursorY;
      });

      cursorY += Math.max(52, 38 + maxLineCount * lineHeight);
    }

    cursorY += 18;
  });

  return {
    height: Math.ceil(cursorY + 16),
    labelLineLength,
  };
}

// ── Graph data ─────────────────────────────────────────────────────────────

const RAW_NODES: Omit<NodeDatum, keyof d3.SimulationNodeDatum>[] = [
  // Languages
  { id: "python", label: "Python", category: "languages", weight: 2 },
  { id: "typescript", label: "TypeScript", category: "languages", weight: 2 },
  { id: "javascript", label: "JavaScript", category: "languages", weight: 2 },
  { id: "sql", label: "SQL", category: "languages", weight: 2 },
  { id: "html-css", label: "HTML / CSS", category: "languages", weight: 2 },
  { id: "java", label: "Java", category: "languages", weight: 2 },
  { id: "c", label: "C", category: "languages", weight: 2 },

  // Data & ML
  { id: "pytorch", label: "PyTorch", category: "ml", weight: 2 },
  { id: "pandas-numpy", label: "Pandas / NumPy", category: "ml", weight: 2 },
  { id: "nlp", label: "NLP", category: "ml", weight: 2 },
  { id: "transformers", label: "Transformers", category: "ml", weight: 2 },
  {
    id: "cnn-computer-vision",
    label: "CNNs / Computer Vision",
    category: "ml",
    weight: 2,
  },
  { id: "lstm-gru", label: "LSTM / GRU", category: "ml", weight: 2 },
  {
    id: "regression-classification",
    label: "Regression & Classification",
    category: "ml",
    weight: 2,
  },
  { id: "agentic-ai", label: "Agentic AI", category: "ml", weight: 2 },
  { id: "mcp", label: "Model Context Protocol (MCP)", category: "ml", weight: 2 },

  // Infrastructure
  { id: "docker", label: "Docker", category: "infra", weight: 2 },
  { id: "gcp", label: "Google Cloud Platform", category: "infra", weight: 2 },
  { id: "cloud-run", label: "Cloud Run", category: "infra", weight: 2 },
  { id: "cloud-tasks", label: "Cloud Tasks", category: "infra", weight: 2 },
  { id: "terraform", label: "Terraform", category: "infra", weight: 2 },
  { id: "github-actions", label: "GitHub Actions", category: "infra", weight: 2 },
  { id: "supabase", label: "Supabase", category: "infra", weight: 2 },
  { id: "postgresql", label: "PostgreSQL", category: "infra", weight: 2 },
  { id: "graphql", label: "GraphQL", category: "infra", weight: 2 },
  { id: "rest-api-design", label: "REST API Design", category: "infra", weight: 2 },
  { id: "nodejs", label: "Node.js", category: "infra", weight: 2 },

  // Frontend
  { id: "react", label: "React", category: "frontend", weight: 2 },
  { id: "reactnative", label: "React Native", category: "frontend", weight: 2 },
  { id: "material-ui", label: "Material UI", category: "frontend", weight: 2 },
  {
    id: "i18next-localization",
    label: "i18next / Localization",
    category: "frontend",
    weight: 2,
  },
  { id: "figma-ui-design", label: "Figma / UI Design", category: "frontend", weight: 2 },

  // Domain
  {
    id: "ai-governance-risk-assessment",
    label: "AI Governance & Risk Assessment",
    category: "domain",
    weight: 2,
  },
  {
    id: "freight-container-logistics",
    label: "Freight Forwarding & Container Logistics",
    category: "domain",
    weight: 2,
  },
  {
    id: "booking-scheduling-systems",
    label: "Booking & Scheduling Systems",
    category: "domain",
    weight: 2,
  },
  {
    id: "stripe-payment-integration",
    label: "Stripe Payment Integration",
    category: "domain",
    weight: 2,
  },
  {
    id: "technical-leadership-mentoring",
    label: "Technical Leadership & Mentoring",
    category: "domain",
    weight: 2,
  },
  { id: "data-applications", label: "Data Applications", category: "domain", weight: 2 },
];

const RAW_EDGES: { source: string; target: string; strength: 1 | 2 | 3 }[] = [
  // Language and runtime relationships
  { source: "python", target: "pytorch", strength: 3 },
  { source: "python", target: "pandas-numpy", strength: 3 },
  { source: "python", target: "agentic-ai", strength: 2 },
  { source: "python", target: "rest-api-design", strength: 2 },
  { source: "python", target: "c", strength: 1 },
  { source: "typescript", target: "javascript", strength: 3 },
  { source: "typescript", target: "react", strength: 3 },
  { source: "typescript", target: "nodejs", strength: 3 },
  { source: "typescript", target: "mcp", strength: 2 },
  { source: "javascript", target: "react", strength: 3 },
  { source: "javascript", target: "nodejs", strength: 3 },
  { source: "sql", target: "postgresql", strength: 3 },
  { source: "html-css", target: "react", strength: 3 },
  { source: "html-css", target: "material-ui", strength: 2 },
  { source: "java", target: "rest-api-design", strength: 2 },

  // Data & ML relationships
  { source: "pytorch", target: "transformers", strength: 3 },
  { source: "pytorch", target: "cnn-computer-vision", strength: 3 },
  { source: "pytorch", target: "lstm-gru", strength: 3 },
  { source: "pytorch", target: "regression-classification", strength: 2 },
  { source: "pandas-numpy", target: "regression-classification", strength: 3 },
  { source: "pandas-numpy", target: "data-applications", strength: 3 },
  { source: "nlp", target: "transformers", strength: 3 },
  { source: "nlp", target: "lstm-gru", strength: 3 },
  { source: "transformers", target: "agentic-ai", strength: 3 },
  { source: "agentic-ai", target: "mcp", strength: 3 },
  { source: "ai-governance-risk-assessment", target: "agentic-ai", strength: 3 },
  { source: "mcp", target: "ai-governance-risk-assessment", strength: 2 },

  // Infrastructure connections
  { source: "docker", target: "cloud-run", strength: 3 },
  { source: "docker", target: "github-actions", strength: 3 },
  { source: "docker", target: "terraform", strength: 2 },
  { source: "gcp", target: "cloud-run", strength: 3 },
  { source: "gcp", target: "cloud-tasks", strength: 3 },
  { source: "gcp", target: "terraform", strength: 3 },
  { source: "cloud-run", target: "nodejs", strength: 2 },
  { source: "cloud-run", target: "rest-api-design", strength: 2 },
  { source: "cloud-tasks", target: "booking-scheduling-systems", strength: 2 },
  { source: "terraform", target: "github-actions", strength: 2 },
  { source: "supabase", target: "postgresql", strength: 3 },
  { source: "supabase", target: "react", strength: 2 },
  { source: "graphql", target: "postgresql", strength: 3 },
  { source: "postgresql", target: "rest-api-design", strength: 2 },
  { source: "nodejs", target: "rest-api-design", strength: 3 },

  // Frontend connections
  { source: "react", target: "reactnative", strength: 3 },
  { source: "react", target: "material-ui", strength: 3 },
  { source: "react", target: "i18next-localization", strength: 2 },
  { source: "react", target: "figma-ui-design", strength: 2 },
  { source: "reactnative", target: "i18next-localization", strength: 2 },
  { source: "material-ui", target: "figma-ui-design", strength: 2 },

  // Domain bridges
  { source: "ai-governance-risk-assessment", target: "technical-leadership-mentoring", strength: 2 },
  { source: "freight-container-logistics", target: "booking-scheduling-systems", strength: 3 },
  { source: "freight-container-logistics", target: "data-applications", strength: 2 },
  { source: "booking-scheduling-systems", target: "data-applications", strength: 2 },
  { source: "stripe-payment-integration", target: "supabase", strength: 2 },
  { source: "stripe-payment-integration", target: "rest-api-design", strength: 3 },
  { source: "technical-leadership-mentoring", target: "github-actions", strength: 1 },
  { source: "technical-leadership-mentoring", target: "data-applications", strength: 2 },
  { source: "data-applications", target: "react", strength: 2 },
  { source: "data-applications", target: "postgresql", strength: 2 },
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
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const edgesRevealedRef = useRef(false);
  const startedRef = useRef(false);
  const activeLegendRef = useRef<CategoryId | null>(null);

  const [activeLegend, setActiveLegend] = useState<CategoryId | null>(null);

  const recenterGraph = useCallback(() => {
    const svgEl = svgRef.current;
    const zoomBehavior = zoomBehaviorRef.current;
    if (!svgEl || !zoomBehavior) return;

    const svg = d3.select(svgEl);
    svg.interrupt("recenter");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.call(zoomBehavior.transform, d3.zoomIdentity);
    } else {
      svg
        .transition("recenter")
        .duration(350)
        .call(zoomBehavior.transform, d3.zoomIdentity);
    }
  }, []);

  const applyLegendHighlight = useCallback((category: CategoryId | null) => {
    const nodeEls = nodeElsRef.current;
    const linkEls = linkElsRef.current;
    if (!nodeEls || !linkEls) return;

    linkEls.interrupt();

    if (category === null) {
      nodeEls
        .attr("opacity", 1)
        .select("circle")
        .attr("stroke", (d: NodeDatum) => CAT_MUTED_COLORS[d.category])
        .attr("stroke-width", 1.5);
      nodeEls.select<SVGTextElement>("text").attr("fill", "var(--graph-text)");
      if (edgesRevealedRef.current) {
        linkEls.attr("opacity", 1).attr("stroke", "var(--graph-edge)").attr("stroke-width", 1);
      }
    } else {
      nodeEls
        .attr("opacity", (d: NodeDatum) => (d.category === category ? 1 : 0.12))
        .select("circle")
        .attr("stroke", (d: NodeDatum) =>
          d.category === category ? CAT_COLORS[d.category] : CAT_MUTED_COLORS[d.category]
        )
        .attr("stroke-width", (d: NodeDatum) => (d.category === category ? 2 : 1.5));
      nodeEls
        .select<SVGTextElement>("text")
        .attr("fill", (d: NodeDatum) =>
          d.category === category ? "var(--text-primary)" : "var(--graph-muted-text)"
        );
      if (edgesRevealedRef.current) {
        linkEls
          .attr("opacity", (e: EdgeDatum) => {
            const s = (e.source as NodeDatum).category;
            const t = (e.target as NodeDatum).category;
            return s === category && t === category ? 1 : 0.05;
          })
          .attr("stroke", "var(--graph-edge)")
          .attr("stroke-width", 1);
      }
    }
  }, []);

  // ── Apply legend highlight via D3 ──────────────────────────────────────
  useEffect(() => {
    activeLegendRef.current = activeLegend;
    applyLegendHighlight(activeLegend);
  }, [activeLegend, applyLegendHighlight]);

  // ── Graph initializer ────────────────────────────────────────────────────
  const initGraph = useCallback(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl || startedRef.current) return;
    startedRef.current = true;

    const containerWidth = container.clientWidth;
    const isCompact = containerWidth < COMPACT_GRAPH_BREAKPOINT;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const VW = isCompact
      ? Math.max(COMPACT_MIN_VIEWBOX_WIDTH, Math.round(containerWidth))
      : 800;

    // Every owner-approved skill remains present at every viewport width.
    const nodes: NodeDatum[] = RAW_NODES.map((n) => ({
      ...n,
      x: VW / 2,
      y: 260,
    }));

    const compactLayout = isCompact ? layoutCompactNodes(nodes, VW) : null;
    const VH = compactLayout?.height ?? 520;

    if (!isCompact) {
      nodes.forEach((node) => {
        node.x = VW / 2;
        node.y = VH / 2;
      });
    }

    const nodeIds = new Set(nodes.map((n) => n.id));
    const nodesById = new Map(nodes.map((node) => [node.id, node]));
    const edges: EdgeDatum[] = RAW_EDGES
      .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map((e) => ({
        ...e,
        source: nodesById.get(e.source)!,
        target: nodesById.get(e.target)!,
      }));

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
        if (event.type === "mousedown") {
          const target = event.target as Element | null;
          return event.button === 0 && !target?.closest(".node");
        }
        return !event.button;
      })
      .on("zoom", (event) => g.attr("transform", event.transform));

    zoomBehaviorRef.current = zoomBehavior;
    svg.call(zoomBehavior);
    svg.on("dblclick.zoom", recenterGraph);

    // Hint label
    const hintText = svg
      .append("text")
      .attr("x", VW - 10)
      .attr("y", VH - 8)
      .attr("text-anchor", "end")
      .attr("font-family", "var(--font-mono)")
      .attr("font-size", "10")
      .attr("fill", "var(--text-tertiary)")
      .attr("opacity", prefersReducedMotion ? 0 : 1)
      .attr("pointer-events", "none")
      .text(isCompact ? "pinch to zoom · drag to pan" : "scroll to zoom · drag to pan");

    if (!prefersReducedMotion) {
      setTimeout(() => {
        hintText.transition().duration(700).attr("opacity", 0);
      }, 3000);
    }

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
        d3
          .forceCollide<NodeDatum>()
          .radius((d) => labelCollisionRadius(d.label))
          .iterations(3)
      )
      .force("cluster", clusterForceFn)
      .alphaDecay(0.02);

    if (isCompact || prefersReducedMotion) {
      simulation.stop();
    }

    simRef.current = simulation;

    // ── Edges ──────────────────────────────────────────────────────────────
    const linkGroup = g.append("g");
    const linkEls = linkGroup
      .selectAll<SVGLineElement, EdgeDatum>("line")
      .data(edges)
      .join("line")
      .attr("stroke", "var(--graph-edge)")
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
      .attr("data-skill-id", (d) => d.id)
      .attr("data-category", (d) => d.category)
      .attr("data-weight", (d) => d.weight)
      .attr("aria-label", (d) => d.label)
      .attr("cursor", "pointer")
      .style("transition", "opacity 0.2s ease");

    nodeEls.append("title").text((d) => d.label);

    nodeEls
      .append("circle")
      .attr("r", (d) => nodeRadius(d.weight))
      .attr("fill", "var(--graph-node-fill)")
      .attr("stroke", (d) => CAT_MUTED_COLORS[d.category])
      .attr("stroke-width", 1.5)
      .style("transition", "stroke 0.2s ease, stroke-width 0.2s ease, transform 0.2s ease");

    const nodeLabels = nodeEls
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-mono)")
      .attr("font-size", isCompact ? "11" : "10")
      .attr("fill", "var(--graph-text)")
      .attr("pointer-events", "none")
      .style("transition", "fill 0.2s ease");

    nodeLabels.each(function (d) {
      d3.select(this)
        .selectAll("tspan")
        .data(splitNodeLabel(d.label, compactLayout?.labelLineLength))
        .join("tspan")
        .attr("x", 0)
        .attr("dy", (_line, index) =>
          index === 0 ? `${nodeRadius(d.weight) + 12}px` : "1.15em"
        )
        .text((line) => line);
    });

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
              : CAT_MUTED_COLORS[n.category]
          )
          .attr("stroke-width", (n) => (n.id === d.id ? 2 : 1.5))
          .style("transform", (n) => (n.id === d.id ? "scale(1.15)" : "scale(1)"));

        nodeEls
          .select<SVGTextElement>("text")
          .attr("fill", (n) =>
            n.id === d.id || neighbors.has(n.id)
              ? "var(--text-primary)"
              : "var(--graph-muted-text)"
        );

        if (edgesRevealedRef.current) {
          linkEls.interrupt();
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
                : "var(--graph-edge)";
            })
            .attr("stroke-width", (e) => {
              const sId = (e.source as NodeDatum).id;
              const tId = (e.target as NodeDatum).id;
              return sId === d.id || tId === d.id ? 1.5 : 1;
            });
        }
      })
      .on("mouseleave", function () {
        nodeEls.select<SVGCircleElement>("circle").style("transform", "scale(1)");
        applyLegendHighlight(activeLegendRef.current);
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

    if (!isCompact && !prefersReducedMotion) {
      nodeEls.call(dragBehavior);
    }

    const renderGraph = () => {
      if (!isCompact) {
        nodes.forEach((node) => {
          const horizontalPadding = Math.min(72, labelCollisionRadius(node.label) + 8);
          node.x = Math.max(horizontalPadding, Math.min(VW - horizontalPadding, node.x!));
          node.y = Math.max(24, Math.min(VH - 44, node.y!));
        });
      }

      linkEls
        .attr("x1", (d) => (d.source as NodeDatum).x!)
        .attr("y1", (d) => (d.source as NodeDatum).y!)
        .attr("x2", (d) => (d.target as NodeDatum).x!)
        .attr("y2", (d) => (d.target as NodeDatum).y!);

      nodeEls.attr("transform", (d) => `translate(${d.x!},${d.y!})`);
    };

    const revealEdges = () => {
      edgesRevealedRef.current = true;
      applyLegendHighlight(activeLegendRef.current);
    };

    if (isCompact) {
      renderGraph();
      revealEdges();
    } else if (prefersReducedMotion) {
      simulation.tick(400).alpha(0);
      renderGraph();
      revealEdges();
    } else {
      // ── Tick handler ─────────────────────────────────────────────────────
      simulation.on("tick", () => {
        renderGraph();

        if (!edgesRevealedRef.current && simulation.alpha() < 0.3) {
          edgesRevealedRef.current = true;
          if (activeLegendRef.current === null) {
            linkEls.transition().duration(800).attr("opacity", 1);
          } else {
            applyLegendHighlight(activeLegendRef.current);
          }
        }
      });

      simulation.on("end", () => {
        if (!edgesRevealedRef.current) {
          revealEdges();
        }
      });
    }
  }, [applyLegendHighlight, recenterGraph]);

  const handleRecenter = useCallback(() => {
    initGraph();
    recenterGraph();
  }, [initGraph, recenterGraph]);

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
        <TextScramble text="Skills" className="section-kicker" />
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
        <div className="skills-graph-toolbar">
          <button
            type="button"
            className="skills-graph-recenter"
            onFocus={initGraph}
            onClick={handleRecenter}
            aria-label="Recenter skills graph"
            aria-controls="skills-graph-visual"
          >
            <CenterToFit size={18} aria-hidden="true" />
            <span>Recenter</span>
          </button>
        </div>
        <svg
          id="skills-graph-visual"
          ref={svgRef}
          style={{ display: "block", width: "100%", height: "auto" }}
          role="img"
          aria-label="Interactive force-directed graph of 38 skills"
          aria-describedby="skills-graph-description"
        />
        <div id="skills-graph-description" className="sr-only">
          {CATEGORY_IDS.map((cat) => (
            <p key={cat}>
              {CAT_LABELS[cat]}: {RAW_NODES.filter((node) => node.category === cat)
                .map((node) => node.label)
                .join(", ")}
              .
            </p>
          ))}
        </div>
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
        {CATEGORY_IDS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveLegend((prev) => (prev === cat ? null : cat))}
            aria-pressed={activeLegend === cat}
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
            type="button"
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
            clear filter
          </button>
        )}
      </div>
    </section>
  );
}
