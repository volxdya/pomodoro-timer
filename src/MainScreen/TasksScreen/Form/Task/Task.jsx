import './Task.css';
import { useState } from "react";
import { useHookstate } from "@hookstate/core";
import { tasksAll, currentTaskId } from "../../../../StateManager/StateManager.jsx";
import { TaskMain } from './TaskMain/TaskMain.jsx';
import { TaskControls } from './TaskControls/TaskControls.jsx';
import { Dropdown } from './Dropdown/Dropdown.jsx';

export function Task({ id, title, countPomodoros, add, minus }) {

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const currentId = useHookstate(currentTaskId);
    const allTasks = useHookstate(tasksAll);
    let newArray = allTasks.get({ noproxy: true });

    return (
        <div>
            <div className="task d-flex justify-content-between" onClick={() => {
                currentId.set(id);
            }}>
                <TaskMain title={title} countPomodoros={countPomodoros} isEdit={isEdit} setIsEdit={setIsEdit} />
                <TaskControls setIsOpenDropdown={setIsOpenDropdown} isOpenDropdown={isOpenDropdown} />
            </div>
            <Dropdown
                add={add}
                minus={minus}
                isOpenDropdown={isOpenDropdown}
                newArray={newArray}
                setisOpenDropdown={setIsOpenDropdown}
                allTasks={allTasks}
                id={id}
                setIsEdit={setIsEdit}
            />
        </div>
    );
}
