import React, { useMemo } from "react";

/**
 * Decorative background layer for the Bingo app.
 * Drop it as the first child of a `position: relative` container,
 * and give your real content `z-index: 1` or higher so it sits on top.
 *
 *   <div style={{ position: 'relative' }}>
 *     <BingoBackground />
 *     <YourPageContent />
 *   </div>
 */

const BALLS = [
  { x: 6, y: 14, r: 34, n: 7, speed: "slow" },
  { x: 90, y: 10, r: 26, n: 12, speed: "fast" },
  { x: 4, y: 62, r: 30, n: 21, speed: "fast" },
  { x: 93, y: 55, r: 38, n: 3, speed: "slow" },
  { x: 16, y: 86, r: 24, n: 18, speed: "slow" },
  { x: 85, y: 85, r: 30, n: 9, speed: "fast" },
  { x: 50, y: 5, r: 20, n: 25, speed: "slow" },
];

const OUTLINES = [
  { x: 72, y: 20, size: 120, rot: -8, spin: true },
  { x: 10, y: 40, size: 90, rot: 10, spin: false, hideOnSmall: true },
  { x: 60, y: 75, size: 140, rot: 6, spin: false },
];

// Shapes are drawn at full size with a fixed viewBox, then scaled down as
// a whole via the --bg-scale custom property (set per breakpoint below).
// The viewBox stays constant so everything scales proportionally with no JS.
function Ball({ x, y, r, n, speed, hideOnSmall }) {
  return (
    <svg
      className={`${speed === "slow" ? "bg-drift-slow" : "bg-drift"} ${hideOnSmall ? "bg-hide-sm" : ""}`}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `calc(${r * 2}px * var(--bg-scale, 1))`,
        height: `calc(${r * 2}px * var(--bg-scale, 1))`,
      }}
      viewBox={`0 0 ${r * 2} ${r * 2}`}
    >
      <circle
        cx={r}
        cy={r}
        r={r - 2}
        fill="var(--ball-fill, rgba(23,56,56,0.07))"
        stroke="var(--ball-line, rgba(23,56,56,0.16))"
        strokeWidth="2"
      />
      <text
        x={r}
        y={r + r * 0.15}
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize={r * 0.55}
        fill="var(--ball-line, rgba(23,56,56,0.16))"
      >
        {n}
      </text>
    </svg>
  );
}

function Outline({ x, y, size, rot, spin, hideOnSmall }) {
  return (
    <svg
      className={`${spin ? "bg-spin-slow" : ""} ${hideOnSmall ? "bg-hide-sm" : ""}`}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `calc(${size}px * var(--bg-scale, 1))`,
        height: `calc(${size}px * var(--bg-scale, 1))`,
        transform: `rotate(${rot}deg)`,
      }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <rect
        x="4"
        y="4"
        width={size - 8}
        height={size - 8}
        rx={size * 0.18}
        fill="none"
        stroke="var(--ball-line, rgba(23,56,56,0.16))"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function BingoBackground() {
  const balls = useMemo(() => BALLS, []);
  const outlines = useMemo(() => OUTLINES, []);

  return (
    <div
      className="bg-decor-root"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <style>{`
        .bg-decor-root {
          --bg-scale: 1;
          --ball-fill: rgba(23,56,56,0.07);
          --ball-line: rgba(23,56,56,0.16);
        }
        @media (max-width: 900px) { .bg-decor-root { --bg-scale: 0.75; } }
        @media (max-width: 600px) { .bg-decor-root { --bg-scale: 0.55; } }
        @media (max-width: 400px) { .bg-decor-root { --bg-scale: 0.4; } }

        /* darker shapes on a dark background — tuned to sit a shade lighter
           than your navy surface (#18283d) rather than a generic black overlay.
           Point --ball-line / --ball-fill at your own theme tokens if you'd
           rather match --app-surface exactly, e.g. var(--app-surface). */
        .dark .bg-decor-root {
          --ball-fill: rgba(45,68,95,0.20);
          --ball-line: rgba(45,68,95,0.55);
        }
        @media (prefers-color-scheme: dark) {
          .bg-decor-root {
            --ball-fill: rgba(45,68,95,0.20);
            --ball-line: rgba(45,68,95,0.55);
          }
        }

        @keyframes bg-drift {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          50%      { transform: translate(0,-22px) rotate(4deg); }
        }
        @keyframes bg-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .bg-drift      { animation: bg-drift 22s ease-in-out infinite; }
        .bg-drift-slow { animation: bg-drift 34s ease-in-out infinite; }
        .bg-spin-slow  { animation: bg-spin 60s linear infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .bg-drift, .bg-drift-slow, .bg-spin-slow { animation: none; }
        }

        /* drop the least essential shape on very small screens to avoid clutter */
        @media (max-width: 480px) {
          .bg-hide-sm { display: none; }
        }
      `}</style>

      {balls.map((b, i) => (
        <Ball key={i} {...b} />
      ))}
      {outlines.map((o, i) => (
        <Outline key={i} {...o} />
      ))}
    </div>
  );
}
