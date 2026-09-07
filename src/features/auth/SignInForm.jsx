import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "../../components/ui/InputField";
import { validateEmail } from "../../utils/authValidation";
import toast from "react-hot-toast";
import { useSignIn } from "./useSignIn";
import Spinner from "../../components/ui/Spinner";

function SignInForm() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/game";
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState("kinzaij98@gmail.com");
  const [password, setPassword] = useState("kinza123");
  const guest = false;

  const { signInFun, isLoading } = useSignIn();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(from);
  }, [isAuthenticated, from, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;
    if (validateEmail(email) !== "") {
      toast.error(validateEmail(email));
      return;
    }

    signInFun({ email, password });
  }
  return (
    <form
      className="mt-5 md:mt-8 w-full max-w-200 text-center space-y-4 md:space-y-5 min-h-60"
      onSubmit={handleSubmit}
    >
      <InputField
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        id="email"
      />
      <div className="flex items-end flex-col gap-2">
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          id="password"
        />
        <Link
          to="/forgot-password"
          className="text-white/50 tracking-wide text-right inline underline"
        >
          Forgot Password ?
        </Link>
      </div>

      <Button type="submit" style="game">
        {isLoading ? (
          <span className="mx-auto w-fit block">
            <Spinner size="sm" />
          </span>
        ) : (
          "Log in"
        )}
      </Button>
      <span className="text-white/50  block -mt-3">
        Don't have an account?
        <Link to="/signup" className="text-amber underline ml-1">
          Sign up
        </Link>
      </span>
    </form>
  );
}

export default SignInForm;
