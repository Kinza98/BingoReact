import BingoCard from "../../components/bingoGame/BingoCard";
import { useAuth } from "../../contexts/AuthContext";
import { useGameHistory } from "./useGetHistory";

function HistoryContainer() {
  const { userId } = useAuth();

  const { history = [], error } = useGameHistory(userId);

  const totalGames = history.length;

  const totalWins = history.filter((game) => game.is_win).length;

  const totalLosses = history.filter((game) => !game.is_win).length;

  const groupedHistory = history.reduce((acc, game) => {
    const date = new Date(game.created_at).toLocaleDateString();

    if (!acc[date]) {
      acc[date] = {
        games: 0,
        wins: 0,
        losses: 0,
        gamesList: [],
      };
    }

    acc[date].games += 1;

    if (game.is_win) {
      acc[date].wins += 1;
    } else {
      acc[date].losses += 1;
    }

    acc[date].gamesList.push(game);

    return acc;
  }, {});

  if (error) {
    return <p>Something went wrong while loading your history.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Overall Stats */}
      <div className="flex gap-6">
        <div>
          <p>Total Games</p>
          <span>{totalGames}</span>
        </div>

        <div>
          <p>Won</p>
          <span>{totalWins}</span>
        </div>

        <div>
          <p>Lost</p>
          <span>{totalLosses}</span>
        </div>
      </div>

      {/* Empty State */}
      {history.length === 0 && <p>No games played yet.</p>}

      {/* Day-wise History */}
      {Object.entries(groupedHistory).map(([date, day]) => (
        <div key={date} className="flex flex-col gap-5">
          {/* Day Header */}
          <div className="flex flex-col gap-2">
            <span className="w-full h-1 bg-black/50 block"></span>

            <h2 className="text-xl font-semibold">{date}</h2>

            <div className="flex gap-5">
              <span>Games: {day.games}</span>
              <span>Won: {day.wins}</span>
              <span>Lost: {day.losses}</span>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-wrap gap-6">
            {day.gamesList.map((saved, index) => {
              const numbers = [...saved.pattern].sort(
                (a, b) => a.index - b.index,
              );

              return (
                <div className="flex gap-2 flex-col" key={index}>
                  <div>
                    {saved.is_win
                      ? "You won against bot"
                      : "You lost against bot"}
                  </div>

                  <BingoCard
                    mode="saved"
                    numbers={numbers}
                    theme={saved.card_theme}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryContainer;
