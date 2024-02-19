import { Task } from "../Task/Task"
import './FormContainer.css';
import { useEffect } from "react";

export function FormContainer({
    handleSubmit,
    value,
    handleChange,
    isError,
    array,
    add,
    minus
}) {

    const conditionToDelete = 0;

    const tasks = array.filter((item) => item.time !== conditionToDelete);
    // useEffect(() => {
    // if (tasks.indexOf(task.get({ noproxy: true })) === -1) {
    // task.set({});
    // } else {
    // console.log('все ок')
    // }
    // })

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={value}
                    type="text"
                    className="form"
                    placeholder="Название задачи"
                    onChange={handleChange}
                />
                <br />
                <button className="add mb-3">Добавить</button>
            </form>
            {isError && (
                <div className="errorAlert mt-3 mb-3">Ошибка!</div>
            )}

            <div className="tasks">
                {tasks.map((item) => {
                    return (
                        <Task
                            id={item.id}
                            minus={minus}
                            add={add}
                            key={item.id}
                            countPomodoros={item.countPomodoros}
                            title={item.title}
                        />
                    )
                })}
            </div>
        </>
    )
}