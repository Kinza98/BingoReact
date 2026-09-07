import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import AppLayout from "./components/ui/AppLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import ChangeOrder from "./pages/ChangeOrder";
import { BingoProvider } from "./contexts/BingoProviderContext";
import WriteNumbers from "./pages/WriteNumbers";
import Saved from "./pages/Saved";
import Play from "./pages/Play";
import Settings from "./pages/Settings";
import History from "./pages/History";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import { Toaster } from "react-hot-toast";
import { HiExclamationTriangle } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  // const [isDark, setIsDark] = useDarkMode();
  // const [isLoading, setIsLoading] = useState(
  //   () => !sessionStorage.getItem("hasSeenLoader"),
  // );

  // useEffect(() => {
  //   if (!isLoading) return;

  //   const timer = setTimeout(() => {
  //     sessionStorage.setItem("hasSeenLoader", "true");
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [isLoading]);

  // if (isLoading) return <Loader />;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,

          error: {
            style: {
              background: "#B84A4A",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            iconTheme: {
              primary: "white",
              secondary: "#E15C5C",
            },
            icon: <HiExclamationTriangle className="text-xl" />,
          },

          success: {
            style: {
              background: "#3F9E6D",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            iconTheme: {
              primary: "white",
              secondary: "#3F9E6D",
            },
            icon: <HiCheckCircle className="text-xl" />,
          },
        }}
      />
      <BrowserRouter>
        <BingoProvider>
          <Routes>
            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <AppLayout />{" "}
                </ProtectedRoute>
              }
            >
              <Route index element={<Main />} />
              <Route path="edit" element={<ChangeOrder />} />
              <Route path="write" element={<WriteNumbers />} />
              <Route path="saved" element={<Saved />} />
              <Route path="play" element={<Play />} />
              <Route path="settings" element={<Settings />} />
              <Route path="history" element={<History />} />
            </Route>
            <Route path="/" element={<Welcome />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Routes>
        </BingoProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
