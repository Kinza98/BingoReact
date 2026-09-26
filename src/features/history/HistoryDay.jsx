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
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-text">
          {dateLabel}
        </h2>

        <span className="text-xs text-slate-600 sm:text-sm dark:text-text-muted">
          {dateSubtext}
        </span>

        <span className="hidden text-slate-400 sm:block dark:text-text-subtle">
          ·
        </span>

        <span className="text-xs text-slate-600 sm:text-sm dark:text-text-muted">
          {day.games} {day.games === 1 ? "game" : "games"}
        </span>

        <span className="text-xs text-success">{day.wins} won</span>

        <span className="text-xs text-bot">{day.losses} lost</span>
      </div>

      <div className="h-px bg-gradient-to-r from-slate-400/30 via-slate-400/30 to-transparent dark:from-border dark:via-border dark:to-transparent" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {day.gamesList.map((saved, index) => (
          <HistoryGameCard key={saved.id ?? index} game={saved} index={index} />
        ))}
      </div>
    </div>
  );
}

export default HistoryDay;
