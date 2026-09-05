import { useState } from "react";
import BingoCard from "../components/bingoGame/BingoCard";
import Button from "../components/ui/Button";
import { useBingoContext } from "../contexts/BingoProviderContext";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import BingoGame from "../features/bingo/BingoGame";
import { useNavigate } from "react-router-dom";

const savedPatterns = [
  [
    1, 7, 13, 19, 25, 2, 8, 14, 20, 21, 3, 9, 15, 16, 22, 4, 10, 11, 17, 23, 5,
    6, 12, 18, 24,
  ],

  [
    17, 4, 22, 9, 1, 14, 25, 6, 18, 11, 3, 20, 8, 15, 24, 7, 13, 2, 21, 10, 23,
    5, 16, 12, 19,
  ],

  [
    8, 21, 3, 16, 24, 12, 5, 19, 7, 14, 25, 1, 18, 10, 6, 22, 13, 4, 20, 9, 15,
    2, 11, 23, 17,
  ],

  [
    23, 11, 5, 19, 2, 16, 8, 24, 13, 6, 21, 4, 17, 9, 1, 12, 25, 7, 15, 3, 18,
    10, 22, 14, 20,
  ],

  [
    6, 18, 24, 11, 3, 20, 9, 15, 1, 22, 13, 5, 17, 25, 8, 2, 14, 21, 7, 19, 10,
    23, 4, 16, 12,
  ],
];
function Saved() {
  const [select, setSelect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setNumbers } = useBingoContext();
  const navigate = useNavigate();

  const currentPattern = savedPatterns[currentIndex];

  function nextPattern() {
    setCurrentIndex((index) =>
      index === savedPatterns.length - 1 ? 0 : index + 1,
    );
    setSelect(false);
  }

  function previousPattern() {
    setCurrentIndex((index) =>
      index === 0 ? savedPatterns.length - 1 : index - 1,
    );
    setSelect(false);
  }

  function selectBingo() {
    setSelect((select) => !select);
  }

  function handleSave() {
    if (!select) return;
    setNumbers(currentPattern);
    navigate(-1);
  }

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-white font-primary text-2xl sm:text-3xl md:text-4xl tracking-wider mx-auto text-center">
        Select a Card
      </h1>
      <div className="flex justify-center items-center gap-1 xs:gap-3 ">
        <button
          className="text-white text-3xl cursor-pointer"
          onClick={previousPattern}
        >
          <HiChevronLeft className="text-[##967c9b]" />
        </button>

        <div
          onClick={selectBingo}
          className={`${
            select ? "border-white" : "border-transparent"
          } border rounded-md`}
        >
          <BingoCard numbers={currentPattern} mode="preview" />
        </div>

        <button
          type="button"
          className="text-white text-3xl cursor-pointer"
          onClick={nextPattern}
        >
          <HiChevronRight />
        </button>
      </div>
      <Button
        variant="pinkPurple"
        disabled={!select}
        classes={`justify-center mx-auto`}
        onClick={handleSave}
      >
        Select
      </Button>
    </div>
  );
}

export default Saved;
