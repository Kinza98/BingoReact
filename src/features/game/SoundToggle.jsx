import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

function SoundToggle({ soundOn, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
      title={soundOn ? "Turn sound off" : "Turn sound on"}
      className="fixed bottom-4 cursor-pointer left-4 z-40 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: "rgba(24, 47, 54, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        color: soundOn ? "#e8a33d" : "#9db2b7",
      }}
    >
      {soundOn ? (
        <HiVolumeUp className="w-5 h-5" />
      ) : (
        <HiVolumeOff className="w-5 h-5" />
      )}
    </button>
  );
}

export default SoundToggle;
