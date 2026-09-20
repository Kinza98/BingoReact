import { useMutation } from "@tanstack/react-query";
import { signOut } from "../../services/authService";
import toast from "react-hot-toast";
import { HiOutlineCog } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useAuth } from "../../contexts/AuthContext";
import Menu from "../../components/ui/Menu";
import Spinner from "../../components/ui/Spinner";

function ProfileMenu() {
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
        <span className=" w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm">
          KI
        </span>

        <span className="text-white text-sm font-medium hidden sm:inline">
          Kinza
        </span>
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Item to="/game/settings">
          <span className="flex gap-1 md:gap-2 items-center">
            <HiOutlineCog /> Settings
          </span>
        </Menu.Item>

        <Menu.Item onClick={handleExit} variant="danger">
          {isPending ? (
            <span className="mx-auto w-fit block">
              <Spinner size="sm" />
            </span>
          ) : (
            <span className="flex gap-1 md:gap-2 items-center">
              <HiArrowLeftOnRectangle /> {isGuest ? "Exit" : "Log out"}
            </span>
          )}
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

export default ProfileMenu;
