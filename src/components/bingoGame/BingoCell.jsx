function BingoCell({ num, onChange, index, mode, theme, onClick }) {
  const isPlay = mode === "play" || mode === "bot";
  const isBot = mode === "bot";
  const isHistory = mode === "saved";

  const isWriteMode = Boolean(onChange);
  function handleChange(e) {
    onChange({
      index,
      value: e.target.value,
    });
  }

  function handleClick() {
    onClick({
      index,
      value: num.value,
    });
  }

  const cellSize = isPlay ? "xs:w-20 xs:h-20 " : "xs:w-14 xs:h-14";
  const cellStyle =
    isPlay || isHistory
      ? isBot || isHistory
        ? "cursor-not-allowed"
        : "enabled:hover:brightness-75 cursor-pointer transition"
      : "";
  return (
    <div className={` w-10 h-10 ${cellSize} w- border border-white/9`}>
      {!isWriteMode ? (
        <button
          onClick={onClick ? handleClick : undefined}
          disabled={isPlay || isHistory ? num.checked : false}
          style={{ "--cell-theme": theme }}
          className={`relative disabled:cursor-not-allowed  w-full h-full text-sm xs:text-lg bg-(--cell-theme) ${cellStyle} font-secondary text-white`}
        >
          {(isPlay || isHistory) && num.checked && (
            <span
              style={{ "--cell-theme": theme }}
              className={`absolute inset-0 z-10 bg-(--cell-theme)/50 brightness-75 flex items-center justify-center text-5xl font-light`}
            >
              <span className={`relative block ${cellSize} `}>
                <span className="absolute left-1/2 top-1/2 w-full h-px bg-white -translate-x-1/2 -translate-y-1/2 rotate-45" />
                <span className="absolute left-1/2 top-1/2 w-full h-px bg-white -translate-x-1/2 -translate-y-1/2 -rotate-45" />
              </span>
            </span>
          )}
          {isPlay || isHistory ? (
            isBot || isHistory ? (
              <span
                className={`${isBot && num.checked ? "opacity-50" : isHistory ? "" : "blur"}`}
              >
                {num.value}
              </span>
            ) : (
              num.value
            )
          ) : (
            num
          )}
        </button>
      ) : (
        <input
          value={num}
          type="text"
          maxLength={2}
          className="w-full h-full outline-0 border-0 text-center"
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default BingoCell;
