import BingoCard from "../../components/bingoGame/BingoCard";
import StackedBingoCards from "../../components/ui/StackedCards";

function BingoPreview({ numbers }) {
  return (
    <div className="relative w-[85vw] max-w-100 sm:w-100">
      <StackedBingoCards />

      <div className="absolute inset-0 flex items-center justify-center">
        <BingoCard numbers={numbers} theme="var(--color-neon-700)" mode="preview" />
      </div>
    </div>
  );
}

export default BingoPreview;
