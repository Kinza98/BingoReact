import BingoCard from "../../components/bingoGame/BingoCard";
import StackedBingoCards from "../../components/ui/StackedCards";

function BingoPreview({ numbers }) {
  return (
    <div className="w-fit xs:w-100 relative">
      <StackedBingoCards />

      <div className="w-fit m-auto absolute inset-0 flex justify-center items-center">
        <BingoCard numbers={numbers} theme="#163235" mode="preview" />
      </div>
    </div>
  );
}

export default BingoPreview;
