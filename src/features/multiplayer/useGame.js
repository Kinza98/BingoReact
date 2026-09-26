import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../lib/supabase";
import { getGame } from "../../services/multiplayerService";

export function useGame(gameId) {
  const queryClient = useQueryClient();

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGame(gameId),
    enabled: !!gameId,
  });

  useEffect(() => {
    if (!gameId) return;

    const channel = supabase
      .channel(`game-${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `id=eq.${gameId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["game", gameId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, queryClient]);

  return {
    game,
    isLoading,
  };
}
