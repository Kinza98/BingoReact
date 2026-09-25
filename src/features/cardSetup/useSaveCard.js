import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { saveCard } from "../../services/savedPatternApi";

export function useSaveCard() {
  const queryClient = useQueryClient();

  const { mutate: saveCardMutation, isPending: isSaving } = useMutation({
    mutationFn: saveCard,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["savedCards"],
      });

      toast.success("Card saved successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    saveCard: saveCardMutation,
    isSaving,
  };
}
