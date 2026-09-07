import { useState } from "react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import { validateEmail, validatePassword } from "../../utils/authValidation";
import toast from "react-hot-toast";
import { useSignUp } from "./useSignUp";
import Spinner from "../../components/ui/Spinner";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signupFun, isLoading } = useSignUp();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) return;
    if (validateEmail(email) !== "") {
      toast.error(validateEmail(email));
      return;
    }
    if (validatePassword(password) !== "") {
      toast.error(validatePassword(password));
      return;
    }
    signupFun({ name, email, password });
  }
  return (
    <form
      className="mt-5 md:mt-8 w-full max-w-200 text-center space-y-4 md:space-y-5 min-h-60"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-5">
        <InputField
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          id="email"
        />

        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          id="name"
        />
      </div>
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        id="password"
      />
      <Button
        type="submit"
        style="game"
        // variant="lightPurple"
        classes=""
      >
        {isLoading ? (
          <span className="mx-auto w-fit block">
            <Spinner size="sm" />
          </span>
        ) : (
          "Sign up"
        )}
      </Button>
      <span className="text-white/50  block -mt-3">
        Already have an account?
        <Link to="/signin" className="text-amber underline ml-1">
          Sign in
        </Link>
      </span>
    </form>
  );
}

export default SignupForm;
