import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

const BingoContext = createContext();
//   const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

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
  const [error, setError] = useState();
  // const navigate = useNavigate();

  function refreshOrder() {
    const newNumbers = numberGenerator();
    setNumbers(newNumbers);
  }

  function writeNumbers(nums) {
    setError("");
    // const errors = [];

    for (const num of nums) {
      // Check empty
      if (num.value === "" || num.value === null || num.value === undefined) {
        setError(`Position ${num.index}: value is empty`);
        return
      }

      // Check not a number
      if (isNaN(+num.value)) {
        setError(`Position ${num.index}: "${num.value}" is not a valid number`);
        return
      }

      if (+num.value < 1 || +num.value > 25) {
        setError(`Position ${num.index}: value must be between 1 and 25`);
        return
      }
    }

    const newNumbers = [...nums]
      .sort((a, b) => a.index - b.index)
      .map((num) => +num.value);

    const numberSet = new Set(newNumbers);

    if (numberSet.size !== newNumbers.length) {
      
      setError(`Duplicate values are not allowed`);
      return
    }

    if(error) return;

    setNumbers(newNumbers);
    // navigate("/");
  }

  return (
    <BingoContext.Provider
      value={{ numbers, refreshOrder, writeNumbers, setNumbers, numberGenerator }}
    >
      {children}
    </BingoContext.Provider>
  );
}

function useBingoContext() {
  const context = useContext(BingoContext);
  if (!context) throw new Error("Context used outside of provider");
  return context;
}

export { useBingoContext, BingoProvider };
