import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { HiChevronDown, HiOutlineCheck, HiOutlineClipboard } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { useGame } from "./useGame";
import { useGamePlayers } from "./useGamePlayers";
import { useAuth } from "../../contexts/AuthContext";
import { useStartGame } from "./useStartGame";
import { useGamePresence } from "./useGamePresence";
import { useRemovePlayer } from "./useRemovePlayer";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

function getInitials(name = "") {
  return name.trim().slice(0, 2).toUpperCase() || "?";
}

function MultiplayerWaiting() {
  const { gameId } = useParams();

  const { game, isLoading: isGameLoading } = useGame(gameId);
  const { players, isLoading: isPlayersLoading } = useGamePlayers(gameId);

  const navigate = useNavigate();
  const { userId } = useAuth();

  const { startGame, isStarting } = useStartGame();

  const isHost = game?.host_id === userId;
  const { removePlayer } = useRemovePlayer();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (game?.status === "playing") {
      navigate(`/game/multiplayer/${gameId}/play`);
    }
  }, [game?.status, gameId, navigate]);

  const handlePlayerLeft = useCallback(
    (leftUserId) => {
      removePlayer({
        gameId,
        userId: leftUserId,
      });
    },
    [gameId, removePlayer],
  );

  useGamePresence(gameId, userId, handlePlayerLeft);

  function handleStartGame() {
    startGame(gameId, {
      onSuccess: () => {
        navigate(`/game/multiplayer/${gameId}/play`);
      },
    });
  }

  function handleCopyCode() {
    if (!game?.code) return;
    navigator.clipboard.writeText(game.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (isGameLoading || isPlayersLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f2c28]">
        <Spinner />
      </div>
    );
  }

  return (
    // NOTE: bg-[#0f2c28] mirrors the /game page background — swap for your real
    // dark-teal token (e.g. bg-ocean-900) if one exists in your theme.
    <div className="relative min-h-screen overflow-hidden  px-4 py-10 sm:px-6 lg:px-8">
      {/* Decorative floating shapes, same language as the rest of the app */}
    

      <div className="relative mx-auto w-full max-w-2xl">
        {/* Hero */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white sm:h-16 sm:w-16">
            <HiOutlineUserGroup className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>

          <h1 className="font-primary text-4xl leading-tight text-white sm:text-5xl">
            Waiting Room
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/60 sm:text-base">
            {isHost
              ? "Share the code below and start whenever everyone's in."
              : "Hang tight — the host will start the game shortly."}
          </p>
        </div>

        {/* Game code card */}
        <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/40">
            Game code
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="font-primary text-3xl tracking-wide text-white sm:text-4xl">
              {game.code}
            </span>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/10"
            >
              {copied ? (
                <>
                  <HiOutlineCheck className="h-4 w-4 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <HiOutlineClipboard className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Players card */}
        <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-primary text-2xl text-white">Players</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60">
              {players?.length ?? 0} joined
            </span>
          </div>

          <ul className="space-y-2">
            {players?.map((player) => {
              const isPlayerHost = player.user_id === game.host_id;

              return (
                <li
                  key={player.id}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/80">
                    {getInitials(player.player_name)}
                  </div>

                  <span className="flex-1 text-sm text-white/90">
                    {player.player_name}
                  </span>

                  {isPlayerHost && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-400">
                      <HiChevronDown className="h-3.5 w-3.5" />
                      Host
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Actions */}
        {isHost ? (
          <Button
            variant="amber"
            className="w-full"
            onClick={handleStartGame}
            disabled={isStarting}
          >
            {isStarting ? "Starting..." : "Start Game"}
          </Button>
        ) : (
          <p className="text-center text-sm text-white/40">
            Waiting for the host to start the game...
          </p>
        )}
      </div>
    </div>
  );
}

export default MultiplayerWaiting;
