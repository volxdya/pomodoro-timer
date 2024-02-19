import './header.css';
import {Tomato} from "../Icons/Tomato.jsx";
import {Equalizer} from "../Icons/Equalizer.jsx";
import {Link} from "react-router-dom";

export function Header() {
    return (<div className="header">
          <span>
              <h3>
                  <span><Tomato height={40} width={40}/></span>
                  <Link to="/">
                    <span className="mx-3 title">pomodoro_box</span>
                  </Link>
              </h3>
          </span>
        <span>
                <Equalizer/>
                <Link to="/statistic" className="statistic mx-1">Статистика</Link>
            </span>
    </div>);
}