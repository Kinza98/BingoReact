import { useState } from "react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { useForgotPassword } from "./useForgotPassword";

function ForgotPasswordForm() {
  const [email, setEmail] = useState();
  const { forgot, isLoading } = useForgotPassword();

  function handleSubmit(e) {
    e.preventDefault();
    forgot(email);
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
      <Button type="submit" style="game">
        {isLoading ? (
          <span className="mx-auto w-fit block">
            <Spinner size="sm" />
          </span>
        ) : (
          "Send Email"
        )}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
