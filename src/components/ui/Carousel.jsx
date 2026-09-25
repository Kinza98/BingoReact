import CarouselButton from "./CarouselButton";

function Carousel({
  children,
  currentIndex = 0,
  totalItems = 0,
  onPrevious,
  onNext,
  onSelect,
  showIndicators = true,
  showArrows = true,
  className = "",
}) {
  const hasMultipleItems = totalItems > 1;

  return (
    <div className={`w-full ${className}`}>
      {/* Carousel */}
      <div className="flex w-full min-w-0 items-center justify-center gap-1 xs:gap-1.5 sm:gap-4 lg:gap-6">
        {/* Previous */}
        {showArrows && hasMultipleItems && (
          <CarouselButton direction="previous" onClick={onPrevious} />
        )}

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>

        {/* Next */}
        {showArrows && hasMultipleItems && (
          <CarouselButton direction="next" onClick={onNext} />
        )}
      </div>

      {/* Indicators */}
      {showIndicators && hasMultipleItems && (
        <div className="mt-4 flex items-center justify-center gap-1.5 xs:mt-5 xs:gap-2">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelect?.(index)}
              aria-label={`Preview option ${index + 1}`}
              aria-current={currentIndex === index ? "true" : undefined}
              className={`
                rounded-full transition-all duration-300
                ${
                  currentIndex === index
                    ? "h-1.5 w-6 bg-forest-900 xs:h-2 xs:w-7"
                    : "h-1.5 w-1.5 bg-slate-600 hover:bg-slate-400 xs:h-2 xs:w-2"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
