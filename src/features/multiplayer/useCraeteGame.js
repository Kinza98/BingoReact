import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createGame } from "../../services/multiplayerService";

export function useCreateGame() {
  const { mutate: createGameMutation, isPending: isCreating } = useMutation({
    mutationFn: createGame,

    onSuccess: (data) => {
      console.log("Game created:", data);
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create game.");
    },
  });

  return {
    createGame: createGameMutation,
    isCreating,
  };
}
