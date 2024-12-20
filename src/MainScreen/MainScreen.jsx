import { TasksScreen } from './TasksScreen/TasksScreen.jsx';
import { Timer } from '../Timer/Timer.jsx';
import { memo } from 'react';

function MainScreen() {
  return (
    <div className="row mt-5">
      <div className="col-5">
        <TasksScreen />
      </div>
      <div className="col-7">
        <Timer />
      </div>
    </div>
  );
}

export const MemoizedMainScreen = memo(MainScreen);
