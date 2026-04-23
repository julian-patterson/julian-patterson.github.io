"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data) {
          setData(resData.data.user.contributionsCollection.contributionCalendar);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!sectionRef.current || loading || !data) return;

    const columns = sectionRef.current.querySelectorAll(".heatmap-col");
    gsap.fromTo(
      columns,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.008,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, [loading, data]);

  const getColor = (count: number) => {
    if (count === 0) return "var(--bg-surface)";
    if (count <= 2) return "#B5C9D9";
    if (count <= 5) return "#7A9DB8";
    if (count <= 9) return "#3D6F8F";
    return "var(--accent-navy)";
  };

  const handleMouseEnter = (e: React.MouseEvent, day: ContributionDay) => {
    setHoveredDay(day);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const renderGrid = () => {
    if (loading) {
      // Skeleton grid
      return (
        <div style={{ display: "flex", gap: "2px" }}>
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} style={{ width: "10px", height: "10px", backgroundColor: "var(--bg-surface)", borderRadius: "2px" }} />
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (!data) return <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-tertiary)" }}>Failed to load activity data.</p>;

    const weeks = data.weeks;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const visibleWeeks = isMobile ? weeks.slice(-26) : weeks;

    return (
      <div style={{ display: "flex", gap: "2px", overflowX: "auto", paddingBottom: "8px" }}>
        {visibleWeeks.map((week: ContributionWeek, i: number) => (
          <div key={i} className="heatmap-col" style={{ display: "flex", flexDirection: "column", gap: "2px", opacity: 0 }}>
            {week.contributionDays.map((day: ContributionDay, j: number) => (
              <div
                key={j}
                onMouseEnter={(e) => handleMouseEnter(e, day)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: getColor(day.contributionCount),
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      id="activity"
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
        Activity
      </p>

      <div style={{ position: "relative" }}>
        {/* Day labels */}
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingTop: "12px", marginRight: "4px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-tertiary)", height: "10px", lineHeight: "10px" }}>Mon</span>
            <div style={{ height: "10px" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-tertiary)", height: "10px", lineHeight: "10px" }}>Wed</span>
            <div style={{ height: "10px" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-tertiary)", height: "10px", lineHeight: "10px" }}>Fri</span>
          </div>

          <div style={{ flex: 1 }}>
            {renderGrid()}
          </div>
        </div>

        {/* Stats Row */}
        {!loading && data && (
          <div style={{ marginTop: "16px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", display: "flex", gap: "24px" }}>
            <span>{data.totalContributions} contributions in the last year</span>
            {/* Note: Streaks would require more complex logic or a separate API call, simplified here */}
            <span>GitHub contribution heatmap</span>
          </div>
        )}

        {/* Tooltip */}
        {hoveredDay && (
          <div
            style={{
              position: "fixed",
              top: tooltipPos.y,
              left: tooltipPos.x,
              transform: "translate(-50%, -100%)",
              backgroundColor: "white",
              border: "0.5px solid var(--border)",
              padding: "6px 10px",
              pointerEvents: "none",
              zIndex: 1000,
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ color: "var(--text-primary)" }}>{hoveredDay.contributionCount} contributions</div>
            <div style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>{new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        )}
      </div>
    </section>
  );
}
