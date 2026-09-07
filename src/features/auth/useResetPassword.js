import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const navigate = useNavigate();

  const {
    mutate: reset,
    isPending: isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: resetPassword,

    onSuccess: () => {
      navigate("/game");
      toast.success("Password has been reset successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { reset, isLoading, isSuccess };
}
