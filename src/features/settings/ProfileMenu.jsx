import { useMutation } from "@tanstack/react-query";
import { signOut } from "../../services/authService";
import toast from "react-hot-toast";

import { HiOutlineCog } from "react-icons/hi";
import {
  HiArrowLeftOnRectangle,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

import { useAuth } from "../../contexts/AuthContext";
import Menu from "../../components/ui/Menu";
import Spinner from "../../components/ui/Spinner";

function ProfileMenu() {
  const { name } = useAuth();
  const {
    mutate: exit,
    error,
    isPending,
  } = useMutation({
    mutationFn: signOut,
  });

  const { isGuest } = useAuth();

  if (error) toast.error("Something went wrong!");

  const handleExit = () => {
    exit();
  };

  return (
    <Menu>
      <Menu.Trigger>
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber text-sm font-bold text-neon-900 transition-transform duration-200 group-hover/menu:scale-105">
            {name[0]?.toUpperCase()}
          </span>

          <span className="hidden text-sm font-medium text-white sm:inline">
            {`${name[0]?.toUpperCase()}${name?.slice(1)}`}
          </span>
        </span>
      </Menu.Trigger>

      <Menu.Content>
        {/* Profile header */}
        {/* <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/6 px-3 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive-200 font-bold text-neon-900">
            KI
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Kinza</p>

            <p className="text-xs text-white/50">
              {isGuest ? "Guest player" : "Bingo player"}
            </p>
          </div>
        </div> */}

        <Menu.Item to="/game/settings">
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 ">
              <HiOutlineCog className="text-lg" />
            </span>

            <span>Game Settings</span>
          </span>
        </Menu.Item>

        <Menu.Item to="/">
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-olive-200/10 ">
              <HiOutlineQuestionMarkCircle className="text-lg" />
            </span>

            <span>How to Play</span>
          </span>
        </Menu.Item>

        <Menu.Item onClick={handleExit} variant="danger">
          {isPending ? (
            <span className="mx-auto block w-fit">
              <Spinner size="sm" />
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-danger w-full text-text py-2 px-1 rounded-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-red/10">
                <HiArrowLeftOnRectangle className="text-lg" />
              </span>

              <span>{isGuest ? "Exit Game" : "Log out"}</span>
            </span>
          )}
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

export default ProfileMenu;
