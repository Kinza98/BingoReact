import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { playMultiplayerTurn } from "../../services/multiplayerService";


export function usePlayMultiplayerTurn() {
  const { mutate: playTurn, isPending: isPlaying } = useMutation({
    mutationFn: playMultiplayerTurn,
    onError: (error) => {
      toast.error(error.message || "Failed to play turn.");
    },
  });

  return {
    playTurn,
    isPlaying,
  };
}
