import { useCallback } from "react";

import clickSound from "../../assets/sounds/click.wav";
import scoreSound from "../../assets/sounds/score.wav";
import winSound from "../../assets/sounds/win.wav";
import failSound from "../../assets/sounds/fail.wav";

function useGameSounds(soundOn) {
  const playSound = useCallback(
    (sound) => {
      if (!soundOn) return;

      const audio = new Audio(sound);
      audio.volume = 0.5;
      audio.play();
    },
    [soundOn],
  );

  const playClick = () => playSound(clickSound);
  const playScore = () => playSound(scoreSound);
  const playWin = () => playSound(winSound);
  const playFail = () => playSound(failSound);

  return {
    playClick,
    playScore,
    playWin,
    playFail,
  };
}

export default useGameSounds;
