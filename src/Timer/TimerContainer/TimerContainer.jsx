import { TimerHeader } from './TimerHeader/TimerHeader';
import { TimerCounter } from './TimerCounter/TimerCounter';
import { TimerControls } from './TimerControls/TimerControls';
import './TimerContainer.css';

export function TimerContainer({
  current,
  handleMinusTime,
  handlePlusTime,
  minutes,
  seconds,
  handleStart,
  handleStop,
  isError,
  isCounting,
  setIsCounting,
  isAnimated,
}) {
  return (
    <div className="timer">
      <TimerHeader current={current} />
      <div className="containerTimer">
        <div className="timerControls">
          <TimerCounter
            handleMinusTime={handleMinusTime}
            handlePlusTime={handlePlusTime}
            minutes={minutes}
            seconds={seconds}
            isAnimated={isAnimated}
          />
          <br />
          <TimerControls
            handleStop={handleStop}
            handleStart={handleStart}
            isCounting={isCounting}
            setIsCounting={setIsCounting}
          />
          {isError && (
            <div className="d-flex justify-content-center align-items-center errorBlock mt-2">
              <h2>Ошибка, выберите задачу</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
