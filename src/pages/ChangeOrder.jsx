import {
  HiArrowLeft,
  HiCollection,
  HiPencilAlt,
  HiPlay,
  HiRefresh,
} from "react-icons/hi";
import BingoCard from "../components/bingoGame/BingoCard";
import Button from "../components/ui/Button";
import { useBingoContext } from "../contexts/BingoProviderContext";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import BingoGame from "../features/bingo/BingoGame";

function ChangeOrder() {
  const [mode, setMode] = useState("preview");
  const { refreshOrder } = useBingoContext();
  //   const [searchParams] = useSearchParams();
  // const isWriteMode = mode === "write";

  function handleRefresh() {
    refreshOrder();
    setMode("preview");
  }
  function handleWrite() {
    setMode("write");
  }

  return (
    <div className="">
      <h1 className="text-white font-primary text-2xl sm:text-3xl md:text-4xl tracking-wider mx-auto text-center">
        {mode === "write" ? "Start Writting" : "Choose a Card!"}
      </h1>
      <div className="flex mt-4 gap-1 xxs:gap-3 xs:mt-9 xs:gap-7 items-start flex-row">
        {" "}
        <div className="space-y-4 text-center">
          <BingoGame mode={mode} />
        </div>
        <div className="flex flex-col">
          {mode !== "write" && (
            <>
              <Button type="button" onClick={handleRefresh} variant="pine">
                <HiRefresh />
                <span className="hidden md:inline">Refresh Order</span>
              </Button>

              <Button type="button" onClick={handleWrite} variant="moss">
                <HiPencilAlt />
                <span className="hidden md:inline">Write Numbers</span>
              </Button>

              <Button to="/saved" variant="plum">
                <HiCollection />
                <span className="hidden md:inline"> Saved</span>
              </Button>

              <Button to="/play" variant="lightPurple">
                <HiPlay />
                <span className="hidden md:inline font-primary tracking-wider">
                  Start Playing
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeOrder;
