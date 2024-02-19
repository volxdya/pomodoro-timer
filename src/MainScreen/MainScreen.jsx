import {TasksScreen} from "./TasksScreen/TasksScreen.jsx";
import {useState} from "react";
import {Timer} from "../Timer/Timer.jsx";

export function  MainScreen() {

    return (
        <div className="row mt-5">
            <div className="col-5">
                <TasksScreen/>
            </div>
            <div className="col-7">
                <Timer/>
            </div>
        </div>
    );
}