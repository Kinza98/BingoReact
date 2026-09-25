import { useGameTheme } from "../../contexts/GameThemeContext";

function CalledNumber({ calledBy, currentNumber }) {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <div className="fixed top-15.5 md:top-6 xs:top-10 sm:top-20 left-0 w-full z-50 flex justify-center pointer-events-none px-3">
      <div
        className="relative flex items-center gap-2 xs:gap-3 pl-3 xs:pl-4 pr-1.5 xs:pr-2 py-1.5 xs:py-2 rounded-full backdrop-blur-md border shadow-[0_10px_35px_rgba(0,0,0,0.3)] animate-pop-in"
        style={{
          backgroundColor:
            calledBy === "you"
              ? `${GAME_THEME.player}e8`
              : `${GAME_THEME.bot}f2`,
          borderColor:
            calledBy === "you" ? GAME_THEME.playerBorder : GAME_THEME.botBorder,
        }}
      >
        <span
          className="text-[10px] xs:text-xs sm:text-sm font-semibold"
          style={{
            color: calledBy === "you" ? GAME_THEME.text : GAME_THEME.muted,
          }}
        >
          {calledBy === "you" ? "You called" : "Bot called"}
        </span>

        <div
          className="relative w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs xs:text-sm sm:text-base font-extrabold shadow-[0_0_18px_rgba(232,163,61,0.4)]"
          style={{
            backgroundColor: GAME_THEME.accent,
            color: GAME_THEME.pageDark,
          }}
        >
          <span>{currentNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default CalledNumber;
