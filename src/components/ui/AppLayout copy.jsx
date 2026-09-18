import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { HiArrowCircleLeft, HiArrowLeft, HiCog } from "react-icons/hi";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import BingoBatch from "./BingoBatch";
import Logo from "./Logo";
function useCurrentUser() {
  return { name: "Kinza" };
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="bg-ocean-700 min-h-screen w-screen flex items-center justify-center p-9 relative">
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6">
        {location.pathname !== "/" ? (
          <button
            onClick={() => navigate(-1)}
            className="text-white text-xl md:text-2xl lg:text-4xl cursor-pointer"
          >
            <HiArrowCircleLeft />
          </button>
        ) : (
          <span />
        )}

        <Logo />

        <Link
          to="/game/settings"
          className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm">
            KI
          </span>
          <span className="text-white text-sm font-medium hidden sm:inline">
            Kinza
          </span>
          <HiChevronRight className="text-slate-400 text-sm" />
        </Link>
      </header>
      <Outlet />
    </main>
  );
}

export default AppLayout;
