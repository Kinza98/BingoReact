import { useEffect, useRef, useState } from "react";
import BingoCard from "../components/bingoGame/BingoCard";
import { useBingoContext } from "../contexts/BingoProviderContext";
import Result from "../components/ui/Result";
import { HiX, HiRefresh } from "react-icons/hi";
import BingoScore from "../components/bingoGame/BingoScore";
import { useSaveGameHistory } from "../features/game/useSaveGameHistory";
import { useAuth } from "../contexts/AuthContext";
import FemaleBingoBot from "../components/ui/GameplayBackground";
import BingoCelebration from "../features/game/BingoCelebration";
import { Link } from "react-router-dom";
import { ConfettiBurst } from "../components/ui/ConfettiBurst";

const lines = [
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
];

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
const funComments = [
  "Your turn, sleepyhead 😴",
  "The numbers aren't going to pick themselves! 😄",
  "Hello? We miss you! 👀",
  "Bingo needs you! 🎯",
  "Don't keep us waiting! 😏",
  "Your card is getting lonely 🥲",
  "Thinking hard, huh? 🤔",
  "Come on, pick a number! 😄",
  "Kizi is getting impatient 🤖",
  "Tick tock... ⏰",
  "Your move, champ! 😎",
  "The numbers are waiting for you 👀",
  "Don't let Kizi have all the fun! 😈",
  "One number. That's all we need. 😌",
  "The suspense is killing us! 😂",
];

const introComments = [
  (name) => `Good luck, ${name}! Let's see if you can beat me. 😏`,
  (name) => `Good luck, ${name}! Try to keep up. 🤖`,
  (name) => `Ready, ${name}? I don't plan on making this easy. 😈`,
  (name) => `Good luck, ${name}! Don't blink... I play fast. 😉`,
];

const botWinComments = [
  "Looks like I got there first. 😏",
  "That was close... but not close enough! 😈",
  "Bingo! Better luck catching me next round. 🤖",
  "I told you to keep up! 😉",
];

const botLossComments = [
  "Okay... you got me this time. 😅",
  "Well played! I underestimated you. 👏",
  "You got me! I'll be ready next round. 😏",
  "Fine, fine... you win this one. 🤖",
];

