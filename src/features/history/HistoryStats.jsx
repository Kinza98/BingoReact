import StatsCard from "../../components/ui/StatsCard";

function HistoryStats({ totalGames, totalWins, totalLosses, winRate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
      <StatsCard
        label="Total Games"
        value={totalGames}
        description="Games played"
        backgroundColor="bg-[#172a33]"
        borderColor="border-player/50"
        labelColor="text-text-muted"
        descriptionColor="text-text-subtle"
      />

      <StatsCard
        label="Total Wins"
        value={totalWins}
        description="Games won"
        backgroundColor="bg-[#17332f]"
        borderColor="border-success/50"
        labelColor="text-success"
        descriptionColor="text-text-muted"
      />

      <StatsCard
        label="Win Rate"
        value={`${winRate}%`}
        description="Overall performance"
        valueColor="text-gold"
        backgroundColor="bg-[#352d1d]"
        borderColor="border-gold/40"
        labelColor="text-gold"
        descriptionColor="text-text-muted"
        extra={
          <span className="pb-1 text-xs text-text-muted">
            {totalLosses} {totalLosses === 1 ? "loss" : "losses"}
          </span>
        }
      />
    </div>
  );
}

export default HistoryStats;
