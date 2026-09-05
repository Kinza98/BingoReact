import { useState } from "react";

import { useBingoContext } from "../../contexts/BingoProviderContext";
import Button from "../../components/ui/Button";
import BingoCard from "../../components/bingoGame/BingoCard";

function BingoGame({ mode = "play" }) {
  const [newNumbers, setNewNumbers] = useState([]);
  const { numbers, writeNumbers } = useBingoContext();

  const isWriteMode = mode === "write";
  const isFilled =
    newNumbers.length === 25 && newNumbers.every((item) => item.value !== "");
  const spaceNumbers = Array.from({ length: 25 }, (_, index) => {
    const item = newNumbers.find((item) => item?.index === index);

    return item ? item.value : "";
  });

  function handleChange(obj) {
    setNewNumbers((numbers) => {
      const exists = numbers.some((num) => num.index === obj.index);

      if (exists) {
        return numbers.map((num) => (num.index === obj.index ? obj : num));
      }

      return [...numbers, obj];
    });
  }

  return (
    <div>
      <BingoCard
        numbers={isWriteMode ? spaceNumbers : numbers}
        mode={mode}
        onChange={handleChange}
      />

      {/* {mode === "play" && (
        <Button style="simple" bg="bg-[#875481]" >
          {" "}
          Start Playing
        </Button>
      )} */}
      {isFilled && (
        <Button
          onClick={() => writeNumbers(newNumbers)}
          variant="pinkPurple"
          classes="justify-center mx-auto"
        >
          Save
        </Button>
      )}
    </div>
  );
}

export default BingoGame;
