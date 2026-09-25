import { useState } from "react";

import { useBingoContext } from "../../contexts/BingoProviderContext";
import BingoCard from "../../components/bingoGame/BingoCard";
import Button from "../../components/ui/Button";

function BingoGame({ mode = "play", theme, savePattern }) {
  const [newNumbers, setNewNumbers] = useState([]);
  const { numbers, writeNumbers } = useBingoContext();

  const isWriteMode = mode === "write";

  const isFilled =
    newNumbers.length === 25 && newNumbers.every((item) => item.value !== "");

  const displayNumbers = Array.from({ length: 25 }, (_, index) => {
    const item = newNumbers.find((item) => item?.index === index);
    return item?.value ?? "";
  });

  function handleChange(updatedNumber) {
    setNewNumbers((currentNumbers) => {
      const exists = currentNumbers.some(
        (number) => number.index === updatedNumber.index,
      );

      if (exists) {
        return currentNumbers.map((number) =>
          number.index === updatedNumber.index ? updatedNumber : number,
        );
      }

      return [...currentNumbers, updatedNumber];
    });
  }

  function handleSave() {
    const success = writeNumbers(newNumbers);

    if (!success) return;

    const savedNumbers = [...newNumbers]
      .sort((a, b) => a.index - b.index)
      .map((number) => Number(number.value));

    savePattern(savedNumbers);
  }

  return (
    <div className="flex flex-col items-center">
      <BingoCard
        numbers={isWriteMode ? displayNumbers : numbers}
        mode={mode}
        theme={theme}
        onChange={handleChange}
      />

      <Button
        disabled={!isFilled}
        onClick={handleSave}
        classes="disabled:bg-surface/50 disabled:cursor-none bg-surface mt-0 !justify-center"
      >
        Save
      </Button>
    </div>
  );
}

export default BingoGame;
