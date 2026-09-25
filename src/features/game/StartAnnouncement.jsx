import { useGameTheme } from "../../contexts/GameThemeContext";

function StartAnnouncement() {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none flex items-center justify-center">
      <p
        className="animate-start-game text-3xl xs:text-4xl sm:text-5xl font-black tracking-widest uppercase text-center"
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
