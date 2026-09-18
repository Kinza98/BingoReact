import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiChevronRight, HiLockClosed } from "react-icons/hi";

function AccountSettings() {
  const location = useLocation();

  const isActive = location.hash === `#account`;
  return (
    <>
      <p className="text-slate-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-2.5">
        Account
      </p>

      <div
        className={`border border-white/10 rounded-2xl overflow-hidden mb-6 transition-all duration-300 ${
          isActive ? "bg-white/10" : "bg-white/5"
        }`}
      >
        <Link
          to="/forgot-password"
          className="w-full flex items-center justify-between p-4 sm:p-5"
        >
          <div className="flex items-center gap-2.5">
            <HiLockClosed className="text-teal-400 text-lg sm:text-xl shrink-0" />

            <div>
              <span className="text-white text-sm sm:text-base">
                Change password
              </span>

              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 m-0">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>

          <HiChevronRight className="text-slate-400 text-base sm:text-lg" />
        </Link>
      </div>
    </>
  );
}

export default AccountSettings;
