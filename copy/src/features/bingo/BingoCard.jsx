import Button from "../../components/ui/Button";
import { useState } from "react";
import BingoRow from "./BingoRow";
import { useBingoContext } from "../../contexts/BingoProviderContext";

function BingoCard({ mode = "play", savedNum }) {
  const [newNumbers, setNewNumbers] = useState([]);
  const isWriteMode = mode === "write";

  // const isRefreshMode = mode === "refresh";

  const isFilled =
    newNumbers.length === 25 && newNumbers.every((item) => item.value !== "");

  const { numbers, writeNumbers } = useBingoContext();
  const spaceNumbers = Array.from({ length: 25 }, (_, index) => {
    const item = newNumbers.find((item) => item?.index === index);

    return item ? item.value : "";
  });

  const cardNumbers = savedNum?.length > 0 ? savedNum : numbers;

  const rows = Array.from({ length: 5 }, (_, i) =>
    isWriteMode
      ? spaceNumbers.slice(i * 5, i * 5 + 5)
      : cardNumbers.slice(i * 5, i * 5 + 5),
  );

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
    <div className="bg-[#967c9b] xs:p-6 xxs:p-5 p-4 rounded-md space-y-2 xs:space-y-5 shadow-[3px_3px_4px_rgba(0,0,0,0.3)] text-center">
      <div>
        {rows.map((row, index) => (
          <BingoRow
            row={row}
            key={index}
            index={index}
            onChange={isWriteMode ? handleChange : undefined}
          />
        ))}
      </div>
      {mode === "play" && (
        <Button style="simple" bg="bg-[#875481]">
          {" "}
          Start Playing
        </Button>
      )}
      {isFilled && (
        <Button
          onClick={() => writeNumbers(newNumbers)}
          style="simple"
          bg="bg-[#875481]"
        >
          Save
        </Button>
      )}
    </div>
  );
}

export default BingoCard;
