import { useEffect, useRef, useState } from "react";
import BingoCard from "../components/bingoGame/BingoCard";
import { useBingoContext } from "../contexts/BingoProviderContext";
import Result from "../components/ui/Result";
import Button from "../components/ui/Button";
import { HiX } from "react-icons/hi";
import BingoScore from "../components/bingoGame/BingoScore";
import { useSaveGameHistory } from "../features/game/useSaveGameHistory";
import { useAuth } from "../contexts/AuthContext";

const lines = [
  // diagonal
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],

  // horizontal
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],

  // vertical
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
];

function Play() {
  const { numbers, numberGenerator } = useBingoContext();
  const { saveGameHistoryFun } = useSaveGameHistory();
  const { saveHistory, userId } = useAuth();

  const hasSavedHistory = useRef(false);

  const [botPattern, setBotPattern] = useState(() =>
    numberGenerator().map((value, index) => ({
      index,
      value,
      checked: false,
    })),
  );

  const [pattern, setPattern] = useState(() =>
    numbers.map((value, index) => ({
      index,
      value,
      checked: false,
    })),
  );

  const score = lines.filter((line) =>
    line.every((index) => pattern[index].checked),
  ).length;

  const botScore = lines.filter((line) =>
    line.every((index) => botPattern[index].checked),
  ).length;

  useEffect(() => {
    const gameEnded = score >= 5 || botScore >= 5;

    if (!gameEnded || !saveHistory || !userId || hasSavedHistory.current) {
      return;
    }

    hasSavedHistory.current = true;

    saveGameHistoryFun({
      userId,
      isWin: score >= 5,
      pattern,
      cardTheme: "#967c9b",
    });
  }, [score, botScore, saveHistory, userId, pattern, saveGameHistoryFun]);

  function handleRestart() {
    hasSavedHistory.current = false;

    setPattern((p) =>
      p.map((obj) => ({
        ...obj,
        checked: false,
      })),
    );

    setBotPattern((p) =>
      p.map((obj) => ({
        ...obj,
        checked: false,
      })),
    );
  }

  function handlePlay({ index, value }) {
    setPattern((p) =>
      p.map((item) =>
        item.index === index ? { ...item, checked: true } : item,
      ),
    );

    botHandlePlay(value);
  }

  function botHandlePlay(value) {
    const updatedBotPattern = botPattern.map((item) =>
      item.value === value ? { ...item, checked: true } : item,
    );

    const botValue = botSelectingNumber(updatedBotPattern);

    if (botValue === null) {
      setBotPattern(updatedBotPattern);
      return;
    }

    const finalBotPattern = updatedBotPattern.map((item) =>
      item.value === botValue ? { ...item, checked: true } : item,
    );

    setBotPattern(finalBotPattern);

    setPattern((p) =>
      p.map((item) =>
        item.value === botValue ? { ...item, checked: true } : item,
      ),
    );
  }

  function botSelectingNumber(currentPattern) {
    const potentials = currentPattern
      .filter((item) => !item.checked)
      .map((item) => {
        const candidateIndex = item.index;

        const relatedLines = lines.filter((line) =>
          line.includes(candidateIndex),
        );

        let potential = 0;

        for (const line of relatedLines) {
          const checkedCount = line.filter(
            (index) =>
              currentPattern[index].checked || index === candidateIndex,
          ).length;

          if (checkedCount === 5) {
            potential += 100;
          } else if (checkedCount === 4) {
            potential += 20;
          } else if (checkedCount === 3) {
            potential += 5;
          } else if (checkedCount === 2) {
            potential += 1;
          }
        }

        return {
          value: item.value,
          potential,
        };
      });

    if (potentials.length === 0) return null;

    const highestPotential = Math.max(
      ...potentials.map((item) => item.potential),
    );

    const bestChoices = potentials.filter(
      (item) => item.potential === highestPotential,
    );

    const choice = bestChoices[Math.floor(Math.random() * bestChoices.length)];

    return choice.value;
  }

  return (
    <div className="flex gap-9 flex-col lg:flex-row">
      {(score >= 5 || botScore >= 5) && (
        <Result>
          <div className="flex items-center justify-center flex-col gap-3">
            <span className="text-2xl md:text-4xl font-primary tracking-widest text-center">
              {score >= 5 ? (
                <>You WON !</>
              ) : (
                <>OOPS, Better luck next time! 🎲</>
              )}
            </span>

            <div className="flex text-center">
              <Button variant="ocean" onClick={handleRestart}>
                Play Again
              </Button>

              <Button variant="wine" to="/">
                <HiX className="-mr-2" />
                End Game
              </Button>
            </div>
          </div>
        </Result>
      )}

      <BingoCard
        numbers={pattern}
        mode="play"
        onClick={handlePlay}
        theme="#967c9b"
      >
        <BingoScore score={score} />
      </BingoCard>

      <BingoCard numbers={botPattern} mode="bot" theme="#6a838f">
        <BingoScore score={botScore} />
      </BingoCard>
    </div>
  );
}

export default Play;
