import { useParams } from "react-router-dom";

import { useGame } from "./useGame";

function MultiplayerGame() {
  const { gameId } = useParams();

  const { game, isLoading } = useGame(gameId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (game?.status === "ended") {
    return <div>Game ended.</div>;
  }

  return <div>Multiplayer Game</div>;
}

export default MultiplayerGame;
