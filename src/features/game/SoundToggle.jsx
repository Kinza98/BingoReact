import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useGameTheme } from "../../contexts/GameThemeContext";

function SoundToggle({ soundOn, onToggle }) {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
      title={soundOn ? "Turn sound off" : "Turn sound on"}
      className="fixed bottom-4 left-4 z-40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: `${GAME_THEME.surface}e8`,
        borderColor: GAME_THEME.playerBorder,
        color: soundOn ? GAME_THEME.accent : GAME_THEME.muted,
        boxShadow: `0 4px 15px ${GAME_THEME.playerGlow}`,
      }}
    >
      {soundOn ? (
        <HiVolumeUp className="h-5 w-5" />
      ) : (
        <HiVolumeOff className="h-5 w-5" />
      )}
    </button>
  );
}

export default SoundToggle;
