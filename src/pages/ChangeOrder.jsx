import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowLeft,
  HiChevronLeft,
  HiChevronRight,
  HiPencilAlt,
  HiPlay,
  HiRefresh,
} from "react-icons/hi";

import { useBingoContext } from "../contexts/BingoProviderContext";
import BingoCard from "../components/bingoGame/BingoCard";
import BingoGame from "../features/bingo/BingoGame";

// Different arrangements of the same 25 numbers
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
    20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24,
    19, 14, 9, 4,
  ],

  [
    0, 6, 12, 18, 24, 4, 8, 12, 16, 20, 2, 6, 12, 18, 22, 4, 8, 12, 16, 20, 0,
    6, 12, 18, 24,
  ],
];

function ChangeOrder() {
  const [mode, setMode] = useState("preview");
  const [currentPattern, setCurrentPattern] = useState(0);

  const { refreshOrder, numbers } = useBingoContext();

  const isWriteMode = mode === "write";

  // Rearrange the actual numbers from the context
  const previewNumbers =
    numbers?.length === 25
      ? patterns[currentPattern].map((index) => numbers[index])
      : numbers;

  function handleRefresh() {
    refreshOrder();
    setCurrentPattern(0);
    setMode("preview");
  }

  function handleWrite() {
    setMode("write");
  }

  function handlePrevious() {
    setCurrentPattern((current) =>
      current === 0 ? patterns.length - 1 : current - 1,
    );
  }

  function handleNext() {
    setCurrentPattern((current) =>
      current === patterns.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="flex flex-col items-center justify-between py-4 w-full max-w-5xl mx-auto text-white font-sans">
      {/* Header Titles */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-bold tracking-tight mb-2">
          {isWriteMode ? "Start Writing" : "Choose a Card!"}
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm md:text-base">
          {isWriteMode
            ? "Fill in your custom numbers on the board"
            : "Swipe through a few options, or write your own"}
        </p>
      </div>

      {/* Carousel Area */}
      <div className="relative flex items-center justify-center w-full gap-1 xs:gap-2 sm:gap-6 my-2">
        {" "}
        {/* Left Faded Peeking Card */}
        {!isWriteMode && (
          <div className="hidden lg:block opacity-20 scale-90 pointer-events-none shrink-0">
            <div className="w-44 h-52 bg-[#232f3e] rounded-2xl border border-white/5 p-3 grid grid-cols-5 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="bg-[#1b2430] rounded-md"></div>
              ))}
            </div>
          </div>
        )}
        {/* Previous Card */}
        {!isWriteMode && (
          <button
            onClick={handlePrevious}
            className="w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-full bg-[#273444] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-all active:scale-95 shadow-md shrink-0 z-10"
            aria-label="Previous Option"
            title="Previous Option"
          >
            <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />{" "}
          </button>
        )}
        {/* Central Active Bingo Card */}
        <div
          className={`relative border-2 border-[#e0a94d]/40 rounded-3xl p-2 xs:p-3 sm:p-5 shadow-2xl ${isWriteMode ? "w-100" : "w-[calc(100%-4rem)]"}xs:w-[calc(100%-5rem)] sm:w-full max-w-sm sm:max-w-md flex justify-center z-10`}
        >
          {" "}
          {isWriteMode ? (
            <BingoGame mode={mode} theme="#213f47" />
          ) : (
            <BingoCard numbers={previewNumbers} mode={mode} theme="#213f47" />
          )}
        </div>
        {/* Next Card */}
        {!isWriteMode && (
          <button
            onClick={handleNext}
            className="w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-full bg-[#273444] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-all active:scale-95 shadow-md shrink-0 z-10"
            aria-label="Next Option"
            title="Next Option"
          >
            <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />{" "}
          </button>
        )}
        {/* Right Faded Peeking Card */}
        {!isWriteMode && (
          <div className="hidden lg:block opacity-20 scale-90 pointer-events-none shrink-0">
            <div className="w-44 h-52 bg-[#232f3e] rounded-2xl border border-white/5 p-3 grid grid-cols-5 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="bg-[#1b2430] rounded-md"></div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination Indicator Dots */}
      {!isWriteMode && (
        <div className="flex items-center gap-2 mt-4 mb-8">
          {patterns.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPattern(index)}
              aria-label={`Go to option ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPattern === index
                  ? "bg-[#e0a94d] scale-125"
                  : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom Action Buttons */}
      <div className="flex items-center justify-center gap-6 sm:gap-12 mt-2">
        {isWriteMode ? (
          /* Back Button */
          <button
            onClick={() => setMode("preview")}
            className="flex flex-col items-center gap-2 group focus:outline-none"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#273444] border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-white/30 group-hover:scale-105 transition-all shadow-lg">
              <HiArrowLeft className="w-6 h-6" />
            </div>

            <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white font-medium">
              Back to preview
            </span>
          </button>
        ) : (
          <>
            {/* Write My Own */}
            <button
              onClick={handleWrite}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#273444] border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-white/30 group-hover:scale-105 transition-all shadow-lg">
                <HiPencilAlt className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white font-medium">
                Write my own
              </span>
            </button>

            {/* Refresh Order */}
            <button
              onClick={handleRefresh}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#273444] border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-white/30 group-hover:scale-105 transition-all shadow-lg">
                <HiRefresh className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white font-medium">
                Refresh order
              </span>
            </button>

            {/* Start Playing */}
            <Link
              to="/game/play"
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e0a94d] flex items-center justify-center text-slate-900 group-hover:scale-105 transition-all shadow-[0_0_25px_rgba(224,169,77,0.4)] group-hover:shadow-[0_0_35px_rgba(224,169,77,0.6)]">
                <HiPlay className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5" />
              </div>

              <span className="text-xs sm:text-sm text-[#e0a94d] font-bold group-hover:brightness-110">
                Start Playing
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangeOrder;
