import './TimerCounter.css';
import { pulse } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
    pulse: {
        animation: 'x 1s infinite',
        animationName: Radium.keyframes(pulse, 'pulse')
    }
}

export function TimerCounter({ handleMinusTime, handlePlusTime, minutes, seconds, isAnimated }) {
    return (
        <div className="d-flex justify-content-center">
            <h1 className="timerCounter">
                <button className="buttonTime me-3" onClick={handleMinusTime}>-</button>
            </h1>
            {isAnimated ? (
                <StyleRoot>
                    <div className="test" style={styles.pulse}>
                        <h1 className="timerCounter px-3">{minutes}:{seconds}</h1>
                    </div>
                </StyleRoot>
            ) : (
                <h1 className="timerCounter px-3">{minutes}:{seconds}</h1>
            )}

            <h1 className="timerCounter">
                <button className="buttonTime mx-3" onClick={handlePlusTime}>+</button>
            </h1>
        </div>
    );
}