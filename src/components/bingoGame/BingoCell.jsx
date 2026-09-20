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
        : onClick
          ? "enabled:hover:bg-white/[0.06] cursor-pointer transition-colors duration-200"
          : ""
      : "";

  const cornerClass =
    index === 0
      ? "rounded-tl-xl"
      : index === 4
        ? "rounded-tr-xl"
        : index === 20
          ? "rounded-bl-xl"
          : index === 24
            ? "rounded-br-xl"
            : "";

  return (
    <div
      className={`
        w-10 h-10
        ${cellSize}
        border border-white/[0.12]
        overflow-hidden
        ${cornerClass}
      `}
    >
      {!isWriteMode ? (
        <button
          onClick={onClick ? handleClick : undefined}
          disabled={isPlay || isHistory ? num.checked : false}
          style={{ "--cell-theme": theme }}
          className={`
            relative
            disabled:cursor-not-allowed
            w-full h-full
            text-sm xs:text-lg
            bg-(--cell-theme)
            ${cellStyle}
            font-secondary
            text-white
            overflow-hidden
            ${cornerClass}
          `}
        >
          {isPlay && !num.checked && (
            <span
              className="
                absolute inset-0
                bg-gradient-to-br
                from-white/[0.05]
                via-transparent
                to-black/[0.08]
                pointer-events-none
              "
            />
          )}

          {(isPlay || isHistory) && num.checked && (
            <span
              className="
                absolute inset-0 z-10
                bg-black/20
                flex items-center justify-center
              "
            >
              <span
                className="
                  absolute
                  left-1/2 top-1/2
                  w-[72%] h-[2px]
                  bg-[#f2b544]
                  rounded-full
                  -translate-x-1/2
                  -translate-y-1/2
                  rotate-45
                "
              />

              <span
                className="
                  absolute
                  left-1/2 top-1/2
                  w-[72%] h-[2px]
                  bg-[#f2b544]
                  rounded-full
                  -translate-x-1/2
                  -translate-y-1/2
                  -rotate-45
                "
              />
            </span>
          )}

          {isPlay || isHistory ? (
            isBot || isHistory ? (
              <span
                className={`relative z-0 ${
                  isBot && num.checked ? "opacity-40" : isHistory ? "" : "blur"
                }`}
              >
                {num.value}
              </span>
            ) : (
              <span className="relative z-0">{num.value}</span>
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
          className={`w-full h-full outline-0 border-0 text-center ${cornerClass}`}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default BingoCell;
