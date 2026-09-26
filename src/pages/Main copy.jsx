import {
  HiUserAdd,
  HiCog,
  HiPencil,
  HiDocumentText,
  HiPlay,
} from "react-icons/hi";
import Button from "../components/ui/Button";
import LinkTag from "../components/ui/Link";
import BingoGame from "../features/bingo/BingoGame";
import Popup from "../components/ui/Popup";

function Main() {
  return (
    <div>
      <h1 className="text-white font-primary text-2xl sm:text-3xl md:text-4xl tracking-wider mx-auto text-center">
        Welcome !
      </h1>
      <div className="flex mt-4 gap-1 xxs:gap-3 xs:mt-9 xs:gap-7 items-start flex-row ">
        <div className="space-y-4 text-center ">
          <BingoGame mode="preview" />
          <Popup>
            <Popup.Trigger as={"span"}>
              Never played Bingo before?
            </Popup.Trigger>
            <Popup.Content>
              <h3 className="text-center tracking-wide text-xl mb-4">
                New to{" "}
                <span className="font-primary text-[#a26ead]">BINGO</span>
              </h3>
              <p className="text-justify">
                Bingo is a game of chance in which each player matches the
                numbers printed in different arrangements on cards. Each card
                contains numbers from 1 to 25. Players take turns calling out
                numbers one by one. If the called number exists on a player's
                card, they mark it. Whenever a player completes a full row,
                column, or diagonal, they score a point.
              </p>

              <p className="mt-2 ">
                Since "BINGO" has five letters, each point allows the player to
                cross out one letter. The first player to cross out all five
                letters —{" "}
                <span className="font-primary text-[#a26ead]">
                  B, I, N, G, O
                </span>{" "}
                — wins the game.
              </p>
            </Popup.Content>
          </Popup>
          {/* <LinkTag>Never played Bingo before?</LinkTag> */}
        </div>

        <div className="flex flex-col">
          <Button to="/play" variant="lightPurple">
            <span className="hidden md:inline font-primary tracking-wider">
              Start Playing
            </span>
          </Button>

          <Button to="/edit" variant="wine">
            <HiPencil />
            <span className="hidden md:inline">Change Card</span>
          </Button>

          <Button to="/multiplayer" variant="plum">
            <HiUserAdd />
            <span className="hidden md:inline">Invite Friends</span>
          </Button>

          <Button to="/history" variant="pine">
            <HiDocumentText />
            <span className="hidden md:inline">History</span>
          </Button>

          <Button to="/game/settings" variant="moss">
            <HiCog />
            <span className="hidden md:inline">Settings</span>
          </Button>
          <HiPlay />
        </div>
      </div>
    </div>
  );
}

export default Main;