function Play() {
  const { numbers, numberGenerator } = useBingoContext();
  const { saveGameHistoryFun } = useSaveGameHistory();
  const { saveHistory, userId, name } = useAuth();

  const playerName = `${name[0].toUpperCase()}${name.slice(1)}`;
  const [celebrationScore, setCelebrationScore] = useState(null);

  const hasSavedHistory = useRef(false);
  const botTimeoutRef = useRef(null);
  const calledTimeoutRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  const [calledBy, setCalledBy] = useState(null);
  const [turn, setTurn] = useState("you");
  const [comment, setComment] = useState(null);

  const [showIntroBot, setShowIntroBot] = useState(true);
  const [showStartAnnouncement, setShowStartAnnouncement] = useState(false);

  const [introMessage] = useState(() => {
    const randomComment =
      introComments[Math.floor(Math.random() * introComments.length)];

    return randomComment(playerName);
  });

  const [endMessage, setEndMessage] = useState(null);

  const [botPattern, setBotPattern] = useState(() =>
    numberGenerator().map((value, index) => ({
      index,
      value,
      checked: false,
    })),
  );

  const [pattern, setPattern] = useState(() =>
    numbers.map((value, index) => ({
      index,
      value,
      checked: false,
    })),
  );

  const [currentNumber, setCurrentNumber] = useState(null);

  const score = lines.filter((line) =>
    line.every((index) => pattern[index].checked),
  ).length;

  const botScore = lines.filter((line) =>
    line.every((index) => botPattern[index].checked),
  ).length;

  const isWin = score >= 5;
  const isLoss = botScore >= 5;
  const isGameOver = isWin || isLoss;

  /*
   * Bingo celebration for scores 1-4 only.
   */
  useEffect(() => {
    const playerWon = score >= 5;
    const botWon = botScore >= 5;

    if (!playerWon && !botWon && score >= 1 && score <= 4) {
      setCelebrationScore(score);
    }
  }, [score, botScore]);

  /*
   * If the user does nothing for 15 seconds,
   * show an inactivity comment.
   */
  useEffect(() => {
    if (showIntroBot || score >= 5 || botScore >= 5) return;

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      const randomComment =
        funComments[Math.floor(Math.random() * funComments.length)];

      setComment(randomComment);
    }, 15000);

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [turn, score, botScore, showIntroBot]);

  /*
   * Save history once the game ends.
   */
  useEffect(() => {
    const gameEnded = score >= 5 || botScore >= 5;

    if (!gameEnded || !saveHistory || !userId || hasSavedHistory.current) {
      return;
    }

    hasSavedHistory.current = true;

    saveGameHistoryFun({
      userId,
      isWin: score >= 5,
      pattern,
      cardTheme: PLAYER_THEME,
    });
  }, [score, botScore, saveHistory, userId, pattern, saveGameHistoryFun]);

  /*
   * Select one bot comment when the game ends.
   */
  useEffect(() => {
    if (!isGameOver || endMessage) return;

    const comments = isWin ? botLossComments : botWinComments;

    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    setEndMessage(randomComment);
  }, [isGameOver, isWin, endMessage]);

  /*
   * Cleanup.
   */
  useEffect(() => {
    return () => {
      if (botTimeoutRef.current) {
        clearTimeout(botTimeoutRef.current);
      }

      if (calledTimeoutRef.current) {
        clearTimeout(calledTimeoutRef.current);
      }

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  /*
   * Called number display.
   */
  function showCalledNumber(number, caller) {
    if (calledTimeoutRef.current) {
      clearTimeout(calledTimeoutRef.current);
    }

    setCurrentNumber(number);
    setCalledBy(caller);

    calledTimeoutRef.current = setTimeout(() => {
      setCurrentNumber(null);
      setCalledBy(null);
    }, 2000);
  }

  /*
   * Accept challenge / skip challenge.
   */
  function startGame() {
    setShowIntroBot(false);
    setShowStartAnnouncement(true);

    setTimeout(() => {
      setShowStartAnnouncement(false);
    }, 1400);
  }

  /*
   * Restart the game.
   */
  function handleRestart() {
    if (botTimeoutRef.current) {
      clearTimeout(botTimeoutRef.current);
    }

    if (calledTimeoutRef.current) {
      clearTimeout(calledTimeoutRef.current);
    }

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    hasSavedHistory.current = false;

    setCurrentNumber(null);
    setCalledBy(null);
    setTurn("you");
    setComment(null);
    setCelebrationScore(null);
    setEndMessage(null);

    setPattern((p) =>
      p.map((obj) => ({
        ...obj,
        checked: false,
      })),
    );

    setBotPattern((p) =>
      p.map((obj) => ({
        ...obj,
        checked: false,
      })),
    );
  }

  function handlePlay({ index, value }) {
    if (showIntroBot || turn !== "you" || score >= 5 || botScore >= 5) {
      return;
    }

    setComment(null);

    setPattern((p) =>
      p.map((item) =>
        item.index === index ? { ...item, checked: true } : item,
      ),
    );

    showCalledNumber(value, "you");

    setTurn("bot");

    botHandlePlay(value);
  }

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
      setComment(null);

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
    }, 1000);
  }

  function botSelectingNumber(currentPattern) {
    const potentials = currentPattern
      .filter((item) => !item.checked)
      .map((item) => {
        const candidateIndex = item.index;

        const relatedLines = lines.filter((line) =>
          line.includes(candidateIndex),
        );

        let potential = 0;

        for (const line of relatedLines) {
          const checkedCount = line.filter(
            (index) =>
              currentPattern[index].checked || index === candidateIndex,
          ).length;

          if (checkedCount === 5) {
            potential += 100;
          } else if (checkedCount === 4) {
            potential += 20;
          } else if (checkedCount === 3) {
            potential += 5;
          } else if (checkedCount === 2) {
            potential += 1;
          }
        }

        return {
          value: item.value,
          potential,
        };
      });

    if (potentials.length === 0) {
      return null;
    }

    const highestPotential = Math.max(
      ...potentials.map((item) => item.potential),
    );

    const bestChoices = potentials.filter(
      (item) => item.potential === highestPotential,
    );

    const choice = bestChoices[Math.floor(Math.random() * bestChoices.length)];

    return choice.value;
  }

  return (
    <div
      className="min-h-full relative w-full overflow-x-hidden"
      style={{
        backgroundColor: GAME_THEME.page,
        color: GAME_THEME.text,
      }}
    >
      {/* =====================================================
        START ANNOUNCEMENT
    ====================================================== */}

      {showStartAnnouncement && (
        <div className="fixed inset-0 z-[80] pointer-events-none flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `${GAME_THEME.pageDark}99`,
            }}
          />

          <div className="relative flex items-center justify-center">
            <div
              className="relative animate-start-game px-5 py-4 sm:px-10 sm:py-5 rounded-2xl border-2"
              style={{
                backgroundColor: `${GAME_THEME.surface}f5`,
                borderColor: `${GAME_THEME.accent}99`,
                boxShadow: `0 0 45px ${GAME_THEME.goldGlow}`,
              }}
            >
              <div
                className="absolute -top-2 -left-2 text-lg"
                style={{ color: GAME_THEME.accent }}
              >
                ✦
              </div>

              <div
                className="absolute -top-2 -right-2 text-lg"
                style={{ color: GAME_THEME.accent }}
              >
                ✦
              </div>

              <div
                className="absolute -bottom-2 -left-1 text-sm"
                style={{ color: GAME_THEME.accent }}
              >
                ✦
              </div>

              <div
                className="absolute -bottom-2 -right-1 text-sm"
                style={{ color: GAME_THEME.accent }}
              >
                ✦
              </div>

              <p
                className="text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-center mb-1"
                style={{ color: GAME_THEME.accent }}
              >
                The game begins
              </p>

              <p
                className="text-xl xs:text-2xl sm:text-4xl font-black text-center tracking-wide whitespace-nowrap"
                style={{ color: GAME_THEME.text }}
              >
                LET&apos;S START! 🎯
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
        INITIAL BOT CHALLENGE
    ====================================================== */}

      {showIntroBot && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 xs:px-4 py-6 overflow-y-auto animate-challenge">
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              backgroundColor: `${GAME_THEME.pageDark}e8`,
            }}
          />

          <div
            className="absolute left-[5%] sm:left-[10%] top-[35%] w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl"
            style={{ backgroundColor: GAME_THEME.playerSoft }}
          />

          <div
            className="absolute right-[5%] sm:right-[10%] top-[25%] w-36 h-36 sm:w-44 sm:h-44 rounded-full blur-3xl"
            style={{ backgroundColor: GAME_THEME.botSoft }}
          />

          <div className="relative z-10 w-full max-w-lg px-0 xs:px-2 sm:px-4">
            <div className="flex justify-center mb-7 sm:mb-9">
              <div
                className="px-4 py-1.5 rounded-full border"
                style={{
                  backgroundColor: `${GAME_THEME.surface}cc`,
                  borderColor: `${GAME_THEME.accent}35`,
                }}
              >
                <span
                  className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: GAME_THEME.accent }}
                >
                  Bingo Face-Off
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-1 xs:gap-2 sm:gap-6">
              {/* PLAYER */}

              <div className="flex-1 min-w-0 flex flex-col items-center animate-player-enter">
                <div className="relative">
                  <div
                    className="absolute -inset-2 rounded-full border"
                    style={{
                      borderColor: `${GAME_THEME.player}50`,
                    }}
                  />

                  <div
                    className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${GAME_THEME.player}99, ${GAME_THEME.surface})`,
                      borderColor: `${GAME_THEME.player}aa`,
                      boxShadow: `0 0 30px ${GAME_THEME.playerGlow}`,
                    }}
                  >
                    <span
                      className="text-2xl xs:text-3xl sm:text-4xl font-bold"
                      style={{ color: GAME_THEME.text }}
                    >
                      {playerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                <span
                  className="mt-3 max-w-full truncate px-1 text-[9px] xs:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.18em]"
                  style={{ color: GAME_THEME.muted }}
                >
                  {playerName}
                </span>

                <div className="flex flex-col gap-2 mt-4 sm:mt-5 w-full max-w-[145px] animate-choices-enter">
                  <button
                    type="button"
                    onClick={startGame}
                    className="group w-full py-2 xs:py-2.5 rounded-xl border text-white text-[11px] xs:text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    style={{
                      background: `linear-gradient(90deg, ${GAME_THEME.player}, ${GAME_THEME.button || GAME_THEME.player})`,
                      borderColor: `${GAME_THEME.player}80`,
                      boxShadow: `0 6px 20px ${GAME_THEME.playerGlow}`,
                    }}
                  >
                    <span className="group-hover:mr-1 transition-all">🎯</span>{" "}
                    Bring it on!
                  </button>

                  <Link
                    to="/game"
                    className="group w-full py-2 xs:py-2.5 rounded-xl border text-[11px] xs:text-xs sm:text-sm font-semibold text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    style={{
                      backgroundColor: `${GAME_THEME.surfaceLight}80`,
                      borderColor: `${GAME_THEME.bot}45`,
                      color: GAME_THEME.muted,
                    }}
                  >
                    <span className="group-hover:mr-1 transition-all">😌</span>{" "}
                    Not today
                  </Link>
                </div>
              </div>

              {/* VS */}

              <div className="shrink-0 animate-vs-pop">
                <div
                  className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center"
                  style={{
                    backgroundColor: GAME_THEME.surface,
                    borderColor: `${GAME_THEME.accent}66`,
                    boxShadow: `0 0 20px ${GAME_THEME.goldGlow}`,
                  }}
                >
                  <span
                    className="text-[8px] xs:text-[9px] sm:text-[10px] font-extrabold tracking-wider"
                    style={{ color: GAME_THEME.accent }}
                  >
                    VS
                  </span>

                  <div
                    className="absolute inset-[-4px] xs:inset-[-5px] rounded-full border"
                    style={{
                      borderColor: `${GAME_THEME.accent}25`,
                    }}
                  />
                </div>
              </div>

              {/* BOT */}

              <div className="shrink-0 flex justify-center animate-bot-enter">
                <div className="relative">
                  <div className="absolute right-[65%] xs:right-[70%] sm:right-[76%] top-[-48px] xs:top-[-55px] sm:top-[-65px] w-[130px] xs:w-[155px] sm:w-[180px] z-20 animate-bubble-enter">
                    <div
                      className="relative border rounded-2xl rounded-br-sm px-2.5 xs:px-3 py-2 xs:py-2.5 text-center shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
                      style={{
                        background: `linear-gradient(135deg, ${GAME_THEME.surfaceLight}, ${GAME_THEME.surface})`,
                        borderColor: GAME_THEME.botBorder,
                      }}
                    >
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: GAME_THEME.bot }}
                        />

                        <span
                          className="text-[8px] xs:text-[9px] uppercase tracking-widest"
                          style={{ color: GAME_THEME.muted }}
                        >
                          Kizi
                        </span>
                      </div>

                      <p
                        className="text-[10px] xs:text-xs sm:text-sm font-medium leading-relaxed"
                        style={{ color: GAME_THEME.text }}
                      >
                        {introMessage}
                      </p>

                      <div
                        className="absolute right-[-6px] bottom-4 w-3 h-3 rotate-45 border-r border-t"
                        style={{
                          backgroundColor: GAME_THEME.surface,
                          borderColor: `${GAME_THEME.bot}80`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className="absolute inset-4 rounded-full blur-2xl"
                      style={{
                        backgroundColor: GAME_THEME.botSoft,
                      }}
                    />

                    <FemaleBingoBot
                      showFullRobot={true}
                      className="relative scale-[0.65] xs:scale-[0.75] sm:scale-90 origin-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-7 sm:mt-9">
              <span
                className="text-[9px] sm:text-[10px] tracking-wide"
                style={{ color: GAME_THEME.muted }}
              >
                Your card is ready. Kizi is waiting. 🤖
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
        BINGO CELEBRATION
    ====================================================== */}

      <BingoCelebration
        key={celebrationScore}
        show={celebrationScore !== null}
        onDone={() => setCelebrationScore(null)}
      />

      {/* =====================================================
        GAME RESULT
    ====================================================== */}

      {isGameOver && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-3 xs:px-4 py-4 overflow-y-auto">
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              backgroundColor: `${GAME_THEME.pageDark}e8`,
            }}
          />

          <div
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-20"
            style={{
              backgroundColor: isWin ? GAME_THEME.accent : GAME_THEME.bot,
            }}
          />

          <div
            className="relative z-10 w-full max-w-sm rounded-3xl border p-5 xs:p-6 sm:p-8 text-center shadow-2xl animate-result-enter"
            style={{
              backgroundColor: isWin ? GAME_THEME.surface : GAME_THEME.pageDark,
              borderColor: isWin
                ? `${GAME_THEME.accent}80`
                : GAME_THEME.botBorder,
              boxShadow: isWin
                ? `0 0 45px ${GAME_THEME.goldGlow}`
                : `0 0 45px ${GAME_THEME.botGlow}`,
            }}
          >
            <div
              className="mx-auto mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl rotate-3 flex items-center justify-center border-2 animate-result-icon"
              style={{
                backgroundColor: isWin
                  ? `${GAME_THEME.accent}20`
                  : GAME_THEME.botSoft,
                borderColor: isWin
                  ? `${GAME_THEME.accent}80`
                  : GAME_THEME.botBorder,
              }}
            >
              <span className="text-2xl sm:text-3xl -rotate-3">
                {isWin ? "🏆" : "🤖"}
              </span>
            </div>

            <div className="animate-result-text">
              <p
                className="text-[10px] xs:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2"
                style={{
                  color: isWin ? GAME_THEME.accent : GAME_THEME.muted,
                }}
              >
                {isWin ? "Bingo Champion" : "Round Over"}
              </p>

              <h2
                className="text-2xl xs:text-3xl sm:text-4xl font-extrabold leading-tight"
                style={{ color: GAME_THEME.text }}
              >
                {isWin ? "You won!" : "So close!"}
              </h2>

              <p
                className="mt-3 text-xs xs:text-sm sm:text-base leading-relaxed"
                style={{ color: GAME_THEME.text }}
              >
                {isWin
                  ? "You got all 5 lines before the bot. 🔥"
                  : "Kizi got there first this time. Keep going! 🎯"}
              </p>
            </div>

            {endMessage && (
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
                    Kizi
                  </span>

                  <p
                    className="text-[11px] xs:text-xs sm:text-sm italic text-left leading-relaxed"
                    style={{ color: GAME_THEME.text }}
                  >
                    {endMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 sm:mt-7 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="w-full py-2.5 xs:py-3 rounded-xl text-xs xs:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: isWin
                    ? `linear-gradient(90deg, ${GAME_THEME.accent}, #c98f25)`
                    : `linear-gradient(90deg, ${GAME_THEME.bot}, ${GAME_THEME.player})`,
                  color: GAME_THEME.pageDark,
                  boxShadow: isWin
                    ? `0 8px 25px ${GAME_THEME.goldGlow}`
                    : `0 8px 25px ${GAME_THEME.botGlow}`,
                }}
              >
                <HiRefresh className="inline mr-1" />
                Play Again
              </button>

              <Link
                to="/game"
                className="w-full py-2.5 xs:py-3 rounded-xl text-xs xs:text-sm font-semibold text-center transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: GAME_THEME.surfaceLight,
                  border: `1px solid ${GAME_THEME.playerBorder}`,
                  color: GAME_THEME.text,
                }}
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
        CALLED NUMBER
    ====================================================== */}

      {currentNumber && (
        <div className="fixed top-6 xs:top-10 sm:top-20 left-0 w-full z-30 flex justify-center pointer-events-none px-3">
          <div
            className="relative flex items-center gap-2 xs:gap-3 pl-3 xs:pl-4 pr-1.5 xs:pr-2 py-1.5 xs:py-2 rounded-full backdrop-blur-md border shadow-[0_10px_35px_rgba(0,0,0,0.3)] animate-pop-in"
            style={{
              backgroundColor:
                calledBy === "you"
                  ? `${GAME_THEME.player}e8`
                  : `${GAME_THEME.bot}f2`,
              borderColor:
                calledBy === "you"
                  ? GAME_THEME.playerBorder
                  : GAME_THEME.botBorder,
            }}
          >
            <span
              className="text-[10px] xs:text-xs sm:text-sm font-semibold"
              style={{
                color: calledBy === "you" ? GAME_THEME.text : GAME_THEME.muted,
              }}
            >
              {calledBy === "you" ? "You called" : "Bot called"}
            </span>

            <div
              className="relative w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs xs:text-sm sm:text-base font-extrabold shadow-[0_0_18px_rgba(232,163,61,0.4)]"
              style={{
                backgroundColor: GAME_THEME.accent,
                color: GAME_THEME.pageDark,
              }}
            >
              <span>{currentNumber}</span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
        GAME BOARDS
    ====================================================== */}

      <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-9 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 pb-6 lg:items-start lg:justify-center">
        {/* PLAYER */}

        <div className="w-full max-w-md mx-auto space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="relative shrink-0">
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  backgroundColor: GAME_THEME.playerSoft,
                }}
              />

              <div
                className="relative w-9 h-9 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: `${GAME_THEME.player}40`,
                  borderColor: GAME_THEME.playerBorder,
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: GAME_THEME.text }}
                >
                  {playerName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <span
                className="block text-sm xs:text-base font-semibold truncate"
                style={{ color: GAME_THEME.text }}
              >
                {playerName}
              </span>

              <span
                className="flex items-center gap-1.5 text-[11px]"
                style={{ color: GAME_THEME.muted }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    turn === "you" ? "bg-green-400" : "bg-white/20"
                  }`}
                />

                {turn === "you" ? "Your turn" : "Waiting"}
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-1 rounded-3xl blur-sm"
              style={{
                backgroundColor: GAME_THEME.playerSoft,
              }}
            />

            <div className="relative">
              <BingoCard
                numbers={pattern}
                mode="play"
                onClick={turn === "you" ? handlePlay : undefined}
                theme={PLAYER_THEME}
              >
                <BingoScore score={score} />
              </BingoCard>
            </div>
          </div>
        </div>

        {/* BOT */}

        <div className="w-full max-w-md mx-auto space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="relative shrink-0">
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  backgroundColor: GAME_THEME.botSoft,
                }}
              />

              <div
                className="relative w-9 h-9 rounded-full border flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: `${GAME_THEME.bot}30`,
                  borderColor: GAME_THEME.botBorder,
                }}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                  <FemaleBingoBot
                    showFullRobot={false}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <span
                className="block text-sm xs:text-base font-semibold"
                style={{ color: `${GAME_THEME.text}cc` }}
              >
                Kizi
              </span>

              <span
                className="flex items-center gap-1.5 text-[11px]"
                style={{ color: GAME_THEME.muted }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    turn === "bot"
                      ? "bg-green-400 animate-pulse"
                      : "bg-white/20"
                  }`}
                />

                {turn === "bot" ? "Thinking..." : "Waiting"}
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-1 rounded-3xl blur-sm"
              style={{
                backgroundColor: GAME_THEME.botSoft,
              }}
            />

            <div className="relative">
              <BingoCard numbers={botPattern} mode="bot" theme={BOT_THEME}>
                <BingoScore score={botScore} />
              </BingoCard>
            </div>
          </div>
        </div>

        {/* =====================================================
          INACTIVITY COMMENT
        ====================================================== */}

        {comment && (
          <div className="fixed backdrop-blur-[3px] inset-0 z-50 flex items-center justify-center pointer-events-none px-3 xs:px-4 py-4 overflow-y-auto">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: `${GAME_THEME.pageDark}70`,
              }}
            />

            <div
              className="relative pointer-events-auto w-full max-w-[280px] border rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.45)] px-5 py-7 xs:py-8 text-center animate-pop-in"
              style={{
                backgroundColor: GAME_THEME.surface,
                borderColor: GAME_THEME.playerBorder,
              }}
            >
              <button
                type="button"
                onClick={() => setComment(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <HiX className="w-5 h-5" />
              </button>

              <div className="text-4xl mb-3 inline-block animate-eye-dart">
                👀
              </div>

              <h2
                className="text-xl sm:text-2xl font-primary mb-2"
                style={{ color: GAME_THEME.text }}
              >
                Are you still there?
              </h2>

              <p
                className="text-sm sm:text-base font-secondary leading-relaxed"
                style={{ color: GAME_THEME.muted }}
              >
                {comment}
              </p>

              <button
                type="button"
                onClick={() => setComment(null)}
                className="mt-6 w-full py-3 cursor-pointer rounded-full border text-white text-sm sm:text-base font-semibold transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: GAME_THEME.player,
                  borderColor: GAME_THEME.playerBorder,
                  boxShadow: `0 8px 25px ${GAME_THEME.playerGlow}`,
                }}
              >
                I&apos;m here! 👋
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Play;
