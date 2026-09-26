import { useEffect, useState } from "react";
import FemaleBingoBot from "../../components/ui/GameplayBackground";

/**
 * Drop-in replacement for BotMessage, used only on the win screen.
 * Shows typing dots first, then types the message out letter by
 * letter so it reads as a live reply rather than a static notice.
 */
function AnimatedBotMessage({ message, theme, typingDelay = 900, speed = 18 }) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayed("");
    setIsTyping(true);

    let typeInterval;
    const startTimeout = setTimeout(() => {
      setIsTyping(false);
      let i = 0;
      typeInterval = setInterval(() => {
        i += 1;
        setDisplayed(message.slice(0, i));
        if (i >= message.length) clearInterval(typeInterval);
      }, speed);
    }, typingDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(typeInterval);
    };
  }, [message, typingDelay, speed]);

  return (
    <div className="relative mt-5 flex items-end gap-2 text-left">
      <span
        className="animate-bot-nod flex-shrink-0 text-2xl xs:text-3xl"
        aria-hidden="true"
      >
        <FemaleBingoBot showFullRobot={false} />
      </span>

      <div
        className="flex min-h-[44px] flex-1 items-center rounded-2xl rounded-bl-md px-3.5 py-3"
        style={{ backgroundColor: `${theme.accent}1a` }}
      >
        {isTyping ? (
          <span className="flex gap-1" aria-label="Bot is typing">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-bot-dot h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: theme.accent,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </span>
        ) : (
          <p
            className="text-xs leading-relaxed xs:text-sm"
            style={{ color: theme.text }}
          >
            {displayed}
          </p>
        )}
      </div>
    </div>
  );
}

export default AnimatedBotMessage;
