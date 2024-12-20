import { useState } from 'react';
import './TaskMain.css';
import { useHookstate } from '@hookstate/core';
import { currentTask } from '../../../../../StateManager/StateManager';

export function TaskMain({ countPomodoros, title, isEdit, setIsEdit }) {
  const [value, setValue] = useState(title);
  const current = useHookstate(currentTask);
  const current2 = current.get({ noproxy: true });

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsEdit(false);
    current2.title = value;
    current.set(current2);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="countPomodoros">{countPomodoros}</div>
      {!isEdit ? (
        <p className="mx-3 mt-3">{title}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputEdit mx-4"
            value={value}
            onChange={handleChange}
          />
        </form>
      )}
    </div>
  );
}
