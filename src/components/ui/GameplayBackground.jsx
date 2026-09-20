function FemaleBingoBot({
  className = "",
  message = null,
  showFullRobot = true,
}) {
  // Profile-only version
  if (!showFullRobot) {
    return (
      <div
        className={`relative w-12 h-12 ${className}`}
        aria-label="Bingo bot profile"
      >
        {/* Head */}
        <div className="absolute inset-0 rounded-[38%] bg-[#194e58] border-2 border-[#3a6e63] shadow-lg">
          {/* Ear pieces */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2 h-5 rounded-full bg-[#3a6e63]" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2 h-5 rounded-full bg-[#3a6e63]" />

          {/* Face */}
          <div className="absolute inset-1.5 rounded-[30%] bg-[#18282d] flex items-center justify-center gap-1.5">
            <div className="relative w-2.5 h-2.5 rounded-full bg-[#59d99a] shadow-[0_0_7px_rgba(89,217,154,0.6)]">
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white" />
            </div>

            <div className="relative w-2.5 h-2.5 rounded-full bg-[#59d99a] shadow-[0_0_7px_rgba(89,217,154,0.6)]">
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Smile */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 border-b border-[#f2b544] rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-44 h-52 ${className}`} aria-label="Bingo bot">
      {/* Antenna */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-1.5 h-5 bg-[#3a6e63] rounded-full" />
        <div className="w-3 h-3 rounded-full bg-[#f2b544] shadow-[0_0_12px_rgba(242,181,68,0.6)]" />
      </div>

      {/* Head */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-24 rounded-[38%] bg-[#194e58] border-4 border-[#3a6e63] shadow-xl">
        {/* Ear pieces */}
        <div className="absolute top-8 -left-4 w-5 h-10 rounded-full bg-[#3a6e63]" />
        <div className="absolute top-8 -right-4 w-5 h-10 rounded-full bg-[#3a6e63]" />

        {/* Face */}
        <div className="absolute inset-3 rounded-[30%] bg-[#18282d] flex items-center justify-center gap-5">
          <div className="relative w-7 h-7 rounded-full bg-[#59d99a] shadow-[0_0_12px_rgba(89,217,154,0.6)]">
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white" />
          </div>

          <div className="relative w-7 h-7 rounded-full bg-[#59d99a] shadow-[0_0_12px_rgba(89,217,154,0.6)]">
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Smile */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-9 h-3 border-b-2 border-[#f2b544] rounded-full" />
      </div>

      {/* Neck */}
      <div className="absolute top-[116px] left-1/2 -translate-x-1/2 w-8 h-5 bg-[#3a6e63] rounded-b-lg" />

      {/* Body */}
      <div className="absolute top-[125px] left-1/2 -translate-x-1/2 w-32 h-24 rounded-[35%] bg-[#194e58] border-4 border-[#3a6e63] shadow-xl">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-12 rounded-2xl bg-[#18282d] border border-white/10 flex items-center justify-center">
          <div className="text-[#f2b544] text-lg font-bold tracking-widest">
            B
          </div>
        </div>

        <div className="absolute top-5 -left-9 w-7 h-16 rounded-full bg-[#194e58] border-4 border-[#3a6e63] rotate-[12deg]" />
        <div className="absolute top-5 -right-9 w-7 h-16 rounded-full bg-[#194e58] border-4 border-[#3a6e63] -rotate-[12deg]" />
      </div>

      {/* Skirt / lower body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-7 rounded-b-[40%] rounded-t-lg bg-[#491a1a] border-x-4 border-b-4 border-[#3a6e63]" />

      <div className="absolute bottom-0 left-10 w-8 h-5 rounded-full bg-[#18282d]" />
      <div className="absolute bottom-0 right-10 w-8 h-5 rounded-full bg-[#18282d]" />

      {/* Message */}
      {message && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-56">
          <div className="relative bg-[#18282d] border border-[#3a6e63]/50 rounded-2xl px-4 py-3 text-center shadow-xl">
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              {message}
            </p>

            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-[#18282d] border-r border-b border-[#3a6e63]/50 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FemaleBingoBot;
