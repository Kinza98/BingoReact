import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const BingoContext = createContext();

const numberGenerator = () => {
  const newNumbers = Array.from({ length: 25 }, (_, i) => i + 1);

  for (let i = newNumbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [newNumbers[i], newNumbers[randomIndex]] = [
      newNumbers[randomIndex],
      newNumbers[i],
    ];
  }

  return newNumbers;
};

function BingoProvider({ children }) {
  const [numbers, setNumbers] = useState(numberGenerator);
  const [error, setError] = useState("");
  const [isWrite, setIsWrite] = useState(false);

  function refreshOrder() {
    setIsWrite(false);

    setNumbers(numberGenerator());
    setError("");
  }

  useEffect(() => {
    if (!isWrite) return;
    toast.success("Numbers have been updated succesfully!");
  }, [numbers, isWrite]);

  function writeNumbers(nums) {
    setIsWrite(true);
    const newNumbers = [...nums]
      .sort((a, b) => a.index - b.index)
      .map((num) => Number(num.value));

    // Check empty / invalid values
    for (const num of nums) {
      if (num.value === "" || num.value === null || num.value === undefined) {
        const message = `Position ${num.index + 1}: value is empty`;
        setError(message);
        toast.error(message);
        return;
      }

      if (isNaN(Number(num.value))) {
        const message = `Position ${num.index + 1}: "${num.value}" is not a valid number`;
        setError(message);
        toast.error(message);
        return;
      }

      if (Number(num.value) < 1 || Number(num.value) > 25) {
        const message = `Position ${num.index + 1}: "${num.value}"  value must be between 1 and 25`;
        setError(message);
        toast.error(message);
        return;
      }
    }

    // Check duplicates
    const numberSet = new Set(newNumbers);

    if (numberSet.size !== newNumbers.length) {
      const message = "Duplicate values are not allowed";

      setError(message);
      toast.error(message);
      return;
    }

    // Everything is valid
    setError("");
    setNumbers(newNumbers);
  }

  return (
    <BingoContext.Provider
      value={{
        numbers,
        refreshOrder,
        writeNumbers,
        setNumbers,
        numberGenerator,
        error,
      }}
    >
      {children}
    </BingoContext.Provider>
  );
}

function useBingoContext() {
  const context = useContext(BingoContext);

  if (!context) {
    throw new Error("Context used outside of provider");
  }

  return context;
}

export { useBingoContext, BingoProvider };
