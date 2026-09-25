import { useEffect, useRef, useState } from "react";
import { INACTIVITY_TIMEOUT } from "../../constants/game";
import { funComments } from "./gameComments";

function useInactivityComment({ enabled, resetKey }) {
  const timerRef = useRef(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (!enabled) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      const randomComment =
        funComments[Math.floor(Math.random() * funComments.length)];

      setComment(randomComment);
    }, INACTIVITY_TIMEOUT);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [enabled, resetKey]);

  function clearComment() {
    setComment(null);
  }

  return {
    comment,
    clearComment,
  };
}

export default useInactivityComment;
