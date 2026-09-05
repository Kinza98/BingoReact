import { useState } from "react";
import BingoCard from "../components/bingoGame/BingoCard";
import { useBingoContext } from "../contexts/BingoProviderContext";
import Result from "../components/ui/Result";
import Button from "../components/ui/Button";
import { HiStar, HiX } from "react-icons/hi";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import BingoScore from "../components/bingoGame/BingoScore";
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

  function handleRestart() {
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

  const score = lines.filter((line) =>
    line.every((index) => pattern[index].checked),
  ).length;

  const botScore = lines.filter((line) =>
    line.every((index) => botPattern[index].checked),
  ).length;

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

    const highestPotential = Math.max(
      ...potentials.map((item) => item.potential),
    );

    const bestChoices = potentials.filter(
      (item) => item.potential === highestPotential,
    );

    const choice = bestChoices[Math.floor(Math.random() * bestChoices.length)];

    return choice.value;
  }

  //   if (score >= 5 || botScore >= 5)
  //     return (
  //       <Result>
  //         {score >= 5 ? (
  //           <span>You WON !</span>
  //         ) : (
  //           <span>OOPS, Better luck next time! 🎲</span>
  //         )}
  //         <Button onClick={handleRestart}>Continue</Button>
  //         <Button to="/edit">Choose a differenet order</Button>
  //         <Button to="/">End Game</Button>
  //       </Result>
  //     );

  return (
    <div className="flex gap-9 flex-col lg:flex-row">
      {score >= 5 ||
        (botScore >= 5 && (
          <Result>
            <div className="flex items-center justify-center flex-col gap-3 ">
              <span className="text-4xl font-primary tracking-widest">
                {" "}
                {score >= 5 ? (
                  <>You WON !</>
                ) : (
                  <>OOPS, Better luck next time! 🎲</>
                )}
              </span>

              <div>
                <Button variant="ocean" onClick={handleRestart}>
                  Play Again
                </Button>
                {/* <Button variant="lightPurple" to="/edit">
                  Change Card
                </Button> */}
                <Button variant="wine" to="/">
                  <HiX />
                  End Game
                </Button>
              </div>
            </div>
          </Result>
        ))}
      <BingoCard
        numbers={pattern}
        mode="play"
        onClick={handlePlay}
        theme="#967c9b"
      >
        <BingoScore score={score} />
      </BingoCard>

      <BingoCard
        numbers={botPattern}
        mode="bot"
        // onClick={botHandlePlay}
        theme="#6a838f"
      >
        <BingoScore score={botScore} />
      </BingoCard>
    </div>
  );
}

export default Play;
