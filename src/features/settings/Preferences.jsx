import { useLocation } from "react-router-dom";
import { HiMoon, HiSave, HiVolumeUp } from "react-icons/hi";

import Toggle from "../../components/ui/Toggle";
import { useUpdateSettings } from "./useUpdateSettings";
import { useAuth } from "../../contexts/AuthContext";

function Preferences() {
  const { soundOn, darkMode, saveHistory } = useAuth();
  const { updateSettingsFun } = useUpdateSettings();

  const location = useLocation();
  const isActive = location.hash === "#preferences";

  return (
    <>
      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 sm:text-sm dark:text-slate-400">
        Preferences
      </p>

      <div
        className={`mb-6 overflow-hidden rounded-2xl border border-slate-400/20 transition-all duration-300 ${
          isActive
            ? "bg-slate-300/70 dark:bg-white/10"
            : "bg-slate-300/40 dark:bg-white/5"
        }`}
      >
        {/* Sound */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-400/20 p-4 sm:p-5 dark:border-white/8">
          <div className="flex min-w-0 items-start gap-3">
            <HiVolumeUp className="mt-0.5 shrink-0 text-lg text-teal-600 sm:text-xl dark:text-teal-400" />

            <div className="min-w-0">
              <span className="text-sm text-slate-900 sm:text-base dark:text-white">
                Sound effects
              </span>

              <p className="m-0 mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                Play sounds for called numbers and game events.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Toggle
              enabled={soundOn}
              theme="var(--color-teal-400)"
              onChange={(value) => {
                updateSettingsFun({ soundOn: value });
              }}
            />
          </div>
        </div>

        {/* Dark theme */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-400/20 p-4 sm:p-5 dark:border-white/8">
          <div className="flex min-w-0 items-start gap-3">
            <HiMoon className="mt-0.5 shrink-0 text-lg text-teal-600 sm:text-xl dark:text-teal-400" />

            <div className="min-w-0">
              <span className="text-sm text-slate-900 sm:text-base dark:text-white">
                Dark theme
              </span>

              <p className="m-0 mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                Keep the game in a dark theme for a comfortable view.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Toggle
              enabled={darkMode}
              theme="var(--color-teal-400)"
              onChange={(value) => {
                updateSettingsFun({ darkMode: value });
              }}
            />
          </div>
        </div>

        {/* Save history */}
        <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
          <div className="flex min-w-0 items-start gap-3">
            <HiSave className="mt-0.5 shrink-0 text-lg text-teal-600 sm:text-xl dark:text-teal-400" />

            <div className="min-w-0">
              <span className="text-sm text-slate-900 sm:text-base dark:text-white">
                Save history
              </span>

              <p className="m-0 mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                Save your completed games so you can view them later.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Toggle
              enabled={saveHistory}
              theme="var(--color-teal-400)"
              onChange={(value) => {
                updateSettingsFun({ saveHistory: value });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Preferences;
