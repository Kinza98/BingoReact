import { HiShieldCheck } from "react-icons/hi";
import { useLocation } from "react-router-dom";

function Privacy() {
  const location = useLocation();

  const isActive = location.hash === `#privacy`;
  return (
    <>
      <p className="text-slate-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-2.5">
        Privacy
      </p>

      <div
        className={`border border-white/10 rounded-2xl p-4 sm:p-5 flex gap-3 mb-6 transition-all duration-300 ${
          isActive ? "bg-white/10" : "bg-white/5"
        }`}
      >
        <HiShieldCheck className="text-teal-400 text-lg sm:text-xl flex-shrink-0 mt-0.5" />

        <div>
          <p className="text-white text-sm sm:text-base font-medium mb-1">
            Your privacy matters
          </p>

          <p className="text-slate-400 text-sm sm:text-base text-justify leading-relaxed m-0">
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
