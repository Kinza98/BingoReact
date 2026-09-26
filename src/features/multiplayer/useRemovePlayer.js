import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { removePlayer } from "../../services/multiplayerService";

export function useRemovePlayer() {
  const { mutateAsync: removePlayerMutation, isPending: isRemoving } =
    useMutation({
      mutationFn: ({ gameId, userId }) => removePlayer(gameId, userId),

      onError: (error) => {
        toast.error(error.message || "Failed to remove player.");
      },
      onSuccess: (data) => {
        console.log("Removed player:", data);
      },
    });

  return {
    removePlayer: removePlayerMutation,
    isRemoving,
  };
}
