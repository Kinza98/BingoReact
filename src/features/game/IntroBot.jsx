import { useGameTheme } from "../../contexts/GameThemeContext";
import Button from "../../components/ui/Button";
import FemaleBingoBot from "../../components/ui/GameplayBackground";

function IntroBot({
  startGame,
  introMessage,
  playerName,
  botName,
  isPlayerTurn = true,
}) {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto px-4 py-8 backdrop-blur-md"
      style={{
        backgroundColor: `${GAME_THEME.pageDark}d9`,
      }}
    >
      {/* PLAYER / BOT SOFT GLOW */}
      <div
        className="pointer-events-none absolute left-[8%] top-[25%] h-32 w-32 rounded-full blur-3xl sm:h-40 sm:w-40"
        style={{
          backgroundColor: GAME_THEME.playerSoft,
        }}
      />

      <div
        className="pointer-events-none absolute right-[8%] top-[25%] h-36 w-36 rounded-full blur-3xl sm:h-44 sm:w-44"
        style={{
          backgroundColor: GAME_THEME.botSoft,
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* PLAYERS */}
        <div className="mb-6 flex items-center justify-center gap-5 xs:gap-6">
          {/* PLAYER */}
          <div className="flex min-w-0 flex-1 flex-col items-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border-2"
              style={{
                backgroundColor: GAME_THEME.playerSoft,
                borderColor: GAME_THEME.playerBorder,
                boxShadow: `0 0 25px ${GAME_THEME.playerGlow}`,
              }}
            >
              <span
                className="text-2xl font-bold"
                style={{ color: GAME_THEME.text }}
              >
                {playerName.charAt(0).toUpperCase()}
              </span>
            </div>

            <span
              className="mt-3 max-w-full truncate px-1 font-semibold"
              style={{ color: GAME_THEME.text }}
            >
              {playerName}
            </span>

            <span
              className="mt-1 text-[10px] uppercase tracking-wider"
              style={{ color: GAME_THEME.muted }}
            >
              Player
            </span>
          </div>

          {/* VS */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
            style={{
              backgroundColor: GAME_THEME.surface,
              borderColor: `${GAME_THEME.accent}66`,
              color: GAME_THEME.accent,
              boxShadow: `0 0 18px ${GAME_THEME.goldGlow}`,
            }}
          >
            VS
          </div>

          {/* BOT */}
          <div className="flex min-w-0 flex-1 flex-col items-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border-2"
              style={{
                backgroundColor: GAME_THEME.botSoft,
                borderColor: GAME_THEME.botBorder,
                boxShadow: `0 0 25px ${GAME_THEME.botGlow}`,
              }}
            >
              <FemaleBingoBot
                showFullRobot={false}
                className="h-10 w-10 object-contain"
              />
            </div>

            <span
              className="mt-3 max-w-full truncate px-1 font-semibold"
              style={{ color: GAME_THEME.text }}
            >
              {botName}
            </span>

            <span
              className="mt-1 text-[10px] uppercase tracking-wider"
              style={{ color: GAME_THEME.muted }}
            >
              Bingo Bot
            </span>
          </div>
        </div>

        {/* CHAT BUBBLE */}
        <div
          className="mb-8 flex items-start gap-3 rounded-2xl border px-4 py-3"
          style={{
            backgroundColor: GAME_THEME.surface,
            borderColor: GAME_THEME.botBorder,
            boxShadow: `0 10px 30px ${GAME_THEME.botGlow}`,
          }}
        >
          <span
            className="mt-1 h-4 w-4 shrink-0 rounded-sm border-2"
            style={{
              borderColor: GAME_THEME.bot,
              backgroundColor: GAME_THEME.botSoft,
            }}
          />

          <p
            className="text-sm leading-relaxed"
            style={{ color: GAME_THEME.text }}
          >
            <span
              className="font-semibold"
              style={{ color: GAME_THEME.accent }}
            >
              {botName}:
            </span>{" "}
            {introMessage}
          </p>
        </div>

        {/* CONTINUE */}
        <Button
          style="glass"
          classes="w-full rounded-xl border-2 !bg-amber !border-amber !text-white py-3 font-semibold"
          onClick={startGame}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default IntroBot;
