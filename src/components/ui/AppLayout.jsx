import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <main className="bg-ocean-700 min-h-screen w-screen flex items-center justify-center p-9 overflow-x-hidden relative">
      <Header />
      <div className="mt-12.5">
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;
