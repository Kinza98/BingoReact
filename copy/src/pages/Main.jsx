import { HiUserAdd, HiCog, HiPencil, HiDocumentText } from "react-icons/hi";
import BingoCard from "../components/bingoGame/BingoCard";
import Button from "../components/ui/Button";
import LinkTag from "../components/ui/Link";

function Main() {
  return (
    <div>
      <h1 className="text-white font-primary text-2xl xs:text-4xl tracking-wider mx-auto text-center">
        Let's start!
      </h1>
      <div className="flex mt-4 gap-1 xxs:gap-3 xs:mt-9 xs:gap-7 items-start flex-row ">
        <div className="space-y-4 text-center ">
          <BingoCard mode="play" />
          <LinkTag>Never played Bingo before?</LinkTag>
        </div>

        <div className="flex flex-col">
          <Button to="/edit" variant="wine">
            <HiPencil />
            <span className="hidden md:inline">Edit Order</span>
          </Button>

          <Button to="/play-friends" variant="plum">
            <HiUserAdd />
            <span className="hidden md:inline">Invite Friends</span>
          </Button>

          <Button to="/history" variant="pine">
            <HiDocumentText />
            <span className="hidden md:inline">History</span>
          </Button>

          <Button to="/settings" variant="moss">
            <HiCog />
            <span className="hidden md:inline">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Main;
