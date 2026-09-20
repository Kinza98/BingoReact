import { useEffect, useState } from "react";

function BingoCelebration({ show, onDone }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (!show) {
      setConfetti([]);
      return;
    }

    const colors = ["#f2b544", "#8b6cf2", "#59d99a", "#ffffff", "#ff8fa3"];

    const pieces = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 0.8 + Math.random() * 0.6,
      delay: Math.random() * 0.15,
    }));

    setConfetti(pieces);

    const timer = setTimeout(() => {
      setConfetti([]);
      onDone?.();
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, [show, onDone]);

  if (!show) return null;

  return (
    <>
      {/* Screen flash */}
      <div className="fixed inset-0 z-40 pointer-events-none bg-white animate-flash-out" />

      {/* Confetti */}
      {confetti.map((p) => (
        <span
          key={p.id}
          className="fixed top-[-12px] w-2 h-3.5 z-50 pointer-events-none animate-confetti-fall"
          style={{
            left: `${p.left}vw`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

export default BingoCelebration;
