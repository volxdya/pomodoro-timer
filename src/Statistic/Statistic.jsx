import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useHookstate } from "@hookstate/core";
import { allTime, countPause, pauseTime, pomorodos } from './../StateManager/StateManager.jsx'
import dayjs from "dayjs";
import { StatisticContainer } from './StatisticContainer/StatisticContainer.jsx';

dayjs.locale('ru');
let today = dayjs().format("dddd");


switch (today) {
    case "Monday": today = "Понедельник"; break;
    case "Tuesday": today = "Вторник"; break;
    case "Wednesday": today = "Среда"; break;
    case "Thursday": today = "Четверг"; break;
    case "Friday": today = "Пятница"; break;
    case "Saturday": today = "Суббота"; break;
    case "Sunday": today = "Воскресенье"; break;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
        },
    },
};

let workTimeCurrentWeek = [0, 0, 0, 0, 0, 0, 0];

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];


export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: workTimeCurrentWeek,
            backgroundColor: 'rgba(234, 138, 121, 1)',
        },
    ],
};


export function Statistic() {
    const countStopTimer = useHookstate(countPause);
    const countPomodoros = useHookstate(pomorodos);
    const workTime = useHookstate(allTime);
    const timePause = useHookstate(pauseTime);


    let index;
    for (let i = 0; i < labels.length; i++) {
        switch (today) {
            case "Понедельник": index = 0; break;
            case "Вторник": index = 1; break;
            case "Среда": index = 2; break;
            case "Четверг": index = 3; break;
            case "Пятница": index = 4; break;
            case "Суббота": index = 5; break;
            case "Воскресенье": index = 6; break;
        }
    }

    workTimeCurrentWeek[index] = workTime.get();

    return (
        <StatisticContainer
            workTime={workTime}
            today={today}
            countPomodoros={countPomodoros}
            timePause={timePause}
            countStopTimer={countStopTimer}
        />
    )
}