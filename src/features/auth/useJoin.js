import { useMutation } from "@tanstack/react-query";
import { joinGuest } from "../../services/authService";
import toast from "react-hot-toast";

export function useJoin() {
  const { mutate: join, isPending: isLoading } = useMutation({
    mutationFn: joinGuest,
    onError: (error) => {
      toast.error(error?.message);
    },
    onSuccess: () => {
      toast.success("Successfully joined as a Guest.");
    },
  });

  return { join, isLoading };
}
