import { createContext, useContext } from "react";

const PLAYER_THEME = "#2c5f6f";
const BOT_THEME = "#3e4c70";

const GAME_THEME = {
  // Overall game background
  page: "#203a43",
  pageDark: "#0d1b2a",
  surface: "#182f36",
  surfaceLight: "#294b55",

  // Main player / bot colors
  player: PLAYER_THEME,
  bot: BOT_THEME,

  // Accent
  accent: "#e8a33d",

  // Text
  text: "#f1f5f6",
  muted: "#9db2b7",

  // Player theme
  playerSoft: "rgba(44, 95, 111, 0.16)",
  playerBorder: "rgba(44, 95, 111, 0.55)",
  playerGlow: "rgba(44, 95, 111, 0.22)",

  // Bot theme
  botSoft: "rgba(62, 76, 112, 0.16)",
  botBorder: "rgba(62, 76, 112, 0.55)",
  botGlow: "rgba(62, 76, 112, 0.22)",

  // Accent glow
  goldGlow: "rgba(232, 163, 61, 0.22)",
};

const GameThemeContext = createContext(null);

function GameThemeProvider({ children }) {
  return (
    <GameThemeContext.Provider
      value={{
        theme: GAME_THEME,
        playerTheme: PLAYER_THEME,
        botTheme: BOT_THEME,
      }}
    >
      {children}
    </GameThemeContext.Provider>
  );
}

function useGameTheme() {
  const context = useContext(GameThemeContext);

  if (!context) {
    throw new Error("useGameTheme must be used inside a GameThemeProvider");
  }

  return context;
}

export { GameThemeProvider, useGameTheme };
