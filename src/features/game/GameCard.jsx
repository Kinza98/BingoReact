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
    <div className="w-full max-w-md mx-auto space-y-3">
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
            className="relative w-9 h-9 rounded-full border flex items-center justify-center overflow-hidden"
            style={{
              backgroundColor: `${gameTheme}${isPlayer ? "40" : "30"}`,
              borderColor: borderTheme,
            }}
          >
            {isPlayer ? (
              <span className="text-sm font-bold" style={{ color: theme.text }}>
                {name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                <FemaleBingoBot
                  showFullRobot={false}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <span
            className="block text-sm xs:text-base font-semibold truncate"
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
              className={`w-1.5 h-1.5 rounded-full ${
                isTurn
                  ? isPlayer
                    ? "bg-green-400"
                    : "bg-green-400 animate-pulse"
                  : "bg-white/20"
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
