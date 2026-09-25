import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGameHistory } from "../../services/historyApi";

export function useDeleteHistory(userId) {
  const queryClient = useQueryClient();

  const { mutate: deleteHistory, isPending } = useMutation({
    mutationFn: () => deleteGameHistory(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gameHistory", userId],
      });
    },
  });

  return {
    deleteHistory,
    isDeleting: isPending,
  };
}
