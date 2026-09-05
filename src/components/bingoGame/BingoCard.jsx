import BingoRow from "./BingoRow";
import BingoScore from "./BingoScore";

function BingoCard({
  numbers,
  mode,
  onChange,
  onClick,
  theme = "#967c9b",
  children,
}) {
  const isWriteMode = mode === "write";
  const rows = Array.from({ length: 5 }, (_, i) =>
    numbers.slice(i * 5, i * 5 + 5),
  );

  return (
    <div
      style={{ "--cell-theme": theme }}
      className={`bg-(--cell-theme) xs:p-6 xxs:p-5 p-4 rounded-md space-y-2 xs:space-y-5 shadow-[3px_3px_4px_rgba(0,0,0,0.3)] text-center`}
    >
      {(mode === "play" || mode === "bot") && children}
      <div>
        {rows.map((row, index) => (
          <BingoRow
            row={row}
            key={index}
            index={index}
            mode={mode ? mode : "preview"}
            onChange={isWriteMode ? onChange : undefined}
            theme={theme}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default BingoCard;
