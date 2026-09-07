import { useState } from "react";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { useJoin } from "./useJoin";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

function JoinAsGuestForm() {
  const [name, setName] = useState("");

  const { join, isLoading } = useJoin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !name.trim()) return;
    join({ name });
  }

  return (
    <form
      className="mt-5 md:mt-8 w-full max-w-200 text-center space-y-4 md:space-y-5 min-h-60"
      onSubmit={handleSubmit}
    >
      <InputField
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        id="name"
      />

      <Button type="submit" style="game">
        {isLoading ? (
          <span className="mx-auto w-fit block">
            <Spinner size="sm" />
          </span>
        ) : (
          "Join"
        )}
      </Button>
    </form>
  );
}

export default JoinAsGuestForm;
