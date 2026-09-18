import { useState } from "react";
import Toggle from "../components/ui/Toggle";
import Button from "../components/ui/Button";
import { HiUser } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";

function Settings() {
  const [sound, setSound] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);

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
    <div className="text-white">
      <h1 className="font-primary tracking-widest text-2xl ">Settings</h1>
      <div className="flex mt-7 flex-col gap-5">
        <div className=" p-5 bg-[#4e7490] text-base md:text-lg min-w-full  md:min-w-125 flex gap-3">
          <span className="flex rounded-full bg-black w-11 h-11 items-center justify-center">
            <HiUser />
          </span>
          <div className="flex flex-col">
            <span>Kinza</span>
            <span className="text-sm text-gray-300">Guest</span>
          </div>
        </div>
        <div className=" p-5 bg-[#4e7490] text-base md:text-lg min-w-full  md:min-w-125 flex justify-between">
          <span>Sound</span>
          <Toggle enabled={sound} onChange={setSound} theme="#4e7490" />
        </div>
        <div className=" p-5 bg-[#4e7490] text-base md:text-lg min-w-full  md:min-w-125 flex justify-between">
          <span>Dark theme</span>
          <Toggle enabled={darkMode} onChange={setDarkMode} theme="#4e7490" />
        </div>
        <div className=" p-5 bg-[#4e7490] text-base md:text-lg min-w-full  md:min-w-125 flex justify-between">
          <span>Save History</span>
          <Toggle
            enabled={saveHistory}
            onChange={setSaveHistory}
            theme="#4e7490"
          />
        </div>
        <Button variant="wine" onClick={exit}>
          <HiArrowLeftOnRectangle /> Exit
        </Button>
      </div>
    </div>
  );
}

export default Settings;
