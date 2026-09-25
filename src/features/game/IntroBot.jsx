import { useGameTheme } from "../../contexts/GameThemeContext";

import Button from "../../components/ui/Button";
import FemaleBingoBot from "../../components/ui/GameplayBackground";

function IntroBot({ startGame, introMessage, playerName, botName }) {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-3 xs:px-4 py-6 overflow-y-auto animate-challenge">
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundColor: `${GAME_THEME.pageDark}e8`,
        }}
      />

      <div
        className="absolute left-[5%] sm:left-[10%] top-[35%] w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl"
        style={{ backgroundColor: GAME_THEME.playerSoft }}
      />

      <div
        className="absolute right-[5%] sm:right-[10%] top-[25%] w-36 h-36 sm:w-44 sm:h-44 rounded-full blur-3xl"
        style={{ backgroundColor: GAME_THEME.botSoft }}
      />

      <div className="relative z-10 w-full max-w-lg px-0 xs:px-2 sm:px-4">
        <div className="flex items-center justify-between gap-1 xs:gap-2 sm:gap-6">
          {/* PLAYER */}

          <div className="flex-1 min-w-0 flex flex-col items-center animate-player-enter">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-full border"
                style={{
                  borderColor: `${GAME_THEME.player}50`,
                }}
              />

              <div
                className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${GAME_THEME.player}99, ${GAME_THEME.surface})`,
                  borderColor: `${GAME_THEME.player}aa`,
                  boxShadow: `0 0 30px ${GAME_THEME.playerGlow}`,
                }}
              >
                <span
                  className="text-2xl xs:text-3xl sm:text-4xl font-bold"
                  style={{ color: GAME_THEME.text }}
                >
                  {playerName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <span
              className="mt-3 max-w-full truncate px-1 text-[9px] xs:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.18em]"
              style={{ color: GAME_THEME.muted }}
            >
              {playerName}
            </span>
          </div>

          {/* VS */}

          <div className="shrink-0 animate-vs-pop">
            <div
              className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center"
              style={{
                backgroundColor: GAME_THEME.surface,
                borderColor: `${GAME_THEME.accent}66`,
                boxShadow: `0 0 20px ${GAME_THEME.goldGlow}`,
              }}
            >
              <span
                className="text-[8px] xs:text-[9px] sm:text-[10px] font-extrabold tracking-wider"
                style={{ color: GAME_THEME.accent }}
              >
                VS
              </span>

              <div
                className="absolute inset-[-4px] xs:inset-[-5px] rounded-full border"
                style={{
                  borderColor: `${GAME_THEME.accent}25`,
                }}
              />
            </div>
          </div>

          {/* BOT */}

          <div className="shrink-0 flex justify-center animate-bot-enter">
            <div className="relative">
              <div className="absolute right-[65%] xs:right-[70%] sm:right-[76%] top-[-48px] xs:top-[-55px] sm:top-[-65px] w-[130px] xs:w-[155px] sm:w-[180px] z-20 animate-bubble-enter">
                <div
                  className="relative border rounded-2xl rounded-br-sm px-2.5 xs:px-3 py-2 xs:py-2.5 text-center shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
                  style={{
                    background: `linear-gradient(135deg, ${GAME_THEME.bot}, ${GAME_THEME.surface})`,
                    borderColor: GAME_THEME.botBorder,
                  }}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: GAME_THEME.bot }}
                    />

                    <span
                      className="text-[8px] xs:text-[9px] uppercase tracking-widest"
                      style={{ color: GAME_THEME.muted }}
                    >
                      {botName}
                    </span>
                  </div>

                  <p
                    className="text-[10px] xs:text-xs sm:text-sm font-medium leading-relaxed"
                    style={{ color: GAME_THEME.text }}
                  >
                    {introMessage}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute inset-4 rounded-full blur-2xl"
                  style={{
                    backgroundColor: GAME_THEME.botSoft,
                  }}
                />

                <FemaleBingoBot
                  showFullRobot={true}
                  className="relative scale-[0.65] xs:scale-[0.75] sm:scale-90 origin-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-7 sm:mt-9">
          <Button
            style="glass"
            classes="hover:bg-amber !text-amber hover:!text-white/70 !border-amber"
            onClick={startGame}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IntroBot;
