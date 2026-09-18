// Logo mark C — stacked card icon, with 4 selectable color variants
// Usage: <BingoLogoCardIcon variant="amber" size={40} />
// variant: "teal" (default/original) | "amber" | "purple" | "mono" | "solidAmber"

const VARIANTS = {
  teal: {
    ghostStroke: "#3AA6A0",
    cardFill: "#132530",
    cardStroke: "#3AA6A0",
    dotMain: "#3AA6A0",
    dotAccent: "#E8A33D",
  },
  amber: {
    ghostStroke: "#E8A33D",
    cardFill: "#132530",
    cardStroke: "#E8A33D",
    dotMain: "#E8A33D",
    dotAccent: "#3AA6A0",
  },
  purple: {
    ghostStroke: "#7F77DD",
    cardFill: "#132530",
    cardStroke: "#7F77DD",
    dotMain: "#7F77DD",
    dotAccent: "#E8A33D",
  },
  mono: {
    ghostStroke: "#FFFFFF",
    ghostOpacity: 0.3,
    cardFill: "#132530",
    cardStroke: "#FFFFFF",
    cardStrokeOpacity: 0.4,
    dotMain: "#FFFFFF",
    dotMainOpacity: 0.5,
    dotAccent: "#E8A33D",
    dotAccent2: "#3AA6A0",
  },
  solidAmber: {
    ghostStroke: "#3AA6A0",
    cardFill: "#E8A33D",
    cardStroke: "#0D1B26",
    dotMain: "#0D1B26",
    dotAccent: "#3AA6A0",
  },
};

function LogoIcon({ size = 60, variant = "teal" }) {
  const c = VARIANTS[variant] || VARIANTS.teal;

  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 40 34"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bingo logo"
    >
      {/* faint ghost card behind, slightly rotated */}
      <rect
        x="10"
        y="4"
        width="24"
        height="18"
        rx="3"
        transform="rotate(8 22 13)"
        fill="none"
        stroke={c.ghostStroke}
        strokeOpacity={c.ghostOpacity ?? 0.5}
        strokeWidth="1.5"
      />

      {/* front card */}
      <rect
        x="6"
        y="8"
        width="24"
        height="18"
        rx="3"
        fill={c.cardFill}
        stroke={c.cardStroke}
        strokeOpacity={c.cardStrokeOpacity ?? 1}
        strokeWidth="1.5"
      />

      {/* 6 dots — center-top and center-bottom act as accents */}
      <circle
        cx="11"
        cy="13"
        r="1.6"
        fill={c.dotMain}
        fillOpacity={c.dotMainOpacity ?? 1}
      />
      <circle cx="17" cy="13" r="1.6" fill={c.dotAccent} />
      <circle
        cx="23"
        cy="13"
        r="1.6"
        fill={c.dotMain}
        fillOpacity={c.dotMainOpacity ?? 1}
      />
      <circle
        cx="11"
        cy="19"
        r="1.6"
        fill={c.dotMain}
        fillOpacity={c.dotMainOpacity ?? 1}
      />
      <circle
        cx="17"
        cy="19"
        r="1.6"
        fill={c.dotAccent2 ?? c.dotMain}
        fillOpacity={c.dotAccent2 ? 1 : (c.dotMainOpacity ?? 1)}
      />
      <circle
        cx="23"
        cy="19"
        r="1.6"
        fill={c.dotMain}
        fillOpacity={c.dotMainOpacity ?? 1}
      />
    </svg>
  );
}

export default LogoIcon;
