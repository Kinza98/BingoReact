import { useEffect, useState } from "react";

function BingoCelebration({ show, onDone }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (!show) {
      setConfetti([]);
      return;
    }

    const colors = ["#f2b544", "#8b6cf2", "#59d99a", "#ffffff", "#ff8fa3"];

    const pieces = Array.from({ length: 70 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 55;

      return {
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 720 - 360,
        duration: 0.8 + Math.random() * 0.6,
        delay: Math.random() * 0.15,
      };
    });

    setConfetti(pieces);

    const timer = setTimeout(() => {
      setConfetti([]);
      onDone?.();
    }, 2200);

    return () => clearTimeout(timer);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <>
      {/* Screen flash */}
      <div className="fixed inset-0 z-40 pointer-events-none bg-white animate-flash-out" />

      {/* Center explosion */}
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        {confetti.map((p) => (
          <span
            key={p.id}
            className="absolute w-2 h-3.5 animate-confetti-explode"
            style={{
              backgroundColor: p.color,
              "--x": `${p.x}vw`,
              "--y": `${p.y}vh`,
              "--rotation": `${p.rotation}deg`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default BingoCelebration;
