export const BINGO_LINES = [
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
];

export function calculateBingoScore(pattern) {
  return BINGO_LINES.filter((line) =>
    line.every((index) => pattern[index].checked),
  ).length;
}

export function botSelectingNumber(currentPattern) {
  const potentials = currentPattern
    .filter((item) => !item.checked)
    .map((item) => {
      const candidateIndex = item.index;

      const relatedLines = BINGO_LINES.filter((line) =>
        line.includes(candidateIndex),
      );

      let potential = 0;

      for (const line of relatedLines) {
        const checkedCount = line.filter(
          (index) => currentPattern[index].checked || index === candidateIndex,
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

  if (potentials.length === 0) {
    return null;
  }

  const highestPotential = Math.max(
    ...potentials.map((item) => item.potential),
  );

  const bestChoices = potentials.filter(
    (item) => item.potential === highestPotential,
  );

  const choice = bestChoices[Math.floor(Math.random() * bestChoices.length)];

  return choice.value;
}

export function createBingoPattern(numbers) {
  return numbers.map((value, index) => ({
    index,
    value,
    checked: false,
  }));
}

export function resetBingoPattern(pattern) {
  return pattern.map((item) => ({
    ...item,
    checked: false,
  }));
}
