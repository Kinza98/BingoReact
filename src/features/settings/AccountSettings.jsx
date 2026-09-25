import { Link, useLocation } from "react-router-dom";
import { HiChevronRight, HiLockClosed } from "react-icons/hi";

function AccountSettings() {
  const location = useLocation();

  const isActive = location.hash === "#account";

  return (
    <>
      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-sm">
        Account
      </p>

      <div
        className={`mb-6 overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 ${
          isActive ? "bg-white/10" : "bg-white/5"
        }`}
      >
        <Link
          to="/forgot-password"
          className="group flex w-full items-center justify-between gap-3 p-4 sm:p-5"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <HiLockClosed className="shrink-0 group-hover:text-amber/40 text-lg text-teal-400 sm:text-xl" />

            <div className="min-w-0">
              <span className="text-sm text-white sm:text-base group-hover:text-amber">
                Change password
              </span>

              <p className="m-0 mt-0.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>

          <HiChevronRight className="shrink-0 text-base text-slate-400 sm:text-lg group-hover:text-amber" />
        </Link>
      </div>
    </>
  );
}

export default AccountSettings;
