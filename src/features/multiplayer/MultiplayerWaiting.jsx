import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  HiChevronDown,
  HiOutlineCheck,
  HiOutlineClipboard,
} from "react-icons/hi";
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
  const { removePlayer } = useRemovePlayer();

  const isHost = game?.host_id === userId;

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
    return <Spinner />;
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="font-primary text-4xl leading-tight text-slate-700 dark:text-white sm:text-5xl">
          Waiting Room
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-700 dark:text-white/60 sm:text-base">
          {isHost
            ? "Share the code below and start whenever everyone's in."
            : "Hang tight — the host will start the game shortly."}
        </p>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Game code card */}
        <div
          className="
            rounded-[1.5rem]
            border border-slate-200
            bg-white/50
            p-5
            shadow-sm
            dark:border-white/10
            dark:bg-white/5
            dark:shadow-none
            sm:p-6
          "
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-white/40">
            Game code
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="font-primary text-3xl tracking-wide text-slate-700 dark:text-white sm:text-4xl">
              {game.code}
            </span>

            <button
              onClick={handleCopyCode}
              className="
                flex items-center gap-2
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-2.5
                text-sm text-slate-800
                transition
                hover:bg-slate-100
                dark:border-white/10
                dark:bg-white/5
                dark:text-white/80
                dark:hover:bg-white/10
              "
            >
              {copied ? (
                <>
                  <HiOutlineCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
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

          <p className="mt-3 text-xs text-slate-600 dark:text-white/40">
            Game codes are shared by the game host.
          </p>
        </div>

        {/* Players card */}
        <div
          className="
            rounded-[1.5rem]
            border border-slate-200
            bg-white/50
            p-5
            shadow-sm
            dark:border-white/10
            dark:bg-white/5
            dark:shadow-none
            sm:p-6
          "
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-primary text-2xl text-slate-700 dark:text-white">
              Players
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-white/60">
              {players?.length ?? 0} joined
            </span>
          </div>

          <ul className="space-y-2">
            {players?.map((player) => {
              const isPlayerHost = player.user_id === game.host_id;

              return (
                <li
                  key={player.id}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    border border-slate-100
                    bg-slate-100
                    px-4 py-3
                    dark:border-white/5
                    dark:bg-white/[0.03]
                  "
                >
                  <div
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-slate-100
                      text-xs font-bold
                      text-slate-800
                      dark:bg-white/10
                      dark:text-white/80
                    "
                  >
                    {getInitials(player.player_name)}
                  </div>

                  <span className="flex-1 text-sm text-slate-700 dark:text-white/90">
                    {player.player_name}
                  </span>

                  {isPlayerHost && (
                    <span
                      className="
                        flex items-center gap-1
                        rounded-full
                        bg-amber-400/15
                        px-2.5 py-1
                        text-xs font-bold
                        text-amber-600
                        dark:bg-amber-400/10
                        dark:text-amber-400
                      "
                    >
                      <HiChevronDown className="h-3.5 w-3.5" />
                      Host
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Actions */}
      {isHost ? (
        <Button
          classes="mt-6 w-full max-w-100 h-15 !mx-auto !justify-center bg-ocean-500"
          onClick={handleStartGame}
          disabled={isStarting}
        >
          {isStarting ? "Starting..." : "Start Game"}
        </Button>
      ) : (
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-white/40">
          Waiting for the host to start the game...
        </p>
      )}
    </div>
  );
}

export default MultiplayerWaiting;
