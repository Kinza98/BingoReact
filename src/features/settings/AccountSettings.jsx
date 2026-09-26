import { Link, useLocation } from "react-router-dom";
import { HiChevronRight, HiLockClosed } from "react-icons/hi";

function AccountSettings() {
  const location = useLocation();

  const isActive = location.hash === "#account";

  return (
    <>
      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 sm:text-sm dark:text-slate-400">
        Account
      </p>

      <div
        className={`mb-6 overflow-hidden rounded-2xl border border-slate-400/20 transition-all duration-300 ${
          isActive
            ? "bg-slate-300/70 dark:bg-white/10"
            : "bg-slate-300/40 dark:bg-white/5"
        }`}
      >
        <Link
          to="/forgot-password"
          className="group flex w-full items-center justify-between gap-3 p-4 sm:p-5"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <HiLockClosed className="shrink-0 text-lg text-teal-600 group-hover:text-amber/70 sm:text-xl dark:text-teal-400 dark:group-hover:text-amber/40" />

            <div className="min-w-0">
              <span className="text-sm text-slate-900 group-hover:text-amber sm:text-base dark:text-white">
                Change password
              </span>

              <p className="m-0 mt-0.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>

          <HiChevronRight className="shrink-0 text-base text-slate-500 group-hover:text-amber sm:text-lg dark:text-slate-400" />
        </Link>
      </div>
    </>
  );
}

export default AccountSettings;
