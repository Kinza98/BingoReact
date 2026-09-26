import Heading from "../../components/ui/Heading";
import { useBingoContext } from "../../contexts/BingoProviderContext";
import BingoPreview from "./BingoPreview";
import QuickActions from "./QuickActions";

function MainContainer() {
  const { numbers } = useBingoContext();

  return (
    <div className="flex z-100 relative px-5 py-5 rounded-lg lg:min-w-175 md:gap-5 lg:gap-10 flex-wrap justify-center mt-5 lg:mt-0">
      {/* Left side - Bingo Preview */}
      <BingoPreview numbers={numbers} />

      {/* Right side - Buttons */}

      <div className="flex flex-col px-5 w-100 items-center xs:items-start ">
        <Heading as="h1" classes="md:text-4xl mb-5 hidden md:block ">
          Welcome!
        </Heading>
        <QuickActions />
      </div>
    </div>
  );
}

export default MainContainer;
