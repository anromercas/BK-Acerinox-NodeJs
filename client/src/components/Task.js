import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Task = ({ task }) => {
  const { deleteTask } = useContext(GlobalContext);

  return (
    <li className={task.type.toLowerCase()} >
      {task.text} <span>{task.type}</span><button onClick={() => deleteTask(task._id)} className="delete-btn">x</button>
    </li>
  )
}
