import { HiArrowLeft } from "react-icons/hi";

function SavedCardsBackButton({ onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="
        mt-4 flex items-center gap-2
        rounded-full
        border border-slate-400/40
        bg-slate-300/70
        dark:bg-slate
        px-4 py-2
        text-xs font-medium
        text-slate-700
        transition-all duration-200
        hover:bg-slate-300
        hover:text-slate-900
        active:scale-95
        cursor-pointer
        dark:border-white/10
        dark:bg-neon-800/80
        dark:text-slate-300
        dark:hover:bg-ocean-900
        dark:hover:text-white
      "
    >
      <HiArrowLeft className="h-4 w-4" />
      Back to Saved Cards
    </button>
  );
}

export default SavedCardsBackButton;
