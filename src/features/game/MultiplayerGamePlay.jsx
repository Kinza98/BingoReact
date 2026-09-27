import { useEffect, useRef, useState } from "react";

import GameCard from "../game/GameCard";
import Result from "../game/BingoResult";
import BingoCelebration from "../game/BingoCelebration";
import SoundToggle from "../game/SoundToggle";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import useGameSounds from "../game/useGameSounds";
import useEndComment from "../game/useEndComment";
import { useUpdateSettings } from "../settings/useUpdateSettings";

import { useAuth } from "../../contexts/AuthContext";
import { useBingoContext } from "../../contexts/BingoProviderContext";
import { useGameTheme } from "../../contexts/GameThemeContext";
import { useGamePlayers } from "../multiplayer/useGamePlayers";
import { usePlayMultiplayerTurn } from "../multiplayer/usePlayMultiplayerTurn";

import {
  calculateBingoScore,
  createBingoPattern,
} from "../../utils/bingoGameUtils";

import useMultiplayerComment from "./useMultiplayerComment";

function MultiplayerGamePlay({ gameId, game }) {
  const { numbers } = useBingoContext();
  const { soundOn, name, userId } = useAuth();
  const { updateSettingsFun } = useUpdateSettings();
  const { theme: GAME_THEME } = useGameTheme();

  const { players, isLoading: isPlayersLoading } = useGamePlayers(gameId);

  const { playTurn, isPlaying } = usePlayMultiplayerTurn();

  const playerName = name
    ? `${name[0].toUpperCase()}${name.slice(1)}`
    : "Player";

  const currentPlayer = players?.find(
    (player) => Number(player.turn_order) === Number(game?.current_turn),
  );

  const currentTurn = currentPlayer?.player_name;

  const isMyTurn = currentPlayer?.user_id === userId;

  const [pattern, setPattern] = useState(() => createBingoPattern(numbers));

  const [winner, setWinner] = useState(null);
  const [celebrationScore, setCelebrationScore] = useState(null);

  const hasPlayedEndSound = useRef(false);
  const previousScore = useRef(0);

  const { playClick, playScore, playWin, playFail } = useGameSounds(soundOn);

  const score = calculateBingoScore(pattern);

  const isWin = winner === playerName;
  const isLoss = winner !== null && winner !== playerName;
  const isGameOver = winner !== null;

  const { comment, clearComment } = useMultiplayerComment({
    isMyTurn,
    isGameOver,
    isWin,
    currentPlayerName: currentTurn,
  });

  useEffect(() => {
    if (!game?.called_numbers) return;

    setPattern((currentPattern) =>
      currentPattern.map((item) => ({
        ...item,
        checked: game.called_numbers.includes(item.value),
      })),
    );
  }, [game?.called_numbers]);

  useEffect(() => {
    const previous = previousScore.current;

    if (!isGameOver && score > previous && score >= 1 && score <= 4) {
      playScore();
      setCelebrationScore(score);
    }

    previousScore.current = score;
  }, [score, isGameOver, playScore]);

  useEffect(() => {
    if (winner !== null) return;

    if (score >= 5) {
      setWinner(playerName);
    }
  }, [score, winner, playerName]);

  useEffect(() => {
    if (hasPlayedEndSound.current) return;

    if (isWin) {
      hasPlayedEndSound.current = true;
      playWin();
    }

    if (isLoss) {
      hasPlayedEndSound.current = true;
      playFail();
    }
  }, [isWin, isLoss, playWin, playFail]);

  const endMessage = useEndComment({
    isGameOver,
    isWin,
  });

  function handlePlay({ value }) {
    if (!isMyTurn || isGameOver || isPlaying) return;

    clearComment();
    playClick();

    playTurn({
      gameId,
      currentTurn: game.current_turn,
      value,
      players,
    });
  }

  function handleRestart() {
    setWinner(null);
    setCelebrationScore(null);
    hasPlayedEndSound.current = false;
    previousScore.current = 0;

    setPattern(createBingoPattern(numbers));
  }

  if (isPlayersLoading) {
    return <div>Loading players...</div>;
  }

  return (
    <div
      className="relative mt-10 min-h-full w-full overflow-x-hidden md:mt-0"
      style={{
        color: GAME_THEME.text,
      }}
    >
      <BingoCelebration
        key={celebrationScore}
        show={celebrationScore !== null}
        onDone={() => setCelebrationScore(null)}
      />

      {isGameOver && (
        <Result
          isWin={isWin}
          endMessage={endMessage}
          handleRestart={handleRestart}
        />
      )}

      <div className="relative z-10 flex w-full flex-col gap-6 px-3 pb-6 xs:px-4 sm:gap-8 sm:px-6 lg:flex-row lg:items-start lg:justify-center lg:gap-9 lg:px-8 xl:px-10">
        <GameCard
          type="player"
          name={playerName}
          numbers={pattern}
          score={score}
          isTurn={isMyTurn}
          onClick={handlePlay}
        />

        <div
          className="
            w-full max-w-md
            rounded-2xl
            border border-slate-200
            bg-white/80
            p-4
            shadow-sm
            backdrop-blur-sm
            dark:border-slate-700
            dark:bg-slate-900/70
            lg:max-w-xs
          "
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Players</h2>

            <p className="mt-1 text-sm opacity-70">
              {isMyTurn
                ? "It's your turn"
                : currentTurn
                  ? `${currentTurn}'s turn`
                  : "Waiting for turn..."}
            </p>

            {comment && (
              <p className="mt-2 text-center text-sm font-medium opacity-80">
                {comment}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {players?.map((player) => {
              const isCurrentTurn =
                Number(player.turn_order) === Number(game?.current_turn);

              const isCurrentPlayer = player.user_id === userId;

              return (
                <div
                  key={player.id}
                  className={`
                    flex items-center justify-between
                    rounded-xl
                    px-3 py-3
                    transition-colors
                    ${
                      isCurrentTurn
                        ? "bg-slate-200 dark:bg-slate-700"
                        : "bg-slate-100/70 dark:bg-slate-800/70"
                    }
                  `}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-slate-200
                        text-sm font-semibold
                        text-slate-700
                        dark:bg-slate-600
                        dark:text-slate-100
                      "
                    >
                      {player.player_name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {player.player_name}
                        {isCurrentPlayer && " (You)"}
                      </p>

                      {isCurrentTurn && (
                        <p className="text-xs opacity-70">Current turn</p>
                      )}
                    </div>
                  </div>

                  {isCurrentTurn && (
                    <span
                      className="
                        ml-2 shrink-0
                        rounded-full
                        bg-slate-700
                        px-2.5 py-1
                        text-xs font-medium
                        text-white
                        dark:bg-slate-200
                        dark:text-slate-800
                      "
                    >
                      Turn
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <SoundToggle
          soundOn={soundOn}
          onToggle={() =>
            updateSettingsFun({
              soundOn: !soundOn,
            })
          }
        />
      </div>

      <ConfirmDialog
        show={false}
        title="Leave Game?"
        message="Are you sure you want to leave the game? Your current game will be lost."
        confirmText="Leave Game"
        cancelText="Stay"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}

export default MultiplayerGamePlay;
