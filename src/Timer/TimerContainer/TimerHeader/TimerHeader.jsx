import './TimerHeader.css';

export function TimerHeader({ current }) {
  return (
    <div className="currentTask d-flex align-items-center justify-content-between">
      {current ? (
        <p className="currentId">{current.title}</p>
      ) : (
        <p className="notActiveTask">Нет активной задачи</p>
      )}
    </div>
  );
}
