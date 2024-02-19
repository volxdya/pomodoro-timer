import { useHookstate } from "@hookstate/core";
import { useEffect, useState } from "react";
import { allTime, currentTask, pomodorosOnTask, pomorodos } from "../StateManager/StateManager.jsx";
import { countPause, pauseTime } from "../StateManager/StateManager.jsx";
import { TimerContainer } from "./TimerContainer/TimerContainer.jsx";
import { TimerChill } from "./TimerContainer/TimerChill/TimerChill.jsx";

export function Timer() {
    // useState
    const [isError, setIsError] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [isChill, setIsChill] = useState(false);

    // hookState
    const countPauses = useHookstate(countPause);
    const task = useHookstate(currentTask);
    let current = task.get({ noproxy: true });
    const timePause = useHookstate(pauseTime);
    const pomodorosTask = useHookstate(pomorodos);
    const workTime = useHookstate(allTime);
    const pomodorosOnCurrentTask = useHookstate(pomodorosOnTask);

    let timeLeft;

    // obj task
    if (current) {
        pomodorosOnCurrentTask.set(current.countPomodoros);
        timeLeft = current.time;
    }

    // functions
    function taskSet() {
        task.set(current);
    }

    function getPadTimeZero(time) {
        return time.toString().padStart(2, "0");
    }

    function handleStart() {
        setIsPause(false);
        if (current) {
            setIsError(false);
            setIsCounting(true);
        } else {
            setIsError(true);
        }
        current.isCompelete = false;
        task.set(current);
    }

    function handleStop() {
        setIsCounting(false);
        setIsPause(true);
        current.pauses = current.pauses + 1;
        task.set(current);
        countPauses.set(countPauses.get() + 1);
    }

    function handleMinusTime() {
        if (current.time > 1 * 60) {
            current.time = current.time - 60;
        }
        taskSet();
    }

    function handlePlusTime() {
        if (current.time < 59 * 60) {
            current.time = current.time + 60;
        }
    }

    // getting minutes and seconds
    let minutes;
    let seconds;

    if (current) {
        minutes = getPadTimeZero(Math.floor(timeLeft / 60));
        seconds = getPadTimeZero(timeLeft - minutes * 60);
    }


    // timer logic
    useEffect(() => {
        if (isCounting) {
            const interval = setInterval(() => {
                if (timeLeft > 1) {
                    timeLeft -= 1 - 1;
                } else {
                    timeLeft = 1;
                }
                current.time = timeLeft -= 1;
                taskSet();
            }, 1000)
            const intrevalAllTime = setInterval(() => {
                workTime.set(workTime.get() + 1)
            }, 1000);
            return () => {
                clearInterval(interval);
                clearInterval(intrevalAllTime);
                if (current.pauses == 0 && current.isCompelete && current.time == 0) {
                    current.countPomodoros = pomodorosOnCurrentTask.get();
                    taskSet();
                }
                current.isCompelete = true;
                if (current.pauses > 0) {
                    current.countPomodoros = 0
                    taskSet();
                }
                pomodorosTask.set(pomodorosTask.get() + current.countPomodoros);
                taskSet();
            }
        }
    }, [isCounting]);

    useEffect(() => {
        if (isPause) {
            const intervalPauseTime = setInterval(() => {
                timePause.set(timePause.get() + 1)
            }, 1000);
            return () => {
                clearInterval(intervalPauseTime);
            }
        }
    }, [isPause]);

    useEffect(() => {
        if (timeLeft == 0) {
            setIsChill(true);
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
                    isError={isError}
                    seconds={seconds}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    isCounting={isCounting}
                    setIsCounting={setIsCounting}
                    taskSet={taskSet}
                    isChill={isChill}
                    setIsChill={setIsChill}
                />
            ) : (
                <TimerChill
                    isChill={isChill}
                    setIsChill={setIsChill}
                    isCounting={isCounting}
                    setIsCounting={setIsCounting}
                />
            )}
        </>
    )
}