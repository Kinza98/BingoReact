import { useEffect, useRef } from "react";

import { supabase } from "../../lib/supabase";

export function useGamePresence(gameId, userId, onPlayerLeft) {
  const handledPlayers = useRef(new Set());

  useEffect(() => {
    if (!gameId || !userId) return;

    const channel = supabase.channel(`game-presence-${gameId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel.on("presence", { event: "leave" }, ({ key }) => {
      if (key === userId) return;

      if (handledPlayers.current.has(key)) return;

      handledPlayers.current.add(key);

      onPlayerLeft?.(key);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          userId,
        });
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, userId, onPlayerLeft]);
}
