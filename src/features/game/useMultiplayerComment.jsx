import { useEffect, useState } from "react";

import {
  multiplayerWaitingComments,
  multiplayerWinComments,
  multiplayerLossComments,
} from "./gameComments";

const INACTIVITY_DELAY = 10000;

function getRandomComment(comments) {
  if (!comments.length) return "";

  return comments[Math.floor(Math.random() * comments.length)];
}

function useMultiplayerComment({
  isMyTurn,
  isGameOver,
  isWin,
  currentPlayerName,
}) {
  const [comment, setComment] = useState("");

  /*
   * Show win/loss comment immediately when the game ends.
   */
  useEffect(() => {
    if (!isGameOver) return;

    setComment(
      getRandomComment(
        isWin ? multiplayerWinComments : multiplayerLossComments,
      ),
    );
  }, [isGameOver, isWin]);

  /*
   * Show an inactivity comment when the current player
   * has been inactive for a while.
   *
   * The timer resets whenever the turn changes.
   */
  useEffect(() => {
    if (isGameOver) return;

    setComment("");

    const timer = setTimeout(() => {
      setComment(
        currentPlayerName
          ? getRandomComment(multiplayerWaitingComments).replace(
              "{player}",
              currentPlayerName,
            )
          : getRandomComment(multiplayerWaitingComments),
      );
    }, INACTIVITY_DELAY);

    return () => clearTimeout(timer);
  }, [currentPlayerName, isGameOver]);

  function clearComment() {
    setComment("");
  }

  return {
    comment,
    clearComment,
  };
}

export default useMultiplayerComment;
