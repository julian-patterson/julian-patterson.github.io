"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface Command {
  id: string;
  prompt: string;
  output: string[];
}

const commands: Command[] = [
  {
    id: "whoami",
    prompt: "whoami",
    output: [
      "julian patterson",
      "  role  : software engineer",
      "  work  : product infrastructure + logistics tools",
      "  study : software engineering + statistics @ McGill",
    ],
  },
  {
    id: "cat-work",
    prompt: "cat selected_work.txt",
    output: [
      "Prime Freight Logistics",
      "  pricing, rate processing, and booking workflows",
      "",
      "AnyTime Technologies",
      "  multi-tenant sports-facility booking platform",
      "",
      "Hapag-Lloyd",
      "  AI Hub internship",
    ],
  },
  {
    id: "ls-stack",
    prompt: "ls -1 ~/toolbox/",
    output: [
      "python/",
      "typescript/",
      "go/",
      "rust/",
      "pytorch-geometric/",
      "react/",
      "docker/",
      "postgres/",
      "gsap/",
    ],
  },
];

export default function Terminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [activeId, setActiveId] = useState<string>("whoami");
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    tweenRef.current?.kill();
  };

  const runCommand = useCallback((cmd: Command) => {
    clearTimers();
    setDisplayedLines([]);
    setTypedPrompt("");
    setIsTyping(true);

    // Type the prompt character by character
    let i = 0;
    const typeChar = () => {
      if (i <= cmd.prompt.length) {
        setTypedPrompt(cmd.prompt.slice(0, i));
        i++;
        const t = setTimeout(typeChar, 38 + Math.random() * 24);
        timeoutsRef.current.push(t);
      } else {
        // Prompt done — show output lines with stagger
        const t = setTimeout(() => {
          setIsTyping(false);
          cmd.output.forEach((line, j) => {
            const t2 = setTimeout(() => {
              setDisplayedLines((prev) => [...prev, line]);
            }, j * 65);
            timeoutsRef.current.push(t2);
          });
        }, 180);
        timeoutsRef.current.push(t);
      }
    };
    typeChar();
  }, []);

  // Auto-run first command on scroll enter
  const hasAutoRun = useRef(false);
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoRun.current) {
          hasAutoRun.current = true;
          const cmd = commands.find(c => c.id === "whoami")!;
          runCommand(cmd);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [runCommand]);

  // Scroll output to bottom as lines appear
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [displayedLines]);

  // Cursor blink
  useEffect(() => {
    if (!cursorRef.current) return;
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
    });
    return () => { tween.kill(); };
  }, []);

  const handleClick = (cmd: Command) => {
    if (isTyping) return;
    setActiveId(cmd.id);
    runCommand(cmd);
  };

  return (
    <section
      id="terminal"
      ref={sectionRef}
      style={{
        padding: "96px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        Interactive
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          color: "var(--text-primary)",
          lineHeight: 1.15,
          marginBottom: "40px",
        }}
      >
        Ask the shell.
      </h2>

      {/* Terminal window */}
      <div
        style={{
          backgroundColor: "#1a1917",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "#141412",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
            <span
              key={color}
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
          ))}
          <span
            style={{
              marginLeft: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            julian@jp ~ %
          </span>
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }} className="term-body">
          {/* Sidebar — command list */}
          <div
            style={{
              borderRight: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 0",
            }}
          >
            {commands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => handleClick(cmd)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: activeId === cmd.id ? "rgba(255,255,255,0.06)" : "none",
                  border: "none",
                  borderLeft: activeId === cmd.id
                    ? "2px solid var(--accent-brass)"
                    : "2px solid transparent",
                  padding: "8px 16px",
                  cursor: isTyping ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: activeId === cmd.id
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.35)",
                  transition: "all 0.15s ease",
                  opacity: isTyping && activeId !== cmd.id ? 0.4 : 1,
                }}
              >
                $ {cmd.prompt.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Output panel */}
          <div
            ref={outputRef}
            style={{
              padding: "20px 24px",
              minHeight: "240px",
              maxHeight: "300px",
              overflowY: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: 1.8,
            }}
          >
            {/* Prompt line */}
            <div style={{ marginBottom: "12px" }}>
              <span style={{ color: "var(--accent-brass)" }}>jp</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}> % </span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{typedPrompt}</span>
              <span
                ref={cursorRef}
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "13px",
                  backgroundColor: "var(--accent-brass)",
                  verticalAlign: "text-bottom",
                  marginLeft: "1px",
                }}
              />
            </div>

            {/* Output lines */}
            {displayedLines.map((line, i) => (
              <div
                key={i}
                style={{
                  color: line === "" ? "transparent" : line.startsWith("  ")
                    ? "rgba(255,255,255,0.55)"
                    : line.startsWith("^")
                    ? "#ff5f57"
                    : "rgba(255,255,255,0.75)",
                  whiteSpace: "pre",
                }}
              >
                {line === "" ? "\u00A0" : line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        style={{
          marginTop: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-tertiary)",
        }}
      >
        An interactive summary. Choose a command to explore.
      </p>

    </section>
  );
}
