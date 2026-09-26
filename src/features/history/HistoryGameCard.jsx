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
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 sm:p-5 ${
        game.is_win
          ? "border border-teal-600/30 bg-gradient-to-br from-royal-500/30 via-royal-500/40 to-royal-500/50 shadow-[0_12px_35px_rgba(58,110,99,0.10)] hover:border-teal-600/50 hover:shadow-[0_16px_40px_rgba(58,110,99,0.16)] dark:border-[#3a6e63]/40 dark:bg-gradient-to-br dark:from-[#193c3b] dark:via-[#1b3537] dark:to-[#17292d] dark:shadow-[0_12px_35px_rgba(58,110,99,0.10)] dark:hover:border-[#59a895]/50 dark:hover:shadow-[0_16px_40px_rgba(58,110,99,0.16)]"
          : "border border-slate-400/30 bg-gradient-to-br from-bot/20 via-bot/40 to-bot/50  shadow-[0_12px_35px_rgba(100,116,139,0.10)] hover:border-slate-400/50 hover:shadow-[0_16px_40px_rgba(100,116,139,0.16)] dark:border-[#967c9b]/30 dark:bg-gradient-to-br dark:from-[#2d2634] dark:via-[#27232e] dark:to-[#1b2027] dark:shadow-[0_12px_35px_rgba(150,124,155,0.08)] dark:hover:border-[#967c9b]/50 dark:hover:shadow-[0_16px_40px_rgba(150,124,155,0.14)]"
      }`}
    >
      <div
        className={`absolute left-0 right-0 top-0 h-px ${
          game.is_win
            ? "bg-gradient-to-r from-transparent via-[#59a895]/70 to-transparent dark:via-[#59a895]/70"
            : "bg-gradient-to-r from-transparent via-[#b39ab7]/50 to-transparent dark:via-[#b39ab7]/50"
        }`}
      />

      <div className="relative flex items-center justify-between">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${
            game.is_win
              ? "text-teal-700 dark:text-[#8dc0b5]"
              : "text-slate-700 dark:text-[#b9aabc]"
          }`}
        >
          Game {index + 1}
        </span>

        <span className="text-[11px] text-slate-600 dark:text-slate-500">
          {timeString}
        </span>
      </div>

      <div className="relative flex w-full justify-center py-1">
        <div className="transition-transform duration-300 group-hover:scale-[1.015]">
          <BingoCard
            mode="saved"
            numbers={numbers}
            theme={game.is_win ? "#3a6e63" : "#967c9b"}
          />
        </div>
      </div>

      <div className="relative flex items-center justify-between border-t border-slate-400/20 pt-2 dark:border-white/5">
        <span className="text-[11px] text-slate-600 dark:text-slate-500">
          {timeString}
        </span>

        {game.is_win ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/25 bg-teal-600/15 px-3 py-1.5 text-[10px] font-semibold text-teal-800 sm:text-xs dark:border-[#59a895]/25 dark:bg-[#3a6e63]/25 dark:text-[#a8d8cf]">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3a6e63] text-[9px] text-white">
              ✓
            </span>
            Won
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-500/25 bg-bot/15 px-3 py-1.5 text-[10px] font-semibold text-slate-700 sm:text-xs dark:border-[#967c9b]/25 dark:bg-[#967c9b]/15 dark:text-[#c8bacb]">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-bot text-[9px] text-slate-900 dark:bg-[#967c9b]/30 dark:text-[#d6c9d8]">
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
