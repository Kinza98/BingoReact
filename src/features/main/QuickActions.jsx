import { HiOutlineClock, HiPencilAlt, HiUserAdd } from "react-icons/hi";

import Button from "../../components/ui/Button";

function QuickActions() {
  return (
    <>
      <Button
        to="/game/play"
        classes="max-w-50 xs:max-w-none w-full justify-center bg-amber mb-0 xs:mb-4 lg:text-xl"
        style="big"
        rounded="rounded-[100px]"
      >
        <span className="tracking-wider">Start Playing</span>
      </Button>

      <Button to="/game/edit" style="glass" rounded="rounded-[100px]">
        <HiPencilAlt className="shrink-0" />
        <span>Change Card</span>
      </Button>

      <Button to="/game/play-friends" style="glass" rounded="rounded-[100px]">
        <HiUserAdd className="shrink-0" />
        <span>Invite Friends</span>
      </Button>

      <Button to="/game/history" style="glass" rounded="rounded-[100px]">
        <HiOutlineClock className="shrink-0" />
        <span>Show History</span>
      </Button>
    </>
  );
}

export default QuickActions;
