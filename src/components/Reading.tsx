"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

const items = [
  {
    type: "paper",
    title: "Inductive Representation Learning on Large Graphs",
    author: "Hamilton et al. (GraphSAGE)",
    note: "Foundation paper for the GNN approach in Freight Network Intelligence.",
    ref: "arxiv:1706.02216",
    status: "reading now",
    link: "https://arxiv.org/abs/1706.02216",
  },
  {
    type: "paper",
    title: "Temporal Graph Networks for Deep Learning on Dynamic Graphs",
    author: "Rossi et al., 2020",
    note: "Extension of GNNs to time-evolving graphs — directly relevant to shipping lane dynamics.",
    ref: "arxiv:2006.10637",
    status: "queued",
    link: "https://arxiv.org/abs/2006.10637",
  },
  {
    type: "book",
    title: "The Box",
    author: "Marc Levinson",
    note: "History of the shipping container. Explains why the industry's data infrastructure is the way it is.",
    status: "in progress",
    link: null,
  },
  {
    type: "book",
    title: "The Signal and the Noise",
    author: "Nate Silver",
    note: "Forecasting methodology — thinking about uncertainty quantification for rate predictions.",
    status: "finished",
    link: null,
  },
  {
    type: "link",
    title: "Drewry Container Forecaster",
    author: "Drewry Maritime Research",
    note: "Industry benchmark for container rate forecasting methodology. Key competitive context for FreightLens.",
    ref: "drewry.co.uk",
    status: "reference",
    link: "https://www.drewry.co.uk",
  },
];

export default function Reading() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
          },
        }
      );
    });
  }, []);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "paper":
        return { color: "var(--accent-navy)", borderColor: "rgba(27,58,92,0.3)" };
      case "book":
        return { color: "var(--accent-brass)", borderColor: "rgba(193,125,60,0.3)" };
      default:
        return { color: "var(--text-tertiary)", borderColor: "var(--border)" };
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "reading now":
        return { color: "var(--accent-navy)", backgroundColor: "rgba(27,58,92,0.05)" };
      case "in progress":
        return { color: "var(--accent-brass)", backgroundColor: "rgba(193,125,60,0.05)" };
      default:
        return { color: "var(--text-tertiary)", backgroundColor: "transparent" };
    }
  };

  return (
    <section
      id="reading"
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
        Currently Reading
      </p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 120px",
              gap: "32px",
              padding: "24px 0",
              borderBottom: i < items.length - 1 ? "0.5px solid var(--border)" : "none",
              alignItems: "start",
              opacity: 0,
            }}
            className="reading-row"
          >
            {/* Type */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                padding: "2px 8px",
                border: "1px solid",
                borderRadius: "2px",
                textAlign: "center",
                width: "fit-content",
                ...getTypeStyle(item.type),
              }}
            >
              {item.type}
            </div>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h4 style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", textUnderlineOffset: "3px" }}>
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h4>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)" }}>
                {item.author} {item.ref && `· ${item.ref}`}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {item.note}
              </p>
            </div>

            {/* Status */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                padding: "3px 10px",
                borderRadius: "2px",
                textAlign: "right",
                width: "fit-content",
                justifySelf: "end",
                ...getStatusStyle(item.status),
              }}
            >
              {item.status}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .reading-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .reading-row > div:last-child {
            justify-self: start !important;
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
