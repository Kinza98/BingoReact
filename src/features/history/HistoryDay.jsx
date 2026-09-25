import HistoryGameCard from "./HistoryGameCard";

function HistoryDay({ day }) {
  const dateLabel = (() => {
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    if (day.dateObj.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (day.dateObj.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return day.dateObj.toLocaleDateString("en-US", {
      weekday: "long",
    });
  })();

  const dateSubtext = day.dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-text">{dateLabel}</h2>

        <span className="text-xs sm:text-sm text-text-muted">
          {dateSubtext}
        </span>

        <span className="hidden sm:block text-text-subtle">·</span>

        <span className="text-xs sm:text-sm text-text-muted">
          {day.games} {day.games === 1 ? "game" : "games"}
        </span>

        <span className="text-xs text-success">{day.wins} won</span>

        <span className="text-xs text-bot">{day.losses} lost</span>
      </div>

      <div className="h-px bg-gradient-to-r from-border via-border to-transparent" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {day.gamesList.map((saved, index) => (
          <HistoryGameCard key={saved.id ?? index} game={saved} index={index} />
        ))}
      </div>
    </div>
  );
}

export default HistoryDay;
