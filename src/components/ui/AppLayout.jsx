import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { HiArrowCircleLeft, HiArrowLeft } from "react-icons/hi";

function AppLayout() {
  const navigate = useNavigate();
    const location = useLocation();

  return (
    <main className="bg-primary min-h-screen w-screen flex items-center justify-center p-9 relative">
      {location.pathname !== "/" && (
        <button onClick={() => navigate(-1)} className="text-white absolute top-6 left-6 md:top-10 md:left-10 text-3xl md:text-4xl lg:text-5xl cursor-pointer">
        <HiArrowCircleLeft />
        {/* <span className="hidden md:inline text-xl">Go back</span> */}
      </button>)}
      <Outlet />
    </main>
  );
}

export default AppLayout;
