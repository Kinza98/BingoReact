import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { saveGameHistory } from "../../services/historyApi";

export function useSaveGameHistory() {
  const { mutate: saveGameHistoryFun, isPending: isLoading } = useMutation({
    mutationFn: saveGameHistory,
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { saveGameHistoryFun, isLoading };
}
