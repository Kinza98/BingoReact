import BingoCard from "../components/bingoGame/BingoCard";
import Button from "../components/ui/Button";

function WriteNumbers() {
  return (
    <div className="flex mt-9 gap-7 items-start flex-col">
      
      <div className="space-y-4 text-center">
        <BingoCard mode="write" />
      </div>

      <Button to="/" style="simple" bg="bg-[#875481]">
        Go Back
      </Button>
    </div>
  );
}

export default WriteNumbers;
