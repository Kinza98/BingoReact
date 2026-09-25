import { HiArrowLeft } from "react-icons/hi";

function SavedCardsBackButton({ onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="
        mt-4 flex items-center gap-2
        rounded-full
        border border-white/10
        bg-neon-800/80
        px-4 py-2
        text-xs font-medium
        text-slate-300
        transition-all duration-200
        hover:bg-ocean-900
        hover:text-white
        active:scale-95
        cursor-pointer
      "
    >
      <HiArrowLeft className="h-4 w-4" />
      Back to Saved Cards
    </button>
  );
}

export default SavedCardsBackButton;
