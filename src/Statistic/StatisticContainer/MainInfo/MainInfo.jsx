import { Stops } from '../../../Icons/Stops';
import { TimeOnPause } from '../../../Icons/TimeOnPause';
import { Focus } from '../../../Icons/Focus/';
import './MainInfo.css';

export function MainInfo({ timePause, countStopTimer, workTime }) {
  return (
    <div className="mt-5">
      <div className="row gap-3 d-flex justify-content-center">
        <div className="focus d-flex justify-content-between">
          <div>
            <h3>Фокус</h3>
            {workTime.get() && timePause.get() ? <h2>15.12%</h2> : <h2>0%</h2>}
          </div>
          <span>
            <Focus />
          </span>
        </div>
        <div className="pauseTime d-flex justify-content-between">
          <div>
            <h3>Время на паузе</h3>
            <h2>{Math.floor(timePause.get() / 60)}м</h2>
          </div>
          <span>
            <TimeOnPause />
          </span>
        </div>
        <div className="amountPauses d-flex justify-content-between">
          <div>
            <h3>Остановки</h3>
            <h2>{countStopTimer.get()}</h2>
          </div>
          <span>
            <Stops />
          </span>
        </div>
      </div>
    </div>
  );
}
