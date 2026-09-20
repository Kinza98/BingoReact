import BingoCard from "../../components/bingoGame/BingoCard";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { useGameHistory } from "./useGetHistory";

function HistoryContainer() {
  const { userId } = useAuth();
  const { history = [], error, isLoading } = useGameHistory(userId);

  const totalGames = history.length;
  const totalWins = history.filter((game) => game.is_win).length;
  const totalLosses = history.filter((game) => !game.is_win).length;

  const winRate =
    totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

  // Get a date key based on the user's local date
  const getDateKey = (date) => {
    const dateObj = new Date(date);

    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(dateObj.getDate()).padStart(2, "0")}`;
  };

  const groupedHistory = history.reduce((acc, game) => {
    const dateObj = new Date(game.created_at);
    const dateKey = getDateKey(game.created_at);

    if (!acc[dateKey]) {
      acc[dateKey] = {
        dateObj,
        games: 0,
        wins: 0,
        losses: 0,
        gamesList: [],
      };
    }

    acc[dateKey].games += 1;

    if (game.is_win) {
      acc[dateKey].wins += 1;
    } else {
      acc[dateKey].losses += 1;
    }

    acc[dateKey].gamesList.push(game);

    return acc;
  }, {});

  // Helper to format date label
  const getDateLabel = (dateObj) => {
    const today = new Date();

    const todayKey = getDateKey(today);
    const dateKey = getDateKey(dateObj);

    // Create yesterday using the local date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayKey = getDateKey(yesterday);

    if (dateKey === todayKey) return "Today";
    if (dateKey === yesterdayKey) return "Yesterday";

    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400">
        <p>Something went wrong while loading your history.</p>
      </div>
    );
  }

  if (!history.length) return <span className="text-white md:text-lg">No history found.</span>;

  return (
    <div className="min-h-screen  text-white p-6 md:p-10 font-sans flex flex-col gap-8">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-serif italic text-slate-100 tracking-wide">
        Game history
      </h1>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Total Games */}
        <div className="bg-twilight-500 border border-white/5 p-6 rounded-2xl flex flex-col gap-2 shadow-lg">
          <span className="text-sm font-medium text-slate-400">
            Total games
          </span>

          <span className="text-4xl font-bold text-white">{totalGames}</span>
        </div>

        {/* Total Won */}
        <div className="bg-ocean-500 border border-white/5 p-6 rounded-2xl flex flex-col gap-2 shadow-lg">
          <span className="text-sm font-medium text-slate-400">Total won</span>

          <span className="text-4xl font-bold ">{totalWins}</span>
        </div>

        {/* Win Rate */}
        <div className="bg-royal-900 border border-white/5 p-6 rounded-2xl flex flex-col gap-2 shadow-lg">
          <span className="text-sm font-medium text-slate-400">Win rate</span>

          <span className="text-4xl font-bold text-[#e0a94d]">{winRate}%</span>
        </div>
      </div>

      {/* Empty State */}
      {history.length === 0 && (
        <div className="py-16 text-center text-slate-400 bg-[#26303d]/50 rounded-2xl border border-white/5">
          <p className="text-lg">No games played yet.</p>
        </div>
      )}

      {/* Day-wise History */}
      {Object.entries(groupedHistory).map(([dateKey, day]) => {
        const dateLabel = getDateLabel(day.dateObj);

        const dateSubtext = day.dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return (
          <div key={dateKey} className="flex flex-col gap-4 mt-2">
            {/* Day Header */}
            <div className="flex items-baseline gap-3 text-slate-300">
              <h2 className="text-xl font-bold text-white">{dateLabel}</h2>

              <span className="text-sm text-slate-400 font-medium">
                {dateSubtext} · {day.games} {day.games === 1 ? "game" : "games"}{" "}
                · {day.wins} won · {day.losses} lost
              </span>
            </div>

            {/* Bingo Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {day.gamesList.map((saved, index) => {
                const numbers = [...saved.pattern].sort(
                  (a, b) => a.index - b.index,
                );

                const timeString = new Date(
                  saved.created_at,
                ).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <div
                    key={saved.id ?? index}
                    className="bg-[#31525d] border border-white/5 rounded-2xl p-4 flex flex-col gap-4 shadow-xl hover:border-white/10 transition-colors"
                  >
                    {/* Bingo Card View */}
                    <div className="w-full flex justify-center">
                      <BingoCard
                        mode="saved"
                        numbers={numbers}
                        theme={"#31525d"}
                      />
                    </div>

                    {/* Card Footer: Time & Win/Loss Pill */}
                    <div className="flex items-center justify-between pt-2 text-xs font-medium text-slate-400">
                      <span>{timeString}</span>

                      {saved.is_win ? (
                        <span className="bg-[#128a71] text-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <svg
                            className="w-3.5 h-3.5 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Won vs bot
                        </span>
                      ) : (
                        <span className="bg-[#334155]/80 text-slate-300 px-3 py-1 rounded-full flex items-center gap-1">
                          Lost vs bot
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HistoryContainer;
