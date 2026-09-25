function CardSetupDecoration({ position = "left" }) {
  const isLeft = position === "left";

  return (
    <div
      className={`
        pointer-events-none absolute hidden scale-90 opacity-20 lg:block
        ${isLeft ? "left-0 -rotate-3" : "right-0 rotate-3"}
      `}
    >
      <div className="grid h-52 w-44 grid-cols-5 gap-1.5 rounded-2xl border border-white/10 bg-neon-800/70 p-3">
        {Array.from({ length: 25 }).map((_, index) => (
          <div key={index} className="rounded-md bg-neon-700/50" />
        ))}
      </div>
    </div>
  );
}

export default CardSetupDecoration;
