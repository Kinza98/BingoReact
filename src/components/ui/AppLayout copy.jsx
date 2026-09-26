import { useState } from "react";
import {
  HiOutlineArrowRight,
  HiOutlineLink,
  HiOutlinePlus,
  HiOutlineUserGroup,
} from "react-icons/hi";

import Button from "../../components/ui/Button";

function Multiplayer() {
  const [gameCode, setGameCode] = useState("");

  function handleCreateGame() {
    console.log("Create game");
  }

  function handleJoinGame() {
    if (!gameCode.trim()) return;

    console.log("Join game:", gameCode);
  }

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] bg-background shadow-2xl">
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        {/* HERO */}
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-border bg-surface px-5 py-9 shadow-sm sm:px-8 sm:py-11">
          {/* Decorative circles */}
          <div
            className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-player/10"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-bot/10"
            aria-hidden="true"
          />

          {/* Decorative letters */}
          <span
            className="pointer-events-none absolute right-8 top-2 hidden rotate-12 font-primary text-7xl text-player/10 sm:block"
            aria-hidden="true"
          >
            B
          </span>

          <span
            className="pointer-events-none absolute bottom-0 left-8 hidden -rotate-12 font-primary text-6xl text-bot/10 sm:block"
            aria-hidden="true"
          >
            O
          </span>

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-700 text-white shadow-lg shadow-ocean-700/20 sm:h-[4.5rem] sm:w-[4.5rem]">
              <HiOutlineUserGroup className="h-8 w-8 sm:h-9 sm:w-9" />
            </div>

            <h1 className="font-primary text-3xl leading-tight text-text sm:text-4xl">
              Multiplayer Bingo
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-text-muted sm:text-base">
              Gather your friends, create a game, and see who gets Bingo first.
            </p>
          </div>
        </div>

        {/* MAIN OPTIONS */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* CREATE GAME */}
          <section className="group relative overflow-hidden rounded-[1.75rem] border border-success/25 bg-surface p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
            {/* Accent line */}
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-success" />

            {/* Decorative circle */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-success/10 transition duration-500 group-hover:scale-110"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/15 text-success shadow-sm">
                  <HiOutlinePlus className="h-7 w-7" />
                </div>

                <span className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-bold tracking-wide text-success">
                  HOST
                </span>
              </div>

              <h2 className="mt-7 font-primary text-2xl text-text sm:text-3xl">
                Create a Game
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-text-muted sm:text-base">
                Start your own Bingo room and invite your friends to join using
                a simple game code or link.
              </p>

              {/* Steps */}
              <div className="mt-7 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-success/5 px-3 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/15 text-sm font-bold text-success">
                    1
                  </span>

                  <span className="text-sm font-medium text-text">
                    Create your Bingo game
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-success/5 px-3 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/15 text-sm font-bold text-success">
                    2
                  </span>

                  <span className="text-sm font-medium text-text">
                    Share the game code with friends
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-success/5 px-3 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/15 text-sm font-bold text-success">
                    3
                  </span>

                  <span className="text-sm font-medium text-text">
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
            </div>
          </section>

          {/* JOIN GAME */}
          <section className="group relative overflow-hidden rounded-[1.75rem] border border-bot/25 bg-surface p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
            {/* Accent line */}
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-bot" />

            {/* Decorative circle */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-bot/10 transition duration-500 group-hover:scale-110"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bot/15 text-bot shadow-sm">
                  <HiOutlineLink className="h-7 w-7" />
                </div>

                <span className="rounded-full bg-bot/10 px-3 py-1.5 text-xs font-bold tracking-wide text-bot">
                  PLAYER
                </span>
              </div>

              <h2 className="mt-7 font-primary text-2xl text-text sm:text-3xl">
                Join a Game
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-text-muted sm:text-base">
                Got an invitation from a friend? Enter their game code or paste
                the shared link to join.
              </p>

              {/* Input */}
              <div className="mt-7">
                <label
                  htmlFor="game-code"
                  className="mb-2 block text-sm font-bold text-text"
                >
                  Game code or link
                </label>

                <div className="relative">
                  <HiOutlineLink className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-subtle" />

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
                    className="w-full rounded-xl border border-border bg-background py-3.5 pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-subtle focus:border-bot focus:ring-2 focus:ring-bot/15"
                  />
                </div>

                <p className="mt-2 text-xs text-text-subtle">
                  Example: BNG-4821
                </p>
              </div>

              <Button
                variant="plum"
                className="mt-6 w-full"
                onClick={handleJoinGame}
                disabled={!gameCode.trim()}
              >
                <span className="flex items-center justify-center gap-2">
                  Join Game
                  <HiOutlineArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </section>
        </div>

        {/* BOTTOM HINT */}
        <div className="mt-7 flex items-center justify-center gap-2 text-center">
          <HiOutlineUserGroup className="h-4 w-4 text-text-subtle" />

          <p className="text-xs text-text-subtle sm:text-sm">
            Multiplayer games can be joined using a shared code or invitation
            link.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Multiplayer;
