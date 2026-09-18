import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HiMoon, HiSave, HiVolumeUp } from "react-icons/hi";

import Toggle from "../../components/ui/Toggle";
import { useUpdateSettings } from "./useUpdateSettings";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../contexts/AuthContext";

function Preferences() {
  // const [sound, setSound] = useState(true);
  // const [darkMode, setDarkMode] = useState(true);
  // const [saveHistory, setSaveHistory] = useState(true);

  const { soundOn, darkMode, saveHistory } = useAuth();

  console.log(soundOn);

  const { updateSettingsFun } = useUpdateSettings();

  const location = useLocation();

  const isActive = location.hash === `#preferences`;

  return (
    <>
      <p className="text-slate-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-2.5">
        Preferences
      </p>

      <div
        className={`border border-white/10 rounded-2xl overflow-hidden mb-6 transition-all duration-300 ${
          isActive ? "bg-white/10" : "bg-white/5"
        }`}
      >
        {/* Sound */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <HiVolumeUp className="text-teal-400 text-lg sm:text-xl shrink-0" />

            <div>
              <span className="text-white text-sm sm:text-base">
                Sound effects
              </span>

              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 m-0">
                Play sounds for called numbers and game events.
              </p>
            </div>
          </div>
          <Toggle
            enabled={soundOn}
            theme="#00d5be"
            onChange={(value) => {
              // setSound(value);
              updateSettingsFun({ soundOn: value });
            }}
          />{" "}
        </div>

        {/* Dark theme */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <HiMoon className="text-teal-400 text-lg sm:text-xl shrink-0" />

            <div>
              <span className="text-white text-sm sm:text-base">
                Dark theme
              </span>

              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 m-0">
                Keep the game in a dark theme for a comfortable view.
              </p>
            </div>
          </div>
          <Toggle
            enabled={darkMode}
            theme="#00d5be"
            onChange={(value) => {
              // setDarkMode(value);
              updateSettingsFun({ darkMode: value });
            }}
          />
        </div>

        {/* Save history */}
        <div className="flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-2.5">
            <HiSave className="text-teal-400 text-lg sm:text-xl shrink-0" />

            <div>
              <span className="text-white text-sm sm:text-base">
                Save history
              </span>

              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 m-0">
                Save your completed games so you can view them later.
              </p>
            </div>
          </div>

          <Toggle
            enabled={saveHistory}
            theme="#00d5be"
            onChange={(value) => {
              // setSaveHistory(value);
              updateSettingsFun({ saveHistory: value });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Preferences;
