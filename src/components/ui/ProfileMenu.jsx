import { useMutation } from "@tanstack/react-query";
import { signOut } from "../../services/authService";
import Menu from "./Menu";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

function ProfileMenu() {
  const {
    mutate: exit,
    error,
    isPending,
  } = useMutation({
    mutationFn: signOut,
  });

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
        <Menu.Item to="/game/settings">Settings</Menu.Item>

        <Menu.Item onClick={handleExit}>
          {" "}
          {isPending ? (
            <span className="mx-auto w-fit block">
              <Spinner size="sm" />
            </span>
          ) : (
            "Exit"
          )}
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

export default ProfileMenu;
