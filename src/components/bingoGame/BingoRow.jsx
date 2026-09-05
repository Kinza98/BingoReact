import BingoCell from "./BingoCell";

function BingoRow({ row, index, onChange, mode, theme, onClick }) {
  return (
    <div className="flex flex-row">
      {row &&
        row.map((num, i) => (
          <BingoCell
            num={num}
            key={index * 5 + i}
            index={index * 5 + i}
            onChange={onChange}
            mode={mode}
            theme={theme}
            onClick={onClick}
          />
        ))}
    </div>
  );
}

export default BingoRow;
