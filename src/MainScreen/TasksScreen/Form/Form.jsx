import uniqid from "uniqid";
import { useCallback, useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import { currentTask, currentTaskId, tasksAll } from "../../../StateManager/StateManager.jsx";
import { FormContainer } from "./FormContainer/FormContainer.jsx";

export function Form() {

    // useState
    const [value, setValue] = useState('');
    const [isError, setIsError] = useState(false);

    // hookstate/core
    const currentId = useHookstate(currentTaskId);
    const task = useHookstate(currentTask);
    const allTasksContainer = useHookstate(tasksAll);
    let current;

    // arrays of task
    let array = allTasksContainer.get({ noproxy: true });

    // functions form
    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsError(false);
        if (value == '') {
            setIsError(true);
        }
        if (value) {
            allTasksContainer.merge([{
                title: value,
                id: uniqid(),
                countPomodoros: 1,
                isCompelete: true,
                pauses: 0,
                time: 25 * 60,
                stops: 0,
            }]);
            array.reverse();
        }
        setValue('');
    }

    const taskSetter = useCallback(() => {
        task.set(array.find(el => el.id == currentId.get()));
    }, [])


    // current task
    useEffect(() => {
        taskSetter();
    }, [taskSetter, allTasksContainer.get(), currentId.get()]);

    useEffect(() => {
        current = task.get({ noproxy: true });
    }, [currentId.get(), allTasksContainer.get(), currentId.get()]);


    function setter() {
        task.set(current);
    }

    function add() {
        if (current.countPomodoros >= 1) {
            current.countPomodoros += 1;
            setter();
        }
    }

    function minus() {
        if (current.countPomodoros > 1) {
            current.countPomodoros -= 1;
            setter();
        }
    }

    let allTime = 0;

    for (let i = 0; i < array.length; i++) {
        allTime += array[i].time;
    }


    return (
        <FormContainer
            handleSubmit={handleSubmit}
            value={value}
            handleChange={handleChange}
            isError={isError}
            task={task}
            allTasksContainer={allTasksContainer}
            array={array}
            add={add}
            minus={minus}
            allTime={allTime}
        />
    )
}