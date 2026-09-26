import React from "react";
import FemaleBingoBot from "../../components/ui/GameplayBackground";
import { useGameTheme } from "../../contexts/GameThemeContext";

function BotMessage({ message, botName }) {
  const { theme: GAME_THEME } = useGameTheme();

  return (
    <div className="mt-5 flex items-center justify-center gap-2 animate-result-text xs:gap-3 sm:mt-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
        <FemaleBingoBot
          showFullRobot={false}
          className="h-full w-full object-contain"
        />
      </div>

      <div
        className="relative min-w-0 max-w-[230px] rounded-2xl rounded-bl-sm border px-3 py-2.5"
        style={{
          backgroundColor: GAME_THEME.surfaceLight,
          borderColor: GAME_THEME.botBorder,
        }}
      >
        <span
          className="mb-0.5 block text-left text-[8px] uppercase tracking-widest"
          style={{ color: GAME_THEME.muted }}
        >
          {botName}
        </span>

        <p
          className="text-left text-[11px] italic leading-relaxed xs:text-xs sm:text-sm"
          style={{ color: GAME_THEME.text }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default BotMessage;
