import './TimerCounter.css';

export function TimerCounter({ handleMinusTime, handlePlusTime, minutes, seconds }) {
    return (
        <div className="d-flex justify-content-center">
            <h1 className="timerCounter">
                <button className="buttonTime me-3" onClick={handleMinusTime}>-</button>
            </h1>
            {minutes && seconds ? (
                <h1 className="timerCounter px-3">{minutes}:{seconds}</h1>
            ) : (
                <h1 className="timerCounter px-3">25:00</h1>
            )}
            <h1 className="timerCounter">
                <button className="buttonTime mx-3" onClick={handlePlusTime}>+</button>
            </h1>
        </div>
    );
}