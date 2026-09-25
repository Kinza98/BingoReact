import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSavedCard } from "../../services/savedPatternApi";

export function useDeleteSavedCard() {
  const queryClient = useQueryClient();

  const { mutate: deleteCard, isPending: isDeleting } = useMutation({
    mutationFn: deleteSavedCard,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["savedCards"],
      });

      toast.success("Card removed from saved cards.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    deleteCard,
    isDeleting,
  };
}
