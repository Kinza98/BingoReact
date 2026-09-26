function HistoryHeader({ onDelete, isDeleting }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-slate-600 sm:text-xs dark:text-text-muted">
            Your games
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-text">
            Game History
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-text-subtle">
            A look back at your games against the bot.
          </p>
        </div>

        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="self-start cursor-pointer rounded-xl border border-danger/50 bg-danger px-4 py-2 text-xs font-semibold text-[#d5a9ba] transition-all duration-200 hover:border-[#a35b78]/60 hover:bg-danger/70 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto sm:text-sm"
        >
          {isDeleting ? "Deleting..." : "Delete History"}
        </button>
      </div>
    </div>
  );
}

export default HistoryHeader;
