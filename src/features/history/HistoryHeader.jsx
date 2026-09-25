function HistoryHeader({ onDelete, isDeleting }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-text-muted mb-1">
            Your games
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Game History
          </h1>

          <p className="mt-2 text-sm text-text-subtle">
            A look back at your games against the bot.
          </p>
        </div>

        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="self-start cursor-pointer sm:self-auto px-4 py-2 rounded-xl border border-danger/50 bg-danger/40 text-[#d5a9ba] text-xs sm:text-sm font-semibold transition-all duration-200 hover:bg-danger/70 hover:border-[#a35b78]/60 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? "Deleting..." : "Delete History"}
        </button>
      </div>
    </div>
  );
}

export default HistoryHeader;
