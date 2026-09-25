import BingoCard from "../../components/bingoGame/BingoCard";

function HistoryGameCard({ game, index }) {
  const numbers = [...game.pattern].sort((a, b) => a.index - b.index);

  const timeString = new Date(game.created_at).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl p-4 sm:p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
        game.is_win
          ? "bg-gradient-to-br from-[#193c3b] via-[#1b3537] to-[#17292d] border border-[#3a6e63]/40 shadow-[0_12px_35px_rgba(58,110,99,0.10)] hover:border-[#59a895]/50 hover:shadow-[0_16px_40px_rgba(58,110,99,0.16)]"
          : "bg-gradient-to-br from-[#2d2634] via-[#27232e] to-[#1b2027] border border-[#967c9b]/30 shadow-[0_12px_35px_rgba(150,124,155,0.08)] hover:border-[#967c9b]/50 hover:shadow-[0_16px_40px_rgba(150,124,155,0.14)]"
      }`}
    >
      <div
        className={`absolute left-0 right-0 top-0 h-px ${
          game.is_win
            ? "bg-gradient-to-r from-transparent via-[#59a895]/70 to-transparent"
            : "bg-gradient-to-r from-transparent via-[#b39ab7]/50 to-transparent"
        }`}
      />

      <div className="relative flex items-center justify-between">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${
            game.is_win ? "text-[#8dc0b5]" : "text-[#b9aabc]"
          }`}
        >
          Game {index + 1}
        </span>

        <span className="text-[11px] text-slate-500">{timeString}</span>
      </div>

      <div className="relative w-full flex justify-center py-1">
        <div className="transition-transform duration-300 group-hover:scale-[1.015]">
          <BingoCard
            mode="saved"
            numbers={numbers}
            theme={game.is_win ? "#3a6e63" : "#967c9b"}
          />
        </div>
      </div>

      <div className="relative flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-[11px] text-slate-500">{timeString}</span>

        {game.is_win ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3a6e63]/25 border border-[#59a895]/25 text-[#a8d8cf] text-[10px] sm:text-xs font-semibold">
            <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#3a6e63] text-white text-[9px]">
              ✓
            </span>
            Won
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#967c9b]/15 border border-[#967c9b]/25 text-[#c8bacb] text-[10px] sm:text-xs font-semibold">
            <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#967c9b]/30 text-[#d6c9d8] text-[9px]">
              ×
            </span>
            Lost
          </span>
        )}
      </div>
    </div>
  );
}

export default HistoryGameCard;
