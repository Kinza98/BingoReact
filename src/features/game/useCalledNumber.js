import { useEffect, useRef, useState } from "react";
import { CALLED_NUMBER_TIMEOUT } from "../../constants/game";

function useCalledNumber() {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [calledBy, setCalledBy] = useState(null);

  const calledTimeoutRef = useRef(null);

  function showCalledNumber(number, caller) {
    if (calledTimeoutRef.current) {
      clearTimeout(calledTimeoutRef.current);
    }

    setCurrentNumber(number);
    setCalledBy(caller);

    calledTimeoutRef.current = setTimeout(() => {
      setCurrentNumber(null);
      setCalledBy(null);
    }, CALLED_NUMBER_TIMEOUT);
  }

  function clearCalledNumber() {
    if (calledTimeoutRef.current) {
      clearTimeout(calledTimeoutRef.current);
      calledTimeoutRef.current = null;
    }

    setCurrentNumber(null);
    setCalledBy(null);
  }

  useEffect(() => {
    return () => {
      clearTimeout(calledTimeoutRef.current);
    };
  }, []);

  return {
    currentNumber,
    calledBy,
    showCalledNumber,
    clearCalledNumber,
  };
}

export default useCalledNumber;
