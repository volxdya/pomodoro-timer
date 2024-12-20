import { useHookstate } from '@hookstate/core';
import { chillTime } from '../../../StateManager/StateManager';
import { useEffect, useState } from 'react';
import { pulse } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  pulse: {
    animation: 'x 1s infinite',
    animationName: Radium.keyframes(pulse, 'pulse'),
  },
};

export function TimerChill({
  setIsChill,
  setIsCounting,
  isAnimated,
  setIsAnimated,
}) {
  const timeChill = useHookstate(chillTime);
  let timeLeft = timeChill.get();

  const [isCounter, setIsCounter] = useState(true);

  function getPadTimeZero(time) {
    return time.toString().padStart(2, '0');
  }

  function handlePause() {
    setIsCounter(!isCounter);
  }

  function handleSkip() {
    setIsChill(false);
    setIsAnimated(false);
    timeChill.set(5 * 60);
  }

  const minutes = getPadTimeZero(Math.floor(timeLeft / 60));
  const seconds = getPadTimeZero(timeLeft - minutes * 60);

  useEffect(() => {
    if (isCounter) {
      setIsCounting(false);
      const interval = setInterval(() => {
        if (timeLeft > 1) {
          timeLeft -= 1 - 1;
        } else {
          timeLeft = 1;
        }
        timeChill.set((timeLeft -= 1));
      }, 1000);
      return () => {
        if (timeChill.get() == 0) {
          setIsChill(false);
          timeChill.set(5 * 60);
        }
        clearInterval(interval);
      };
    }
  }, [isCounter, chillTime.get()]);

  return (
    <div className="timer">
      <div className="currentTask d-flex align-items-center justify-content-between">
        <p className="currentId">Отдых</p>
      </div>
      <div className="containerTimer">
        <div className="timerControls">
          <div className="d-flex justify-content-center">
            {isAnimated ? (
              <StyleRoot>
                <div className="test" style={styles.pulse}>
                  <h1 className="timerCounter px-3">
                    {minutes}:{seconds}
                  </h1>
                </div>
              </StyleRoot>
            ) : (
              <h1 className="timerCounter px-3">
                {minutes}:{seconds}
              </h1>
            )}
          </div>
          <br />
          <div className="d-flex justify-content-center">
            {isCounter ? (
              <button className="buttonStart" onClick={handlePause}>
                Пауза
              </button>
            ) : (
              <button className="buttonStart" onClick={handlePause}>
                Продолжить
              </button>
            )}
            <button className="buttonStop" onClick={handleSkip}>
              Пропустить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
