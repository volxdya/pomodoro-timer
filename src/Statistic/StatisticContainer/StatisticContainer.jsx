import { TodayBlock } from './TodayBlock/TodayBlock.jsx';
import { BarBlock } from './BarBlock/BarBlock.jsx';
import { MainInfo } from './MainInfo/MainInfo.jsx';
import './StatisticContainer.css';

export function StatisticContainer({
  workTime,
  today,
  countPomodoros,
  timePause,
  countStopTimer,
}) {
  return (
    <div className="mt-5 mb-5">
      <div className="row">
        <div className="col-9">
          <h2>Ваша активность</h2>
        </div>
      </div>
      <div className="row mt-5">
        <TodayBlock
          workTime={workTime}
          today={today}
          countPomodoros={countPomodoros}
        />
        <BarBlock />
        <MainInfo
          workTime={workTime}
          timePause={timePause}
          countStopTimer={countStopTimer}
        />
      </div>
    </div>
  );
}
