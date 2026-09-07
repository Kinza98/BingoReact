import { useEffect, useState } from "react";

function ConfettiSquaresBackground() {
  const squares = [
    {
      x: "6%",
      y: "12%",
      size: 100,
      rx: 6,
      fill: "var(--color-ocean-900)",
      opacity: 0.2,
      mobile: true,
    },
    {
      x: "18%",
      y: "6%",
      size: 140,
      rx: 4,
      fill: "var(--color-neon-500)",
      opacity: 0.3,
      mobile: false,
    },
    {
      x: "32%",
      y: "20%",
      size: 120,
      rx: 4,
      fill: "var(--color-forest-700)",
      opacity: 0.3,
      mobile: false,
    },
    {
      x: "9%",
      y: "26%",
      size: 160,
      rx: 5,
      fill: "var(--color-ocean-500)",
      opacity: 0.2,
      mobile: true,
    },
    {
      x: "60%",
      y: "8%",
      size: 180,
      rx: 5,
      fill: "var(--color-ocean-500)",
      opacity: 0.45,
      mobile: false,
    },
    {
      x: "70%",
      y: "17%",
      size: 140,
      rx: 4,
      fill: "var(--color-twilight-500)",
      opacity: 0.6,
      mobile: false,
    },
    {
      x: "83%",
      y: "10%",
      size: 240,
      rx: 6,
      fill: "var(--color-teal)",
      opacity: 0.45,
      mobile: true,
    },
    {
      x: "90%",
      y: "24%",
      size: 160,
      rx: 4,
      fill: "var(--color-royal-500)",
      opacity: 0.3,
      mobile: false,
    },
    {
      x: "8%",
      y: "45%",
      size: 160,
      rx: 4,
      fill: "var(--color-slate)",
      opacity: 0.6,
      mobile: false,
    },
    {
      x: "10%",
      y: "60%",
      size: 140,
      rx: 4,
      fill: "var(--color-forest-500)",
      opacity: 0.2,
      mobile: true,
    },
    {
      x: "86%",
      y: "42%",
      size: 180,
      rx: 5,
      fill: "var(--color-neon-900)",
      opacity: 0.2,
      mobile: false,
    },
    {
      x: "90%",
      y: "58%",
      size: 140,
      rx: 4,
      fill: "var(--color-ocean-500)",
      opacity: 0.6,
      mobile: true,
    },
    {
      x: "6%",
      y: "78%",
      size: 180,
      rx: 5,
      fill: "var(--color-teal-200)",
      opacity: 0.1,
      mobile: true,
    },
    {
      x: "14%",
      y: "88%",
      size: 140,
      rx: 4,
      fill: "var(--color-slate)",
      opacity: 0.6,
      mobile: false,
    },
    {
      x: "20%",
      y: "76%",
      size: 120,
      rx: 4,
      fill: "var(--color-amber)",
      opacity: 0.3,
      mobile: false,
    },
    {
      x: "63%",
      y: "78%",
      size: 140,
      rx: 4,
      fill: "var(--color-neon-500)",
      opacity: 0.2,
      mobile: false,
    },
    {
      x: "75%",
      y: "88%",
      size: 80,
      rx: 5,
      fill: "var(--color-amber-200)",
      opacity: 0.2,
      mobile: true,
    },
    {
      x: "85%",
      y: "76%",
      size: 40,
      rx: 4,
      fill: "var(--color-teal-300)",
      opacity: 0.2,
      mobile: false,
    },
  ];

  const driftVariants = [
    { dx: 8, dy: 6, duration: 10 },
    { dx: -6, dy: 8, duration: 12 },
    { dx: 7, dy: -7, duration: 12 },
    { dx: -8, dy: -5, duration: 8 },
    { dx: 5, dy: 9, duration: 10 },
    { dx: -9, dy: 4, duration: 7 },
  ];

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Gradually reduce square size
  const sizeScale =
    screenWidth < 480
      ? 0.4
      : screenWidth < 640
        ? 0.5
        : screenWidth < 768
          ? 0.65
          : screenWidth < 1024
            ? 0.8
            : 1;

  // Gradually reduce the number of squares
  const visibleSquares =
    screenWidth < 480
      ? [
          squares[0],
          squares[3],
          squares[6],
          squares[9],
          squares[11],
          squares[16],
        ]
      : screenWidth < 640
        ? [
            squares[0],
            squares[3],
            squares[5],
            squares[6],
            squares[9],
            squares[11],
            squares[16],
          ]
        : screenWidth < 768
          ? [
              squares[0],
              squares[3],
              squares[5],
              squares[6],
              squares[8],
              squares[9],
              squares[11],
              squares[13],
              squares[15],
              squares[17],
            ]
          : screenWidth < 1024
            ? [
                squares[0],
                squares[1],
                squares[3],
                squares[4],
                squares[5],
                squares[6],
                squares[7],
                squares[8],
                squares[9],
                squares[11],
                squares[12],
                squares[13],
                squares[15],
                squares[17],
              ]
            : squares;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <style>
        {driftVariants
          .map(
            (v, i) => `
              @keyframes squareDrift${i} {
                0% {
                  transform: translate(0px, 0px);
                }

                50% {
                  transform: translate(${v.dx}px, ${v.dy}px);
                }

                100% {
                  transform: translate(0px, 0px);
                }
              }
            `,
          )
          .join("\n")}
      </style>

      <svg
        className="w-full h-full block"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {visibleSquares.map((s, i) => {
          const variant = driftVariants[i % driftVariants.length];
          const size = s.size * sizeScale;

          return (
            <rect
              key={`${s.x}-${s.y}`}
              x={s.x}
              y={s.y}
              width={size}
              height={size}
              rx={s.rx}
              fill={s.fill}
              opacity={s.opacity}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: `squareDrift${
                  i % driftVariants.length
                } ${variant.duration}s ease-in-out infinite`,
                animationDelay: `${(i % driftVariants.length) * 1.3}s`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default ConfettiSquaresBackground;
