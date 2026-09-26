import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { startGame } from "../../services/multiplayerService";

export function useStartGame() {
  const { mutate: startGameMutation, isPending: isStarting } = useMutation({
    mutationFn: startGame,

    onError: (error) => {
      toast.error(error.message || "Failed to start game.");
    },
  });

  return {
    startGame: startGameMutation,
    isStarting,
  };
}
