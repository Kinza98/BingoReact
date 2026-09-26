import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../lib/supabase";
import { getGamePlayers } from "../../services/multiplayerService";

export function useGamePlayers(gameId) {
  const queryClient = useQueryClient();

  const { data: players, isLoading } = useQuery({
    queryKey: ["gamePlayers", gameId],
    queryFn: () => getGamePlayers(gameId),
    enabled: !!gameId,
  });

  useEffect(() => {
    if (!gameId) return;

    const channel = supabase
      .channel(`game-players-${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "game_players",
          filter: `game_id=eq.${gameId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["gamePlayers", gameId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, queryClient]);

  return {
    players,
    isLoading,
  };
}
