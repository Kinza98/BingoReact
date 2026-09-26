import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBingoContext } from "../../contexts/BingoProviderContext";
import Spinner from "../../components/ui/Spinner";
import { useGetSavedCards } from "./useGetCards";
import { useSaveCard } from "./useSaveCard";
import { useDeleteSavedCard } from "./useDeleteCard";
import CardSetupHeader from "./CardSetupHeader";
import CardSelectionMessage from "./CardSelectionMessage";
import CardSetupCarousel from "./CardSetupCarousel";
import CardSetupActions from "./CardSetupActions";
import SavedCardsBackButton from "./SavedCardsButton";

const patterns = [
  [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ],
  [
    4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 14, 13, 12, 11, 10, 19, 18, 17, 16, 15, 24,
    23, 22, 21, 20,
  ],
  [
    0, 5, 10, 15, 20, 1, 6, 11, 16, 21, 2, 7, 12, 17, 22, 3, 8, 13, 18, 23, 4,
    9, 14, 19, 24,
  ],
  [
    20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 16, 13, 8, 3, 24, 19, 14, 9,
    4,
  ],
  [
    0, 6, 12, 18, 24, 1, 7, 13, 19, 2, 8, 14, 20, 3, 9, 15, 21, 4, 10, 16, 22,
    5, 11, 17, 23,
  ],
];

