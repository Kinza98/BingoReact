import { useState } from "react";
import {
  HiOutlineArrowRight,
  HiOutlineLink,
  HiOutlinePlus,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useCreateGame } from "./useCraeteGame";
import Spinner from "../../components/ui/Spinner";
import { useJoinGame } from "./useJoinGame";

function Multiplayer() {
  const [gameCode, setGameCode] = useState("");
  const { userId, name } = useAuth();
  const { createGame, isCreating } = useCreateGame();
  const navigate = useNavigate();
  const { joinGame, isJoining } = useJoinGame();

  function handleJoinGame() {
    if (!gameCode.trim()) return;

    joinGame(
      {
        code: gameCode.trim(),
        userId,
        playerName: name,
      },
      {
        onSuccess: ({ game }) => {
          navigate(`/game/multiplayer/${game.id}`);
        },
      },
    );
  }

  function handleCreateGame() {
    createGame(
      {
        userId,
        playerName: name,
      },
      {
        onSuccess: (data) => {
          navigate(`/game/multiplayer/${data.id}`);
        },
      },
    );
  }

  if (isCreating) return <Spinner />;

  return (
    // NOTE: swap bg-[#0f2c28] for your real dark-teal page token (e.g. bg-ocean-900)
    // if one already exists in your theme — I used an arbitrary hex since I can't see
    // your tailwind config, to guarantee it matches the /game page background exactly.
    <div className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      {/* Decorative floating shapes, same language as the /game welcome screen */}

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Hero */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white sm:h-16 sm:w-16">
            <HiOutlineUserGroup className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>

          <h1 className="font-primary text-4xl leading-tight text-white sm:text-5xl">
            Multiplayer Bingo
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Gather your friends, create a game, and see who gets Bingo first.
          </p>
        </div>

        {/* Main options */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* CREATE GAME */}
          <section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
                <HiOutlinePlus className="h-7 w-7" />
              </div>

              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400">
                HOST
              </span>
            </div>

            <h2 className="mt-7 font-primary text-3xl text-white">
              Create a Game
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/60 sm:text-base">
              Start your own Bingo room and invite your friends to join using a
              simple game code.
            </p>

            {/* Steps */}
            <div className="mt-7 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/80">
                  1
                </span>
                <span className="text-sm text-white/80">
                  Create your Bingo game
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/80">
                  2
                </span>
                <span className="text-sm text-white/80">
                  Share the game code with friends
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/80">
                  3
                </span>
                <span className="text-sm text-white/80">
                  Start playing when everyone is ready
                </span>
              </div>
            </div>

            <Button
              variant="pine"
              className="mt-8 w-full"
              onClick={handleCreateGame}
            >
              <span className="flex items-center justify-center gap-2">
                Create Game
                <HiOutlineArrowRight className="h-5 w-5" />
              </span>
            </Button>
          </section>

          {/* JOIN GAME */}
          <section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-player">
                <HiOutlineLink className="h-7 w-7" />
              </div>

              <span className="rounded-full bg-player/10 px-3 py-1 text-xs font-bold text-player">
                PLAYER
              </span>
            </div>

            <h2 className="mt-7 font-primary text-3xl text-white">
              Join a Game
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/60 sm:text-base">
              Got an invitation from a friend? Enter their game code to join.
            </p>

            {/* Input area */}
            <div className="mt-7">
              <label
                htmlFor="game-code"
                className="mb-2 block text-sm font-bold text-white/80"
              >
                Game code
              </label>

              <div className="relative">
                <HiOutlineLink className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

                <input
                  id="game-code"
                  type="text"
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleJoinGame();
                    }
                  }}
                  placeholder="Enter code or paste link"
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-player focus:ring-2 focus:ring-player/20"
                />
              </div>

              <p className="mt-2 text-xs text-white/40">Example: BNG-4821</p>
            </div>

            <Button
              variant="plum"
              className="mt-6 w-full"
              onClick={handleJoinGame}
              disabled={isJoining || !gameCode.trim()}
            >
              <span className="flex items-center justify-center gap-2">
                {isJoining ? "Joining..." : "Join Game"}
                <HiOutlineArrowRight className="h-5 w-5" />
              </span>
            </Button>
          </section>
        </div>

        {/* Bottom hint */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center">
          <HiOutlineUserGroup className="h-4 w-4 text-white/40" />
          <p className="text-xs text-white/40 sm:text-sm">
            Multiplayer games can be joined using a shared code .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Multiplayer;
