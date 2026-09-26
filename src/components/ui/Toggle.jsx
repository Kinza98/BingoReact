function Toggle({ enabled, onChange, theme }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      style={{ backgroundColor: enabled ? theme : undefined }}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled
          ? "brightness-75"
          : "bg-slate-400 dark:bg-gray-600 brightness-75 dark:brightness-50"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
          enabled ? "translate-x-1" : "-translate-x-5"
        }`}
      />
    </button>
  );
}

export default Toggle;
