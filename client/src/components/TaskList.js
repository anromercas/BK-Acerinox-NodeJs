import React, { useContext, useEffect } from 'react';
import { Task } from './Task';

import { GlobalContext } from '../context/GlobalState';

export const TaskList = () => {
  const { tasks, getTasks } = useContext(GlobalContext);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul className="list">
        {tasks.map(task => (<Task key={task._id} task={task} />))}
      </ul>
    </>
  )
}
