import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

export const TA_Task = ({ task }) => {
  const { deleteChecklistInstance } = useContext(GlobalContext);
  const deleteTask = () => {
    deleteChecklistInstance(task._id);
  };
  const summup = () => {
    const dueDate = new Date(task.dueDate);
    const dueDateFormattedDate = dueDate.toLocaleDateString() + " " + dueDate.toLocaleTimeString(); 
    return `${task.checklist_id.name} ▶︎ ${task.user_id.fullname} ⎯ ${task.subType} ⎯ ${dueDateFormattedDate}`;
  }
 
  return (
    <SnackbarContent key={task._id} message={summup()} action={
      <HighlightOffRoundedIcon color="primary" size="medium" onClick={deleteTask}>
        Eliminar
      </HighlightOffRoundedIcon>} />
  )
}