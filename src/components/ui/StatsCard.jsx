function StatsCard({
  label,
  value,
  description,
  valueColor = "text-slate-900 dark:text-text",
  backgroundColor = "bg-slate-200/80 dark:bg-surface",
  borderColor = "border-slate-400/30 dark:border-border",
  labelColor = "text-slate-700 dark:text-text-muted",
  descriptionColor = "text-slate-600 dark:text-text-subtle",
  extra,
}) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 sm:px-6 sm:py-5 ${backgroundColor} ${borderColor}`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wider ${labelColor}`}
      >
        {label}
      </p>

      <div className="flex items-end gap-2">
        <p className={`mt-2 text-3xl font-bold ${valueColor}`}>{value}</p>

        {extra}
      </div>

      <p className={`mt-1 text-xs ${descriptionColor}`}>{description}</p>
    </div>
  );
}

export default StatsCard;
