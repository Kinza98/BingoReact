import BingoCard from "../../components/bingoGame/BingoCard";
import BingoScore from "../../components/bingoGame/BingoScore";
import FemaleBingoBot from "../../components/ui/GameplayBackground";
import { useGameTheme } from "../../contexts/GameThemeContext";

function GameCard({ type, name, numbers, score, isTurn, onClick }) {
  const { theme } = useGameTheme();

  const isPlayer = type === "player";

  const gameTheme = isPlayer ? theme.player : theme.bot;
  const softTheme = isPlayer ? theme.playerSoft : theme.botSoft;
  const borderTheme = isPlayer ? theme.playerBorder : theme.botBorder;

  const statusText = isPlayer
    ? isTurn
      ? "Your turn"
      : "Waiting"
    : isTurn
      ? "Thinking..."
      : "Waiting";

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <div className="relative shrink-0">
          <div
            className="absolute -inset-1 rounded-full"
            style={{
              backgroundColor: softTheme,
            }}
          />

          <div
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border"
            style={{
              borderColor: borderTheme,
              background: gameTheme,
            }}
          >
            {isPlayer ? (
              <span
                className={`text-sm font-bold `}
                style={{ color: theme.text }}
              >
                {name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <FemaleBingoBot
                  showFullRobot={false}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <span
            className="block truncate text-sm font-semibold xs:text-base"
            style={{
              color: isPlayer ? theme.text : `${theme.text}cc`,
            }}
          >
            {name}
          </span>

          <span
            className="flex items-center gap-1.5 text-[11px]"
            style={{ color: theme.muted }}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isTurn
                  ? isPlayer
                    ? "dark:bg-green-400 bg-green-600"
                    : "animate-pulse dark:bg-green-400 bg-green-600"
                  : "bg-slate-400/40 dark:bg-white/20"
              }`}
            />

            {statusText}
          </span>
        </div>
      </div>

      {/* Bingo Card */}
      <div className="relative">
        <div
          className="absolute -inset-1 rounded-3xl blur-sm"
          style={{
            backgroundColor: softTheme,
          }}
        />

        <div className="relative">
          <BingoCard
            numbers={numbers}
            mode={isPlayer ? "play" : "bot"}
            onClick={isPlayer && isTurn ? onClick : undefined}
            theme={gameTheme}
          >
            <BingoScore score={score} />
          </BingoCard>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
