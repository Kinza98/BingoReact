import { useState } from "react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

function ForgotPasswordForm() {
  const [email, setEmail] = useState();

  function handleSubmit(e) {
    e.preventDefault();
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
        Send Email
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
