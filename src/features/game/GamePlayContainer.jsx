import { useEffect, useRef, useState } from "react";

import IntroBot from "./IntroBot";
import GameCard from "./GameCard";
import Result from "./BingoResult";
import CalledNumber from "./CalledNumber";
import BingoCelebration from "./BingoCelebration";
import StartAnnouncement from "./StartAnnouncement";
import InactivityComment from "./InactivityComment";
import SoundToggle from "./SoundToggle";

import useGameSounds from "./useGameSounds";
import useInactivityComment from "./useInactivityComment";
import useEndComment from "./useEndComment";
import useCalledNumber from "./useCalledNumber";
import useBotTurn from "./useBotTurn";
import { useSaveGameHistory } from "./useSaveGameHistory";
import { useUpdateSettings } from "../settings/useUpdateSettings";

import { useAuth } from "../../contexts/AuthContext";
import { useBingoContext } from "../../contexts/BingoProviderContext";
import { useGameTheme } from "../../contexts/GameThemeContext";

import {
  calculateBingoScore,
  createBingoPattern,
  resetBingoPattern,
} from "../../utils/bingoGameUtils";

import { START_ANNOUNCEMENT_DURATION } from "../../constants/game";

const BOT_NAME = "Kizi";

function GamePlay() {
  const { numbers, numberGenerator } = useBingoContext();
  const { saveGameHistoryFun } = useSaveGameHistory();
  const { saveHistory, userId, name, soundOn } = useAuth();
  const { updateSettingsFun } = useUpdateSettings();
  const { theme: GAME_THEME } = useGameTheme();

  const playerName = `${name[0].toUpperCase()}${name.slice(1)}`;

  const [turn, setTurn] = useState("you");
  const [showIntroBot, setShowIntroBot] = useState(false);
  const [showStartAnnouncement, setShowStartAnnouncement] = useState(false);
  const [celebrationScore, setCelebrationScore] = useState(null);

  const [pattern, setPattern] = useState(() => createBingoPattern(numbers));
  const [botPattern, setBotPattern] = useState(() =>
    createBingoPattern(numberGenerator()),
  );

  const hasSavedHistory = useRef(false);
  const previousScore = useRef(0);
  const hasPlayedEndSound = useRef(false);

  const { currentNumber, calledBy, showCalledNumber, clearCalledNumber } =
    useCalledNumber();

  const { playClick, playScore, playWin, playFail } = useGameSounds(soundOn);

  const score = calculateBingoScore(pattern);
  const botScore = calculateBingoScore(botPattern);

  const isWin = score >= 5;
  const isLoss = botScore >= 5;
  const isGameOver = isWin || isLoss;

  const { comment, clearComment } = useInactivityComment({
    enabled: !showIntroBot && !isGameOver,
    resetKey: turn,
  });

  const { botHandlePlay, clearBotTurn } = useBotTurn({
    botPattern,
    setBotPattern,
    setPattern,
    setTurn,
    showCalledNumber,
    clearComment,
  });

  // Show the intro only the first time this account plays.
  useEffect(() => {
    if (!userId) return;

    const firstGameKey = `bingoFirstGame_${userId}`;
    const hasPlayedBefore = localStorage.getItem(firstGameKey) === "true";

    setShowIntroBot(!hasPlayedBefore);
  }, [userId]);

  // Show a celebration when the player gets a new score from 1 to 4.
  useEffect(() => {
    const playerWon = score >= 5;
    const botWon = botScore >= 5;

    if (
      !playerWon &&
      !botWon &&
      score > previousScore.current &&
      score >= 1 &&
      score <= 4
    ) {
      playScore();
      setCelebrationScore(score);
    }
  }, [score, botScore, playScore]);

  // Play the end-game sound once.
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
  }, [isWin, isLoss, playFail, playWin]);

  useEffect(() => {
    previousScore.current = score;
  }, [score]);

  // Save the game once it ends.
  useEffect(() => {
    const gameEnded = isWin || isLoss;

    if (!gameEnded || !saveHistory || !userId || hasSavedHistory.current) {
      return;
    }

    hasSavedHistory.current = true;

    saveGameHistoryFun({
      userId,
      isWin,
      pattern,
      cardTheme: GAME_THEME.player,
    });
  }, [
    isWin,
    isLoss,
    saveHistory,
    userId,
    pattern,
    saveGameHistoryFun,
    GAME_THEME.player,
  ]);

  const endMessage = useEndComment({
    isGameOver,
    isWin,
  });

  function startGame() {
    setShowIntroBot(false);

    const firstGameKey = `bingoFirstGame_${userId}`;
    localStorage.setItem(firstGameKey, "true");

    setShowStartAnnouncement(true);

    setTimeout(() => {
      setShowStartAnnouncement(false);
    }, START_ANNOUNCEMENT_DURATION);
  }

  function handleRestart() {
    clearBotTurn();
    clearCalledNumber();

    hasSavedHistory.current = false;
    hasPlayedEndSound.current = false;

    setTurn("you");
    clearComment();
    setCelebrationScore(null);

    setPattern(resetBingoPattern);
    setBotPattern(resetBingoPattern);
  }

  function handlePlay({ index, value }) {
    if (showIntroBot || turn !== "you" || isWin || isLoss) {
      return;
    }

    clearComment();
    playClick();

    setPattern((p) =>
      p.map((item) =>
        item.index === index ? { ...item, checked: true } : item,
      ),
    );

    showCalledNumber(value, "you");
    setTurn("bot");
    botHandlePlay(value);
  }

  return (
    <div
      className="relative mt-10 min-h-full w-full overflow-x-hidden md:mt-0"
      style={{
        color: GAME_THEME.text,
      }}
    >
      {showStartAnnouncement && <StartAnnouncement />}

      {showIntroBot && (
        <IntroBot
          startGame={startGame}
          introMessage="Let's see if you can beat me 😈"
          playerName={playerName}
          botName={BOT_NAME}
        />
      )}

      <BingoCelebration
        key={celebrationScore}
        show={celebrationScore !== null}
        onDone={() => setCelebrationScore(null)}
      />

      {isGameOver && (
        <Result
          botName={BOT_NAME}
          isWin={isWin}
          endMessage={endMessage}
          handleRestart={handleRestart}
        />
      )}

      {currentNumber && (
        <CalledNumber calledBy={calledBy} currentNumber={currentNumber} />
      )}

      <div className="relative z-10 flex w-full flex-col gap-6 px-3 pb-6 xs:px-4 sm:gap-8 sm:px-6 lg:flex-row lg:items-start lg:justify-center lg:gap-9 lg:px-8 xl:px-10">
        <GameCard
          type="player"
          name={playerName}
          numbers={pattern}
          score={score}
          isTurn={turn === "you"}
          onClick={handlePlay}
        />

        <GameCard
          type="bot"
          name={BOT_NAME}
          numbers={botPattern}
          score={botScore}
          isTurn={turn === "bot"}
        />

        {comment && (
          <InactivityComment comment={comment} updateComment={clearComment} />
        )}

        <SoundToggle
          soundOn={soundOn}
          onToggle={() => updateSettingsFun({ soundOn: !soundOn })}
        />
      </div>
    </div>
  );
}

export default GamePlay;
