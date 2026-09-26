import { useState } from "react";

import { useGameHistory } from "./useGetHistory";
import { useDeleteHistory } from "./useDeleteHistory";

import Spinner from "../../components/ui/Spinner";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import { useAuth } from "../../contexts/AuthContext";

import HistoryStats from "./HistoryStats";
import HistoryHeader from "./HistoryHeader";
import HistoryDay from "./HistoryDay";

function HistoryContainer() {
  const { userId } = useAuth();

  const { history = [], error, isLoading } = useGameHistory(userId);

  const { deleteHistory, isDeleting } = useDeleteHistory(userId);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const totalGames = history.length;
  const totalWins = history.filter((game) => game.is_win).length;
  const totalLosses = totalGames - totalWins;

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

  const handleDeleteHistory = () => {
    deleteHistory();
    setShowDeleteConfirm(false);
  };

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="rounded-2xl border border-[#a35b78]/20 bg-[#491a1a]/30 p-5 text-[#d5a9ba]">
        <p className="text-sm">
          Something went wrong while loading your history.
        </p>
      </div>
    );
  }

  if (!history.length) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-text">
          No games played yet
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-500">
          Your completed Bingo games will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-6 text-slate-900 sm:px-6 md:px-8 lg:px-10 dark:text-text">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <HistoryHeader
          onDelete={() => setShowDeleteConfirm(true)}
          isDeleting={isDeleting}
        />

        {/* =====================================================
            STATS
        ====================================================== */}
        <HistoryStats
          totalGames={totalGames}
          totalWins={totalWins}
          totalLosses={totalLosses}
          winRate={winRate}
        />

        {/* =====================================================
            DAY-WISE HISTORY
        ====================================================== */}
        <div className="flex flex-col gap-10">
          {Object.entries(groupedHistory).map(([dateKey, day]) => (
            <HistoryDay key={dateKey} day={day} />
          ))}
        </div>
      </div>

      <ConfirmDialog
        show={showDeleteConfirm}
        title="Delete game history?"
        message="This will permanently delete all of your saved Bingo games. This action cannot be undone."
        confirmText="Delete History"
        onConfirm={handleDeleteHistory}
        onCancel={() => setShowDeleteConfirm(false)}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default HistoryContainer;
