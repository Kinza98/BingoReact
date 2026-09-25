import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { HiShieldCheck, HiAdjustments, HiUser } from "react-icons/hi";

import Privacy from "./Privacy";
import Profile from "./Profile";
import Preferences from "./Preferences";
import AccountSettings from "./AccountSettings";

import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "../../services/authService";
import VerticalTabs from "../../components/ui/VerticalTabs";

function SettingsContainer() {
  const { name, email, isGuest } = useAuth();

  const {
    mutate: exit,
    error,
    isPending,
  } = useMutation({
    mutationFn: signOut,
  });

  if (error) toast.error(error);

  if (isPending) return <Spinner />;

  return (
    <VerticalTabs defaultTab="preferences">
      <div className="mx-auto flex w-full flex-col gap-6 py-4 sm:py-6 md:flex-row md:gap-10 lg:gap-12">
        {/* Desktop sidebar */}
        <div className="hidden w-52 shrink-0 md:flex md:flex-col lg:w-56">
          <Profile isGuest={isGuest} email={email} name={name} />

          <VerticalTabs.List>
            <VerticalTabs.Tab
              value="preferences"
              icon={<HiAdjustments className="text-lg" />}
            >
              Preferences
            </VerticalTabs.Tab>

            <VerticalTabs.Tab
              value="account"
              icon={<HiUser className="text-lg" />}
            >
              Account
            </VerticalTabs.Tab>

            <VerticalTabs.Tab
              value="privacy"
              icon={<HiShieldCheck className="text-lg" />}
            >
              Privacy
            </VerticalTabs.Tab>
          </VerticalTabs.List>

          <Button
            onClick={exit}
            variant="wine"
            classes="mt-5 flex w-full items-center justify-center gap-2 bg-theme-red text-red-400"
          >
            <HiArrowLeftOnRectangle className="text-lg" />
            {isGuest ? "Exit" : "Log out"}
          </Button>
        </div>

        {/* Settings content */}
        <div className="min-w-0 flex-1">
          <VerticalTabs.Section value="preferences">
            <Preferences />
          </VerticalTabs.Section>

          <VerticalTabs.Section value="account">
            <AccountSettings />
          </VerticalTabs.Section>

          <VerticalTabs.Section value="privacy">
            <Privacy />
          </VerticalTabs.Section>

          <Button
            onClick={exit}
            variant="wine"
            classes="flex w-full items-center justify-center gap-2  text-red-400 md:hidden"
          >
            <HiArrowLeftOnRectangle className="text-lg" />
            {isGuest ? "Exit" : "Log out"}
          </Button>
        </div>
      </div>
    </VerticalTabs>
  );
}

export default SettingsContainer;
