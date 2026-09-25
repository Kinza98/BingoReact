import { useGameTheme } from "../../contexts/GameThemeContext";
import { HiX } from "react-icons/hi";

function InactivityComment({ comment, updateComment }) {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <div
      onClick={() => updateComment(null)}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto px-3 xs:px-4 py-4 overflow-y-auto backdrop-blur-[6px] cursor-pointer"
      style={{
        background: `
          radial-gradient(
            circle at 50% 50%,
            ${GAME_THEME.player}18 0%,
            transparent 35%
          ),
          ${GAME_THEME.pageDark}dd
        `,
      }}
    >
      <div
        className="relative w-full max-w-72 overflow-hidden rounded-4xl border-2 px-6 py-7 text-center cursor-default animate-pop-in"
        style={{
          background: `
            radial-gradient(
              circle at 50% 0%,
              ${GAME_THEME.player}28 0%,
              transparent 42%
            ),
            radial-gradient(
              circle at 100% 100%,
              ${GAME_THEME.player}12 0%,
              transparent 40%
            ),
            ${GAME_THEME.surface}
          `,
          borderColor: GAME_THEME.playerBorder,
          boxShadow: `
            0 20px 60px rgba(0,0,0,0.5),
            0 0 35px ${GAME_THEME.playerGlow}
          `,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            backgroundColor: GAME_THEME.player,
            boxShadow: `0 0 18px ${GAME_THEME.playerGlow}`,
          }}
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            updateComment(null);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
          style={{
            backgroundColor: `${GAME_THEME.player}18`,
            color: GAME_THEME.text,
            border: `1px solid ${GAME_THEME.playerBorder}70`,
          }}
          aria-label="Close"
        >
          <HiX className="w-4 h-4" />
        </button>

        <div className="relative flex justify-center mb-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-5xl animate-eye-dart"
            style={{
              backgroundColor: `${GAME_THEME.player}18`,
              border: `2px solid ${GAME_THEME.playerBorder}`,
              boxShadow: `
                0 0 0 6px ${GAME_THEME.player}08,
                0 8px 25px ${GAME_THEME.playerGlow}
              `,
            }}
          >
            👀
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          <span
            className="text-xs uppercase tracking-[0.3em] font-extrabold"
            style={{
              color: GAME_THEME.player,
            }}
          >
            Hey...
          </span>

          <p
            className="text-sm sm:text-base font-secondary leading-relaxed font-semibold"
            style={{
              color: GAME_THEME.text,
            }}
          >
            {comment}
          </p>
        </div>

        <div className="relative mt-5 flex justify-center">
          <div
            className="w-10 h-1 rounded-full"
            style={{
              backgroundColor: GAME_THEME.player,
              boxShadow: `0 0 10px ${GAME_THEME.playerGlow}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default InactivityComment;
