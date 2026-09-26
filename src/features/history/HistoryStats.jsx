import StatsCard from "../../components/ui/StatsCard";

function HistoryStats({ totalGames, totalWins, totalLosses, winRate }) {
  return (
    <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      <StatsCard
        label="Total Games"
        value={totalGames}
        description="Games played"
        backgroundColor="bg-ocean-500/30 dark:bg-[#172a33]"
        borderColor="border-slate-400/50 dark:border-player/50"
        labelColor="text-slate-700 dark:text-text-muted"
        descriptionColor="text-slate-600 dark:text-text-subtle"
      />

      <StatsCard
        label="Total Wins"
        value={totalWins}
        description="Games won"
        backgroundColor="bg-twilight-500/50 dark:bg-[#17332f]"
        borderColor="border-teal-600/40 dark:border-success/50"
        labelColor="text-twilight-500 dark:text-success"
        descriptionColor="text-slate-600 dark:text-text-muted"
      />

      <StatsCard
        label="Win Rate"
        value={`${winRate}%`}
        description="Overall performance"
        valueColor="text-yellow-900 dark:text-gold"
        backgroundColor="bg-yellow-700/50 dark:bg-[#352d1d]"
        borderColor="border-yellow-900 dark:border-gold/40"
        labelColor="text-yellow-900 dark:text-gold"
        descriptionColor="text-slate-600 dark:text-text-muted"
        extra={
          <span className="pb-1 text-xs text-slate-600 dark:text-text-muted">
            {totalLosses} {totalLosses === 1 ? "loss" : "losses"}
          </span>
        }
      />
    </div>
  );
}

export default HistoryStats;
