import { useEffect, useState } from "react";
import { botLossComments, botWinComments } from "./gameComments";

function useEndComment({ isGameOver, isWin }) {
  const [endComment, setEndComment] = useState(null);

  useEffect(() => {
    if (!isGameOver) return;

    const comments = isWin ? botLossComments : botWinComments;

    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    setEndComment(randomComment);
  }, [isGameOver, isWin]);

  return endComment;
}

export default useEndComment;
