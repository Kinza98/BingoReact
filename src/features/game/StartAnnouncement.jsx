import { useGameTheme } from "../../contexts/GameThemeContext";

function StartAnnouncement() {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center">
      <p
        className="animate-start-game text-center text-3xl font-black uppercase tracking-widest xs:text-4xl sm:text-5xl"
        style={{
          color: GAME_THEME.accent,
          textShadow: `0 0 30px ${GAME_THEME.goldGlow}`,
        }}
      >
        Let's Play!
      </p>
    </div>
  );
}

export default StartAnnouncement;
