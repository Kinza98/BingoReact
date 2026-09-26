import { HiRefresh } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useGameTheme } from "../../contexts/GameThemeContext";
import BingoCelebration from "./BingoCelebration";
import BotMessage from "./BotMessage";
import AnimatedBotMessage from "./AnimatedBotMessage";

const BINGO_LETTERS = ["B", "I", "N", "G", "O"];

function Result({ endMessage, handleRestart, botName, isWin }) {
  const { theme: GAME_THEME } = useGameTheme();

  const ballColors = [
    GAME_THEME.accent,
    GAME_THEME.player,
    GAME_THEME.bot,
    GAME_THEME.accent,
    GAME_THEME.player,
  ];

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center overflow-y-auto px-3 py-4 xs:px-4">
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundColor: `${GAME_THEME.pageDark}e8`,
        }}
      />

      <div
        className="absolute h-56 w-56 rounded-full blur-3xl opacity-20 sm:h-72 sm:w-72"
        style={{
          backgroundColor: isWin ? GAME_THEME.accent : GAME_THEME.bot,
        }}
      />

      {isWin && <BingoCelebration show position="center" />}

      <div
        className="relative z-10 w-full max-w-sm animate-result-enter rounded-3xl border p-5 text-center shadow-2xl xs:p-6 sm:p-8"
        style={{
          backgroundColor: GAME_THEME.surface,
          borderColor: isWin ? `${GAME_THEME.accent}80` : GAME_THEME.botBorder,
          boxShadow: isWin
            ? `0 0 45px ${GAME_THEME.goldGlow}`
            : `0 0 45px ${GAME_THEME.botGlow}`,
        }}
      >
        <div className="animate-result-text">
          <div className="mb-3 flex justify-center gap-2">
            {BINGO_LETTERS.map((letter, i) => (
              <div
                key={letter}
                className="animate-ball-pop dark:text-white/80! flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold xs:h-9 xs:w-9"
                style={{
                  backgroundColor: isWin
                    ? `${ballColors[i]}30`
                    : `${GAME_THEME.bot}20`,
                  color: isWin ? ballColors[i] : GAME_THEME.bot,
                  border: `1px solid ${
                    isWin ? `${ballColors[i]}60` : `${GAME_THEME.bot}50`
                  }`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {letter}
              </div>
            ))}
          </div>

          <p
            className="mb-2 text-[10px] dark:!text-white/80 font-bold uppercase tracking-[0.15em] xs:text-xs sm:tracking-[0.2em]"
            style={{
              color: isWin ? GAME_THEME.accent : GAME_THEME.bot,
            }}
          >
            {isWin ? "Bingo Champion" : "Round Over"}
          </p>

          <h2
            className="text-2xl font-extrabold leading-tight xs:text-3xl sm:text-4xl"
            style={{ color: GAME_THEME.text }}
          >
            {isWin ? "You won! 🎉" : "So close! 😔"}
          </h2>

          <p
            className="mt-3 text-xs leading-relaxed xs:text-sm sm:text-base"
            style={{ color: GAME_THEME.text }}
          >
            {isWin
              ? "Five lines, clean sweep. That's a full house."
              : `${botName} got there first this time. Don't give up! 🎯`}
          </p>
        </div>

        {endMessage && (
          <AnimatedBotMessage
            message={endMessage}
            botName={botName}
            theme={GAME_THEME}
          />
        )}

        <div className="mt-6 flex flex-col gap-3 sm:mt-7">
          <button
            type="button"
            onClick={handleRestart}
            className="w-full cursor-pointer rounded-xl py-2.5 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 xs:py-3 xs:text-sm"
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
            <HiRefresh className="mr-1 inline" />
            Play Again
          </button>

          <Link
            to="/game"
            className="w-full rounded-xl py-2.5 text-center text-xs font-semibold transition-all duration-200 active:scale-95 xs:py-3 xs:text-sm"
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
