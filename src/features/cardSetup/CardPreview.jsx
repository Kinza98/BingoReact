import { HiCheck } from "react-icons/hi";

import BingoCard from "../../components/bingoGame/BingoCard";
import BingoGame from "../bingo/BingoGame";
import SavePatternButton from "../../components/ui/SavePatternButton";

function CardPreview({
  isWriteMode,
  selectedPattern,
  currentPattern,
  mode,
  previewNumbers,
  isCurrentCardSaved,
  onCardClick,
  onBookmark,
  onSavePattern,
}) {
  return (
    <div
      role="button"
      tabIndex={isWriteMode ? -1 : 0}
      onClick={isWriteMode ? undefined : onCardClick}
      onKeyDown={(e) => {
        if (!isWriteMode && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onCardClick();
        }
      }}
      className={`
  relative z-10 mx-auto flex w-min min-w-0 justify-center
  rounded-[1.25rem]
  p-1.5
  text-left
  transition-all duration-300
  xs:rounded-[1.5rem]
  xs:p-2
  sm:rounded-[1.75rem]
  sm:p-4
  ${isWriteMode ? "max-w-[25rem]" : "max-w-md"}
  ${
    selectedPattern === currentPattern
      ? "bg-ocean-500 shadow-[0_0_35px_rgba(45,212,191,0.15)]"
      : "bg-ocean-500/70 shadow-[0_18px_45px_rgba(0,0,0,0.25)] hover:bg-ocean-500"
  }
`}
    >
      {/* Option label */}
      {!isWriteMode && (
        <div
          className={`
            pointer-events-none absolute -top-2.5 left-1/2 z-20
            -translate-x-1/2 whitespace-nowrap
            rounded-full border px-2.5 py-1
            text-[9px] font-bold uppercase tracking-widest
            shadow-md transition-all duration-300
            xs:-top-3 xs:px-3 xs:text-[10px]
            ${
              selectedPattern === currentPattern
                ? "border-teal-400/40 bg-teal-400 text-slate-900"
                : "border-teal-400/20 bg-neon-900 text-teal-400"
            }
          `}
        >
          {selectedPattern === currentPattern ? (
            <span className="flex items-center gap-1">
              <HiCheck className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
              Selected
            </span>
          ) : (
            `Option ${currentPattern + 1}`
          )}
        </div>
      )}

      {/* Save / bookmark */}
      {!isWriteMode && selectedPattern === currentPattern && (
        <div
          className="absolute right-1.5 top-1.5 z-30 xs:right-2 xs:top-2 sm:right-3 sm:top-3"
          onClick={(e) => e.stopPropagation()}
        >
          <SavePatternButton
            onClick={onBookmark}
            isSaved={isCurrentCardSaved}
          />
        </div>
      )}

      {/* Card */}
      <div className="min-w-0 w-fit">
        {" "}
        {isWriteMode ? (
          <BingoGame mode={mode} theme="" savePattern={onSavePattern} />
        ) : previewNumbers.length === 25 ? (
          <BingoCard numbers={previewNumbers} mode={mode} theme="" />
        ) : null}
      </div>
    </div>
  );
}

export default CardPreview;
