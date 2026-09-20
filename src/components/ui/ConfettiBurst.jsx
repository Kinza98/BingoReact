export function ConfettiBurst() {
  const colors = ["#e0a94d", "#f2c778", "#a78bfa", "#f8fafc"];
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: 1.8 + Math.random() * 1.2,
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-10px] w-[7px] h-[12px] rounded-sm opacity-90 animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
