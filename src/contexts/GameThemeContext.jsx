import { createContext, useContext } from "react";

import { useAuth } from "./AuthContext";

// const PLAYER_THEME = "#2c5f6f";
// const BOT_THEME = "#3e4c70";

const DARK_GAME_THEME = {
  // Overall game background
  page: "#203a43",
  pageDark: "#0d1b2a",

  surface: "#182f36",
  surfaceLight: "#294b55",

  // Main player / bot colors
  player: "#2c5f6f",
  bot: "#3e4c70",

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

const LIGHT_GAME_THEME = {
  // Overall game background
  page: "#f1f6f7",
  pageDark: "#dce9ed",

  surface: "#e2ecef",
  surfaceLight: "#d2e1e5",

  // Main player / bot colors

  // player: "#0f3d3e",
  // bot: "#77597d",
  player: "#55879e",
  bot: "#967c9b",

  // Accent
  accent: "#c47d16",

  // Text
  text: "#3a424f",
  muted: "#526873",

  // Player theme
  playerSoft: "rgba(44, 95, 111, 0.12)",
  playerBorder: "rgba(44, 95, 111, 0.45)",
  playerGlow: "rgba(44, 95, 111, 0.16)",

  // Bot theme
  botSoft: "rgba(62, 76, 112, 0.12)",
  botBorder: "rgba(62, 76, 112, 0.45)",
  botGlow: "rgba(62, 76, 112, 0.16)",

  // Accent glow
  goldGlow: "rgba(196, 125, 22, 0.18)",
};

const GameThemeContext = createContext(null);

function GameThemeProvider({ children }) {
  const { darkMode } = useAuth();

  const theme = darkMode ? DARK_GAME_THEME : LIGHT_GAME_THEME;

  return (
    <GameThemeContext.Provider
      value={{
        theme,
        playerTheme: theme.player,
        botTheme: theme.bot,
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
