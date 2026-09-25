import React from "react";
import FemaleBingoBot from "../../components/ui/GameplayBackground";
import { useGameTheme } from "../../contexts/GameThemeContext";

function BotMessage({ message, botName }) {
  const { theme: GAME_THEME } = useGameTheme();
  return (
    <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 xs:gap-3 animate-result-text">
      <div className="w-10 h-10 shrink-0 flex items-center justify-center">
        <FemaleBingoBot
          showFullRobot={false}
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="relative min-w-0 max-w-[230px] border rounded-2xl rounded-bl-sm px-3 py-2.5"
        style={{
          backgroundColor: GAME_THEME.surfaceLight,
          borderColor: GAME_THEME.botBorder,
        }}
      >
        <span
          className="block text-[8px] uppercase tracking-widest text-left mb-0.5"
          style={{ color: GAME_THEME.muted }}
        >
          {botName}
        </span>

        <p
          className="text-[11px] xs:text-xs sm:text-sm italic text-left leading-relaxed"
          style={{ color: GAME_THEME.text }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default BotMessage;
