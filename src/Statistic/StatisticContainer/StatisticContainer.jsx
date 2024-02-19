import { TodayBlock } from './TodayBlock/TodayBlock.jsx';
import { BarBlock } from './BarBlock/BarBlock.jsx';
import { MainInfo } from './MainInfo/MainInfo.jsx';
import './StatisticContainer.css';

export function StatisticContainer({ workTime, today, countPomodoros, timePause, countStopTimer }) {
    return (
        <div className="mt-5 mb-5">
            <div className="row">
                <div className="col-9">
                    <h2>Ваша активность</h2>
                </div>
                <div className="col-3">
                    {/*
                        <select className="form-select" aria-label="Default select example">
                            <option value="1">Эта неделя</option>
                            <option value="2">Прошедшая неделя</option>
                            <option value="3">2 недели назад</option>
                        </select>
                    */}
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
    )
}