function CardSetup() {
  const [mode, setMode] = useState("preview");
  const [currentPattern, setCurrentPattern] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [showSelectMessage, setShowSelectMessage] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const { savedCards } = useGetSavedCards();
  const { saveCard, isSaving } = useSaveCard();
  const { deleteCard, isDeleting } = useDeleteSavedCard();
  const { refreshOrder, numbers, setNumbers } = useBingoContext();

  const navigate = useNavigate();

  const isWriteMode = mode === "write";
  const hasSavedCards = savedCards?.length > 0;

  const totalSavedCards = savedCards?.length ?? 0;
  const hasMultipleCards = totalSavedCards > 1;

  /*
   * Keep the current saved-card index valid when cards are deleted.
   *
   * Example:
   * [A, B] -> currentPattern = 1
   * delete B
   * [A] -> currentPattern becomes 0
   */
  useEffect(() => {
    if (!hasSavedCards) {
      setCurrentPattern(0);
      return;
    }

    setCurrentPattern((current) =>
      Math.min(current, totalSavedCards - 1),
    );
  }, [hasSavedCards, totalSavedCards]);

  const currentSavedCard = savedCards?.[currentPattern];

  /*
   * Get the numbers that should currently be displayed.
   */
  let previewNumbers = [];

  if (isShuffled) {
    previewNumbers = numbers ?? [];
  } else if (isWriteMode) {
    previewNumbers = numbers ?? [];
  } else if (hasSavedCards) {
    previewNumbers = currentSavedCard?.pattern ?? [];
  } else {
    /*
     * No saved cards:
     * show the normal preview using the current generated numbers.
     */
    const currentPatternIndexes = patterns[currentPattern] ?? patterns[0];

    if (numbers?.length === 25) {
      previewNumbers = currentPatternIndexes.map(
        (index) => numbers[index],
      );
    } else {
      previewNumbers = numbers ?? [];
    }
  }

  const savedCard = savedCards?.find(
    (card) =>
      Array.isArray(card.pattern) &&
      card.pattern.length === 25 &&
      card.pattern.every(
        (number, index) => number === previewNumbers[index],
      ),
  );

  const isCurrentCardSaved = Boolean(savedCard);

  function handleCardClick() {
    setShowSelectMessage(false);

    if (selectedPattern === currentPattern) {
      setSelectedPattern(null);
      return;
    }

    setNumbers(previewNumbers);
    setSelectedPattern(currentPattern);
  }

  function handleRefresh() {
    refreshOrder();

    setIsShuffled(true);
    setSelectedPattern(null);
    setMode("preview");
    setShowSelectMessage(false);
  }

  function handleWrite() {
    setMode("write");
    setIsShuffled(false);
    setSelectedPattern(null);
    setShowSelectMessage(false);
  }

  function handlePrevious() {
    if (!hasMultipleCards) return;

    setIsShuffled(false);
    setCurrentPattern((current) =>
      current === 0 ? totalSavedCards - 1 : current - 1,
    );
    setSelectedPattern(null);
    setShowSelectMessage(false);
  }

  function handleNext() {
    if (!hasMultipleCards) return;

    setIsShuffled(false);
    setCurrentPattern((current) =>
      current === totalSavedCards - 1 ? 0 : current + 1,
    );
    setSelectedPattern(null);
    setShowSelectMessage(false);
  }

  function handlePatternNavigation(index) {
    if (index < 0 || index >= totalSavedCards) return;

    setIsShuffled(false);
    setCurrentPattern(index);
    setSelectedPattern(null);
    setShowSelectMessage(false);
  }

  function handleStartPlaying() {
    if (selectedPattern === null) {
      setShowSelectMessage(true);
      return;
    }

    navigate("/game/play");
  }

  function handleBookmark() {
    if (previewNumbers?.length !== 25) return;

    if (savedCard) {
      deleteCard(savedCard.id);
      return;
    }

    saveCard(previewNumbers);
  }

  function handleSavePattern(numbers) {
    saveCard(numbers);
    setNumbers(numbers);
    setMode("preview");
    setIsShuffled(false);
  }

  function handleBackToSavedCards() {
    setIsShuffled(false);
    setCurrentPattern(0);
    setSelectedPattern(null);
    setShowSelectMessage(false);
    setMode("preview");
  }

  if (isSaving || isDeleting) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col items-center px-2.5 py-4 font-secondary text-slate-900 xs:px-3 xs:py-5 sm:px-5 sm:py-7 dark:text-white">
      <CardSetupHeader
        isWriteMode={isWriteMode}
        selectedPattern={selectedPattern}
      />

      {showSelectMessage && (
        <CardSelectionMessage
          onClose={() => setShowSelectMessage(false)}
        />
      )}

      {/* Only show the carousel when saved cards exist */}
      {hasSavedCards ? (
        <CardSetupCarousel
          isWriteMode={isWriteMode}
          isShuffled={isShuffled}
          currentPattern={currentPattern}
          totalCards={totalSavedCards}
          selectedPattern={selectedPattern}
          mode={mode}
          previewNumbers={previewNumbers}
          isCurrentCardSaved={isCurrentCardSaved}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelect={handlePatternNavigation}
          onCardClick={handleCardClick}
          onBookmark={handleBookmark}
          onSavePattern={handleSavePattern}
        />
      ) : (
        /*
         * No saved cards:
         * CardSetupCarousel should not be rendered at all.
         *
         * Your carousel component should have a preview/card component
         * that can be rendered here. If the carousel itself currently
         * contains that preview, move that preview into a separate
         * component and render it here.
         */
        <CardSetupCarousel
          isWriteMode={isWriteMode}
          isShuffled={isShuffled}
          currentPattern={0}
          totalCards={1}
          selectedPattern={selectedPattern}
          mode={mode}
          previewNumbers={previewNumbers}
          isCurrentCardSaved={false}
          onPrevious={() => {}}
          onNext={() => {}}
          onSelect={() => {}}
          onCardClick={handleCardClick}
          onBookmark={handleBookmark}
          onSavePattern={handleSavePattern}
        />
      )}

      {(isShuffled || isWriteMode) && hasSavedCards && (
        <SavedCardsBackButton onBack={handleBackToSavedCards} />
      )}

      <CardSetupActions
        isWriteMode={isWriteMode}
        isShuffled={isShuffled}
        selectedPattern={selectedPattern}
        onRefresh={handleRefresh}
        onWrite={handleWrite}
        onStartPlaying={handleStartPlaying}
        onBack={() => setMode("preview")}
      />
    </div>
  );
}

export default CardSetup;
