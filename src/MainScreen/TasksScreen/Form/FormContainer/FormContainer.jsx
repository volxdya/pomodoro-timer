import './FormContainer.css';
import { pulse } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { Task } from './../Task/Task';

const styles = {
  pulse: {
    animation: 'x 0.7s',
    animationName: Radium.keyframes(pulse, 'pulse'),
  },
};

export function FormContainer({
  handleSubmit,
  value,
  handleChange,
  isError,
  array,
  add,
  minus,
  allTime,
}) {
  const conditionToDelete = 0;
  const tasks = array.filter((item) => item.time !== conditionToDelete);

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
      {isError && <div className="errorAlert mt-3 mb-3">Ошибка!</div>}

      <div className="tasks">
        {tasks.map((item) => {
          return (
            <StyleRoot>
              <div className="test" style={styles.pulse}>
                <Task
                  id={item.id}
                  minus={minus}
                  add={add}
                  key={item.id}
                  countPomodoros={item.countPomodoros}
                  title={item.title}
                />
              </div>
            </StyleRoot>
          );
        })}
      </div>

      {allTime > 0 && (
        <p className="allTimeTasks mt-4">{Math.ceil(allTime / 60)} минут</p>
      )}
    </>
  );
}
