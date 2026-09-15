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

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

type ActivityPayload =
  | {
      status: "available";
      generatedAt: string;
      username: string;
      calendar: ContributionCalendar;
    }
  | {
      status: "unavailable";
      generatedAt: string;
    };

type ActivityState =
  | { status: "loading" }
  | { status: "ready"; generatedAt: string; username: string; calendar: ContributionCalendar }
  | { status: "empty"; generatedAt: string; username: string }
  | { status: "unavailable" }
  | { status: "error" };

const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const isContributionCalendar = (value: unknown): value is ContributionCalendar => {
  if (!value || typeof value !== "object") return false;

  const calendar = value as Partial<ContributionCalendar>;
  return (
    typeof calendar.totalContributions === "number" &&
    Array.isArray(calendar.weeks) &&
    calendar.weeks.every(
      (week) =>
        week &&
        Array.isArray(week.contributionDays) &&
        week.contributionDays.every(
          (day) =>
            day &&
            typeof day.contributionCount === "number" &&
            typeof day.date === "string"
        )
    )
  );
};

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activity, setActivity] = useState<ActivityState>({ status: "loading" });
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let cancelled = false;

    const loadActivity = async () => {
      try {
        const response = await fetch("data/github-activity");
        if (!response.ok) throw new Error("Static GitHub activity snapshot was not found");

        const payload = (await response.json()) as ActivityPayload;
        if (cancelled) return;

        if (payload.status === "unavailable") {
          setActivity({ status: "unavailable" });
          return;
        }

        if (
          payload.status !== "available" ||
          typeof payload.generatedAt !== "string" ||
          typeof payload.username !== "string" ||
          !isContributionCalendar(payload.calendar)
        ) {
          throw new Error("Static GitHub activity snapshot was invalid");
        }

        if (payload.calendar.totalContributions === 0) {
          setActivity({
            status: "empty",
            generatedAt: payload.generatedAt,
            username: payload.username,
          });
          return;
        }

        setActivity({
          status: "ready",
          generatedAt: payload.generatedAt,
          username: payload.username,
          calendar: payload.calendar,
        });
      } catch {
        if (!cancelled) setActivity({ status: "error" });
      }
    };

    loadActivity();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || activity.status !== "ready") return;

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
  }, [activity]);

  const getColor = (count: number) => {
    if (count === 0) return "var(--bg-surface)";
    if (count <= 2) return "var(--activity-1)";
    if (count <= 5) return "var(--activity-2)";
    if (count <= 9) return "var(--activity-3)";
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
    if (activity.status === "loading") {
      return (
        <div role="status" aria-live="polite" aria-busy="true" style={{ display: "flex", gap: "2px" }}>
          <span style={visuallyHidden}>Loading GitHub activity.</span>
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} style={{ width: "10px", height: "10px", backgroundColor: "var(--bg-surface)", borderRadius: "2px" }} />
              ))}
            </div>
          ))}
        </div>
      );
    }

    const stateMessageStyle = {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      color: "var(--text-tertiary)",
      lineHeight: 1.6,
    };

    if (activity.status === "unavailable") {
      return (
        <p role="status" aria-live="polite" style={stateMessageStyle}>
          GitHub activity is unavailable in this build. It will refresh with the next successful deployment.
        </p>
      );
    }

    if (activity.status === "error") {
      return (
        <p role="alert" style={stateMessageStyle}>
          GitHub activity could not be loaded. The rest of the portfolio remains available.
        </p>
      );
    }

    if (activity.status === "empty") {
      return (
        <p role="status" aria-live="polite" style={stateMessageStyle}>
          No public GitHub contributions were recorded in the latest deployment snapshot.
        </p>
      );
    }

    const weeks = activity.calendar.weeks;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const visibleWeeks = isMobile ? weeks.slice(-26) : weeks;

    return (
      <div
        role="img"
        aria-label={`${activity.calendar.totalContributions} public GitHub contributions in the latest deployment snapshot for ${activity.username}.`}
        style={{ display: "flex", gap: "2px", overflowX: "auto", paddingBottom: "8px" }}
      >
        {visibleWeeks.map((week: ContributionWeek, i: number) => (
          <div key={i} className="heatmap-col motion-reveal" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {week.contributionDays.map((day: ContributionDay, j: number) => (
              <div
                key={j}
                aria-hidden="true"
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
        {activity.status === "ready" && (
          <div style={{ marginTop: "16px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", display: "flex", gap: "24px" }}>
            <span>{activity.calendar.totalContributions} public contributions in the last year</span>
            <span>Snapshot generated {new Date(activity.generatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
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
              backgroundColor: "var(--tooltip-bg)",
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
