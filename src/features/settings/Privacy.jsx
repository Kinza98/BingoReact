import { useLocation } from "react-router-dom";
import { HiShieldCheck } from "react-icons/hi";

function Privacy() {
  const location = useLocation();

  const isActive = location.hash === "#privacy";

  return (
    <>
      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 sm:text-sm dark:text-slate-400">
        Privacy
      </p>

      <div
        className={`mb-6 flex gap-3 rounded-2xl border border-slate-400/20 p-4 transition-all duration-300 sm:p-5 ${
          isActive
            ? "bg-slate-300/70 dark:bg-white/10"
            : "bg-slate-300/40 dark:bg-white/5"
        }`}
      >
        <HiShieldCheck className="mt-0.5 shrink-0 text-lg text-teal-600 sm:text-xl dark:text-teal-400" />

        <div className="min-w-0">
          <p className="mb-1 text-sm font-medium text-slate-900 sm:text-base dark:text-white">
            Your privacy matters
          </p>

          <p className="m-0 text-justify text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-relaxed dark:text-slate-400">
            We respect your privacy and only collect and use the information
            needed to provide a smooth and secure gaming experience. Your
            account information is used to manage your profile, save your game
            history, and provide features such as password recovery. If you
            choose to play as a guest, your game activity is not linked to a
            registered account or saved as part of your personal game history.
            We do not sell your personal information or share it with third
            parties for advertising purposes. We take reasonable steps to keep
            your information secure and only use it for purposes related to
            operating and improving the game. You can also choose whether you
            want your completed games to be saved in your history.
          </p>
        </div>
      </div>
    </>
  );
}

export default Privacy;
