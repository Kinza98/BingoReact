import { HiRefresh } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useGameTheme } from "../../contexts/GameThemeContext";
import FemaleBingoBot from "../../components/ui/GameplayBackground";
import BotMessage from "./BotMessage";

function Result({ isWin, endMessage, handleRestart, botName }) {
  const { theme: GAME_THEME } = useGameTheme();
  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center px-3 xs:px-4 py-4 overflow-y-auto">
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundColor: `${GAME_THEME.pageDark}e8`,
        }}
      />

      <div
        className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-20"
        style={{
          backgroundColor: isWin ? GAME_THEME.accent : GAME_THEME.bot,
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm rounded-3xl border p-5 xs:p-6 sm:p-8 text-center shadow-2xl animate-result-enter"
        style={{
          backgroundColor: isWin ? GAME_THEME.surface : GAME_THEME.pageDark,
          borderColor: isWin ? `${GAME_THEME.accent}80` : GAME_THEME.botBorder,
          boxShadow: isWin
            ? `0 0 45px ${GAME_THEME.goldGlow}`
            : `0 0 45px ${GAME_THEME.botGlow}`,
        }}
      >
        <div className="animate-result-text">
          <p
            className="text-[10px] xs:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2"
            style={{
              color: isWin ? GAME_THEME.accent : GAME_THEME.muted,
            }}
          >
            {isWin ? "Bingo Champion" : "Round Over"}
          </p>

          <h2
            className="text-2xl xs:text-3xl sm:text-4xl font-extrabold leading-tight"
            style={{ color: GAME_THEME.text }}
          >
            {isWin ? "You won!" : "So close!"}
          </h2>

          <p
            className="mt-3 text-xs xs:text-sm sm:text-base leading-relaxed"
            style={{ color: GAME_THEME.text }}
          >
            {isWin
              ? "You got all 5 lines before the bot. 🔥"
              : `${botName} got there first this time. Keep going! 🎯`}
          </p>
        </div>

        {endMessage && <BotMessage message={endMessage} botName={botName} />}

        <div className="mt-6 sm:mt-7 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="w-full cursor-pointer py-2.5 xs:py-3 rounded-xl text-xs xs:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: isWin
                ? `linear-gradient(90deg, ${GAME_THEME.accent}, #c98f25)`
                : `linear-gradient(90deg, ${GAME_THEME.bot}, ${GAME_THEME.player})`,
              color: GAME_THEME.pageDark,
              boxShadow: isWin
                ? `0 8px 25px ${GAME_THEME.goldGlow}`
                : `0 8px 25px ${GAME_THEME.botGlow}`,
            }}
          >
            <HiRefresh className="inline mr-1" />
            Play Again
          </button>

          <Link
            to="/game"
            className="w-full py-2.5 xs:py-3 rounded-xl text-xs xs:text-sm font-semibold text-center transition-all duration-200 active:scale-95"
            style={{
              backgroundColor: GAME_THEME.surfaceLight,
              border: `1px solid ${GAME_THEME.playerBorder}`,
              color: GAME_THEME.text,
            }}
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
