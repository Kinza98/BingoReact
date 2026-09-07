import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../services/authService";
import toast from "react-hot-toast";

export function useSignIn() {
  const { mutate: signInFun, isPending: isLoading } = useMutation({
    mutationFn: signIn,
    onError: (error) => {
      toast.error(error?.message);
    },
    // onSuccess: () => {
    //   toast.success("Successfully logged in.");
    // },
  });

  return { signInFun, isLoading };
}
