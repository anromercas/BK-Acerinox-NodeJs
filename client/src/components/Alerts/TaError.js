import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export const TaError = () => {
  const { error, resetError } = useContext(GlobalContext);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    resetError();
  };
  
  return error && 
          (<Snackbar open={error!==null} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
          </Snackbar>)

}
