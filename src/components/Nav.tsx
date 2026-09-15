"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, Close } from "@carbon/icons-react";

const links = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (menuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(247, 245, 240, 0.35)" : "var(--bg-primary)",
          backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px -4px rgba(28,28,26,0.08), inset 0 -1px 0 rgba(255,255,255,0.4)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 32px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#top"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--text-tertiary)",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            jp.
          </a>

          {/* Desktop links */}
          <div
            style={{ display: "flex", gap: "32px", alignItems: "center" }}
            className="hidden-mobile"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-primary)",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <Close size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 99,
          backgroundColor: "var(--bg-primary)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "24px",
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.href);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

    </>
  );
}
