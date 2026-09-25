import { HiBookmark } from "react-icons/hi";

function SavePatternButton({ onClick, isSaved = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isSaved ? "Remove saved card" : "Save pattern"}
      title={isSaved ? "Remove from saved cards" : "Save pattern"}
      className={`
        group
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        shadow-lg
        backdrop-blur-sm
        transition-all
        duration-200
        hover:scale-110
        active:scale-95
        sm:h-10
        sm:w-10
        ${
          isSaved
            ? "border-amber/30 bg-neon-700 text-amber hover:bg-neon-700"
            : "border-white/10 bg-neon-700/80 text-slate-200 hover:bg-neon-700 hover:text-amber"
        }
      `}
    >
      <HiBookmark className="h-4 w-4 transition-colors sm:h-5 sm:w-5" />
    </button>
  );
}

export default SavePatternButton;
