import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <main className="bg-primary min-h-screen w-screen flex items-center justify-center p-9">
      <Outlet />
    </main>
  );
}

export default AppLayout;
