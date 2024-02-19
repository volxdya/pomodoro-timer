import './main.global.css'
import {Header} from "./Header/Header.jsx";
import {MainScreen} from "./MainScreen/MainScreen.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UnkownPage} from "./UnkownPage/UnkownPage.jsx";
import {Statistic} from "./Statistic/Statistic.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Header/>
                <Routes>
                    <Route path="/" element={<MainScreen/>}/>
                    <Route path="/404" element={<UnkownPage/>}/>
                    <Route path="/statistic" element={<Statistic/>}/>
                    <Route path="*" element={<Navigate to="/404"></Navigate>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
