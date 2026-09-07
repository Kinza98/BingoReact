import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { forgotPassword } from "../../services/authService";

export function useForgotPassword() {
  const {
    mutate: forgot,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: () => {
      toast.success("Password reset link has been sent to your email.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { forgot, isLoading, error };
}
