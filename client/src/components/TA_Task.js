import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

export const TA_Task = ({ task }) => {
  const { deleteOPSInstance, deleteChecklistInstance } = useContext(GlobalContext);
  const deleteTask = () => {
    deleteChecklistInstance(task._id);//TODO refine this situation whereby we only have to call one of them
    deleteOPSInstance(task._id);
  };
  const message = () => {
    return `${task.name} ▶︎ ${task.auditor} ⎯ ${task.type} ⎯ ${task.dueDate}`;
  }
 
  return (
    <SnackbarContent key={task._id} message={message()} action={
      <HighlightOffRoundedIcon color="primary" size="medium" onClick={deleteTask}>
        Eliminar
      </HighlightOffRoundedIcon>} />
  )
}