import { Tomato } from '../../../Icons/Tomato';
import './TodayBlock.css';

export function TodayBlock({ workTime, today, countPomodoros }) {
  let text = '';
  if (countPomodoros.get() == 1) {
    text = 'помидор';
  } else if (countPomodoros.get() > 1 && countPomodoros.get() < 5) {
    text = 'помидора';
  } else {
    text = 'помидоров';
  }

  return (
    <div className="col-3">
      <div className="currentDay">
        <h4>{today}</h4>
        {workTime.get() ? (
          <p>
            Вы работали над задачами в течение
            <span className="allTime">
              {' '}
              {Math.ceil(workTime.get() / 60)} минуты
            </span>
          </p>
        ) : (
          <p>Нет данных</p>
        )}
      </div>
      <div className="pomodoros mt-4">
        <div className="d-flex justify-content-center main">
          <Tomato height={100} width={100} />
          {countPomodoros.get() > 0 && (
            <p className="countPomodorosStatistic mt-3">
              x {countPomodoros.get()}
            </p>
          )}
        </div>
        {countPomodoros.get() > 0 && (
          <div className="bottomPomodoros">
            {countPomodoros.get()} {text}
          </div>
        )}
      </div>
    </div>
  );
}
