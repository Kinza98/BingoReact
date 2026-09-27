import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { endGame } from "../../services/multiplayerService";

export function useEndGame() {
  const { mutate: endGameMutation, isPending: isEnding } = useMutation({
    mutationFn: endGame,

    onError: (error) => {
      toast.error(error.message || "Failed to end game.");
    },
  });

  return {
    endGame: endGameMutation,
    isEnding,
  };
}
