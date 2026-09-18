import { HiOutlineClock, HiPencilAlt, HiUserAdd } from "react-icons/hi";
import Button from "../../components/ui/Button";

function QuickActions() {
  return (
    <>
      <Button
        to="/game/play"
        classes={`max-w-50 xs:max-w-none bg-amber w-full justify-center rounded-[100px] lg:text-xl mb-0 xs:mb-4`}
        style="big"
        rounded="rounded-[100px]"
      >
        <span className="  tracking-wider">Start Playing</span>
      </Button>

      <Button to="/game/edit" style="glass" rounded="rounded-[100px]">
        <HiPencilAlt />
        <span>Change Card</span>
      </Button>

      <Button to="/game/play-friends" style="glass" rounded="rounded-[100px]">
        <HiUserAdd />
        <span>Invite Friends</span>
      </Button>

      <Button to="/game/history" style="glass" rounded="rounded-[100px]">
        <HiOutlineClock />
        <span>Show History</span>
      </Button>
    </>
  );
}

export default QuickActions;
