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
      <div className="mx-auto py-6 md:flex md:gap-12">
        <div className="hidden md:flex md:flex-col md:w-56 md:shrink-0">
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
            classes="w-full flex items-center justify-center gap-2 bg-[#5b2020] border border-red-500/30 text-red-400 mt-5"
          >
            <HiArrowLeftOnRectangle className="text-lg" />
            {isGuest ? "Exit" : "Log out"}
          </Button>
        </div>

        <div className="flex-1">
          {/* Preferences */}
          <VerticalTabs.Section value="preferences">
            <Preferences />
          </VerticalTabs.Section>

          {/* Account */}
          <VerticalTabs.Section value="account">
            <AccountSettings />
          </VerticalTabs.Section>

          {/* Privacy */}
          <VerticalTabs.Section value="privacy">
            <Privacy />
          </VerticalTabs.Section>

          {/* Exit / Logout — mobile */}
          <Button
            onClick={exit}
            classes="w-full flex items-center justify-center gap-2 bg-theme-red border border-red-500/30 text-red-400 md:hidden"
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
