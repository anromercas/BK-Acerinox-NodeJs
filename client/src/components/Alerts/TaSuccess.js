import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default function TaSuccess()  {
  const { successMessage, setSuccessMessage } = useContext(GlobalContext);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(null);
  };
  
  return successMessage && 
          (<Snackbar open={successMessage!==null} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {successMessage}
          </Alert>
          </Snackbar>)

}
