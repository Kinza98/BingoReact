function Spinner({ size = "md", fullScreen = false }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
  };

  const spinner = (
    <div
      className={`${sizes[size]} border-4 border-white/30 border-t-white rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#5e4662] z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default Spinner;
