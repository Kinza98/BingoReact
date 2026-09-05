import Row from "../../components/bingoGame/Row";
import BingoCell from "../../features/bingo/BingoCell";

function BingoRow({ row, index,  onChange}) {
  return (
    <Row
      items={row}
      renderItem={(num, i) => (
        <BingoCell
          num={num}
          key={index * 5 + i}
          onChange={onChange}
          index={index * 5 + i}
        />
      )}
    />
  );

}

export default BingoRow;
