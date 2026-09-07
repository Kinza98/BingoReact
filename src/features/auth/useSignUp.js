import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/authService";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signupFun, isPending: isLoading } = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      toast.error(error?.message);
    },
    onSuccess: () => {
      toast.success("Account created successfully.");
    },
  });

  return { signupFun, isLoading };
}
