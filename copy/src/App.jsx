import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import AppLayout from "./components/ui/AppLayout";
import ChangeOrder from "./pages/ChangeOrder";
import { BingoProvider } from "./contexts/BingoProviderContext";
import WriteNumbers from "./pages/WriteNumbers";
import { useEffect, useState } from "react";
import Loader from "./components/ui/Loader";
import Saved from "./pages/Saved";
// import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  // const [isDark, setIsDark] = useDarkMode();
  const [isLoading, setIsLoading] = useState(
    () => !sessionStorage.getItem("hasSeenLoader"),
  );
  
  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("hasSeenLoader", "true");
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <BingoProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Main />} />
            <Route path="edit" element={<ChangeOrder />} />
            <Route path="write" element={<WriteNumbers />} />
            <Route path="saved" element={<Saved />} />
          </Route>
        </Routes>
      </BingoProvider>
    </BrowserRouter>
  );
}

export default App;
