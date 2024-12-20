import { useHookstate } from '@hookstate/core';
import { useEffect, useState } from 'react';
import {
  allTime,
  currentTask,
  pomodorosOnTask,
  pomorodos,
} from '../StateManager/StateManager.jsx';
import { countPause, pauseTime } from '../StateManager/StateManager.jsx';
import { TimerContainer } from './TimerContainer/TimerContainer.jsx';
import { TimerChill } from './TimerContainer/TimerChill/TimerChill.jsx';

export function Timer() {
  const [data, setData] = useState({
    isError: false,
    isPause: false,
    isChill: false,
    isAnimated: false,
    isCounting: false,
  });

  const { isAnimated, isError, isChill, isPause, isCounting } = data;

  // HookState
  const countPauses = useHookstate(countPause);
  const task = useHookstate(currentTask);
  let current = task.get({ noproxy: true });
  const timePause = useHookstate(pauseTime);
  const pomodorosTask = useHookstate(pomorodos);
  const workTime = useHookstate(allTime);
  const pomodorosOnCurrentTask = useHookstate(pomodorosOnTask);

  let timeLeft;

  // Обновление текущей задачи
  if (current) {
    pomodorosOnCurrentTask.set(current.countPomodoros);
    timeLeft = current.time;
  }

  // Functions
  function taskSet() {
    task.set(current);
  }

  function getPadTimeZero(time) {
    return time.toString().padStart(2, '0');
  }

  function handleStart() {
    if (current) {
      setData((prev) => ({
        ...prev,
        isError: false,
        isCounting: true,
        isPause: false,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        isError: true,
      }));
    }
    if (current) {
      current.isCompelete = false;
      taskSet();
    }
  }

  function handleStop() {
    setData((prev) => ({
      ...prev,
      isCounting: false,
      isPause: true,
    }));
    if (current) {
      current.pauses += 1;
      taskSet();
      countPauses.set(countPauses.get() + 1);
    }
  }

  function handleMinusTime() {
    if (current && current.time > 1 * 60) {
      current.time -= 60;
      setData((prev) => ({ ...prev, isAnimated: true }));
      setTimeout(() => {
        setData((prev) => ({ ...prev, isAnimated: false }));
      }, 500);
      taskSet();
    }
  }

  function handlePlusTime() {
    if (current && current.time < 59 * 60) {
      current.time += 60;
      setData((prev) => ({ ...prev, isAnimated: true }));
      setTimeout(() => {
        setData((prev) => ({ ...prev, isAnimated: false }));
      }, 500);
      taskSet();
    }
  }

  // Getting minutes and seconds
  let minutes;
  let seconds;

  if (current) {
    minutes = getPadTimeZero(Math.floor(timeLeft / 60));
    seconds = getPadTimeZero(timeLeft % 60);
  } else {
    minutes = 25;
    seconds = '00';
  }

  // Timer logic
  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(() => {
        if (timeLeft > 1) {
          timeLeft -= 1;
        } else {
          timeLeft = 1;
        }
        if (current) {
          current.time = timeLeft;
          taskSet();
        }
        setData((prev) => ({ ...prev, isAnimated: true }));
      }, 1000);

      const intervalAllTime = setInterval(() => {
        workTime.set(workTime.get() + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(intervalAllTime);

        if (current) {
          if (current.pauses === 0 && current.isCompelete && current.time === 0) {
            current.countPomodoros = pomodorosOnCurrentTask.get();
          } else if (current.pauses > 0) {
            current.countPomodoros = 0;
          }
          pomodorosTask.set(pomodorosTask.get() + current.countPomodoros);
          current.isCompelete = true;
          taskSet();
        }
      };
    }
  }, [isCounting]);

  useEffect(() => {
    if (isPause) {
      const intervalPauseTime = setInterval(() => {
        timePause.set(timePause.get() + 1);
      }, 1000);
      return () => {
        clearInterval(intervalPauseTime);
      };
    }
  }, [isPause]);

  useEffect(() => {
    if (timeLeft === 0) {
      setData((prev) => ({ ...prev, isChill: true }));
    }
  }, [timeLeft]);

  return (
    <>
      {!isChill ? (
        <TimerContainer
          current={current}
          handleMinusTime={handleMinusTime}
          handlePlusTime={handlePlusTime}
          minutes={minutes}
          seconds={seconds}
          handleStart={handleStart}
          handleStop={handleStop}
          isCounting={isCounting}
          isError={isError}
          isAnimated={isAnimated}
        />
      ) : (
        <TimerChill
          setIsChill={(value) =>
            setData((prev) => ({ ...prev, isChill: value }))
          }
          isChill={isChill}
          isAnimated={isAnimated}
        />
      )}
    </>
  );
}