import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default function TaNotice() {
  const { validationError, setValidationError } = useContext(GlobalContext);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setValidationError(null);
  };
   
   return validationError && (<Snackbar open={validationError!==null} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="warning">
      {validationError}
    </Alert>
    </Snackbar>)
  
}
