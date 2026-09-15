"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

export default function MetroDivider() {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const routes = divider.querySelectorAll<SVGPathElement>(".metro-divider-route");
      const stations = divider.querySelectorAll<HTMLSpanElement>(".metro-divider-station");

      gsap.set(routes, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(stations, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: divider,
            start: "top 88%",
            once: true,
          },
        })
        .to(routes, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.out",
        })
        .to(
          stations,
          {
            opacity: 1,
            duration: 0.28,
            stagger: 0.09,
            ease: "power2.out",
          },
          "-=0.08"
        );
    }, divider);

    return () => context.revert();
  }, []);

  return (
    <div ref={dividerRef} className="metro-divider" aria-hidden="true">
      <div className="metro-divider-track">
        <svg
          className="metro-divider-svg metro-divider-svg-desktop"
          viewBox="0 0 1036 96"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            className="metro-divider-route"
            d="M 0 24 H 360 L 416 64 H 1036"
            pathLength="1"
          />
        </svg>
        <span className="metro-divider-station metro-divider-station-desktop metro-divider-station-desktop-start" />
        <span className="metro-divider-station metro-divider-station-desktop metro-divider-interchange metro-divider-station-desktop-interchange" />
        <span className="metro-divider-station metro-divider-station-desktop metro-divider-station-desktop-end" />

        <svg
          className="metro-divider-svg metro-divider-svg-mobile"
          viewBox="0 0 320 64"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            className="metro-divider-route"
            d="M 0 18 H 116 L 150 46 H 320"
            pathLength="1"
          />
        </svg>
        <span className="metro-divider-station metro-divider-station-mobile metro-divider-station-mobile-start" />
        <span className="metro-divider-station metro-divider-station-mobile metro-divider-interchange metro-divider-station-mobile-interchange" />
      </div>
    </div>
  );
}
