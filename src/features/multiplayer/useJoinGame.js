import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGameByCode, joinGame } from "../../services/multiplayerService";

export function useJoinGame() {
  const { mutate: joinGameMutation, isPending: isJoining } = useMutation({
    mutationFn: async ({ code, userId, playerName }) => {
      const game = await getGameByCode(code);

      const player = await joinGame({
        gameId: game.id,
        userId,
        playerName,
      });

      return {
        game,
        player,
      };
    },

    onError: (error) => {
      toast.error(error.message || "Failed to join game.");
    },
  });

  return {
    joinGame: joinGameMutation,
    isJoining,
  };
}
