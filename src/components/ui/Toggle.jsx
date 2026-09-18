function Toggle({ enabled, onChange, theme }) {
  // const bg = `bg-[${theme}]`;
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      style={{ backgroundColor: enabled ? theme : "#4B5563" }}
      className={`relative h-6 w-11 rounded-full transition-colors  ${
        enabled ? ` brightness-75` : "brightness-50"
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
