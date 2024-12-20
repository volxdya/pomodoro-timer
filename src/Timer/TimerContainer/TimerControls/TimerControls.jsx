import { useHookstate } from '@hookstate/core';
import './TimerControls.css';
import { currentTask, pomorodos } from '../../../StateManager/StateManager';

export function TimerControls({
  handleStart,
  handleStop,
  isCounting,
  setIsCounting,
}) {
  const allPomodors = useHookstate(pomorodos);
  const current = useHookstate(currentTask);
  const obj = current.get({ noproxy: true });

  return (
    <div className="d-flex justify-content-center">
      {!isCounting ? (
        <>
          <button onClick={handleStart} className="buttonStart">
            Старт
          </button>
          <button className="buttonStop">Стоп</button>
        </>
      ) : (
        <>
          <button onClick={handleStop} className="buttonPause">
            Пауза
          </button>
          <button
            className="buttonStopIsCounting"
            onClick={() => {
              obj.time = 25 * 60;
              current.set(obj);
              allPomodors.set(allPomodors.get() - obj.countPomodoros);
              setIsCounting(false);
            }}
          >
            Стоп
          </button>
        </>
      )}
    </div>
  );
}
