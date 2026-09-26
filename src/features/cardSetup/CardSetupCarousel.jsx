import Carousel from "../../components/ui/Carousel";
import CardPreview from "./CardPreview";
import CardSetupDecoration from "./CardSetupDecoration";

function CardSetupCarousel({
  isWriteMode,
  isShuffled,
  currentPattern,
  totalCards,
  selectedPattern,
  mode,
  previewNumbers,
  isCurrentCardSaved,
  onPrevious,
  onNext,
  onSelect,
  onCardClick,
  onBookmark,
  onSavePattern,
}) {
  return (
    <div className="relative flex w-full min-w-0 items-center justify-center">
      {/* {!isWriteMode && <CardSetupDecoration position="left" />} */}

      <Carousel
        currentIndex={currentPattern}
        totalItems={totalCards}
        onPrevious={onPrevious}
        onNext={onNext}
        onSelect={onSelect}
        showArrows={!isWriteMode && !isShuffled}
        showIndicators={!isWriteMode && !isShuffled}
        className="w-full"
      >
        <CardPreview
          isWriteMode={isWriteMode}
          selectedPattern={selectedPattern}
          currentPattern={currentPattern}
          mode={mode}
          previewNumbers={previewNumbers}
          isCurrentCardSaved={isCurrentCardSaved}
          onCardClick={onCardClick}
          onBookmark={onBookmark}
          onSavePattern={onSavePattern}
        />
      </Carousel>

      {/* {!isWriteMode && <CardSetupDecoration position="right" />} */}
    </div>
  );
}

export default CardSetupCarousel;
