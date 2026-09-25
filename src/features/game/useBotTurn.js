import { useEffect, useRef } from "react";

import { BOT_TURN_DELAY } from "../../constants/game";
import { botSelectingNumber } from "../../utils/bingoGameUtils";

function useBotTurn({
  botPattern,
  setBotPattern,
  setPattern,
  setTurn,
  showCalledNumber,
  clearComment,
}) {
  const botTimeoutRef = useRef(null);

  function botHandlePlay(value) {
    const updatedBotPattern = botPattern.map((item) =>
      item.value === value ? { ...item, checked: true } : item,
    );

    const botValue = botSelectingNumber(updatedBotPattern);

    if (botValue === null) {
      setBotPattern(updatedBotPattern);
      setTurn("you");
      return;
    }

    botTimeoutRef.current = setTimeout(() => {
      clearComment();

      const finalBotPattern = updatedBotPattern.map((item) =>
        item.value === botValue ? { ...item, checked: true } : item,
      );

      setBotPattern(finalBotPattern);

      setPattern((p) =>
        p.map((item) =>
          item.value === botValue ? { ...item, checked: true } : item,
        ),
      );

      showCalledNumber(botValue, "bot");

      setTurn("you");
    }, BOT_TURN_DELAY);
  }

  function clearBotTurn() {
    if (botTimeoutRef.current) {
      clearTimeout(botTimeoutRef.current);
      botTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(botTimeoutRef.current);
    };
  }, []);

  return {
    botHandlePlay,
    clearBotTurn,
  };
}

export default useBotTurn;
