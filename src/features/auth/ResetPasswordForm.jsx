import { useState } from "react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { validatePassword } from "../../utils/authValidation";
import toast from "react-hot-toast";
import { useResetPassword } from "./useResetPassword";
import Spinner from "../../components/ui/Spinner";

function ResetPasswordForm() {
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const { reset, isLoading, isSuccess } = useResetPassword();

  if (isSuccess && !isLoading) {
    setPassword("");
    setCPassword("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim() || !cPassword.trim()) return;
    if (password !== cPassword)
      toast.error("Confirm passowrd does not match with password.");
    if (validatePassword(password) !== "")
      toast.error(validatePassword(password));

    reset(password);
  }
  return (
    <form
      className="mt-5 md:mt-8 w-full max-w-200 text-center space-y-4 md:space-y-5 min-h-60"
      onSubmit={handleSubmit}
    >
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="New Password"
        id="password"
      />

      <InputField
        type="password"
        value={cPassword}
        onChange={(e) => setCPassword(e.target.value)}
        label="Confirm Password"
        id="cpassword"
      />
      <Button type="submit" style="game">
        {isLoading ? (
          <span className="mx-auto w-fit block">
            <Spinner size="sm" />
          </span>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
