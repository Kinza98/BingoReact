import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGame } from "./useGame";
import { useEndGame } from "./useEndGame";
import { useGameNavigationExit } from "./useGameNavigationExit";
import { useAuth } from "../../contexts/AuthContext";
import { endGameOnClose } from "../../services/multiplayerService";
import MultiplayerGamePlay from "../game/MultiplayerGamePlay";

function MultiplayerGame() {
  const { gameId } = useParams();

  const { game, isLoading } = useGame(gameId);
  const { endGame } = useEndGame();
  const { session } = useAuth();

  const handleExit = useCallback(() => {
    if (game?.status === "playing") {
      endGame(gameId);
    }
  }, [game?.status, gameId, endGame]);

  useGameNavigationExit(handleExit);
  useEffect(() => {
    function handlePageHide(event) {
      if (event.persisted) return;

      if (game?.status !== "playing") return;

      const accessToken = session?.access_token;

      if (!accessToken) return;

      endGameOnClose({
        gameId,
        accessToken,
      });
    }

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [game?.status, gameId, session?.access_token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (game?.status === "ended") {
    return <div>Game ended.</div>;
  }

return <MultiplayerGamePlay gameId={gameId} game={game} />;}

export default MultiplayerGame;
